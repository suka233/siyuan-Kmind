import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getWidgetBlockInfo } from '/@/utils';
import { setBlockAttrs } from '/@/api/public';
import { message } from 'ant-design-vue';
import store from '/@/store';
import * as process from 'process';
type NodeTreeType = {
    title?: string;
    key?: string;
    _node?: any;
    children?: NodeTreeType[];
};

interface IMapFullData {
    /**
     * 布局名称
     */
    layout?: string;
    /**
     * 节点数据
     */
    root?: object;
    /**
     * 主题
     */
    theme?: {
        template: string;
        config: object;
    };
    /**
     * 视图信息
     */
    view?: {
        transform: object;
        state: object;
    };
}
export const usePublicStore = defineStore('app-public', () => {
    // region 环境相关
    const initIsDev = () => process.env.NODE_ENV === 'development';
    const isDev = ref(initIsDev());
    // endregion

    // region map相关
    const kmind = ref();
    const setKmind = ({ kmind: map }) => {
        kmind.value = map;
    };
    const treeData = ref();
    // 递归展开tree
    const expandTree = (data) => {
        const temp: NodeTreeType = {};
        temp.title = data.data.text;
        temp.key = data._node.uid;
        temp._node = data._node;
        if (data.children.length) {
            temp.children = [];
            data.children.forEach((item) => {
                temp.children?.push(expandTree(item));
            });
        }
        return temp;
    };

    const buildTreeData = () => {
        treeData.value = [expandTree(kmind.value.renderer.renderTree)];
    };

    const backEnd = ref<boolean>(true);
    const forwardEnd = ref<boolean>(true);
    const backForwardLength = ref<number>(0);
    const setBackForwardStatus = (activeHistoryIndex, length) => {
        // 这里是为了修复map本身的bug:当调用FORWARD的时候，length为undefined
        if (length) {
            backForwardLength.value = length;
        }
        backEnd.value = activeHistoryIndex <= 0;
        forwardEnd.value = activeHistoryIndex >= backForwardLength.value - 1;
    };

    // endregion

    // region 节点相关
    const node = ref();
    const activeNodeList = ref<any[]>([]);
    const setNode = ({ node: _node, activeNodeList: _activeNodeList = [] }) => {
        node.value = _node;
        activeNodeList.value = _activeNodeList;
    };

    // 当前节点备注content
    const noteContent = ref<string>();
    // 当前节点备注left
    const noteLeft = ref<string>();
    // 当前节点备注top
    const noteTop = ref<string>();
    // 当前节点备注显示隐藏
    const noteVisible = ref<boolean>(false);

    // 保存备注相关信息
    const setNoteInfo = ({
        content,
        left,
        top,
        visible,
    }: {
        content?: string;
        left?: string;
        top?: string;
        visible: boolean;
    }) => {
        if (visible) {
            noteVisible.value = visible;
            noteContent.value = content;
            noteLeft.value = left;
            noteTop.value = top;
        } else {
            noteVisible.value = visible;
        }
    };

    // 最后一次点击到节点的left
    const lastClickNodeLeft = ref<string>();
    // 最后一次点击到节点的top
    const lastClickNodeTop = ref<string>();
    const setLastClickNodeInfo = ({ left, top }) => {
        lastClickNodeLeft.value = left;
        lastClickNodeTop.value = top;
    };

    // endregion

    // region 保存与读取本地数据

    // 挂件所在块id
    const blockID = ref<string>('');
    const mindMapData = ref<IMapFullData>();
    // 保存mindMap数据到挂件所在块
    // TODO 多Tab页导图
    const saveMindMapData = async ({ data }: { data: IMapFullData }) => {
        mindMapData.value = data;
        await setBlockAttrs({
            id: blockID.value,
            // id: '20230302162223-3rxpzda',
            attrs: {
                'custom-mind-map-data': JSON.stringify(data),
            },
        })
            .then(() => {
                // console.log('保存成功');
                // console.log(res);
            })
            .catch((e) => {
                message.error('导图数据保存失败');
                console.log(e);
            });
    };

    const init = () => {
        const { id, mindMapData: data } = getWidgetBlockInfo();
        blockID.value = id;
        if (data) {
            mindMapData.value = JSON.parse(data);
        }

        // mindMapData.value = data;
    };

    init();

    // endregion

    // region sidebar样式相关
    const activeSidebar = ref<string>('');
    const setActiveSidebar = (name: string) => {
        activeSidebar.value = name;
    };

    // endregion

    return {
        noteLeft,
        noteTop,
        noteContent,
        noteVisible,
        setNoteInfo,
        lastClickNodeLeft,
        lastClickNodeTop,
        setLastClickNodeInfo,
        saveMindMapData,
        mindMapData,
        isDev,
        node,
        activeNodeList,
        setNode,
        kmind,
        treeData,
        setKmind,
        buildTreeData,
        backEnd,
        forwardEnd,
        setBackForwardStatus,
        activeSidebar,
        setActiveSidebar,
    };
});

// 在setup外使用pinia仓库
export const usePublicStoreWithOut = () => {
    return usePublicStore(store);
};
