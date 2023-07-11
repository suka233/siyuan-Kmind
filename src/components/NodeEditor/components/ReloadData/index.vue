<template>
    <a-button
        title="布局错乱的时候使用,会自动保存当前导图数据"
        @click="handleReload"
        >整理布局</a-button
    >
</template>

<script lang="tsx">
/**
 * 有时候布局错乱，使用kmind.execCommand('RESET_LAYOUT')并不能很好的解决，所以提供一个按钮，点击后重新加载数据
 */
export default {
    name: 'ReloadData',
};
</script>

<script lang="tsx" setup>
import { usePublicStore } from '/@/store/modules/public';
import { toRefs } from 'vue';
import { message } from 'ant-design-vue';
import { kmind } from '/@/hooks/useKmind';
import { cloneDeep } from 'lodash-es';
const { saveMindMapData } = usePublicStore();
const publicStore = usePublicStore();
const { mindMapData } = toRefs(publicStore);

const handleReload = async () => {
    await saveMindMapData({ data: kmind.getData(true) }).then(() => {
        message.success('保存导图数据成功');
    });
    kmind.setFullData(cloneDeep(mindMapData.value));
    message.success('重新加载导图数据成功');
};
</script>

<style scoped></style>
