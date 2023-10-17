import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { getWidgetBlockInfo } from '/@/utils';
import { setBlockAttrs, getFile, uploadAsset, putFile } from '/@/api/public';
import { message } from 'ant-design-vue';
import store from '/@/store';
import dayjs from 'dayjs';
// import { formatTimeAgo } from '@vueuse/core';
// import * as process from 'process';
export const usePublicStore = defineStore('app-public', () => {
    // region 环境相关
    const debuggerMode = ref<boolean>(false);
    const isDev = computed(() => {
        // return false;
        // return process?.env?.NODE_ENV === 'development' || debuggerMode.value;
        return debuggerMode.value;
    });
    const env = ref<'widget' | 'plugin'>();
    // endregion

    // region map相关
    // const kmind = ref<any>();
    const treeData = ref();
    // 初始化导图的配置
    const localConfig = ref<KmindLocaleConfigType>({
        // 是否开启禅模式
        isZenMode: false,
        // 是否全屏，此项不需要同步存储
        isFullScreen: false,
        // 是否开启小地图
        miniMapVisible: false,
        // 只读模式
        readonlyMode: false,
    });

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

    // 样式相关
    const mindMapStyle = ref({
        backgroundColor: '',
        lineColor: '',
        lineWidth: '',
        lineStyle: '',
        rootLineKeepSameInCurve: '',
        generalizationLineWidth: '',
        generalizationLineColor: '',
        associativeLineColor: '',
        associativeLineWidth: 0,
        associativeLineActiveWidth: 0,
        associativeLineActiveColor: '',
        associativeLineTextFontSize: 0,
        associativeLineTextColor: '',
        associativeLineTextFontFamily: '',
        paddingX: 0,
        paddingY: 0,
        imgMaxWidth: 0,
        imgMaxHeight: 0,
        iconSize: 0,
        backgroundImage: '',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '',
        backgroundSize: '',
        // 对应kmind.getThemeConfig().second 二级节点的样式
        second: { marginX: 0, marginY: 0 },
        // 对应kmind.getThemeConfig().node 三级及以下节点的样式
        node: { marginX: 0, marginY: 0 },
        nodeUseLineStyle: false,
    });

    const watermarkConfig = ref({
        show: false,
        text: '',
        lineSpacing: 100,
        textSpacing: 100,
        angle: 30,
        textStyle: {
            color: '',
            opacity: 0,
            fontSize: 1,
        },
    });

    // endregion

    // region 节点相关
    const activeNodeList = ref<any[]>([]);
    // const node = ref<any>({});
    const node = computed(() => activeNodeList.value[0]);

    // 当前节点备注content
    const noteContent = ref<string>();
    // 当前节点备注left
    const noteLeft = ref<string>();
    // 当前节点备注top
    const noteTop = ref<string>();
    // 当前节点备注显示隐藏
    const noteVisible = ref<boolean>(false);
    // 当前节点normal态的style
    const nodeNormalStyle = ref({
        shape: '',
        paddingX: 0,
        paddingY: 0,
        color: '',
        fontFamily: '',
        fontSize: '',
        lineHeight: '',
        textDecoration: '',
        fontWeight: '',
        fontStyle: '',
        borderWidth: '',
        borderColor: '',
        fillColor: '',
        borderDasharray: '',
        borderRadius: '',
        lineColor: '',
        lineDasharray: '',
        lineWidth: '',
    });
    // 当前节点active态的style
    const nodeActiveStyle = ref<Record<string, any>>({});
    // 是否正在格式刷
    const isPainting = ref(false);

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
    const dataAssets = ref<string>('');
    const fileName = ref<string>('kmind');
    const saveLoading = ref<boolean>(false);
    const lastSaveTime = ref<string>('');
    // const saveTimeAgo = ref('');
    // 保存mindMap数据到挂件所在块
    // TODO 多Tab页导图
    const saveMindMapData = async ({ data }: { data: MapFullDataType }) => {
        if (env.value === 'widget') {
            mindMapData.value = data;
            dataAssets.value = `assets/${fileName.value}-${blockID.value}.kmind`;
            filePath.value = `/data/${dataAssets.value}`;

            // 保存文件路径到挂件所在块
            await setBlockAttrs({
                id: blockID.value,
                attrs: {
                    // 'custom-mind-map-data': JSON.stringify(data),
                    // 'custom-file-path': filePath.value,
                    // 将老数据源置空
                    'custom-mind-map-data': '',
                    'custom-file-path': '',
                    'custom-data-assets': dataAssets.value,
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
            const kmindData: KmindFullDataType = {
                kmind: {
                    saveType: 'file',
                    filePath: filePath.value,
                    localeConfig: localConfig.value,
                },
                ...data,
            };
            const json = JSON.stringify(kmindData);
            const blob = new Blob([json], { type: 'application/json' });
            // 文件名必须拼接上blockID.value，否则思源会自动随机一个id来覆盖
            const file = new File([blob], `kmind-${blockID.value}.kmind`, {
                type: 'application/json',
                lastModified: Date.now(),
            });

            await uploadAsset({ file: file })
                .then(() => {
                    const date = new Date();
                    lastSaveTime.value = dayjs(date).format(
                        'YYYY-MM-DD HH:mm:ss',
                    );
                    // saveTimeAgo.value = formatTimeAgo(date);
                })
                .catch((e) => {
                    message.error('导图数据保存失败，请手动导出备份数据！');
                    console.log(e);
                });
        } else {
            mindMapData.value = data;

            // 保存到本地文件
            const kmindData: KmindFullDataType = {
                kmind: {
                    saveType: 'file',
                    filePath: filePath.value,
                    localeConfig: localConfig.value,
                },
                ...data,
            };
            const json = JSON.stringify(kmindData);
            const blob = new Blob([json], { type: 'application/json' });
            const file = new File([blob], `${fileName.value}.kmind`, {
                type: 'application/json',
                lastModified: Date.now(),
            });

            saveLoading.value = true;
            await putFile({
                file,
                path: `/data/storage/petal/kmind/${fileName.value}.kmind`,
            })
                .then(() => {
                    saveLoading.value = false;
                    const date = new Date();
                    lastSaveTime.value = dayjs(date).format(
                        'YYYY-MM-DD HH:mm:ss',
                    );
                    // saveTimeAgo.value = formatTimeAgo(date);
                })
                .catch((e) => {
                    message.error('导图数据保存失败，请手动导出备份数据！');
                    console.log(e);
                });
        }
    };

    const init = async () => {
        if (env.value === 'widget') {
            const {
                id,
                mindMapData: data,
                debuggerMode: _debuggerMode,
                filePath: _filePath,
                dataAssets: _dataAssets,
            } = getWidgetBlockInfo();
            blockID.value = id;
            const getFileFromSiyuan = async ({ path, tip }) => {
                await getFile({ path })
                    .then((res) => {
                        mindMapData.value = res;
                        // 老版本数据没有kmind字段，需要兼容
                        // TODO：初始化localConfig为用户已经存储在挂件文件夹下的默认值
                        // localConfig.value = res?.kmind?.localeConfig ?? {
                        //     isZenMode: false,
                        //     isFullScreen: false,
                        //     readonlyMode: false,
                        // };
                        // 如果localeConfig字段存在的话，那么就把res.kmind.localeConfig合并到localConfig里
                        if (res?.kmind?.localeConfig) {
                            localConfig.value = Object.assign(
                                {},
                                localConfig.value,
                                res?.kmind?.localeConfig,
                            );
                        }
                    })
                    .catch((e) => {
                        message.error(
                            `从本地读取导图数据失败，请检查此挂件的自定义属性的${tip}是否正确!`,
                        );
                        console.log(e);
                    });
            };

            // 如果存在最新的数据源，则从最新的数据源读取数据，同时兼容老的数据源
            if (_dataAssets) {
                dataAssets.value = _dataAssets;
                filePath.value = `/data/${_dataAssets}`;
                await getFileFromSiyuan({
                    path: filePath.value,
                    tip: 'data-assets',
                });
            } else if (_filePath) {
                // 如果存在老的数据源，则从老的数据源读取数据 v0.1.3
                filePath.value = _filePath;
                await getFileFromSiyuan({
                    path: filePath.value,
                    tip: 'file-path',
                });
            } else if (data) {
                // 兼容老版本插件，直接从挂件上获取数据
                mindMapData.value = JSON.parse(data);
            }

            // 如果存在值，则为debugger模式
            if (_debuggerMode) {
                debuggerMode.value = true;
            }
        } else {
            // 挂件获取数据
            const getFileFromSiyuan = async ({ path, tip }) => {
                await getFile({ path })
                    .then((res) => {
                        mindMapData.value = res || {};
                        // 老版本数据没有kmind字段，需要兼容
                        // TODO：初始化localConfig为用户已经存储在挂件文件夹下的默认值
                        // localConfig.value = res?.kmind?.localeConfig ?? {
                        //     isZenMode: false,
                        //     isFullScreen: false,
                        // };
                        // 如果localeConfig字段存在的话，那么就把res.kmind.localeConfig合并到localConfig里
                        if (res?.kmind?.localeConfig) {
                            localConfig.value = Object.assign(
                                {},
                                localConfig.value,
                                res?.kmind?.localeConfig,
                            );
                        }
                    })
                    .catch((e) => {
                        message.error(
                            `从本地读取导图数据失败，请检查此挂件的自定义属性的${tip}是否正确!`,
                        );
                        console.log(e);
                    });
            };
            // filePath.value = path
            await getFileFromSiyuan({
                path: `/data/storage/petal/kmind/${fileName.value}.kmind`,
                tip: 'data-assets',
            });
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
        noteLeft,
        noteTop,
        noteContent,
        noteVisible,
        nodeNormalStyle,
        nodeActiveStyle,
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
        treeData,
        localConfig,
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
        lastSaveTime,
        env,
        saveLoading,
        // saveTimeAgo,
        isPainting,
        mindMapStyle,
        watermarkConfig,
    };
});

// 在setup外使用pinia仓库
export const usePublicStoreWithOut = () => {
    return usePublicStore(store);
};
