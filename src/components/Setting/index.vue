<template>
    <side-bar title="设置" :class="{ show: activeSidebar === 'setting' }" />
</template>
<script lang="tsx">
/**
 * 设置
 */
export default {
    name: 'Setting',
};
</script>
<script lang="tsx" setup>
import SideBar from '/@/components/SideBar/index.vue';
import { usePublicStore } from '/@/store/modules/public';
import { toRefs } from 'vue';
const publicStore = usePublicStore();
const { activeSidebar } = toRefs(publicStore);
</script>
<style scoped></style>
