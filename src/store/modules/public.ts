import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getWidgetBlockInfo } from '/@/utils';
import { setBlockAttrs } from '/@/api/public';
import { message } from 'ant-design-vue';
import store from '/@/store';
export const usePublicStore = defineStore('app-public', () => {
    // region 节点相关
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
    const mindMapData = ref<string>('');
    // 保存mindMap数据到挂件所在块
    // TODO 多Tab页导图
    const saveMindMapData = async ({ data }) => {
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
        mindMapData.value = JSON.parse(data);
        // mindMapData.value = data;
    };

    init();

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
    };
});

// 在setup外使用pinia仓库
export const usePublicStoreWithOut = () => {
    return usePublicStore(store);
};
