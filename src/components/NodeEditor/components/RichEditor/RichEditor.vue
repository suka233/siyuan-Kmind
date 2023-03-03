<template>
    <a-modal
        v-model:visible="visible"
        width="1000px"
        :title="type === 'node' ? '请输入节点文本' : '请输入备注文本'"
        @ok="handleOk"
    >
        <div id="editor-container">
            <quill-editor
                v-model:content="editorContent"
                theme="snow"
                toolbar="full"
                content-type="html"
                style="height: 300px; overflow-y: auto"
                class="p-2"
                placeholder="请输入内容"
            >
            </quill-editor>
        </div>
    </a-modal>
</template>

<script lang="tsx">
export default {
    name: 'RichEditor',
};
</script>

<script lang="tsx" setup>
import { computed, ref, watch } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const props = defineProps<{
    visible: boolean;
    kmind: any;
    node: any;
    /**
     * node: 节点文本
     * note: 备注文本
     */
    type: 'node' | 'note';
}>();
const emits = defineEmits<{
    (event: 'update:visible', visible: boolean): void;
}>();

const visible = computed({
    get() {
        return props.visible;
    },
    set() {
        emits('update:visible', !visible.value);
    },
});

const editorContent = ref('');

const handleOk = () => {
    console.log(editorContent.value);
    if (props.type === 'node') {
        props.node.setText(editorContent.value, true);
        // TODO 使用 html-to-text 转换为纯文本 构建纯文本文档树，用来支撑搜索，大纲，插入导图内超链接等功能
        // props.node.nodeData.data.kmindParams = `测试额外数据`;
    } else {
        props.node.setNote(editorContent.value);
    }
    visible.value = false;
};

const init = () => {
    if (props.type === 'node') {
        editorContent.value = props.node?.getData('text') ?? '';
    } else {
        editorContent.value = props.node?.getData('note') ?? '';
    }
};

watch(
    () => props.visible,
    (visible) => {
        if (visible) {
            init();
            props.kmind.renderer.startTextEdit();
        } else {
            props.kmind.renderer.endTextEdit();
        }
    },
);
</script>

<style scoped></style>
