<template>
    <div>
        <a-tooltip title="缩小"
            ><minus-outlined @click="narrow" class="text-gray-4"
        /></a-tooltip>
        <a-tooltip title="单击重置缩放"
            ><span
                class="text-gray-4 text-sm w-15 inline-block text-center cursor-pointer"
                @click="reset"
                >{{ scaleNum }}%</span
            >
        </a-tooltip>

        <a-tooltip title="放大"
            ><plus-outlined @click="enlarge" class="text-gray-4"
        /></a-tooltip>
    </div>
</template>
<script setup lang="ts">
import { PlusOutlined, MinusOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';
import { kmind } from '/@/hooks/useKmind';

const scaleNum = ref(100);

onMounted(() => {
    setTimeout(() => {
        kmind.on('scale', (scale) => {
            scaleNum.value = +toPer(scale);
        });
        scaleNum.value = +toPer(kmind.view.scale);
    });
});

// 转换为百分比
const toPer = (scale: number) => {
    return (scale * 100).toFixed(0);
};

const narrow = () => {
    kmind.view.narrow();
};

const enlarge = () => {
    kmind.view.enlarge();
};

const reset = () => {
    kmind.view.reset();
};
</script>

<style scoped></style>
