<template>
    <side-bar title="大纲" :class="{ show: activeSidebar === 'mainPoint' }">
        <div>
            <a-button @click="buildTreeData">build</a-button>
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
const { buildTreeData } = publicStore;
const { treeData, kmind, activeSidebar } = toRefs(publicStore);

const handleClick = (node: any) => {
    console.log(kmind.value.renderer);
    // kmind.value.renderer.clearAllActive();
    // kmind.value.renderer.addActiveNode(node);
    kmind.value.renderer.moveNodeToCenter(node);
    // kmind.value?.execCommand('CLEAR_ACTIVE_NODE');
};
</script>

<style scoped></style>
