<template>
    <div :class="`animate-animated animate-slideInDown editor-card`">
        <!--      按钮区域-->
        <span class="node-editor-btn">
            <back-forward></back-forward>
            <node-editor-btn
                class="mr-2"
                :disabled="!node"
                @click="handleShowRichEditor('node')"
            ></node-editor-btn>
            <tags-editor-btn
                :disabled="!node"
                class="mr-2"
                @click="showTagsEditor = true"
            ></tags-editor-btn>
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
            <icon-editor-btn
                :disabled="!activeNodeList.length"
            ></icon-editor-btn>
            <generalization :kmind="kmind" class="mr-2" :disabled="!node" />
            <reload-data class="mr-2" :kmind="kmind" />

            <a-button class="mr-2" @click="handleSave">保存</a-button>
            <a-button v-if="isDev" @click="test">测试</a-button>
        </span>
        <!--      保存导入区-->
        <span class="map-import-save-btn">
            <export-file-btn
                class="mr-2"
                @click="showExportFile = true"
            ></export-file-btn>
        </span>
        <!--      功能实现区-->
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
            <tags-editor
                v-model:visible="showTagsEditor"
                :node="node"
                :kmind="kmind"
            ></tags-editor>
            <export-file v-model:visible="showExportFile"></export-file>
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
import PicUploader from './components/PicUpload/PicUploader.vue';
import TagsEditorBtn from './components/TagsEditor/TagsEditorBtn.vue';
import TagsEditor from './components/TagsEditor/TagsEditor.vue';
import IconEditorBtn from './components/IconEditor/IconEditorBtn.vue';
import RichEditor from './components/RichEditor/RichEditor.vue';
import NodeEditorBtn from './components/NodeEditor/NodeEditorBtn.vue';
import BackForward from './components/BackForward/index.vue';
import ReloadData from './components/ReloadData/index.vue';
import Generalization from './components/Generalization/index.vue';
import ExportFileBtn from './components/ExportFile/ExportFileBtn.vue';
import { usePublicStore } from '/@/store/modules/public';
import { message } from 'ant-design-vue';
import ExportFile from '/@/components/NodeEditor/components/ExportFile/ExportFile.vue';
const publicStore = usePublicStore();
const { saveMindMapData } = publicStore;
const { isDev, node, activeNodeList, kmind } = toRefs(publicStore);

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
    await saveMindMapData({ data: kmind.value.getData(true) });
    message.success('保存导图数据成功');
    console.log('node', node.value);
    console.log('kmind', kmind.value);
    console.log('allData', JSON.stringify({ suka: kmind.value.getData(true) }));
};

const test = () => {
    kmind.value.setData(testData.root);
    console.log(node.value);
    console.log(activeNodeList.value);
    // props.kmind.setFullData(Object.assign({}, testData, { layout: undefined }));
    return;
    // props.kmind.setLayout(`logicalStructure`);
    // props.kmind.setLayout(testData.layout);
    // props.kmind.setTheme(testData.theme.template);
    // props.kmind.setThemeConfig(testData.theme.config);
    // props.kmind.view.setTransformData(testData.view);
    // props.kmind.setFullData(testData);
};

const testData = {
    layout: 'logicalStructure',
    root: {
        data: {
            text: '<p><strong style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255); font-size: 16px;">asdasdasd</strong></p>',
            expand: true,
            isActive: false,
            fontFamily: '微软雅黑, Microsoft YaHei',
            color: '#fff',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 16,
            textDecoration: 'none',
            richText: true,
        },
        children: [
            {
                data: {
                    text: '<p><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(86, 86, 86); font-size: 16px;">二级节点</span></p>',
                    expand: true,
                    isActive: false,
                    fontFamily: '微软雅黑, Microsoft YaHei',
                    color: '#565656',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: 16,
                    textDecoration: 'none',
                    richText: true,
                },
                children: [],
            },
            {
                data: {
                    text: '<p><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(86, 86, 86); font-size: 16px;">二级节点</span></p>',
                    expand: true,
                    isActive: false,
                    fontFamily: '微软雅黑, Microsoft YaHei',
                    color: '#565656',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: 16,
                    textDecoration: 'none',
                    richText: true,
                    tag: ['dddd', '22', '77', 'wsdad', '333'],
                    note: '<p>asdasdasdasd</p>',
                },
                children: [],
            },
            {
                data: {
                    text: '<p><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(86, 86, 86); font-size: 16px;">1111</span></p>',
                    expand: true,
                    isActive: false,
                    fontFamily: '微软雅黑, Microsoft YaHei',
                    color: '#565656',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: 16,
                    textDecoration: 'none',
                    richText: true,
                },
                children: [],
            },
        ],
    },
    theme: {
        template: 'default',
        config: {},
    },
    view: {
        transform: {
            scaleX: 1.3000000000000003,
            scaleY: 1.3000000000000003,
            shear: 0,
            rotate: 0,
            translateX: -1092.3107421875006,
            translateY: -368.0166666666669,
            originX: 0,
            originY: 0,
            a: 1.3000000000000003,
            b: 0,
            c: 0,
            d: 1.3000000000000003,
            e: -1092.3107421875006,
            f: -368.0166666666669,
        },
        state: {
            scale: 1.3000000000000003,
            x: -741.0107421875002,
            y: -228.66666666666674,
            sx: -741.0107421875002,
            sy: -228.66666666666674,
        },
    },
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
        @apply pr-6;
        border-right: rgba(0, 0, 0, 0.06) solid 1px;
    }
    .map-import-save-btn {
        @apply pl-6;
    }
}
</style>
