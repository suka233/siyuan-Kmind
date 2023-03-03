<template>
    <div class="w-full h-full fixed">
        <div id="mindMapContainer" class="w-full h-full"></div>
        <node-editor
            :node="node"
            :kmind="kmind"
            class="fixed top-5 left-5"
        ></node-editor>
        <!--        <div class="fixed bottom-20 left-5">-->
        <!--            <p>节点数据：</p>-->
        <!--            <p>{{ node?.nodeData?.data }}</p>-->
        <!--        </div>-->
    </div>
</template>

<script lang="tsx">
export default {
    name: 'HomeView',
};
</script>

<script setup lang="tsx">
import { onMounted, ref, toRefs } from 'vue';
import MindMap from 'simple-mind-map';
import KeyboardNavigation from 'simple-mind-map/src/KeyboardNavigation.js';
import Drag from 'simple-mind-map/src/Drag.js';
import Select from 'simple-mind-map/src/Select.js';
import NodeEditor from '/@/components/NodeEditor/index.vue';
import RichText from 'simple-mind-map/src/RichText.js';
import { usePublicStore } from '/@/store/modules/public';
import { message } from 'ant-design-vue';
import { useThrottleFn } from '@vueuse/core';
const { setLastClickNodeInfo, saveMindMapData } = usePublicStore();
const publicStore = usePublicStore();
const { mindMapData } = toRefs(publicStore);
const kmind = ref();
MindMap.usePlugin(KeyboardNavigation)
    .usePlugin(Drag)
    .usePlugin(Select)
    .usePlugin(RichText);
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
        console.log(e, _node);
        setLastClickNodeInfo({ left: e.x, top: e.y });
    });

    // 自动加载缓存数据
    if (mindMapData.value) {
        console.log(mindMapData.value);
        kmind.value.setFullData(mindMapData.value);
        message.success('数据加载成功');
    } else {
        message.info(
            '检测到首次使用，导图数据发生变化时，自动每2秒自动保存一次数据~',
        );
    }

    // 自动保存数据
    const throttleSaver = useThrottleFn((data) => {
        saveMindMapData({ data });
    }, 2000);
    kmind.value.on('data_change', () => {
        // console.log('data_change', data);
        // saveMindMapData(data);
        console.log('data_change');
        throttleSaver(kmind.value.getData(true));
    });
});
const node = ref();
// const getData = () => {
//     console.log('所有数据：', kmind.value.getData(true));
//     console.log('data数据：', kmind.value.getData());
//     console.log('node数据：', node.value);
// };
</script>

<style scoped>
#map {
    @apply w-full h-500px;
}
</style>
