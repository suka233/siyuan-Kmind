import { 向思源请求数据 } from '/@/utils';
import { http } from '/@/utils/http';
import { ISetBlockAttrsParam } from './types';
export * from './types';

/**
 * api
 * @link https://ld246.com/article/1674009028048
 */
enum Api {
    /**
     * 发送sql请求
     */
    SQL = '/api/query/sql',
    OpenNotebook = '/api/notebook/openNotebook',
    CreateNotebook = '/api/notebook/createNotebook',
    CreateDocWithMd = '/api/filetree/createDocWithMd',
    ListNotebook = '/api/notebook/lsNotebooks',
    GetNotebookConf = '/api/notebook/getNotebookConf',
    GetBlockAttrs = '/api/attr/getBlockAttrs',
    SetBlockAttrs = '/api/attr/setBlockAttrs',
    UploadAsset = '/api/asset/upload',
    PutFile = '/api/file/putFile',
    GetFile = '/api/file/getFile',
}

/**
 * 发送sql请求
 */
export const querySql = (params: string) => {
    return 向思源请求数据(Api.SQL, {
        stmt: params,
    });
};

/**
 * 打开笔记
 */
export const openNote = (notebook: string) => {
    return 向思源请求数据(Api.OpenNotebook, {
        notebook,
    });
};

/**
 * 创建笔记本
 */
export const createNotebook = (name: string) => {
    return 向思源请求数据(Api.CreateNotebook, {
        name,
    });
};

/**
 * 创建文档
 * {
 *     "notebook":"20210808180117-czj9bvb",
 *     "path":"/daily note/2023/01/2023-01-29",
 *     "markdown":""
 * }
 */
export const createDocWithMd = (
    notebook: string,
    path: string,
    markdown: string,
) => {
    return 向思源请求数据(Api.CreateDocWithMd, {
        notebook,
        path,
        markdown,
    });
};

/**
 * 列出笔记本
 */
export const listNotebook = () => {
    return 向思源请求数据(Api.ListNotebook, {});
};

/**
 * 获取笔记本配置
 */
export const getNotebookConf = (notebookId) => {
    return 向思源请求数据(Api.GetNotebookConf, { notebook: notebookId });
};

/**
 * 获取块属性
 */
export const getBlockAttrs = (id) => {
    return 向思源请求数据(Api.GetBlockAttrs, { id });
};

/**
 * 设置块属性
 */
export const setBlockAttrs = (params: ISetBlockAttrsParam) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return 向思源请求数据(Api.SetBlockAttrs, params, { headers: undefined });
};

/**
 * 上传资源
 * @link https://github.com/siyuan-note/siyuan/blob/master/API_zh_CN.md?utm_source=ld246.com#%E4%B8%8A%E4%BC%A0%E8%B5%84%E6%BA%90%E6%96%87%E4%BB%B6
 */
export const uploadAsset = ({ path = '/assets/', file }) => {
    const formData = new FormData();
    formData.append('assetsDirPath', path);
    formData.append('file[]', file);
    return 向思源请求数据(Api.UploadAsset, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    // return http.post(Api.UploadAsset, formData, {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    // });
};

/**
 * 写入文件
 */
export const putFile = ({
    file,
    path = '/assets/',
    isDir = false,
    modeTime = Date.now(),
}) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    formData.append('isDir', isDir);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    formData.append('modeTime', modeTime);

    return http.post(Api.PutFile, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

/**
 * 获取文件
 */
export const getFile = ({ path }) => {
    return 向思源请求数据(Api.GetFile, { path });
};
