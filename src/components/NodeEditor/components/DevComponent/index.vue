<template>
    <a-dropdown>
        <template #overlay>
            <a-menu @click="handleMenuClick">
                <a-menu-item key="1"> 设置导图为测试数据 </a-menu-item>
                <a-menu-item key="2"> console导图数据 </a-menu-item>
                <a-menu-item key="3"> RESET_LAYOUT </a-menu-item>
                <a-menu-item key="4"> 重载导图数据 </a-menu-item>
                <a-menu-item key="5"> 打印activeNodeList </a-menu-item>
            </a-menu>
        </template>
        <a-button>
            测试功能
            <DownOutlined />
        </a-button>
    </a-dropdown>
</template>

<script lang="tsx">
export default {
    name: 'DevComponent',
};
</script>

<script lang="tsx" setup>
import { DownOutlined } from '@ant-design/icons-vue';
import { usePublicStore } from '/@/store/modules/public';
import { toRefs } from 'vue';
import { message } from 'ant-design-vue';

const publicStore = usePublicStore();
// const { saveMindMapData } = publicStore;
const { kmind, node, mindMapData, activeNodeList } = toRefs(publicStore);
const handleMenuClick = (e: any) => {
    switch (e.key) {
        case '1':
            kmind.value.setFullData(
                Object.assign({}, testData, { layout: undefined }),
            );
            break;
        case '2':
            console.log('node', node.value);
            console.log('kmind', kmind.value);
            console.log(
                'allData',
                JSON.stringify({ suka: kmind.value.getData(true) }),
            );
            break;
        case '3':
            kmind.value.execCommand('RESET_LAYOUT');
            break;
        case '4':
            kmind.value.setFullData(
                Object.assign({}, mindMapData.value, { layout: undefined }),
            );
            // props.kmind.setData(mindMapData.value?.root);
            message.success('重新加载导图数据成功');
            break;
        case '5':
            console.log('activeNodeList', activeNodeList.value);
            break;
    }
};

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
</script>

<style scoped></style>
