<template>
    <a-modal v-model:visible="visible" title="导出" :width="800" @ok="handleOk">
        <div class="p-2">
            <a-input
                v-model:value="fileName"
                addon-before="导出文件名称 :"
                :addon-after="`${fileType ? '.' + fileType : ''}`"
                allow-clear
                placeholder="请输入导出文件名称"
                class="w-full"
            />
            <a-checkbox v-model:checked="includeConfig" class="text-gray-500/80"
                >是否包含主题，结构等配置数据？</a-checkbox
            >
            <a-radio-group
                v-model:value="fileType"
                button-style="solid"
                class="mt-8"
            >
                <a-radio-button disabled value="kmind" title="开发中...暂不开放"
                    >专有文件 ( .kmind )</a-radio-button
                >
                <a-radio-button value="json">json文件 ( .json )</a-radio-button>
                <a-radio-button disabled value="png" title="开发中...暂不开放"
                    >图片文件 ( .png )</a-radio-button
                >
                <a-radio-button value="svg">svg文件 ( .svg )</a-radio-button>
                <a-radio-button disabled value="pdf" title="开发中...暂不开放"
                    >pdf文件 ( .pdf )</a-radio-button
                >
            </a-radio-group>
            <br />
            <div class="mt-6">
                <span>注意：</span><span>.kmind 和 .json 文件可以用于导入</span>
                <p>.kmind 支持之后可能会加入的多tab页数据格式</p>
                <p
                    v-show="['png', 'pdf'].includes(fileType)"
                    class="text-red-500 mt-2"
                >
                    注意：富文本模式下，导出png和pdf格式的时间会很长！！！
                </p>
            </div>
        </div>
    </a-modal>
</template>

<script lang="tsx">
export default {
    name: 'ExportFile',
};
</script>

<script lang="tsx" setup>
import { computed, ref, watch } from 'vue';
import { kmind } from '/@/hooks/useKmind';

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

const fileName = ref('kmind');
const fileType = ref('json');
const includeConfig = ref(true);

watch(
    () => props.visible,
    (val) => {
        if (val) {
            kmind.renderer.startTextEdit();
        } else {
            kmind.renderer.endTextEdit();
        }
    },
);

const handleOk = () => {
    kmind.export(fileType.value, true, fileName.value);
};
</script>

<style scoped></style>
