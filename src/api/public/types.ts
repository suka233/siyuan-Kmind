/**
 * SQL查询日记本列表响应参数
 */
export interface ISQLAllDiaryResponse {
    code: number;
    msg: string;
    data: Array<{
        /**
         * 内容块id
         */
        id: string;
        /**
         * 双亲块id
         * 如果内容块的type为d,则该字段为空
         */
        parent_id: string;
        /**
         * 文档块id
         */
        root_id: string;
        /**
         * 一级标题:去除了MD标记符的文本
         */
        content: string;
        /**
         * 笔记本id
         */
        box: string;
        /**
         * 内容块所在文档路径
         */
        path: string;
        /**
         * 面包屑路径
         */
        hpath: string;
        /**
         * 内容块名称
         */
        name: string;
        /**
         * 内容块别名
         */
        alias: string;
        /**
         * 内容块备注
         */
        memo: string;
        /**
         * tag 2.0.4+
         * 非文档块为块内包含的标签
         * 文档块为文档的标签
         */
        tag: string;
        /**
         * 第一个子块内容
         */
        fcontent: string;
        /**
         * MD格式的内容
         */
        markdown: string;
        /**
         * MD字段文本长度
         */
        length: number;
        /**
         * 内容块类型
         * d:文档
         * h:标题
         * html:HTML
         * video:视频
         * audio:音频
         * widget:挂件块
         * iframe:iframe
         * query_embed:嵌入块
         *
         * @link https://www.yuque.com/siyuannote/docs/go7uom
         */
        type: string;
        /**
         * 内容块子类型
         */
        subtype: string;
        /**
         * 内联属性列表
         */
        ial: string;
        /**
         * 排序权重,越小越靠前
         */
        sort: number;
        /**
         * 创建时间
         */
        created: string;
        /**
         * 更新时间
         */
        updated: string;
    }>;
}

/**
 * 获取笔记本列表响应参数
 */
export interface IListNotebookResponse {
    code: number;
    msg: string;
    data: {
        notebooks: Array<{
            id: string;
            name: string;
            icon: string;
            sort: number;
            closed: boolean;
        }>;
    };
}

/**
 * 获取块属性响应参数
 */
export interface IGetBlockAttrResponse {
    code: number;
    msg: string;
    data: {
        id: string;
        icon: string;
        title: string;
        'title-image': string;
        updated: string;
    };
}

/**
 * 设置块属性请求参数
 */
export interface ISetBlockAttrsParam {
    id: string;
    /**
     * 自定义属性必须以 custom- 作为前缀
     * 例如
     *  "attrs": {
     *     "custom-attr1": "line1\n line2"
     *   }
     */
    attrs: Record<string, string>;
}
