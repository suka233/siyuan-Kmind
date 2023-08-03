导出
<template>
    <a-modal
        v-model:visible="visible"
        title="导出"
        :width="800"
        @ok="handleOk"
        :confirm-loading="loading"
    >
        <div>
            <a-form>
                <a-row :gutter="[8, 8]">
                    <a-col :span="24">
                        <a-form-item label="导出文件名称">
                            <a-input
                                v-model:value="fileName"
                                placeholder="不可以输入特殊符号哦~"
                                :addon-after="`.${fileType}`"
                                show-count
                                :maxlength="255"
                                allow-clear
                            />
                        </a-form-item>
                    </a-col>
                    <!--          额外配置区域-->
                    <!--          <a-col :span="6" v-show="fileType === 'png' || fileType === 'svg'">-->
                    <!--            <a-form-item label="水平内边距"><a-input-number v-model:value="paddingX" :min="0" /></a-form-item>-->
                    <!--          </a-col>-->
                    <!--          <a-col :span="6" v-show="fileType === 'png' || fileType === 'svg'">-->
                    <!--            <a-form-item label="垂直内边距"><a-input-number v-model:value="paddingY" :min="0" /></a-form-item>-->
                    <!--          </a-col>-->
                    <a-col
                        :span="6"
                        v-show="fileType === 'png' || fileType === 'svg'"
                    >
                        <a-form-item label="背景是否透明"
                            ><a-checkbox v-model:checked="isTransparent"
                        /></a-form-item>
                    </a-col>
                    <a-col
                        :span="6"
                        v-show="fileType === 'kmind' || fileType === 'json'"
                    >
                        <a-form-item label="是否导出主题，结构"
                            ><a-checkbox v-model:checked="isFullExport"
                        /></a-form-item>
                    </a-col>
                    <a-col :span="24"> 请选择导出格式: </a-col>
                    <a-col
                        :span="8"
                        v-for="item in exportTypeList"
                        :key="item.type"
                        ><file-type-list
                            :item="item"
                            @click="handleChangeType(item.type)"
                            :active="fileType === item.type"
                    /></a-col>
                    <a-col :span="24" v-show="fileType === 'kmind'"
                        ><a-alert
                            message="推荐kmind格式，兼容了json格式的全部优点，并拓展了更多功能，例如禅模式的状态保存等等，并且支持挂件的无损导入"
                            type="info"
                            show-icon
                        >
                            <template #icon
                                ><smile-outlined
                            /></template> </a-alert
                    ></a-col>
                    <a-col :span="24" v-show="fileType === 'xmind'"
                        ><a-alert
                            message="由于数据格式不兼容，导出到xmind可能会出现关联线缺失、富文本样式丢失的问题"
                            type="info"
                            show-icon
                    /></a-col>
                    <a-col :span="24" v-show="fileType === 'svg'"
                        ><a-alert
                            message="由于样式比较复杂，svg导出在某些情况下可能会出现样式混乱的问题，不推荐使用"
                            type="info"
                            show-icon
                    /></a-col>
                    <a-col :span="24" v-show="fileType === 'png'"
                        ><a-alert
                            message="如果节点较多，导出png可能需要较长时间，请耐心等待。并且请注意，由于底层库html2cavas的bug，导出为图片的时候节点文字的样式会丢失，暂无更好的解决方案"
                            type="info"
                            show-icon
                    /></a-col>
                </a-row>
            </a-form>
        </div>
    </a-modal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { exportTypeList } from '/@/config';
import FileTypeList from './components/FileTypeList/index.vue';
import { message } from 'ant-design-vue';
import { kmind, useKmind } from '/@/hooks/useKmind';
import { SmileOutlined } from '@ant-design/icons-vue';

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

const fileName = ref<string>('kmind');
// const paddingX = ref(10)
// const paddingY = ref(10)
const isTransparent = ref(false);
const isFullExport = ref(true);
const fullFileName = computed(() => {
    return `${fileName.value}.${fileType.value}`;
});
const verify = (value: string) => {
    const reg = /[\\/:*?"<>|]/;
    return reg.test(value);
};

const fileType = ref('kmind');
const handleChangeType = (type: string) => {
    fileType.value = type;
};

const { downloadKmind } = useKmind(undefined);
const loading = ref(false);
const handleOk = async () => {
    // 校验特殊符号
    if (verify(fileName.value)) {
        message.error('文件名不可以包含特殊符号哦~');
        return;
    }

    let data;

    loading.value = true;
    switch (fileType.value) {
        case 'kmind':
            downloadKmind(fileName.value, isFullExport.value);
            break;
        case 'json':
            // console.log(kmind[name!])
            await kmind.doExport.json('', isFullExport.value).then((_data) => {
                data = _data;
            });
            break;
        case 'png':
            await kmind.doExport.png('', isTransparent.value).then((_data) => {
                data = _data;
            });
            break;
        case 'svg':
            await kmind.doExport
                .svg(
                    '',
                    false,
                    `* {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              }`,
                )
                .then((_data) => {
                    data = _data;
                });
            break;
        case 'xmind':
            await kmind.doExport.xmind('').then((_data) => {
                data = _data;
            });
            break;
        case 'md':
            await kmind.doExport.md().then((_data) => {
                data = _data;
            });
            break;
        case 'pdf':
            await kmind.doExport.pdf(fileName.value);
    }

    loading.value = false;
    if (data) {
        const a = document.createElement('a');
        a.href = data;
        a.download = fullFileName.value;
        a.click();
    }
};
</script>

<style scoped></style>
