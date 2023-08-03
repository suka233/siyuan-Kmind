<template>
    <div :class="`animate-animated animate-slideInDown editor-card`">
        <!--      按钮区域-->
        <span class="node-editor-btn pr-6">
            <back-forward />
            <node-editor-btn
                class="mr-2"
                :disabled="!node"
                @click="handleShowRichEditor('node')"
            />
            <tags-editor-btn
                :disabled="!node"
                class="mr-2"
                @click="showTagsEditor = true"
            />
            <hyper-link-btn
                :disabled="!node"
                class="mr-2"
                @click="showLinkEditor = true"
            />
            <remark-note-btn
                :disabled="!node"
                class="mr-2"
                @click="handleShowRichEditor('note')"
            />
            <pic-upload-btn
                :disabled="!node"
                class="mr-2"
                @click="showPic = true"
            />
            <icon-editor-btn :disabled="!activeNodeList.length" />
            <generalization class="mr-2" :disabled="!node" />
            <connector class="mr-2" :disabled="!node" />
            <!--            <reload-data class="mr-2" />-->

            <a-button class="mr-2" @click="handleSave">保存</a-button>
            <dev-component v-if="isDev" />
        </span>
        <!--      保存导入区-->
        <span class="map-import-save-btn pl-6">
            <!--            <export-file-btn class="mr-2" @click="showExportFile = true" />-->
            <file-button />
        </span>
        <!--      功能实现区-->
        <div>
            <!--            <remark-note-editor-->
            <!--                v-show="showVditor"-->
            <!--                :kmind="props.kmind"-->
            <!--            ></remark-note-editor>-->
            <rich-editor
                v-model:visible="showRichEditor"
                :node="node"
                :type="richEditorType"
            />

            <hyper-link-editor v-model:visible="showLinkEditor" :node="node" />
            <pic-to-base64-modal v-model:visible="showPic" />
            <tags-editor v-model:visible="showTagsEditor" :node="node" />
            <export-file v-model:visible="showExportFile" />
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
import { ref, toRefs } from 'vue';
import HyperLinkBtn from './components/HyperLink/HyperLinkBtn.vue';
import HyperLinkEditor from './components/HyperLink/HyperLinkEditor.vue';
import RemarkNoteBtn from './components/RemarkNote/RemarkNoteBtn.vue';
import PicUploadBtn from './components/PicUpload/PicUploadBtn.vue';
import TagsEditorBtn from './components/TagsEditor/TagsEditorBtn.vue';
import TagsEditor from './components/TagsEditor/TagsEditor.vue';
import IconEditorBtn from './components/IconEditor/IconEditorBtn.vue';
import RichEditor from './components/RichEditor/RichEditor.vue';
import NodeEditorBtn from './components/NodeEditor/NodeEditorBtn.vue';
import BackForward from './components/BackForward/index.vue';
// import ReloadData from './components/ReloadData/index.vue';
import Generalization from './components/Generalization/index.vue';
// import ExportFileBtn from './components/ExportFile/ExportFileBtn.vue';
import FileButton from './components/FileButton/index.vue';
import Connector from './components/Connector/index.vue';
import { usePublicStore } from '/@/store/modules/public';
import { message } from 'ant-design-vue';
import ExportFile from '/@/components/NodeEditor/components/ExportFile/ExportFile.vue';
import DevComponent from './components/DevComponent/index.vue';
import PicToBase64Modal from './components/PicUpload/PicToBase64Modal.vue';
import { kmind } from '/@/hooks/useKmind';
const publicStore = usePublicStore();
const { saveMindMapData } = publicStore;
const { isDev, node, activeNodeList } = toRefs(publicStore);

// 编辑器是否显示
const showRichEditor = ref(false);
// 超链接编辑器是否显示
const showLinkEditor = ref(false);
const showPic = ref(false);
const showTagsEditor = ref(false);
const showExportFile = ref(false);
const richEditorType = ref<'note' | 'node'>('note');

const handleShowRichEditor = (type) => {
    showRichEditor.value = true;
    richEditorType.value = type;
};
defineExpose({ handleShowRichEditor });

const handleSave = async () => {
    await saveMindMapData({ data: kmind.getData(true) }).then(() =>
        message.success('保存导图数据成功'),
    );
};
</script>

<style scoped lang="less">
.editor-card {
    transition: all 2s linear;
    background-color: #fff;
    border-left: 1px solid #e8e8e8;
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    padding: 10px;

    .node-editor-btn {
        //@apply pr-6;
        border-right: rgba(0, 0, 0, 0.06) solid 1px;
    }

    .map-import-save-btn {
        //@apply pl-6;
    }
}
</style>
