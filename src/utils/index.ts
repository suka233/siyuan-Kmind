import { IWidgetBlockAttr } from './types';
import * as process from 'process';
export async function 向思源请求数据(
    url: string,
    data: any,
    { headers }: { headers?: any } = { headers: undefined },
): Promise<any> {
    let resData = null;
    await fetch(url, {
        body: headers ? data : JSON.stringify(data),
        method: 'POST',
        // headers: Object.assign({}, headers),
        // {
        //     // Authorization: `Token ${config.token}`,
        // },
        // 多工作空间开发的时候，需要鉴权
        headers:
            process.env.NODE_ENV === 'development'
                ? {
                      Authorization: 'Token vynpj02enbofr6u1',
                  }
                : undefined,
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
    const id =
        blockNode?.getAttribute('data-node-id') || '20230302162223-3rxpzda';
    const mindMapData = blockNode?.getAttribute('custom-mind-map-data') || '';
    // 根据挂件属性开启debugger模式
    const debuggerMode = blockNode?.getAttribute('custom-debugger') || '';

    const filePath = blockNode?.getAttribute('custom-file-path') || '';

    let dataAssets;
    if (process.env.NODE_ENV === 'development') {
        dataAssets = 'assets/kmind-20230302162223-3rxpzda.kmind';
    } else {
        dataAssets = blockNode?.getAttribute('custom-data-assets') || '';
    }

    return {
        id,
        mindMapData,
        debuggerMode,
        filePath,
        dataAssets,
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

// 是否是符合Node节点数据类型的多叉树
// TODO 增加更严格的类型检查
export const isMultiTree = (data: any) => {
    // 检查节点是否是一个对象，并且是否包含一个children属性
    if (
        typeof data !== 'object' ||
        typeof data?.data !== 'object' ||
        !data.hasOwnProperty('children')
    ) {
        return false;
    }

    // 检查children属性是否是一个数组
    if (!Array.isArray(data.children)) {
        return false;
    }

    // 遍历children数组，递归检查每个子节点
    data.children.forEach((child: any) => {
        if (!isMultiTree(child)) {
            return false;
        }
    });
    // for (let i = 0; i < data.children.length; i++) {
    //     if (!isMultiTree(data.children[i])) {
    //         return false;
    //     }
    // }

    // 如果所有子节点都符合要求，则返回true
    return true;
};

// 是否点击到了备注icon
export const isClickRemarkIcon = (e: any) => {
    // 备注icon的p-id为8793，备注icon的父节点的p-id为8792，无论点击备注icon还是父节点都会触发click事件
    return (
        e.target?.nextElementSibling?.attributes['p-id']?.nodeValue ===
            '8792' || e.target.attributes['p-id']?.nodeValue === '8793'
    );
};

// 是否点击到了超链接icon
// 实测只会点击到path和rect，所以只需要判断这俩情况就行了
// 还会有很小的概率点到a
export const isClickLinkIcon = (
    e: any,
): { isLink: boolean; linkUrl?: string } => {
    // console.log(e.target?.nextElementSibling?.attributes['p-id']?.nodeValue);
    let isLink = false;
    let linkUrl = '';
    // 以下使用switch为啥不行？用if else就行。
    // switch (e) {
    //     // 点击到rect的情况：rect的nextElementSibling的p-id为7982
    //     case e.target?.nextElementSibling?.attributes['p-id']?.nodeValue ===
    //         '7982':
    //         // return {
    //         //     isLink: true,
    //         //     linkUrl: e.target.parentNode.getAttribute('href'),
    //         // };
    //         console.log('xxx');
    //         isLink = true;
    //         linkUrl = e.target.parentNode.getAttribute('href');
    //         break;
    //     // 点击到path的情况：path的parentNode的p-id为7982
    //     case e.target?.parentNode?.attributes['p-id']?.nodeValue === '7982':
    //         // return {
    //         //     isLink: true,
    //         //     linkUrl: e.target.parentNode.parentNode.getAttribute('href'),
    //         // };
    //         isLink = true;
    //         linkUrl = e.target.parentNode.parentNode.getAttribute('href');
    //         break;
    // }

    if (
        e.target?.nextElementSibling?.attributes['p-id']?.nodeValue === '7982'
    ) {
        // 点击到rect的情况：rect的nextElementSibling的p-id为7982
        isLink = true;
        linkUrl = e.target.parentNode.getAttribute('href');
    } else if (e.target?.parentNode?.attributes['p-id']?.nodeValue === '7982') {
        // 点击到path的情况：path的parentNode的p-id为7982
        isLink = true;
        linkUrl = e.target.parentNode.parentNode.getAttribute('href');
    } else if (
        e.target?.childNodes[1]?.attributes['p-id']?.nodeValue === '7982'
    ) {
        // 点击到a标签的情况
        isLink = true;
        linkUrl = e.target.getAttribute('href');
    }

    return {
        isLink,
        linkUrl,
    };
};
