<template>
    <div class="w-full h-full fixed">
        <div id="mindMapContainer" ref="kmindRef" class="w-full h-full"></div>
        <node-editor
            ref="nodeEditorRef"
            :node="node"
            :kmind="kmind"
            class="fixed top-5 left-5"
        ></node-editor>
        <side-bar-trigger></side-bar-trigger>

        <theme :kmind="kmind"></theme>
        <map-structure :kmind="kmind"></map-structure>
        <main-point :kmind="kmind"></main-point>
        <div v-if="isDev" class="fixed bottom-20 left-5">
            <p>节点数据：</p>
            <p>{{ node?.nodeData?.data }}</p>
        </div>
        <show-note></show-note>
    </div>
</template>

<script lang="tsx">
export default {
    name: 'HomeView',
};
</script>

<script setup lang="tsx">
import { onMounted, ref, toRefs } from 'vue';
import MindMap from 'simple-mind-map';
import KeyboardNavigation from 'simple-mind-map/src/KeyboardNavigation.js';
import Drag from 'simple-mind-map/src/Drag.js';
import Select from 'simple-mind-map/src/Select.js';
import NodeEditor from '/@/components/NodeEditor/index.vue';
import RichText from 'simple-mind-map/src/RichText.js';
import { usePublicStore } from '/@/store/modules/public';
import { message } from 'ant-design-vue';
import { useThrottleFn } from '@vueuse/core';
import ShowNote from '/@/components/ShowNote/index.vue';
import SideBarTrigger from '/@/components/SideBarTrigger/index.vue';
import MainPoint from '/@/components/MainPoint/index.vue';
import Theme from '/@/components/Theme/index.vue';
import MapStructure from '/@/components/MapStructure/index.vue';
const {
    setLastClickNodeInfo,
    setNoteInfo,
    setBackForwardStatus,
    saveMindMapData,
    buildTreeData,
    setKmind,
    setNode,
} = usePublicStore();
const publicStore = usePublicStore();
const { mindMapData, isDev, noteVisible } = toRefs(publicStore);
const kmind = ref();
MindMap.usePlugin(KeyboardNavigation)
    .usePlugin(Drag)
    .usePlugin(Select)
    .usePlugin(RichText);

const kmindRef = ref();
const nodeEditorRef = ref();
onMounted(() => {
    kmind.value = new MindMap({
        el: document.getElementById('mindMapContainer'),
        data: {
            data: {
                text: `suka`,
            },
            children: [],
        },
        customNoteContentShow: {
            show(content, left, top) {
                if (!noteVisible.value) {
                    setNoteInfo({ content, left, top, visible: true });
                }
            },
            hide() {
                if (noteVisible.value) {
                    setNoteInfo({ visible: false });
                }
            },
        },
        customHandleMousewheel: (e) => {
            // 自定义鼠标滚轮事件
            let { deltaX, deltaY, ctrlKey } = e;
            // console.log(e);
            if (ctrlKey) {
                // 缩放
                if (deltaY > 0 || deltaX > 0) kmind.value.view.narrow();
                else kmind.value.view.enlarge();
            } else {
                if (deltaX === -0) {
                    // Y轴滚动 滚动一次默认是100，太大了，所以除以3，即滚动一次移动33px
                    kmind.value.view.translateY(-deltaY / 3);
                } else {
                    // X轴滚动
                    kmind.value.view.translateX(-deltaX / 3);
                }
            }
        },
    });
    setKmind({ kmind: kmind.value });

    kmind.value.on('node_click', (_node, e) => {
        node.value = _node;
        // console.log(e, _node);
        if (e.target.attributes['p-id']?.nodeValue === '8793') {
            // 点击了备注的svg图像
            // TODO 由于这里会点击到其它的svg图像，所以导致这个事件触发率不是很高，要看看源码是怎么实现的这个备注显示逻辑
            nodeEditorRef.value.handleShowRichEditor('note');
        }
        setLastClickNodeInfo({ left: e.x, top: e.y });
    });

    kmind.value.on('node_active', (_node, activeNodeList) => {
        // 编辑node会触发这个事件，所以这里要判断一下
        node.value = _node;

        // 活动的node，存到仓库里
        setNode({ node: _node, activeNodeList });
    });

    kmind.value.on('draw_click', () => {
        // 关闭没有正确关闭的备注展示框
        setNoteInfo({ visible: false });

        // 清空node
        // node.value = null;
    });

    kmind.value.on('back_forward', (activeHistoryIndex, length) => {
        // 设置回退前进状态
        setBackForwardStatus(activeHistoryIndex, length);
    });

    // 自动加载缓存数据
    if (mindMapData.value) {
        // FIX setFullData会让导图很卡。 setLayout方法的原因
        kmind.value.setData(mindMapData.value.root);
        message.success('数据加载成功');
    } else {
        message.info(
            '检测到首次使用，导图数据发生变化时，自动每1秒自动保存一次数据~',
        );
    }

    // 自动保存数据
    const throttleSaver = useThrottleFn((data) => {
        saveMindMapData({ data });
    }, 1000);
    // 防抖构建tree
    const throttleBuildTree = useThrottleFn(buildTreeData, 2000);
    kmind.value.on('data_change', () => {
        // console.log(kmind.value.getData(true));
        throttleSaver(kmind.value.getData(true));
        throttleBuildTree();
    });
});
const node = ref();
</script>

<style scoped></style>
