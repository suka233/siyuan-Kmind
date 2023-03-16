<template>
    <a-modal
        v-model:visible="visible"
        width="1000px"
        :title="type === 'node' ? '请输入节点文本' : '请输入备注文本'"
        @ok="handleOk"
    >
        <div id="editor-container">
            <quill-editor
                ref="editor"
                v-model:content="editorContent"
                theme="snow"
                toolbar="full"
                content-type="html"
                style="height: 300px; overflow-y: auto; cursor: text"
                class="p-2"
                placeholder="请输入内容"
                @click="handleClick"
                @ready="handleReady"
            />
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
import { QuillEditor, Quill } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { uploadAsset } from '/@/api/public';
import { message } from 'ant-design-vue';
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
        // 即使编辑器为空，editorContent.value也会有一个p标签，所以需要判断一下
        if (editorContent.value !== '<p><br></p>') {
            props.node.setNote(editorContent.value);
        } else {
            props.node.setNote('');
        }
    }
    visible.value = false;
};

const handleClick = () => {
    // quill.value.focus();
};

const isQuillReady = ref(false);
const handleReady = (e) => {
    isQuillReady.value = true;
    quill.value = e;

    // 拦截粘贴图片事件，避免转为base64
    quill.value.root.addEventListener(
        'paste',
        (e) => {
            if (
                e.clipboardData &&
                e.clipboardData.files &&
                e.clipboardData.files.length
            ) {
                e.preventDefault();
                handlePicLoad(e.clipboardData.files);
            }
        },
        true,
    );
};

const handlePicLoad = async (files: FileList) => {
    const file = files[0];
    if (!file) {
        return;
    }
    const isImage = file.type.indexOf('image/') === 0;
    if (!isImage) {
        message.error('暂时仅支持图片格式');
        return;
    }

    const hide = message.loading('正在将图片上传到思源文件夹...', 0);
    const picUrl = await uploadAsset({ file }).then((res) => {
        hide();
        message.success('图片上传成功');
        return res.data.succMap[file.name];
    });
    const range = quill.value.getSelection();
    // TODO 有个bug,插入图片后，光标不能定位到图片后面，需要开关一下编辑器才能定位到图片后面
    quill.value.insertEmbed(
        range.index,
        'image',
        `${import.meta.env.VITE_BASE_URL}/${picUrl}`,
    );
};

const init = () => {
    if (props.type === 'node') {
        editorContent.value = props.node?.getData('text') ?? '';
    } else {
        editorContent.value = props.node?.getData('note') ?? '';
    }

    if (isQuillReady.value) {
        // TODO 优化：聚焦到内容末尾
        // quill.value.focus();
        // const endObj = new KeyboardEvent('end', { key: 'End' });
        // console.log(quill.value.getLength());
        // console.log(quill.value.getLength());
        // quill.value.setSelection(quill.value.getSelection().index, 0);
        // console.log(quill.value.root);
    }
};

const editor = ref<Quill>(null);
const quill = ref<Quill>(null);

watch(
    () => props.visible,
    (visible) => {
        if (visible) {
            init();
            props.kmind.renderer.startTextEdit();
        } else {
            props.kmind.renderer.endTextEdit();

            // init()不能清空编辑器内容，手动调用一下api清空
            editorContent.value = '';
            editor.value.setText('');
        }
    },
);
</script>

<style scoped></style>
