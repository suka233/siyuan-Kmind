<template>
    <side-bar
        title="导图样式"
        :class="{ show: activeSidebar === 'mindMapStyle' }"
    >
        <div>
            <a-collapse
                v-model:active-key="activeCollapse"
                :bordered="false"
                ghost
            >
                <a-collapse-panel key="1">
                    <template #header>
                        <p class="text-xl">背景</p>
                    </template>
                    <a-tabs>
                        <a-tab-pane>
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
                                    <input
                                        type="color"
                                        v-model="mindMapStyle.backgroundColor"
                                    />
                                </div>
                            </div>
                        </a-tab-pane>
                    </a-tabs>
                </a-collapse-panel>
                <a-collapse-panel key="2">
                    <template #header>
                        <p class="text-xl">连线</p>
                    </template></a-collapse-panel
                >
                <a-collapse-panel key="3">
                    <template #header>
                        <p class="text-xl">概要的连线</p>
                    </template></a-collapse-panel
                >
                <a-collapse-panel key="4">
                    <template #header>
                        <p class="text-xl">关联线</p>
                    </template></a-collapse-panel
                >
            </a-collapse>
        </div>
    </side-bar>
</template>
<script lang="tsx">
/**
 * 导图样式
 */
export default {
    name: 'MindMapStyle',
};
</script>
<script lang="tsx" setup>
import SideBar from '/@/components/SideBar/index.vue';
import { usePublicStore } from '/@/store/modules/public';
import { ref, toRefs } from 'vue';
import { colorList } from '/@/config';
const publicStore = usePublicStore();
const { activeSidebar, mindMapStyle } = toRefs(publicStore);

const activeCollapse = ref<string[]>(['1', '2', '3', '4']);

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
const handleColorPick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('colorItem')) {
        mindMapStyle.value.backgroundColor = rgbToHex(
            target.style.backgroundColor,
        );
    }
};
</script>
<style scoped lang="less">
// 让箭头适配标题text-xl的高度，确保箭头居中
.ant-collapse-expand-icon {
    height: 32px;
}

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
</style>
