<template>
    <div class="fixed" style="left: 0; right: 0; top: 0; bottom: 0">
        <div
            id="mindMapContainer"
            ref="kmindRef"
            class="absolute"
            style="
                width: auto;
                height: auto;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
            "
        ></div>
        <node-editor
            ref="nodeEditorRef"
            class="fixed top-5 left-5"
        ></node-editor>
        <side-bar-trigger></side-bar-trigger>

        <theme :kmind="kmind"></theme>
        <map-structure :kmind="kmind"></map-structure>
        <main-point></main-point>
        <shortcut-key></shortcut-key>
        <div v-if="isDev" class="fixed bottom-20 left-5">
            <p>节点数据：</p>
            <p>{{ node?.nodeData?.data }}</p>
        </div>
        <show-note></show-note>
        <context-menu></context-menu>
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
import Export from 'simple-mind-map/src/Export.js';
import { usePublicStore } from '/@/store/modules/public';
import { message } from 'ant-design-vue';
import { useThrottleFn } from '@vueuse/core';
import ShowNote from '/@/components/ShowNote/index.vue';
import SideBarTrigger from '/@/components/SideBarTrigger/index.vue';
import MainPoint from '/@/components/MainPoint/index.vue';
import Theme from '/@/components/Theme/index.vue';
import MapStructure from '/@/components/MapStructure/index.vue';
import ShortcutKey from '/@/components/ShortcutKey/index.vue';
import ContextMenu from '/@/components/ContextMenu/index.vue';
const {
    setLastClickNodeInfo,
    setNoteInfo,
    setBackForwardStatus,
    saveMindMapData,
    buildTreeData,
} = usePublicStore();
const publicStore = usePublicStore();
const {
    mindMapData,
    isDev,
    noteVisible,
    node,
    activeNodeList,
    kmind,
    ctxMenuLeft,
    ctxMenuTop,
    ctxMenuType,
    ctxMenuVisible,
    copyNode,
} = toRefs(publicStore);
MindMap.usePlugin(KeyboardNavigation)
    .usePlugin(Drag)
    .usePlugin(Select)
    .usePlugin(RichText)
    .usePlugin(Export);

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

    // 导图节点点击
    kmind.value.on('node_click', (_node, e) => {
        if (e.target.attributes['p-id']?.nodeValue === '8793') {
            // 点击了备注的svg图像
            // TODO 由于这里会点击到其它的svg图像，所以导致这个事件触发率不是很高，要看看源码是怎么实现的这个备注显示逻辑
            nodeEditorRef.value.handleShowRichEditor('note');
        }
        setLastClickNodeInfo({ left: e.x, top: e.y });
    });

    // 导图节点激活
    kmind.value.on('node_active', (_node, _activeNodeList) => {
        // 编辑node会触发这个事件，所以这里要判断一下
        activeNodeList.value = _activeNodeList;
    });

    // 导图点击
    kmind.value.on('draw_click', () => {
        // 关闭没有正确关闭的备注展示框
        setNoteInfo({ visible: false });
    });

    // 导图数据变化
    kmind.value.on('back_forward', (activeHistoryIndex, length) => {
        // 设置回退前进状态
        setBackForwardStatus(activeHistoryIndex, length);
    });

    // 导图右击
    kmind.value.on('contextmenu', (e) => {
        ctxMenuLeft.value = e.x;
        ctxMenuTop.value = e.y;
        ctxMenuVisible.value = true;
        ctxMenuType.value = 'map';
    });

    // 节点右击
    kmind.value.on('node_contextmenu', (e, _node) => {
        ctxMenuLeft.value = e.x;
        ctxMenuTop.value = e.y;
        ctxMenuVisible.value = true;
        ctxMenuType.value = 'node';
    });

    // 绑定自定义快捷键
    kmind.value.keyCommand.addShortcut('Control+c', () => {
        // kmind.value.renderer.copyNode() 在没有选中节点的时候会返回undefined
        kmind.value.renderer.copyNode() &&
            (copyNode.value = kmind.value.renderer.copyNode());
    });
    kmind.value.keyCommand.addShortcut('Control+v', () => {
        kmind.value.execCommand('PASTE_NODE', copyNode.value);
        // kmind.value.execCommand('PASTE_NODE', {
        //     data: {
        //         text: 'ddd',
        //         expand: true,
        //         isActive: false,
        //         fontFamily: '微软雅黑, Microsoft YaHei',
        //         color: '#6a6d6c',
        //         fontStyle: 'normal',
        //         fontWeight: 'normal',
        //         fontSize: 14,
        //         textDecoration: 'none',
        //         richText: true,
        //     },
        //     // children: [],
        // });
    });
    kmind.value.keyCommand.addShortcut('Control+x', () => {
        kmind.value.execCommand('CUT_NODE', (e) => (copyNode.value = e));
    });
    kmind.value.keyCommand.addShortcut('Control+s', async () => {
        await saveMindMapData({ data: kmind.value.getData(true) });

        console.log(activeNodeList.value);
        // 当有节点激活的时候，隐藏保存成功的提示
        if (!activeNodeList.value.length) {
            message.success('保存导图数据成功');
        }
    });

    // 自动加载缓存数据
    if (mindMapData.value) {
        // FIX setFullData会让导图很卡。 setLayout方法的原因
        // kmind.value.setData(mindMapData.value.root);
        kmind.value.setFullData(
            Object.assign({}, mindMapData.value, { layout: undefined }),
        );
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

    // 自适应
    const throttleResize = useThrottleFn(() => {
        kmind.value.resize();
    }, 1000);
    addEventListener('resize', () => {
        throttleResize();
    });

    // 拦截全局点击事件，如果点击到了a标签，就阻止默认事件，为跳转多tab页做准备
    // addEventListener(
    //     'click',
    //     (e) => {
    //         console.log('xxx', e.target.parentNode.nodeName === 'a');
    //         if (e.target.parentNode.nodeName === 'a') {
    //             e.preventDefault();
    //             console.log(
    //                 `点击到了a标签：${e.target.parentNode.getAttribute(
    //                     'href',
    //                 )}，${e.target.parentNode.getAttribute('title')}`,
    //             );
    //         }
    //     },
    //     true,
    // );
});
</script>

<style scoped lang="less"></style>
