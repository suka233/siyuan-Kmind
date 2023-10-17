导入框
<template>
    <a-modal v-model:visible="visible" title="导入至Kmind" @ok="handleOk">
        <div>
            <a-alert class="mb-2" type="info" show-icon>
                <template #message>
                    <p>
                        注意，导入的数据会
                        <strong class="text-red-500">直接覆盖</strong>
                        当前导图的数据，并且
                        <strong class="text-red-500">无法撤销</strong> ！！
                    </p>
                    <!--                    <p class="text-center">请确认后再操作！</p>-->
                </template>
            </a-alert>
            <a-upload-dragger
                v-model:file-list="fileList"
                :max-count="1"
                :before-upload="handleBeforeUpload"
            >
                <p class="ant-upload-drag-icon">
                    <inbox-outlined />
                </p>
                <p class="ant-upload-text">点击或者拖拽文件至此处以导入</p>
                <p class="ant-upload-hint">
                    支持文件格式：.kmind, .json, .xmind, .xlsx, .md
                </p>
            </a-upload-dragger>
        </div>
    </a-modal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { InboxOutlined } from '@ant-design/icons-vue';
import { message, UploadProps } from 'ant-design-vue';
import { kmind, useKmind } from '/@/hooks/useKmind';
import xmind from 'simple-mind-map/src/parse/xmind.js';
import markdown from 'simple-mind-map/src/parse/markdown.js';
import { read, utils } from 'xlsx';
import { fileToBuffer } from '/@/utils';
const props = defineProps<{
    visible: boolean;
}>();
const emits = defineEmits<{
    (e: 'update:visible', visible: boolean): void;
}>();

const visible = computed({
    get() {
        return props.visible;
    },
    set() {
        emits('update:visible', !visible.value);
    },
});

const fileList = ref<UploadProps['fileList']>([]);
const mindFile = computed<File | undefined>(
    () => fileList.value?.[0]?.originFileObj,
);
const handleBeforeUpload = () => {
    return false;
};

const handleOk = async () => {
    if (!mindFile.value) {
        message.error('请先选择文件');
        return;
    }

    if (/\.(smm|json|kmind)$/.test(mindFile.value.name)) {
        handleJson();
    } else if (/\.xmind$/.test(mindFile.value.name)) {
        await handleXmind();
    } else if (/\.xlsx$/.test(mindFile.value.name)) {
        await handleExcel();
    } else if (/\.md$/.test(mindFile.value.name)) {
        // console.log(mindFile.value.name);
        await handleMd();
    }

    visible.value = false;
};

const { loadKmindFullData } = useKmind(undefined);
const handleJson = () => {
    let fileReader = new FileReader();
    fileReader.readAsText(mindFile.value!);
    fileReader.onload = (evt) => {
        try {
            const json = JSON.parse(evt.target?.result as string);
            if (typeof json !== 'object') {
                throw new Error('文件内容有误');
            }
            loadKmindFullData(json);
            message.success('导入成功');
        } catch (error) {
            message.error('文件格式错误');
        }
    };
};
const handleXmind = async () => {
    await xmind
        .parseXmindFile(mindFile.value)
        .then((data) => {
            // console.log(data)
            kmind.setFullData({ root: data });
            message.success('导入成功');
        })
        .catch(() => {
            message.error('文件解析失败');
        });
};
const handleExcel = async () => {
    try {
        const wb = read(await fileToBuffer(mindFile.value));
        const data: any = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
            header: 1,
        });
        if (data.length <= 0) {
            return;
        }
        let max = 0;
        data.forEach((arr: any[]) => {
            if (arr.length > max) {
                max = arr.length;
            }
        });
        let layers: Array<Array<any>> = [];
        let walk = (layer) => {
            if (!layers[layer]) {
                layers[layer] = [];
            }
            for (let i = 0; i < data.length; i++) {
                if (data[i][layer]) {
                    let node = {
                        data: {
                            text: data[i][layer],
                        },
                        children: [],
                        _row: i,
                    };
                    layers[layer].push(node);
                }
            }
            if (layer < max - 1) {
                walk(layer + 1);
            }
        };
        walk(0);
        let getParent = (arr, row) => {
            for (let i = arr.length - 1; i >= 0; i--) {
                if (row >= arr[i]._row) {
                    return arr[i];
                }
            }
        };
        for (let i = 1; i < layers.length; i++) {
            let arr = layers[i];
            for (let j = 0; j < arr.length; j++) {
                let item = arr[j];
                let parent = getParent(layers[i - 1], item._row);
                if (parent) {
                    parent.children.push(item);
                }
            }
        }
        // console.log(layers[0][0]);
        kmind.setFullData({ root: layers[0][0] });
        message.success('导入成功');
    } catch (error) {
        console.log(error);
        message.error('文件解析失败');
    }
};
const handleMd = async () => {
    let fileReader = new FileReader();
    fileReader.readAsText(mindFile.value!);
    fileReader.onload = async (evt) => {
        try {
            const data = await markdown.transformMarkdownTo(
                evt.target?.result as string,
            );
            // console.log(data);
            kmind.setFullData({ root: data });
            message.success('导入成功');
        } catch (error) {
            message.error('文件格式错误');
        }
    };
};
</script>

<style scoped></style>
