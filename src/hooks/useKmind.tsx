import MindMap from 'simple-mind-map';
import { usePublicStoreWithOut } from '/@/store/modules/public';
import { storeToRefs } from 'pinia';
import KeyboardNavigation from 'simple-mind-map/src/plugins/KeyboardNavigation';
import Drag from 'simple-mind-map/src/plugins/Drag';
import Select from 'simple-mind-map/src/plugins/Select';
import RichText from 'simple-mind-map/src/plugins/RichText';
import Export from 'simple-mind-map/src/plugins/Export';
import AssociativeLine from 'simple-mind-map/src/plugins/AssociativeLine';
import NodeImgAdjust from 'simple-mind-map/src/plugins/NodeImgAdjust';
import TouchEvent from 'simple-mind-map/src/plugins/TouchEvent';
const publicStoreWithOut = usePublicStoreWithOut();
const { setNoteInfo } = publicStoreWithOut;
const { noteVisible, treeData } = storeToRefs(publicStoreWithOut);

export let kmind;

export const useKmind = (el) => {
    if (!kmind) {
        MindMap.usePlugin(KeyboardNavigation)
            .usePlugin(Drag)
            .usePlugin(Select)
            .usePlugin(RichText)
            .usePlugin(Export)
            .usePlugin(AssociativeLine)
            .usePlugin(NodeImgAdjust)
            .usePlugin(TouchEvent);
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
                console.log(node);
                console.log(node?.nodeData?.data?.kmind?.type);
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
};

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

export const buildTreeData = () => {
    treeData.value = [expandTree(kmind.renderer.renderTree)];
};
