<template>
    <a-tooltip
        :title="
            localConfig.miniMapVisible ? '点我关闭小地图' : '点我开启小地图'
        "
    >
        <compass-outlined
            class="cursor-pointer"
            :class="localConfig.miniMapVisible ? 'text-gray-5' : 'text-gray-3'"
            @click="handleToggleMiniMap"
        />
    </a-tooltip>
</template>

<script setup lang="ts">
import { CompassOutlined } from '@ant-design/icons-vue';
import { usePublicStore } from '/@/store/modules/public';
import { toRefs } from 'vue';
import { kmind } from '/@/hooks/useKmind';

const publicStore = usePublicStore();
const { localConfig } = toRefs(publicStore);
const { saveMindMapData } = publicStore;

const handleToggleMiniMap = () => {
    localConfig.value.miniMapVisible = !localConfig.value.miniMapVisible;
    // 并非导图数据变化，不会触发自动保存操作，所以手动保存一下
    saveMindMapData({ data: kmind.getData(true) });
};
</script>

<style scoped></style>
