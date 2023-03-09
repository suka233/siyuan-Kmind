<template>
    <div class="w-full h-full fixed">
        <div id="mindMapContainer" ref="kmindRef" class="w-full h-full"></div>
        <div class="fixed top-5 left-5">
            <a-button class="mr-2" @click="setTheme">setTheme</a-button>
            <a-button class="mr-2" @click="setThemeConfig"
                >setThemeConfig</a-button
            >
            <a-button class="mr-2" @click="setData">setData</a-button>
            <a-button class="mr-2" @click="setTransformData"
                >setTransformData</a-button
            >
            <a-button class="mr-2" danger @click="setFullData"
                >setFullData</a-button
            >
            <a-button class="mr-2" danger @click="setLayout"
                >setLayout</a-button
            >
        </div>

        <side-bar-trigger></side-bar-trigger>

        <map-structure :kmind="kmind"></map-structure>
        <div v-if="isDev" class="fixed bottom-20 left-5">
            <p>节点数据：</p>
            <p>{{ node?.nodeData?.data }}</p>
        </div>
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
import RichText from 'simple-mind-map/src/RichText.js';
import { usePublicStore } from '/@/store/modules/public';
import SideBarTrigger from '/@/components/SideBarTrigger/index.vue';
import MapStructure from '/@/components/MapStructure/index.vue';
const publicStore = usePublicStore();
const { isDev } = toRefs(publicStore);
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

    kmind.value.on('node_active', (_node, activeNodeList) => {
        node.value = _node;
    });
});
const node = ref();
const testData = {
    layout: 'logicalStructure',
    root: {
        data: {
            text: '<p><strong style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255); font-size: 16px;">asdasdasd</strong></p>',
            expand: true,
            isActive: false,
            fontFamily: '微软雅黑, Microsoft YaHei',
            color: '#fff',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 16,
            textDecoration: 'none',
            richText: true,
        },
        children: [
            {
                data: {
                    text: '<p><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(86, 86, 86); font-size: 16px;">二级节点</span></p>',
                    expand: true,
                    isActive: false,
                    fontFamily: '微软雅黑, Microsoft YaHei',
                    color: '#565656',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: 16,
                    textDecoration: 'none',
                    richText: true,
                },
                children: [],
            },
            {
                data: {
                    text: '<p><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(86, 86, 86); font-size: 16px;">二级节点</span></p>',
                    expand: true,
                    isActive: false,
                    fontFamily: '微软雅黑, Microsoft YaHei',
                    color: '#565656',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: 16,
                    textDecoration: 'none',
                    richText: true,
                    tag: ['dddd', '22', '77', 'wsdad', '333'],
                    note: '<p>asdasdasdasd</p>',
                },
                children: [],
            },
            {
                data: {
                    text: '<p><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(86, 86, 86); font-size: 16px;">1111</span></p>',
                    expand: true,
                    isActive: false,
                    fontFamily: '微软雅黑, Microsoft YaHei',
                    color: '#565656',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: 16,
                    textDecoration: 'none',
                    richText: true,
                },
                children: [],
            },
        ],
    },
    theme: {
        template: 'default',
        config: {},
    },
    view: {
        transform: {
            scaleX: 1.3000000000000003,
            scaleY: 1.3000000000000003,
            shear: 0,
            rotate: 0,
            translateX: -1092.3107421875006,
            translateY: -368.0166666666669,
            originX: 0,
            originY: 0,
            a: 1.3000000000000003,
            b: 0,
            c: 0,
            d: 1.3000000000000003,
            e: -1092.3107421875006,
            f: -368.0166666666669,
        },
        state: {
            scale: 1.3000000000000003,
            x: -741.0107421875002,
            y: -228.66666666666674,
            sx: -741.0107421875002,
            sy: -228.66666666666674,
        },
    },
};

const setTheme = () => {
    kmind.value.setTheme(testData.theme.template);
};

const setThemeConfig = () => {
    kmind.value.setThemeConfig(testData.theme.config);
};

const setData = () => {
    kmind.value.setData(testData.root);
};

const setTransformData = () => {
    kmind.value.view.setTransformData(testData.view);
};

const setFullData = () => {
    kmind.value.setFullData(testData);
};

const setLayout = () => {
    kmind.value.setLayout(testData.layout);
};
</script>

<style scoped></style>
