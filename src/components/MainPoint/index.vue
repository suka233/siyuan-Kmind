<template>
    <side-bar title="大纲" :class="{ show: activeSidebar === 'mainPoint' }">
        <div>
            <!--            <a-button-->
            <!--                class="w-full"-->
            <!--                title="出于性能考虑，大纲设定为2秒刷新一次，如果需要最新的大纲，可以手动刷新一下"-->
            <!--                @click="buildTreeData"-->
            <!--                >刷新大纲</a-button-->
            <!--            >-->
            <a-tree :tree-data="treeData">
                <template #title="{ title, _node }">
                    <a @click="handleClick(_node)" v-html="title"></a>
                </template>
            </a-tree>
        </div>
    </side-bar>
</template>

<script lang="tsx">
/**
 * 大纲
 */
export default {
    name: 'MainPoint',
};
</script>
<script lang="tsx" setup>
import SideBar from '/@/components/SideBar/index.vue';
import { usePublicStore } from '/@/store/modules/public';
import { toRefs } from 'vue';
const publicStore = usePublicStore();
// const { buildTreeData } = publicStore;
import { kmind } from '/@/hooks/useKmind';
const { treeData, activeSidebar } = toRefs(publicStore);
const handleClick = (node: any) => {
    // kmind.value.renderer.clearAllActive();
    // kmind.value.renderer.addActiveNode(node);
    // kmind.value.execCommand('SET_ACTIVE_NODE', node);
    kmind.execCommand('SET_NODE_EXPAND', node, true);
    kmind.renderer.moveNodeToCenter(node);
    // kmind.value?.execCommand('CLEAR_ACTIVE_NODE');
};
</script>

<style scoped></style>
