<template>
    <suspense> <home-view /></suspense>
</template>
<script lang="ts">
export default {
    name: 'Kmind',
};
</script>
<script setup lang="ts">
import HomeView from '/@/views/home/index.vue';
const props = defineProps<{
    type?: 'widget' | 'plugin';
}>();
console.log('接收到参数：', props.type);
</script>
<style scoped></style>
