<template>
    <div :class="`animate-animated animate-slideInDown editor-card`">
        <div>
            <back-forward :node="node" :kmind="kmind"></back-forward>
            <node-editor-btn
                class="mr-2"
                :disabled="!node"
                @click="handleShowRichEditor('node')"
            ></node-editor-btn>
            <tags-editor :node="node" :kmind="kmind" class="mr-2"></tags-editor>
            <hyper-link-btn
                :disabled="!node"
                class="mr-2"
                @click="showLinkEditor = true"
            ></hyper-link-btn>
            <remark-note-btn
                :disabled="!node"
                class="mr-2"
                @click="handleShowRichEditor('note')"
            >
            </remark-note-btn>
            <pic-upload-btn
                :disabled="!node"
                class="mr-2"
                @click="showPic = true"
            >
            </pic-upload-btn>
            <generalization :kmind="kmind" class="mr-2" :disabled="!node" />
            <reload-data class="mr-2" :kmind="kmind" />

            <a-button class="mr-2" @click="handleSave">保存</a-button>
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

            <hyper-link-editor
                v-model:visible="showLinkEditor"
                :node="node"
                :kmind="kmind"
            >
            </hyper-link-editor>
            <pic-uploader v-model:visible="showPic" :node="node" :kmind="kmind">
            </pic-uploader>
        </div>
    </div>
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
import HyperLinkBtn from './components/HyperLink/HyperLinkBtn.vue';
import HyperLinkEditor from './components/HyperLink/HyperLinkEditor.vue';
import RemarkNoteBtn from './components/RemarkNote/RemarkNoteBtn.vue';
import PicUploadBtn from './components/PicUpload/PicUploadBtn.vue';
import PicUploader from './components/PicUpload/PicUploader.vue';
import TagsEditor from './components/TagsEditor/index.vue';
import RichEditor from './components/RichEditor/RichEditor.vue';
import NodeEditorBtn from './components/NodeEditor/NodeEditorBtn.vue';
import BackForward from './components/BackForward/index.vue';
import ReloadData from './components/ReloadData/index.vue';
import Generalization from './components/Generalization/index.vue';
import { usePublicStore } from '/@/store/modules/public';
import { message } from 'ant-design-vue';
const publicStore = usePublicStore();
const { saveMindMapData } = publicStore;

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
defineExpose({ handleShowRichEditor });

const handleSave = async () => {
    await saveMindMapData({ data: props.kmind.getData(true) });
    message.success('保存导图数据成功');
    console.log('node', props.node);
    console.log('kmind', props.kmind);
    console.log('allData', JSON.stringify({ suka: props.kmind.getData(true) }));
};
</script>

<style>
.editor-card {
    transition: all 2s linear;
    background-color: #fff;
    border-left: 1px solid #e8e8e8;
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    padding: 10px;
}
</style>
