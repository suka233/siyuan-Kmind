<template>
    <div
        v-show="localConfig.miniMapVisible"
        class="navigatorBox"
        ref="navigatorBox"
        @mousedown="onMousedown"
        @mousemove="onMousemove"
        @mouseup="onMouseup"
    >
        <div
            class="svgBox"
            ref="svgBox"
            :style="{
                transform: `scale(${svgBoxScale})`,
                left: svgBoxLeft + 'px',
                top: svgBoxTop + 'px',
            }"
        ></div>
        <div class="windowBox" :style="vbStyle"></div>
    </div>
</template>
<script setup lang="ts">
import { usePublicStore } from '/@/store/modules/public';
import { onMounted, ref, toRefs, watch } from 'vue';
import { kmind } from '/@/hooks/useKmind';

const publicStore = usePublicStore();
const { localConfig } = toRefs(publicStore);
const navigatorBox = ref<HTMLElement>();
const svgBox = ref<HTMLElement>();
const boxWidth = ref(0);
const boxHeight = ref(0);
const svgBoxScale = ref(1);
const svgBoxLeft = ref(0);
const svgBoxTop = ref(0);
const vbStyle = ref({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
});

const timer = ref();
const dataChange = () => {
    if (!localConfig.value.miniMapVisible) {
        return;
    }
    clearTimeout(timer.value);
    timer.value = setTimeout(() => {
        drawMiniMap();
    }, 500);
};

const drawMiniMap = () => {
    if (navigatorBox.value) {
        let { width, height } = navigatorBox.value.getBoundingClientRect();
        boxWidth.value = width;
        boxHeight.value = height;
    }
    let {
        svgHTML,
        viewBoxStyle,
        miniMapBoxScale,
        miniMapBoxLeft,
        miniMapBoxTop,
    } = kmind.miniMap.calculationMiniMap(boxWidth.value, boxHeight.value);
    // 渲染到小地图
    svgBox.value!.innerHTML = svgHTML;
    vbStyle.value = viewBoxStyle;
    svgBoxScale.value = miniMapBoxScale;
    svgBoxLeft.value = miniMapBoxLeft;
    svgBoxTop.value = miniMapBoxTop;
};

const onMousedown = (e: MouseEvent) => {
    kmind.miniMap.onMousedown(e);
};

const onMousemove = (e: MouseEvent) => {
    kmind.miniMap.onMousemove(e);
};

const onMouseup = (e: MouseEvent) => {
    kmind.miniMap.onMouseup(e);
};

onMounted(() => {
    setTimeout(() => {
        if (navigatorBox.value) {
            let { width, height } = navigatorBox.value.getBoundingClientRect();
            boxWidth.value = width;
            boxHeight.value = height;
        }
        kmind.on('data_change', dataChange);
        kmind.on('view_data_change', dataChange);
        kmind.on('node_tree_render_end', dataChange);
    });
});

watch(
    () => localConfig.value.miniMapVisible,
    (val) => {
        if (val) {
            dataChange();
        }
    },
);
</script>
<style scoped>
.navigatorBox {
    position: absolute;
    width: 350px;
    height: 220px;
    background-color: #fff;
    bottom: 80px;
    right: 70px;
    box-shadow: 0 0 16px #989898;
    border-radius: 4px;
    border: 1px solid #eee;
    cursor: pointer;
    user-select: none;

    .svgBox {
        position: absolute;
        left: 0;
        transform-origin: left top;
    }

    .windowBox {
        position: absolute;
        border: 2px solid rgb(238, 69, 69);
        transition: all 0.3s;
    }
}
</style>
