<template>
    <side-bar
        title="导图样式"
        :class="{ show: activeSidebar === 'mindMapStyle' }"
    >
        <div>
            <a-collapse v-model:active-key="activeKey" :bordered="false">
                <a-collapse-panel key="1">
                    <template #header>
                        <p class="text-xl">背景</p>
                    </template>
                </a-collapse-panel>
                <a-collapse-panel key="2" header="连线">zzz</a-collapse-panel>
                <a-collapse-panel key="3" header="概要的连线"
                    >zzz</a-collapse-panel
                >
                <a-collapse-panel key="4" header="关联线">zzz</a-collapse-panel>
            </a-collapse>
        </div>
    </side-bar>
</template>
<script lang="tsx">
/**
 * 导图样式
 */
export default {
    name: 'MindMapStyle',
};
</script>
<script lang="tsx" setup>
import SideBar from '/@/components/SideBar/index.vue';
import { usePublicStore } from '/@/store/modules/public';
import { ref, toRefs } from 'vue';
const publicStore = usePublicStore();
const { activeSidebar } = toRefs(publicStore);

const activeKey = ref<string[]>(['1', '2', '3', '4']);
</script>
<style scoped></style>
