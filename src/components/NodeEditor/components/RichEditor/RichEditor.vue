<template>
    <div
        style="border: 1px solid #ccc"
        @blur="message.success('blur')"
        @focus="message.success('focus')"
    >
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :default-config="toolbarConfig"
            :mode="mode"
        />
        <Editor
            v-model="valueHtml"
            style="height: 300px; overflow-y: hidden"
            :default-config="editorConfig"
            :mode="mode"
            @on-created="handleCreated"
            @on-blur="handleBlur"
            @on-focus="handleFocus"
        />
        <a-button @click="setNode1">设置node文本(方式:api)</a-button>
        <a-button @click="setNode2"
            >设置node文本(方式:直接更改node内的值)</a-button
        >
    </div>
</template>

<script lang="tsx">
export default {
    name: 'RichEditor',
};
</script>

<script lang="tsx" setup>
import {
    onBeforeUnmount,
    ref,
    shallowRef,
    onMounted,
    watch,
    computed,
} from 'vue';

import { message } from 'ant-design-vue';
import { Boot, IDomEditor, IEditorConfig } from '@wangeditor/editor';
import markdownModule from '@wangeditor/plugin-md';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css

const props = defineProps<{
    kmind: any;
    node: any;
}>();

Boot.registerModule(markdownModule);
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const mode = ref('default'); // 编辑器模式，可选值：default、simple
// 内容 HTML
const valueHtml = ref('<p>hello</p>');

const toolbarConfig = {};
const editorConfig: IEditorConfig = {
    placeholder: '请输入内容...',
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
});

const handleCreated = (editor) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
};

const handleBlur = (editor) => {
    props.kmind.renderer.endTextEdit();
};

const handleFocus = (editor) => {
    props.kmind.renderer.startTextEdit();
};

const setNode1 = () => {
    console.log(editorRef.value?.getHtml());
    props.node.setText(editorRef.value?.getHtml());
    // props.node.render();
    // props.kmind.reRender();
};

const setNode2 = () => {
    props.node.nodeData.data.text = editorRef.value?.getHtml();
};
</script>

<style scoped></style>
