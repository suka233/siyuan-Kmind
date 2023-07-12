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
        <div v-show="!localConfig.isZenMode">
            <node-editor ref="nodeEditorRef" class="fixed top-5 left-5" />
            <side-bar-trigger />

            <theme />
            <map-structure />
            <main-point />
            <node-style />
            <shortcut-key />
            <!--            <setting />-->
        </div>

        <div v-if="isDev" class="fixed bottom-20 left-5">
            <p>节点数据：</p>
            <p>{{ node?.nodeData?.data }}</p>
        </div>
        <show-note />
        <context-menu />
    </div>
</template>

<script lang="tsx">
export default {
    name: 'HomeView',
};
</script>

<script setup lang="tsx">
import { onMounted, ref, toRefs } from 'vue';
import NodeEditor from '/@/components/NodeEditor/index.vue';
import { usePublicStore } from '/@/store/modules/public';
import { message } from 'ant-design-vue';
import { useDebounceFn } from '@vueuse/core';
import ShowNote from '/@/components/ShowNote/index.vue';
import SideBarTrigger from '/@/components/SideBarTrigger/index.vue';
import MainPoint from '/@/components/MainPoint/index.vue';
import Theme from '/@/components/Theme/index.vue';
import MapStructure from '/@/components/MapStructure/index.vue';
import ShortcutKey from '/@/components/ShortcutKey/index.vue';
// import Setting from '/@/components/Setting/index.vue';
import NodeStyle from '/@/components/NodeStyle/index.vue';
import ContextMenu from '/@/components/ContextMenu/index.vue';
import { isClickRemarkIcon, isClickLinkIcon } from '/@/utils';
import { useKmind, kmind, buildTreeData } from '/@/hooks/useKmind';
import { cloneDeep } from 'lodash-es';
const {
    setLastClickNodeInfo,
    setNoteInfo,
    setBackForwardStatus,
    saveMindMapData,
    init,
} = usePublicStore();
const publicStore = usePublicStore();
const {
    mindMapData,
    isDev,
    node,
    activeNodeList,
    ctxMenuLeft,
    ctxMenuTop,
    ctxMenuType,
    ctxMenuVisible,
    copyNode,
    localConfig,
    nodeNormalStyle,
    nodeActiveStyle,
} = toRefs(publicStore);

const kmindRef = ref();
const nodeEditorRef = ref();

onMounted(() => {
    useKmind(document.getElementById('mindMapContainer'));

    // 导图节点点击
    kmind.on('node_click', (_node, e) => {
        if (isClickRemarkIcon(e)) {
            // 点击了备注的svg图像
            nodeEditorRef.value.handleShowRichEditor('note');
        }
        setLastClickNodeInfo({ left: e.x, top: e.y });
    });

    // 导图节点激活
    kmind.on('node_active', (_node, _activeNodeList) => {
        // 直接给activeNodeList.value赋值，会丢失响应式,导致store中的node不会及时刷新
        activeNodeList.value = [..._activeNodeList];
        [
            'shape',
            'paddingX',
            'paddingY',
            'color',
            'fontFamily',
            'fontSize',
            'lineHeight',
            'textDecoration',
            'fontWeight',
            'fontStyle',
            'borderWidth',
            'borderColor',
            'fillColor',
            'borderDasharray',
            'borderRadius',
            'lineColor',
            'lineDasharray',
            'lineWidth',
        ].forEach((item) => {
            // 普通状态的节点样式
            nodeNormalStyle.value[item] = _activeNodeList[0]?.getStyle(
                item,
                false,
                false,
            );
            // 激活状态的节点样式
            nodeActiveStyle.value[item] = _activeNodeList[0]?.getStyle(
                item,
                false,
                true,
            );
        });
    });

    // 导图点击
    kmind.on('draw_click', () => {
        // 关闭没有正确关闭的备注展示框
        setNoteInfo({ visible: false });
    });

    // 导图数据变化
    kmind.on('back_forward', (activeHistoryIndex, length) => {
        // 设置回退前进状态
        setBackForwardStatus(activeHistoryIndex, length);
    });

    // 导图右击
    kmind.on('contextmenu', (e) => {
        ctxMenuLeft.value = e.x;
        ctxMenuTop.value = e.y;
        ctxMenuVisible.value = true;
        ctxMenuType.value = 'map';
    });

    // 节点右击
    kmind.on('node_contextmenu', (e, _node) => {
        ctxMenuLeft.value = e.x;
        ctxMenuTop.value = e.y;
        ctxMenuVisible.value = true;
        ctxMenuType.value = 'node';
    });

    // 绑定自定义快捷键
    kmind.keyCommand.addShortcut('Control+c', () => {
        // kmind.value.renderer.copyNode() 在没有选中节点的时候会返回undefined
        kmind.renderer.copyNode() &&
            (copyNode.value = kmind.renderer.copyNode());
    });
    kmind.keyCommand.addShortcut('Control+v', () => {
        kmind.execCommand('PASTE_NODE', copyNode.value);
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
    kmind.keyCommand.addShortcut('Control+x', () => {
        kmind.execCommand('CUT_NODE', (e) => (copyNode.value = e));
    });
    kmind.keyCommand.addShortcut('Control+s', async () => {
        await saveMindMapData({ data: kmind.getData(true) });

        console.log(activeNodeList.value);
        // 当有节点激活的时候，隐藏保存成功的提示
        if (!activeNodeList.value.length) {
            message.success('保存导图数据成功');
        }
    });

    // 自动加载缓存数据
    if (mindMapData.value) {
        kmind.setFullData(cloneDeep(mindMapData.value));
        message.success('数据加载成功');
        if (localConfig.value.isZenMode) {
            // @ts-ignore
            const closeMsg = message.info(() => {
                const handleCloseZenMode = () => {
                    localConfig.value.isZenMode = false;
                    closeMsg();
                    saveMindMapData({ data: kmind.getData(true) });
                };
                return (
                    <span>
                        禅模式已经开启，
                        <a onClick={handleCloseZenMode} class="text-blue-500">
                            点我关闭
                        </a>
                    </span>
                );
            });
        }
    } else {
        message.info(
            '检测到首次使用，导图数据发生变化时，自动每1秒自动保存一次数据~',
        );
    }

    // 自动保存数据
    const debounceSaver = useDebounceFn((data) => {
        saveMindMapData({ data });
    }, 1000);
    // 防抖构建tree
    const debounceBuildTree = useDebounceFn(buildTreeData, 2000);
    kmind.on('data_change', () => {
        // console.log(kmind.value.getData(true));
        debounceSaver(kmind.getData(true));
        debounceBuildTree();
    });

    // 自适应
    const debounceResize = useDebounceFn(() => {
        kmind.resize();
    }, 1000);
    addEventListener('resize', () => {
        debounceResize();
    });

    // 拦截全局点击事件，如果点击到了a标签，就阻止默认事件，为跳转多tab页做准备
    addEventListener(
        'click',
        (e) => {
            // console.log(e);
            const { isLink, linkUrl } = isClickLinkIcon(e);
            // 如果按住alt键点击到了siyuan开头的超链接
            if (isLink && e.altKey && linkUrl?.startsWith('siyuan://')) {
                e.preventDefault();
                // @ts-ignore kmind插件把api挂载到了window上
                window.parent.kmindApi.plugin.addFloatLayer({
                    // 获取最后一个斜杠后的id
                    ids: [linkUrl?.substr(linkUrl.lastIndexOf('/') + 1)],
                    x: e.screenX,
                    y: e.screenY,
                });
            }
        },
        true,
    );

    // // 节点鼠标移入
    // kmind.value.on('node_mouseenter', (node, e) => {
    //     // console.log('node_mouseenter', node, e);
    // });
    //
    // // 节点鼠标移出
    // kmind.value.on('node_mouseleave', (node, e) => {
    //     // console.log('node_mouseleave', node, e);
    // });
});

await init();
</script>

<style scoped lang="less"></style>
