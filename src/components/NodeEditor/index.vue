<template>
    <a-card
        hoverable
        :class="`w-200 animate-animated animate-slideInDown`"
        size="small"
    >
        <div class="">
            <span
                v-if="node"
                class="w-15 truncate mr-2 inline-block align-middle"
                >{{ node?.nodeData?.data.text }}</span
            >
            <span
                v-else
                class="w-15 truncate mr-2 inline-block align-middle text-gray-300"
                >未选择节点</span
            >
            <tags-editor :node="node" :kmind="kmind"></tags-editor>
            <hyper-link-btn
                class="mr-2"
                @click="showLinkEditor = !showLinkEditor"
            ></hyper-link-btn>
            <remark-note-btn class="mr-2" @click="showVditor = !showVditor">
            </remark-note-btn>
            <pic-upload-btn @click="showPic = !showPic"> </pic-upload-btn>
            <a-button @click="testFn">获取html</a-button>
        </div>
        <div>
            <!--            <remark-note-editor-->
            <!--                v-show="showVditor"-->
            <!--                :kmind="props.kmind"-->
            <!--            ></remark-note-editor>-->
            <rich-editor
                v-show="showVditor"
                :kmind="kmind"
                :node="node"
            ></rich-editor>

            <hyper-link-editor v-show="showLinkEditor"> </hyper-link-editor>
            <pic-uploader v-show="showPic"> </pic-uploader>
        </div>
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
import { ref } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import HyperLinkBtn from './components/HyperLink/HyperLinkBtn.vue';
import HyperLinkEditor from './components/HyperLink/HyperLinkEditor.vue';
import RemarkNoteBtn from './components/RemarkNote/RemarkNoteBtn.vue';
import PicUploadBtn from './components/PicUpload/PicUploadBtn.vue';
import PicUploader from './components/PicUpload/PicUploader.vue';
import TagsEditor from './components/TagsEditor/index.vue';
import RichEditor from './components/RichEditor/RichEditor.vue';

const vditor = ref<Vditor>();
// 编辑器是否显示
const showVditor = ref(false);
// 超链接编辑器是否显示
const showLinkEditor = ref(false);
const showPic = ref(false);
const props = defineProps<{
    node: any;
    kmind: any;
}>();

const testFn = () => {
    console.log('node', props.node);
    console.log('kmind', props.kmind);
};
</script>

<style>
.editor-card {
    transition: all 2s linear;
}
</style>
