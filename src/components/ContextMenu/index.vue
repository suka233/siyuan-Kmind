<template>
    <div
        :style="{
            left: `${ctxMenuLeft}px`,
            top: `${ctxMenuTop}px`,
            visibility: ctxMenuVisible ? 'visible' : 'hidden',
        }"
        class="fixed"
    >
        <a-menu
            v-show="ctxMenuType === 'map'"
            ref="menuRef"
            mode="vertical"
            :selectable="false"
            @click="handleClick"
        >
            <a-menu-item key="goCenter">前往中心主题并重置缩放</a-menu-item>
            <a-menu-item key="expandAll">展开所有</a-menu-item>
            <a-menu-item key="collapseAll">收起所有</a-menu-item>
            <a-sub-menu key="expandTo" title="展开到">
                <a-menu-item key="expandTo1">一级主题</a-menu-item>
                <a-menu-item key="expandTo2">二级主题</a-menu-item>
                <a-menu-item key="expandTo3">三级主题</a-menu-item>
                <a-menu-item key="expandTo4">四级主题</a-menu-item>
                <a-menu-item key="expandTo5">五级主题</a-menu-item>
                <a-menu-item key="expandTo6">六级主题</a-menu-item>
            </a-sub-menu>
            <a-menu-item key="zenMode"
                >禅模式
                <span class="ml-2">{{ localConfig.isZenMode ? '√' : '' }}</span>
            </a-menu-item>
            <a-menu-item key="fullScreen"
                >全屏
                <span class="ml-2">{{
                    localConfig.isFullScreen ? '√' : ''
                }}</span>
            </a-menu-item>
        </a-menu>

        <a-menu
            v-show="ctxMenuType === 'node'"
            ref="menuRef"
            mode="vertical"
            :selectable="false"
            class="nodeCtx"
            @click="handleClick"
        >
            <a-menu-item key="insertBrotherNode"
                >插入同级节点
                <span class="desc ml-10">Enter</span>
            </a-menu-item>
            <a-menu-item key="insertChildNode"
                >插入子节点
                <span class="desc ml-10">Tab</span>
            </a-menu-item>
            <a-menu-item
                key="insertGeneralization"
                :disabled="insertBrotherNodeBtnDisabled"
                >插入概要
                <span class="desc ml-10">Ctrl + S</span>
            </a-menu-item>
            <a-menu-item key="upNode" :disabled="upNodeBtnDisabled"
                >上移节点<span class="desc ml-10">Ctrl + ↑</span></a-menu-item
            >
            <a-menu-item key="downNode" :disabled="downNodeBtnDisabled"
                >下移节点<span class="desc ml-10">Ctrl + ↓</span></a-menu-item
            >
            <a-menu-item key="deleteNode"
                ><span class="text-red-500">删除节点</span
                ><span class="desc ml-10">Delete</span></a-menu-item
            >
            <a-menu-item key="copyNode"
                >复制节点<span class="desc ml-10">Ctrl + C</span></a-menu-item
            >
            <a-menu-item key="cutNode"
                >剪切节点<span class="desc ml-10">Ctrl + X</span></a-menu-item
            >
            <a-menu-item key="pasteNode"
                >粘贴节点<span class="desc ml-10">Ctrl + V</span></a-menu-item
            >
            <a-menu-item key="customNode">插入自定义节点</a-menu-item>
        </a-menu>
    </div>
</template>

<script lang="tsx">
export default {
    name: 'ContextMenu',
};
</script>

<script lang="tsx" setup>
import { usePublicStore } from '/@/store/modules/public';
import { computed, ref, toRefs } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { kmind } from '/@/hooks/useKmind';
import { getWidgetBlockInfo } from '/@/utils';
const publicStore = usePublicStore();
const { saveMindMapData } = publicStore;
const {
    ctxMenuLeft,
    ctxMenuTop,
    ctxMenuVisible,
    ctxMenuType,
    copyNode,
    node,
    localConfig,
} = toRefs(publicStore);

const menuRef = ref<HTMLElement>();
const { iframeNode } = getWidgetBlockInfo();
const handleClick = ({ key }) => {
    switch (key) {
        case 'goCenter':
            kmind.view.reset();
            break;
        case 'expandAll':
            kmind.execCommand('EXPAND_ALL');
            break;
        case 'collapseAll':
            kmind.execCommand('UNEXPAND_ALL');
            break;
        case 'expandTo1':
            kmind.execCommand('UNEXPAND_TO_LEVEL', 1);
            break;
        case 'expandTo2':
            kmind.execCommand('UNEXPAND_TO_LEVEL', 2);
            break;
        case 'expandTo3':
            kmind.execCommand('UNEXPAND_TO_LEVEL', 3);
            break;
        case 'expandTo4':
            kmind.execCommand('UNEXPAND_TO_LEVEL', 4);
            break;
        case 'expandTo5':
            kmind.execCommand('UNEXPAND_TO_LEVEL', 5);
            break;
        case 'expandTo6':
            kmind.execCommand('UNEXPAND_TO_LEVEL', 6);
            break;
        case 'insertBrotherNode':
            kmind.execCommand('INSERT_NODE');
            break;
        case 'insertChildNode':
            kmind.execCommand('INSERT_CHILD_NODE');
            break;
        case 'insertGeneralization':
            kmind.execCommand('ADD_GENERALIZATION');
            break;
        case 'upNode':
            kmind.execCommand('UP_NODE');
            break;
        case 'downNode':
            kmind.execCommand('DOWN_NODE');
            break;
        case 'deleteNode':
            kmind.execCommand('REMOVE_NODE');
            break;
        case 'copyNode':
            kmind.renderer.copyNode() &&
                (copyNode.value = kmind.renderer.copyNode());
            break;
        case 'cutNode':
            kmind.execCommand('CUT_NODE', (e) => (copyNode.value = e));
            break;
        case 'pasteNode':
            kmind.execCommand('PASTE_NODE', copyNode.value);
            break;
        case 'customNode':
            kmind.execCommand('SET_NODE_DATA', node.value, {
                kmind: { type: 'suka' },
            });
            break;
        case 'zenMode':
            localConfig.value.isZenMode = !localConfig.value.isZenMode;
            // zen模式并非导图数据变化，不会触发自动保存操作，所以手动保存一下
            saveMindMapData({ data: kmind.getData(true) });
            break;
        case 'fullScreen':
            if (window.parent.document.fullscreenElement === iframeNode) {
                window.parent.document.exitFullscreen();
                localConfig.value.isFullScreen = false;
            } else {
                iframeNode!.requestFullscreen();
                localConfig.value.isFullScreen = true;
            }
            break;
    }

    ctxMenuVisible.value = false;
};

onClickOutside(menuRef, () => {
    ctxMenuVisible.value = false;
    ctxMenuType.value = undefined;
});

const insertBrotherNodeBtnDisabled = computed(() => {
    return node.value?.isRoot;
});

const upNodeBtnDisabled = computed(() => {
    if (node.value?.isRoot) {
        return true;
    }
    // 是否是第一个
    return (
        node.value?.parent.children.findIndex((item) => {
            return item === node.value;
        }) === 0
    );
});

const downNodeBtnDisabled = computed(() => {
    if (node.value?.isRoot) {
        return true;
    }
    // 是否是最后一个
    return (
        node.value?.parent.children.findIndex((item) => {
            return item === node.value;
        }) ===
        node.value?.parent.children.length - 1
    );
});
</script>

<style scoped lang="less">
.nodeCtx {
    .desc {
        //@apply ml-10;
        color: #999;
        font-size: 12px;
        float: right;
    }
}
</style>
