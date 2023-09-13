<template>
    <a-tooltip
        :title="
            localConfig.readonlyMode
                ? '点我切换到编辑模式'
                : '点我切换到只读模式'
        "
    >
        <div @click="toggleEditMode" class="cursor-pointer">
            <lock-outlined
                class="text-gray-5"
                v-show="localConfig.readonlyMode"
            />
            <unlock-outlined
                class="text-gray-5"
                v-show="!localConfig.readonlyMode"
            />
        </div>
    </a-tooltip>
</template>

<script setup lang="ts">
import { LockOutlined, UnlockOutlined } from '@ant-design/icons-vue';
import { usePublicStore } from '/@/store/modules/public';
import { toRefs } from 'vue';
import { kmind } from '/@/hooks/useKmind';

const publicStore = usePublicStore();
const { localConfig } = toRefs(publicStore);
const { saveMindMapData } = publicStore;

const toggleEditMode = () => {
    localConfig.value.readonlyMode = !localConfig.value.readonlyMode;
    kmind.setMode(localConfig.value.readonlyMode ? 'readonly' : 'edit');
    saveMindMapData({ data: kmind.getData(true) });
};
</script>

<style scoped></style>
