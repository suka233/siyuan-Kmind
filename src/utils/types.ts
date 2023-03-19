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
}
