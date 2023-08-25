<template>
    <suspense>
        <template #fallback>
            <div>
                <a-skeleton active />
                <br />
                <a-skeleton active />
                <br />
                <a-skeleton active />
            </div>
        </template>
        <home-view />
    </suspense>
</template>
<script lang="ts">
export default {
    name: 'Kmind',
};
</script>
<script setup lang="ts">
import HomeView from '/@/views/home/index.vue';
import { toRefs } from 'vue';
import { usePublicStore } from '/@/store/modules/public';
import { getWidgetBlockInfo } from '/@/utils';
// import siyuan from 'img/siyuan.png';
// const props = defineProps<{
//     type?: 'widget' | 'plugin';
// }>();
// console.log('接收到参数：', props.type);
const publicStore = usePublicStore();
const { env, fileName } = toRefs(publicStore);
const { env: currentEnv, fileName: pluginFileName } = getWidgetBlockInfo();
env.value = currentEnv;
// 当获取不到的时候，使用默认值kmind
fileName.value = pluginFileName ?? 'kmind';
</script>
<style lang="less"></style>
