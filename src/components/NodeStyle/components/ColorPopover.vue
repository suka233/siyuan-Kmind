<template>
    <a-popover trigger="click" placement="bottom" v-bind="$attrs">
        <template #content>
            <div>
                <div class="colorList" @click="handleColorPick">
                    <span
                        class="colorItem"
                        v-for="item in colorList"
                        :style="{ backgroundColor: item }"
                        :key="item"
                    ></span>
                </div>
                <div class="moreColor">
                    <span>更多颜色</span>
                    <input type="color" v-model="color" />
                </div>
            </div>
        </template>
        <slot></slot>
    </a-popover>
</template>

<script lang="tsx">
export default {
    name: 'ColorPopover',
};
</script>

<script lang="tsx" setup>
import { colorList } from '/@/config';
import { computed } from 'vue';
import { useDebounceFn } from '@vueuse/core';
const props = defineProps<{
    color?: string;
}>();
const emit = defineEmits<{
    (e: 'update:color', color: string): void;
}>();

// 防抖发送事件，频繁更改导图的节点颜色会导致导图卡顿
const debouncedEmit = useDebounceFn((color: string) => {
    emit('update:color', color);
}, 100);
const color = computed({
    get() {
        return props.color;
    },
    set(color: string) {
        debouncedEmit(color);
    },
});

const handleColorPick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('colorItem')) {
        color.value = rgbToHex(target.style.backgroundColor);
    }
};

// 颜色转换
const rgbToHex = (rgb: string) => {
    const rgbArr = rgb.match(/\d+/g);
    if (!rgbArr) {
        return '#000000';
    }
    const hex = rgbArr.map((item) => {
        const hex = Number(item).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    });
    return '#' + hex.join('');
};
</script>

<style scoped lang="less">
.colorList {
    width: 240px;

    .colorItem {
        display: inline-block;
        width: 15px;
        height: 15px;
        margin-right: 5px;
        margin-bottom: 5px;
        cursor: pointer;
    }
}

.moreColor {
    display: flex;
    align-items: center;

    span {
        margin-right: 5px;
    }
}
</style>
