/**
 * 挂件所在块的存储的数据
 */
export interface IWidgetBlockAttr {
    /**
     * 挂件所在块id
     */
    id: string;
    /**
     * mindMap数据
     */
    mindMapData: string;
    /**
     * 是否开启debugger模式
     */
    debuggerMode: string;
    /**
     * 文件路径
     */
    filePath: string;
    /**
     * 思源会把custom-data-assets的值设置为引用资源，不会被清理掉
     */
    dataAssets: string;
    /**
     * 挂件所在块的节点
     */
    blockNode?: HTMLElement | null;
    /**
     * 挂件所在块的iframe节点
     */
    iframeNode: HTMLIFrameElement | null;
}
