import MindMap from 'simple-mind-map';
import { usePublicStoreWithOut } from '/@/store/modules/public';
import { storeToRefs } from 'pinia';
import KeyboardNavigation from 'simple-mind-map/src/plugins/KeyboardNavigation';
import Drag from 'simple-mind-map/src/plugins/Drag';
import Select from 'simple-mind-map/src/plugins/Select';
import RichText from 'simple-mind-map/src/plugins/RichText';
// import Export from 'simple-mind-map/src/plugins/Export';
import Export from '../plugins/ExportPlugin';
import ExportPDF from 'simple-mind-map/src/plugins/ExportPDF';
import AssociativeLine from 'simple-mind-map/src/plugins/AssociativeLine';
import NodeImgAdjust from 'simple-mind-map/src/plugins/NodeImgAdjust';
import TouchEvent from 'simple-mind-map/src/plugins/TouchEvent';
import ExportXMind from 'simple-mind-map/src/plugins/ExportXMind';
import Painter from 'simple-mind-map/src/plugins/Painter.js';
import MiniMap from 'simple-mind-map/src/plugins/MiniMap.js';
const publicStoreWithOut = usePublicStoreWithOut();
const { setNoteInfo } = publicStoreWithOut;
const { noteVisible, treeData, filePath, localConfig } =
    storeToRefs(publicStoreWithOut);

export let kmind;

export const useKmind = (el) => {
    if (el && !kmind) {
        // @ts-ignore
        MindMap.usePlugin(KeyboardNavigation)
            .usePlugin(Drag)
            .usePlugin(Select)
            .usePlugin(RichText)
            .usePlugin(Export)
            .usePlugin(AssociativeLine)
            .usePlugin(NodeImgAdjust)
            .usePlugin(TouchEvent)
            .usePlugin(ExportXMind)
            .usePlugin(ExportPDF)
            .usePlugin(Painter)
            .usePlugin(MiniMap);
        kmind = new MindMap({
            el,
            data: {
                data: {
                    text: `suka`,
                },
                children: [],
            },
            customNoteContentShow: {
                show(content, left, top) {
                    // console.log('show');
                    if (!noteVisible.value) {
                        setNoteInfo({ content, left, top, visible: true });
                    }
                },
                hide() {
                    // console.log('hide');
                    // 如果鼠标一直在备注icon上或者移动到了note上，则不隐藏，否则2秒后隐藏
                    // console.log('hide');
                    // if (noteVisible.value) {
                    //     setNoteInfo({ visible: false });
                    // }
                },
            },
            customHandleMousewheel: (e) => {
                // 自定义鼠标滚轮事件
                const { deltaX, deltaY, ctrlKey } = e;
                // console.log(e);
                if (ctrlKey) {
                    // 缩放
                    if (deltaY > 0 || deltaX > 0) kmind.view.narrow();
                    else kmind.view.enlarge();
                } else {
                    if (deltaX === -0) {
                        // Y轴滚动 滚动一次默认是100，太大了，所以除以3，即滚动一次移动33px
                        kmind.view.translateY(-deltaY / 3);
                    } else {
                        // X轴滚动
                        kmind.view.translateX(-deltaX / 3);
                    }
                }
            },
            isUseCustomNodeContent: true,
            customCreateNodeContent: (node) => {
                // console.log(node);
                // console.log(node?.nodeData?.data?.kmind?.type);
                const div = document.createElement('div');
                div.style.height = '360px';
                div.style.width = '360px';
                // new window.parent.kmindApi.siyuan.Protyle(this.app, div, {
                //     blockId: '20200812220555-lj3enxa',
                // });

                if (node?.nodeData?.data?.kmind?.type === 'suka') {
                    return div;
                } else {
                    return null;
                }
            },
        });
    }

    const downloadKmind = (filename: string, isFullValue: boolean) => {
        const kmindData: KmindFullDataType = {
            kmind: {
                saveType: 'file',
                filePath: filePath.value,
                localeConfig: localConfig.value,
            },
            ...kmind.getData(isFullValue),
        };

        const json = JSON.stringify(kmindData);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename + '.kmind';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const loadKmindFullData = (data: KmindFullDataType) => {
        kmind.setFullData(data);
        // 加载额外的配置
        // 避免不存在kmind节点导致默认的localConfig被覆盖
        if (data?.kmind?.localeConfig) {
            localConfig.value = Object.assign(
                {},
                localConfig.value,
                data.kmind.localeConfig,
            );
        }
    };

    return {
        downloadKmind,
        loadKmindFullData,
    };
};

// 递归展开tree
const expandTree = (data) => {
    const temp: NodeTreeType = {};
    temp.title = data.data.text;
    // 外部导入的kmind文件没有_node属性,所以要兼容一下
    temp.key = data?._node?.uid ?? data.data.uid;
    temp._node = data?._node ?? data.data;
    temp.data = data.data;
    if (data.children.length) {
        temp.children = [];
        data.children.forEach((item) => {
            temp.children?.push(expandTree(item));
        });
    }
    return temp;
};

export const buildTreeData = () => {
    treeData.value = [expandTree(kmind.renderer.renderTree)];
};
