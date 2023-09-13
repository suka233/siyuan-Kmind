<template>
    <div class="navigatorContainer">
        <!--      开关小地图-->
        <mini-map-switch class="mr-4" />
        <!--      切换只读模式-->
        <read-only-switch class="mr-4" />
        <!--      调整画布缩放-->
        <scale-bar />
        <!--      全屏按钮-->
    </div>
</template>

<script setup lang="ts">
import MiniMapSwitch from './components/MiniMapSwitch/index.vue';
import ReadOnlySwitch from './components/ReadOnlySwitch/index.vue';
import ScaleBar from './components/ScaleBar/index.vue';
</script>

<style scoped>
.navigatorContainer {
    background-color: #fff;
    border-left: 1px solid #e8e8e8;
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    padding: 10px;
    overflow-x: auto;
    width: max-content;
    max-width: 100%;
    display: flex;
}
</style>
