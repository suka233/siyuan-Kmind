import { IWidgetBlockAttr } from './types';

export async function 向思源请求数据(
    url: string,
    data: any,
    { headers } = { headers: {} },
): Promise<any> {
    let resData = null;
    await fetch(url, {
        body: headers ? data : JSON.stringify(data),
        method: 'POST',
        // headers: Object.assign({}, headers),
        // {
        //     // Authorization: `Token ${config.token}`,
        // },
    }).then(function (response) {
        if (response.ok) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            resData = response.json();
            // return resData = response.json()
            // return response.json()
            return resData;
        }
        const error_msg = `API错误:(${url})${response.status} ${response.statusText}`;
        console.error(error_msg);
    });
    return resData;
}

// 获取挂件所在块信息
export const getWidgetBlockInfo = (): IWidgetBlockAttr => {
    const blockNode = window.frameElement?.parentElement?.parentElement;
    const id = blockNode?.getAttribute('data-node-id') || '';
    const selectedNotebookId =
        blockNode?.getAttribute('custom-selected-notebook-id') || '';

    return {
        id,
        selectedNotebookId,
    };
};
export function is(val: unknown, type: string) {
    return toString.call(val) === `[object ${type}]`;
}
export function isObject(val: any): val is Record<any, any> {
    return val !== null && is(val, 'Object');
}

// 深度合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
    let key: string;
    for (key in target) {
        src[key] = isObject(src[key])
            ? deepMerge(src[key], target[key])
            : (src[key] = target[key]);
    }
    return src;
}
