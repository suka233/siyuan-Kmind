<template>
    <a-popover
        :title="`导图数据发生变化时，会在延迟1秒后自动保存数据哦~`"
        placement="bottom"
    >
        <template #content
            ><span class="text-gray-4">{{
                `最后一次自动保存的时间：${lastSaveTime}`
            }}</span></template
        >
        <a-button @click="handleSave"> 保存 </a-button>
    </a-popover>
</template>

<script setup lang="tsx">
import { kmind } from '/@/hooks/useKmind';
import { message } from 'ant-design-vue';
import { toRefs } from 'vue';
import { usePublicStore } from '/@/store/modules/public';
const { saveMindMapData } = usePublicStore();
const publicStore = usePublicStore();
const { lastSaveTime } = toRefs(publicStore);
const handleSave = async () => {
    await saveMindMapData({ data: kmind.getData(true) }).then(() =>
        message.success('保存导图数据成功'),
    );
};
</script>

<style scoped></style>
