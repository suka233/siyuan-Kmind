<template>
    <a-button
        @click="handleClick"
        ref="painterBtnRef"
        :type="isPainting ? 'primary' : 'default'"
    >
        <span class="align-middle">格式刷</span>
        <format-painter-outlined
            class="align-middle"
            :class="{ active: isPainting }"
        />
    </a-button>
</template>
<script setup lang="ts">
import { FormatPainterOutlined } from '@ant-design/icons-vue';
import { kmind } from '/@/hooks/useKmind';
import { toRefs } from 'vue';
import { usePublicStore } from '/@/store/modules/public';
const publicStore = usePublicStore();
const { isPainting } = toRefs(publicStore);
const handleClick = () => {
    kmind.painter.startPainter();
};
</script>
<style scoped></style>
