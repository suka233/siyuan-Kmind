<template>
    <a-dropdown>
        <template #overlay>
            <a-menu @click="handleMenuClick">
                <a-menu-item key="设置导图为测试数据">
                    设置导图为测试数据
                </a-menu-item>
                <a-menu-item key="console导图数据">
                    console导图数据
                </a-menu-item>
                <a-menu-item key="RESET_LAYOUT"> RESET_LAYOUT </a-menu-item>
                <a-menu-item key="重载导图数据"> 重载导图数据 </a-menu-item>
                <a-menu-item key="打印activeNodeList">
                    打印activeNodeList
                </a-menu-item>
                <a-menu-item key="调用插件打开浮窗"
                    >调用插件打开浮窗</a-menu-item
                >
                <a-menu-item key="全屏">全屏</a-menu-item>
                <a-menu-item key="测试">测试</a-menu-item>
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
import { kmind } from '/@/hooks/useKmind';
import { getWidgetBlockInfo } from '/@/utils';
const publicStore = usePublicStore();
// const { saveMindMapData } = publicStore;
const { node, mindMapData, activeNodeList, treeData } = toRefs(publicStore);
const { iframeNode } = getWidgetBlockInfo();

const handleMenuClick = (e: any) => {
    switch (e.key) {
        case '设置导图为测试数据':
            kmind.setFullData(
                Object.assign({}, testData, { layout: undefined }),
            );
            break;
        case 'console导图数据':
            console.log('node', node.value);
            console.log('kmind', kmind);
            console.log(
                'allData',
                JSON.stringify({ suka: kmind.getData(true) }),
            );
            break;
        case 'RESET_LAYOUT':
            kmind.execCommand('RESET_LAYOUT');
            break;
        case '重载导图数据':
            kmind.setFullData(
                Object.assign({}, mindMapData.value, { layout: undefined }),
            );
            // props.kmind.setData(mindMapData.value?.root);
            message.success('重新加载导图数据成功');
            break;
        case '打印activeNodeList':
            console.log('activeNodeList', activeNodeList.value);
            break;
        case '调用插件打开浮窗':
            // @ts-ignore
            window.parent.openAPI.plugin.addFloatLayer({
                ids: ['20210428212840-8rqwn5o', '20201225220955-l154bn4'],
                defIds: ['20230415111858-vgohvf3', '20200813131152-0wk5akh'],
                x: window.innerWidth - 768 - 120,
                y: 32,
            });
            break;
        case '全屏/退出全屏':
            if (window.parent.document.fullscreenElement === iframeNode) {
                window.parent.document.exitFullscreen();
            } else {
                iframeNode!.requestFullscreen();
            }

            break;
        case '测试':
            console.log(kmind);
            console.log(kmind.getData());
            console.log(treeData.value);
            break;
        default:
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
