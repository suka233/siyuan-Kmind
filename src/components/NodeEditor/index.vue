<template>
    <a-card
        hoverable
        :class="`w-200 animate-animated animate-slideInDown`"
        size="small"
    >
        <div>
            <node-editor-btn
                class="mr-2"
                @click="handleShowRichEditor('node')"
            ></node-editor-btn>
            <tags-editor :node="node" :kmind="kmind" class="mr-2"></tags-editor>
            <hyper-link-btn
                class="mr-2"
                @click="showLinkEditor = true"
            ></hyper-link-btn>
            <remark-note-btn class="mr-2" @click="handleShowRichEditor('note')">
            </remark-note-btn>
            <pic-upload-btn class="mr-2" @click="showPic = true">
            </pic-upload-btn>
            <a-button @click="testFn">保存</a-button>
        </div>
        <div>
            <!--            <remark-note-editor-->
            <!--                v-show="showVditor"-->
            <!--                :kmind="props.kmind"-->
            <!--            ></remark-note-editor>-->
            <rich-editor
                v-model:visible="showRichEditor"
                :kmind="kmind"
                :node="node"
                :type="richEditorType"
            ></rich-editor>

            <hyper-link-editor v-model:visible="showLinkEditor" :node="node">
            </hyper-link-editor>
            <pic-uploader v-model:visible="showPic" :node="node">
            </pic-uploader>
        </div>
        <a-modal
            v-model:visible="noteVisible"
            :style="`top:${noteTop}px;left:${noteLeft}px`"
            class="fixed"
            :mask="false"
        >
            {{ noteContent }}
        </a-modal>
    </a-card>
</template>

<script lang="tsx">
/**
 * 节点编辑
 */
export default {
    name: 'NodeEditor',
};
</script>
<script setup lang="tsx">
import { ref, toRefs } from 'vue';
import HyperLinkBtn from './components/HyperLink/HyperLinkBtn.vue';
import HyperLinkEditor from './components/HyperLink/HyperLinkEditor.vue';
import RemarkNoteBtn from './components/RemarkNote/RemarkNoteBtn.vue';
import PicUploadBtn from './components/PicUpload/PicUploadBtn.vue';
import PicUploader from './components/PicUpload/PicUploader.vue';
import TagsEditor from './components/TagsEditor/index.vue';
import RichEditor from './components/RichEditor/RichEditor.vue';
import NodeEditorBtn from './components/NodeEditor/NodeEditorBtn.vue';
import { usePublicStore } from '/@/store/modules/public';
import { message } from 'ant-design-vue';
const publicStore = usePublicStore();
const { saveMindMapData } = publicStore;
const { noteLeft, noteTop, noteContent, noteVisible } = toRefs(publicStore);

// 编辑器是否显示
const showRichEditor = ref(false);
// 超链接编辑器是否显示
const showLinkEditor = ref(false);
const showPic = ref(false);
const richEditorType = ref<'note' | 'node'>('note');
const props = defineProps<{
    node: any;
    kmind: any;
}>();

const handleShowRichEditor = (type) => {
    showRichEditor.value = true;
    richEditorType.value = type;
};

const testFn = () => {
    saveMindMapData({ data: props.kmind.getData(true) });
    message.success('保存导图数据成功');
    console.log('node', props.node);
    console.log('kmind', props.kmind);
    console.log('allData', JSON.stringify({ suka: props.kmind.getData(true) }));
};
</script>

<style>
.editor-card {
    transition: all 2s linear;
}
</style>
