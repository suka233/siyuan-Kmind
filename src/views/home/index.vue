<template>
    <div class="w-full h-500px relative">
        <div id="mindMapContainer" class="w-full h-full"></div>
    </div>
    <a-button @click="getData">获取数据</a-button>
    <br />
    node?.nodeData?.data：
    <br />
    {{ node?.nodeData?.data }}
    <br />
    <node-editor
        :node="node"
        :kmind="kmind"
        class="fixed top-5 left-5"
    ></node-editor>
</template>

<script lang="tsx">
export default {
    name: 'HomeView',
};
</script>

<script setup lang="tsx">
import { computed, onMounted, ref } from 'vue';
import MindMap from 'simple-mind-map';
import KeyboardNavigation from 'simple-mind-map/src/KeyboardNavigation.js';
import Drag from 'simple-mind-map/src/Drag.js';
import Select from 'simple-mind-map/src/Select.js';
import NodeEditor from '/@/components/NodeEditor/index.vue';
import RichText from 'simple-mind-map/src/RichText.js';
MindMap.usePlugin(KeyboardNavigation)
    .usePlugin(Drag)
    .usePlugin(Select)
    .usePlugin(RichText);
const kmind = ref();
onMounted(() => {
    kmind.value = new MindMap({
        el: document.getElementById('mindMapContainer'),
        data: {
            data: {
                text: `suka`,
            },
            children: [],
        },
    });
    kmind.value.on('node_click', (_node, e) => {
        node.value = _node;
    });
});
const node = ref();
const getData = () => {
    console.log(kmind.value.getData(true));
};
</script>

<style scoped>
#map {
    @apply w-full h-500px;
}
</style>
