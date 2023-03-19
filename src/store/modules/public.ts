import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { getWidgetBlockInfo } from '/@/utils';
import { setBlockAttrs, getFile, uploadAsset } from '/@/api/public';
import { message } from 'ant-design-vue';
import store from '/@/store';
import * as process from 'process';
export const usePublicStore = defineStore('app-public', () => {
    // region 环境相关
    const debuggerMode = ref<boolean>(false);
    const isDev = computed(() => {
        return process.env.NODE_ENV === 'development' || debuggerMode.value;
    });
    // endregion

    // region map相关
    const kmind = ref<any>();
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
    const activeNodeList = ref<any[]>([]);
    // const node = ref<any>({});
    const node = computed(() => activeNodeList.value[0]);
    // 复制的节点
    const copyNode = ref<any>({});
    // 复制的节点的json数据,用于跨导图复制节点信息
    const copyNodeJson = computed(() => JSON.stringify(copyNode.value));

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
    const mindMapData = ref<MapFullDataType>();
    const filePath = ref<string>('');
    const fileName = ref<string>('kmind');
    // 保存mindMap数据到挂件所在块
    // TODO 多Tab页导图
    const saveMindMapData = async ({ data }: { data: MapFullDataType }) => {
        mindMapData.value = data;
        filePath.value = `/data/assets/${fileName.value}-${blockID.value}.kmind`;

        // 保存文件路径到挂件所在块
        await setBlockAttrs({
            id: blockID.value,
            attrs: {
                'custom-mind-map-data': '',
                // 'custom-mind-map-data': JSON.stringify(data),
                'custom-file-path': filePath.value,
            },
        })
            .then(() => {
                // console.log('保存成功');
                // console.log(res);
            })
            .catch((e) => {
                message.error('导图数据保存失败，请手动导出备份数据！');
                console.log(e);
            });

        // 保存到本地文件
        const json = JSON.stringify(data);
        const blob = new Blob([json], { type: 'application/json' });
        // 文件名必须拼接上blockID.value，否则思源会自动随机一个id来覆盖
        const file = new File([blob], `kmind-${blockID.value}.kmind`, {
            type: 'application/json',
            lastModified: Date.now(),
        });

        await uploadAsset({ file: file })
            .then((res) => console.log(res))
            .catch((e) => {
                message.error('导图数据保存失败，请手动导出备份数据！');
                console.log(e);
            });
    };

    const init = async () => {
        const {
            id,
            mindMapData: data,
            debuggerMode: _debuggerMode,
            filePath: _filePath,
        } = getWidgetBlockInfo();
        blockID.value = id;

        // 兼容老版本插件，直接从挂件上获取数据
        if (data) {
            mindMapData.value = JSON.parse(data);
        }

        // 新版保存数据的方式：如果存在值，则从本地文件读取数据,覆盖从挂件上获取的数据
        if (_filePath) {
            filePath.value = _filePath;
            await getFile({ path: _filePath })
                .then((res) => {
                    mindMapData.value = res;
                    console.log('store', mindMapData.value);
                })
                .catch((e) => {
                    message.error(
                        '从本地读取导图数据失败，请检查此挂件的自定义属性的filePath是否正确!',
                    );
                    console.log(e);
                });
        }
        // 如果存在值，则为debugger模式
        if (_debuggerMode) {
            debuggerMode.value = true;
        }
    };

    // endregion

    // region sidebar样式相关
    const activeSidebar = ref<string>('');
    const setActiveSidebar = (name: string) => {
        activeSidebar.value = name;
    };

    // endregion

    // region 右键菜单相关
    const ctxMenuLeft = ref<string>();
    const ctxMenuTop = ref<string>();
    const ctxMenuVisible = ref<boolean>(false);
    const ctxMenuType = ref<'map' | 'node'>();

    // endregion

    return {
        copyNode,
        copyNodeJson,
        noteLeft,
        noteTop,
        noteContent,
        noteVisible,
        setNoteInfo,
        lastClickNodeLeft,
        lastClickNodeTop,
        setLastClickNodeInfo,
        saveMindMapData,
        blockID,
        mindMapData,
        filePath,
        fileName,
        isDev,
        node,
        activeNodeList,
        kmind,
        treeData,
        buildTreeData,
        backEnd,
        forwardEnd,
        setBackForwardStatus,
        activeSidebar,
        setActiveSidebar,
        ctxMenuLeft,
        ctxMenuTop,
        ctxMenuVisible,
        ctxMenuType,
        init,
    };
});

// 在setup外使用pinia仓库
export const usePublicStoreWithOut = () => {
    return usePublicStore(store);
};
