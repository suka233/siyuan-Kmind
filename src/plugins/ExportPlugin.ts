// @ts-nocheck
/* eslint-disable */
import { SVG } from '@svgdotjs/svg.js';
import domtoimage from 'dom-to-image-more';
//  图片转成dataURL
export const imgToDataUrl = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        // 跨域图片需要添加这个属性，否则画布被污染了无法导出图片
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                // 图片绘制到canvas里
                ctx.drawImage(img, 0, 0, img.width, img.height);
                resolve(canvas.toDataURL());
            } catch (e) {
                reject(e);
            }
        };
        img.onerror = (e) => {
            reject(e);
        };
        img.src = src;
    });
};

export const downloadFile = (file, fileName) => {
    const a = document.createElement('a');
    a.href = file;
    a.download = fileName;
    a.click();
};

// 将blob转成data:url
export const readBlob = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (evt) => {
            resolve(evt.target.result);
        };
        reader.onerror = (err) => {
            reject(err);
        };
        reader.readAsDataURL(blob);
    });
};

// 移除字符串中的html实体
export const removeHTMLEntities = (str) => {
    [['&nbsp;', '&#160;']].forEach((item) => {
        str = str.replaceAll(item[0], item[1]);
    });
    return str;
};

// 将以空格分隔的字符串值转换成成数字/单位/值数组
const getNumberValueFromStr = (value) => {
    const arr = String(value).split(/\s+/);
    return arr.map((item) => {
        if (/^[\d.]+/.test(item)) {
            // 数字+单位
            const res = /^([\d.]+)(.*)$/.exec(item);
            return [Number(res[1]), res[2]];
        } else {
            // 单个值
            return item;
        }
    });
};

// 缩放宽度
const zoomWidth = (ratio, height) => {
    // w / height = ratio
    return ratio * height;
};

// 缩放高度
const zoomHeight = (ratio, width) => {
    // width / h = ratio
    return width / ratio;
};

// 关键词到百分比值的映射
const keyWordToPercentageMap = {
    left: 0,
    top: 0,
    center: 50,
    bottom: 100,
    right: 100,
};

// 模拟background-size
const handleBackgroundSize = ({
    backgroundSize,
    drawOpt,
    imageRatio,
    canvasWidth,
    canvasHeight,
    canvasRatio,
}) => {
    if (backgroundSize) {
        // 将值转换成数组
        const backgroundSizeValueArr = getNumberValueFromStr(backgroundSize);
        // 两个值都为auto，那就相当于不设置
        if (
            backgroundSizeValueArr[0] === 'auto' &&
            backgroundSizeValueArr[1] === 'auto'
        ) {
            return;
        }
        // 值为cover
        if (backgroundSizeValueArr[0] === 'cover') {
            if (imageRatio > canvasRatio) {
                // 图片的宽高比大于canvas的宽高比，那么图片高度缩放到和canvas的高度一致，宽度自适应
                drawOpt.height = canvasHeight;
                drawOpt.width = zoomWidth(imageRatio, canvasHeight);
            } else {
                // 否则图片宽度缩放到和canvas的宽度一致，高度自适应
                drawOpt.width = canvasWidth;
                drawOpt.height = zoomHeight(imageRatio, canvasWidth);
            }
            return;
        }
        // 值为contain
        if (backgroundSizeValueArr[0] === 'contain') {
            if (imageRatio > canvasRatio) {
                // 图片的宽高比大于canvas的宽高比，那么图片宽度缩放到和canvas的宽度一致，高度自适应
                drawOpt.width = canvasWidth;
                drawOpt.height = zoomHeight(imageRatio, canvasWidth);
            } else {
                // 否则图片高度缩放到和canvas的高度一致，宽度自适应
                drawOpt.height = canvasHeight;
                drawOpt.width = zoomWidth(imageRatio, canvasHeight);
            }
            return;
        }
        // 图片宽度
        let newNumberWidth = -1;
        if (backgroundSizeValueArr[0]) {
            if (Array.isArray(backgroundSizeValueArr[0])) {
                // 数字+单位类型
                if (backgroundSizeValueArr[0][1] === '%') {
                    // %单位
                    drawOpt.width =
                        (backgroundSizeValueArr[0][0] / 100) * canvasWidth;
                    newNumberWidth = drawOpt.width;
                } else {
                    // 其他都认为是px单位
                    drawOpt.width = backgroundSizeValueArr[0][0];
                    newNumberWidth = backgroundSizeValueArr[0][0];
                }
            } else if (backgroundSizeValueArr[0] === 'auto') {
                // auto类型，那么根据设置的新高度以图片原宽高比进行自适应
                if (backgroundSizeValueArr[1]) {
                    if (backgroundSizeValueArr[1][1] === '%') {
                        // 高度为%单位
                        drawOpt.width = zoomWidth(
                            imageRatio,
                            (backgroundSizeValueArr[1][0] / 100) * canvasHeight,
                        );
                    } else {
                        // 其他都认为是px单位
                        drawOpt.width = zoomWidth(
                            imageRatio,
                            backgroundSizeValueArr[1][0],
                        );
                    }
                }
            }
        }
        // 设置了图片高度
        if (
            backgroundSizeValueArr[1] &&
            Array.isArray(backgroundSizeValueArr[1])
        ) {
            // 数字+单位类型
            if (backgroundSizeValueArr[1][1] === '%') {
                // 高度为%单位
                drawOpt.height =
                    (backgroundSizeValueArr[1][0] / 100) * canvasHeight;
            } else {
                // 其他都认为是px单位
                drawOpt.height = backgroundSizeValueArr[1][0];
            }
        } else if (newNumberWidth !== -1) {
            // 没有设置图片高度或者设置为auto，那么根据设置的新宽度以图片原宽高比进行自适应
            drawOpt.height = zoomHeight(imageRatio, newNumberWidth);
        }
    }
};

// 模拟background-position
const handleBackgroundPosition = ({
    backgroundPosition,
    drawOpt,
    imgWidth,
    imgHeight,
    canvasWidth,
    canvasHeight,
}) => {
    if (backgroundPosition) {
        // 将值转换成数组
        let backgroundPositionValueArr =
            getNumberValueFromStr(backgroundPosition);
        // 将关键词转为百分比
        backgroundPositionValueArr = backgroundPositionValueArr.map((item) => {
            if (typeof item === 'string') {
                return keyWordToPercentageMap[item] !== undefined
                    ? [keyWordToPercentageMap[item], '%']
                    : item;
            }
            return item;
        });
        if (Array.isArray(backgroundPositionValueArr[0])) {
            if (backgroundPositionValueArr.length === 1) {
                // 如果只设置了一个值，第二个默认为50%
                backgroundPositionValueArr.push([50, '%']);
            }
            // 水平位置
            if (backgroundPositionValueArr[0][1] === '%') {
                // 单位为%
                const canvasX =
                    (backgroundPositionValueArr[0][0] / 100) * canvasWidth;
                const imgX =
                    (backgroundPositionValueArr[0][0] / 100) * imgWidth;
                // 计算差值
                drawOpt.x = canvasX - imgX;
            } else {
                // 其他单位默认都为px
                drawOpt.x = backgroundPositionValueArr[0][0];
            }
            // 垂直位置
            if (backgroundPositionValueArr[1][1] === '%') {
                // 单位为%
                const canvasY =
                    (backgroundPositionValueArr[1][0] / 100) * canvasHeight;
                const imgY =
                    (backgroundPositionValueArr[1][0] / 100) * imgHeight;
                // 计算差值
                drawOpt.y = canvasY - imgY;
            } else {
                // 其他单位默认都为px
                drawOpt.y = backgroundPositionValueArr[1][0];
            }
        }
    }
};

// 模拟background-repeat
const handleBackgroundRepeat = ({
    ctx,
    image,
    backgroundRepeat,
    drawOpt,
    imgWidth,
    imgHeight,
    canvasWidth,
    canvasHeight,
}) => {
    if (backgroundRepeat) {
        // 保存在handleBackgroundPosition中计算出来的x、y
        const ox = drawOpt.x;
        const oy = drawOpt.y;
        // 计算ox和oy能平铺的图片数量
        const oxRepeatNum = Math.ceil(ox / imgWidth);
        const oyRepeatNum = Math.ceil(oy / imgHeight);
        // 计算ox和oy第一张图片的位置
        const oxRepeatX = ox - oxRepeatNum * imgWidth;
        const oxRepeatY = oy - oyRepeatNum * imgHeight;
        // 将值转换成数组
        const backgroundRepeatValueArr =
            getNumberValueFromStr(backgroundRepeat);
        // 不处理
        if (
            backgroundRepeatValueArr[0] === 'no-repeat' ||
            (imgWidth >= canvasWidth && imgHeight >= canvasHeight)
        ) {
            return;
        }
        // 水平平铺
        if (backgroundRepeatValueArr[0] === 'repeat-x') {
            if (canvasWidth > imgWidth) {
                let x = oxRepeatX;
                while (x < canvasWidth) {
                    drawImage(ctx, image, {
                        ...drawOpt,
                        x,
                    });
                    x += imgWidth;
                }
                return true;
            }
        }
        // 垂直平铺
        if (backgroundRepeatValueArr[0] === 'repeat-y') {
            if (canvasHeight > imgHeight) {
                let y = oxRepeatY;
                while (y < canvasHeight) {
                    drawImage(ctx, image, {
                        ...drawOpt,
                        y,
                    });
                    y += imgHeight;
                }
                return true;
            }
        }
        // 平铺
        if (backgroundRepeatValueArr[0] === 'repeat') {
            let x = oxRepeatX;
            while (x < canvasWidth) {
                if (canvasHeight > imgHeight) {
                    let y = oxRepeatY;
                    while (y < canvasHeight) {
                        drawImage(ctx, image, {
                            ...drawOpt,
                            x,
                            y,
                        });
                        y += imgHeight;
                    }
                }
                x += imgWidth;
            }
            return true;
        }
    }
};

// 根据参数绘制图片
const drawImage = (ctx, image, drawOpt) => {
    ctx.drawImage(
        image,
        drawOpt.sx,
        drawOpt.sy,
        drawOpt.swidth,
        drawOpt.sheight,
        drawOpt.x,
        drawOpt.y,
        drawOpt.width,
        drawOpt.height,
    );
};

const drawBackgroundImageToCanvas = (
    ctx,
    width,
    height,
    img,
    { backgroundSize, backgroundPosition, backgroundRepeat },
    callback = () => {},
) => {
    // 画布的长宽比
    const canvasRatio = width / height;
    // 加载图片
    const image = new Image();
    image.src = img;
    image.onload = () => {
        // 图片的宽度及长宽比
        const imgWidth = image.width;
        const imgHeight = image.height;
        const imageRatio = imgWidth / imgHeight;
        // 绘制图片
        // drawImage方法的参数值
        const drawOpt = {
            sx: 0,
            sy: 0,
            swidth: imgWidth,
            sheight: imgHeight,
            x: 0,
            y: 0,
            width: imgWidth,
            height: imgHeight,
        };
        // 模拟background-size
        handleBackgroundSize({
            backgroundSize,
            drawOpt,
            imageRatio,
            canvasWidth: width,
            canvasHeight: height,
            canvasRatio,
        });

        // 模拟background-position
        handleBackgroundPosition({
            backgroundPosition,
            drawOpt,
            imgWidth: drawOpt.width,
            imgHeight: drawOpt.height,
            imageRatio,
            canvasWidth: width,
            canvasHeight: height,
            canvasRatio,
        });

        // 模拟background-repeat
        const notNeedDraw = handleBackgroundRepeat({
            ctx,
            image,
            backgroundRepeat,
            drawOpt,
            imgWidth: drawOpt.width,
            imgHeight: drawOpt.height,
            imageRatio,
            canvasWidth: width,
            canvasHeight: height,
            canvasRatio,
        });

        //  绘制图片
        if (!notNeedDraw) {
            drawImage(ctx, image, drawOpt);
        }

        callback();
    };
    image.onerror = (e) => {
        callback(e);
    };
};

// 转换成markdown格式

let el = null;
export const transformToMarkdown = (root) => {
    let content = '';
    walk(
        root,
        null,
        (node, parent, isRoot, layerIndex) => {
            const level = layerIndex + 1;
            const text = node.data.richText
                ? getText(node.data.text)
                : node.data.text;
            if (level <= 6) {
                content += getTitleMark(level);
            } else {
                content += getIndentMark(level);
            }
            content += ' ' + text;
            // 概要
            const generalization = node.data.generalization;
            if (generalization && generalization.text) {
                const generalizationText = generalization.richText
                    ? getText(generalization.text)
                    : generalization.text;
                content += `[${generalizationText}]`;
            }
            content += '\n\n';
            // 备注
            if (node.data.note) {
                content += node.data.note + '\n\n';
            }
        },
        () => {},
        true,
    );
    return content;
};

const getText = (str) => {
    if (!el) {
        el = document.createElement('div');
    }
    el.innerHTML = str;
    return el.textContent;
};

const getTitleMark = (level) => {
    return new Array(level).fill('#').join('');
};

const getIndentMark = (level) => {
    return new Array(level - 6).fill('   ').join('') + '*';
};

//  深度优先遍历树
export const walk = (
    root,
    parent,
    beforeCallback,
    afterCallback,
    isRoot,
    layerIndex = 0,
    index = 0,
) => {
    let stop = false;
    if (beforeCallback) {
        stop = beforeCallback(root, parent, isRoot, layerIndex, index);
    }
    if (!stop && root.children && root.children.length > 0) {
        const _layerIndex = layerIndex + 1;
        root.children.forEach((node, nodeIndex) => {
            walk(
                node,
                root,
                beforeCallback,
                afterCallback,
                false,
                _layerIndex,
                nodeIndex,
            );
        });
    }
    afterCallback && afterCallback(root, parent, isRoot, layerIndex, index);
};

//  导出插件
class Export {
    //  构造函数
    private mindMap: any;
    static instanceName: string;
    constructor(opt) {
        this.mindMap = opt.mindMap;
    }
    // 处理导出为图片
    async handleExportPng(node) {
        const el = document.createElement('div');
        el.style.position = 'absolute';
        el.style.left = '-9999999px';
        el.appendChild(node);
        this.mindMap.el.appendChild(el);
        // 遍历所有节点，将它们的margin和padding设为0
        const walk = (root) => {
            root.style.margin = 0;
            root.style.padding = 0;
            if (root.hasChildNodes()) {
                Array.from(root.children).forEach((item) => {
                    walk(item);
                });
            }
        };
        walk(node);

        // 如果使用html2canvas
        // let canvas = await html2canvas(el, {
        //   backgroundColor: null
        // })
        // return canvas.toDataURL()

        const res = await domtoimage.toPng(el);
        this.mindMap.el.removeChild(el);
        return res;
    }

    //  导出
    async export(type, isDownload = true, name = '思维导图', ...args) {
        if (this[type]) {
            const result = await this[type](name, ...args);
            if (isDownload && type !== 'pdf') {
                downloadFile(result, name + '.' + type);
            }
            return result;
        } else {
            return null;
        }
    }

    //  获取svg数据
    async getSvgData() {
        const { exportPaddingX, exportPaddingY } = this.mindMap.opt;
        let { svg, svgHTML } = this.mindMap.getSvgData({
            paddingX: exportPaddingX,
            paddingY: exportPaddingY,
        });
        // 把图片的url转换成data:url类型，否则导出会丢失图片
        const imageList = svg.find('image');
        const task = imageList.map(async (item) => {
            const imgUlr = item.attr('href') || item.attr('xlink:href');
            const imgData = await imgToDataUrl(imgUlr);
            item.attr('href', imgData);
        });
        await Promise.all(task);
        if (imageList.length > 0) {
            svgHTML = svg.svg();
        }
        return {
            node: svg,
            str: svgHTML,
        };
    }

    //   svg转png
    svgToPng(svgSrc, transparent, rotateWhenWidthLongerThenHeight = false) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            // 跨域图片需要添加这个属性，否则画布被污染了无法导出图片
            img.setAttribute('crossOrigin', 'anonymous');
            img.onload = async () => {
                try {
                    const canvas = document.createElement('canvas');
                    // 如果宽比高长，那么旋转90度
                    const needRotate =
                        rotateWhenWidthLongerThenHeight &&
                        img.width / img.height > 1;
                    if (needRotate) {
                        canvas.width = img.height;
                        canvas.height = img.width;
                    } else {
                        canvas.width = img.width;
                        canvas.height = img.height;
                    }
                    const ctx = canvas.getContext('2d');
                    if (needRotate) {
                        ctx.rotate(0.5 * Math.PI);
                        ctx.translate(0, -img.height);
                    }
                    // 绘制背景
                    if (!transparent) {
                        await this.drawBackgroundToCanvas(
                            ctx,
                            img.width,
                            img.height,
                        );
                    }
                    // 图片绘制到canvas里
                    ctx.drawImage(
                        img,
                        0,
                        0,
                        img.width,
                        img.height,
                        0,
                        0,
                        img.width,
                        img.height,
                    );
                    resolve(canvas.toDataURL());
                } catch (error) {
                    reject(error);
                }
            };
            img.onerror = (e) => {
                reject(e);
            };
            img.src = svgSrc;
        });
    }

    //  在canvas上绘制思维导图背景
    drawBackgroundToCanvas(ctx, width, height) {
        return new Promise((resolve, reject) => {
            const {
                backgroundColor = '#fff',
                backgroundImage,
                backgroundRepeat = 'no-repeat',
                backgroundPosition = 'center center',
                backgroundSize = 'cover',
            } = this.mindMap.themeConfig;
            // 背景颜色
            ctx.save();
            ctx.rect(0, 0, width, height);
            ctx.fillStyle = backgroundColor;
            ctx.fill();
            ctx.restore();
            // 背景图片
            if (backgroundImage && backgroundImage !== 'none') {
                ctx.save();
                drawBackgroundImageToCanvas(
                    ctx,
                    width,
                    height,
                    backgroundImage,
                    {
                        backgroundRepeat,
                        backgroundPosition,
                        backgroundSize,
                    },
                    (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                        ctx.restore();
                    },
                );
            } else {
                resolve();
            }
        });
    }

    //  在svg上绘制思维导图背景
    drawBackgroundToSvg(svg) {
        return new Promise(async (resolve) => {
            const {
                backgroundColor = '#fff',
                backgroundImage,
                backgroundRepeat = 'repeat',
            } = this.mindMap.themeConfig;
            // 背景颜色
            svg.css('background-color', backgroundColor);
            // 背景图片
            if (backgroundImage && backgroundImage !== 'none') {
                const imgDataUrl = await imgToDataUrl(backgroundImage);
                svg.css('background-image', `url(${imgDataUrl})`);
                svg.css('background-repeat', backgroundRepeat);
                resolve();
            } else {
                resolve();
            }
        });
    }

    //  导出为png
    /**
     * 方法1.把svg的图片都转化成data:url格式，再转换
     * 方法2.把svg的图片提取出来再挨个绘制到canvas里，最后一起转换
     */
    async png(name, transparent = false, rotateWhenWidthLongerThenHeight) {
        let { node, str } = await this.getSvgData();
        str = removeHTMLEntities(str);
        // 如果开启了富文本，则使用htmltocanvas转换为图片
        if (this.mindMap.richText) {
            const res = await this.handleExportPng(node.node);
            const imgDataUrl = await this.svgToPng(
                res,
                transparent,
                rotateWhenWidthLongerThenHeight,
            );
            return imgDataUrl;
        }
        // 转换成blob数据
        const blob = new Blob([str], {
            type: 'image/svg+xml',
        });
        // 转换成data:url数据
        const svgUrl = await readBlob(blob);
        // 绘制到canvas上
        const res = await this.svgToPng(
            svgUrl,
            transparent,
            rotateWhenWidthLongerThenHeight,
        );
        return res;
    }

    //  导出为pdf
    async pdf(name, useMultiPageExport) {
        if (!this.mindMap.doExportPDF) {
            throw new Error('请注册ExportPDF插件');
        }
        const img = await this.png('', false, true);
        this.mindMap.doExportPDF.pdf(name, img, useMultiPageExport);
    }

    // 导出为xmind
    async xmind(name) {
        if (!this.mindMap.doExportXMind) {
            throw new Error('请注册ExportXMind插件');
        }
        const data = this.mindMap.getData();
        const blob = await this.mindMap.doExportXMind.xmind(data, name);
        const res = await readBlob(blob);
        return res;
    }

    //  导出为svg
    // plusCssText：附加的css样式，如果svg中存在dom节点，想要设置一些针对节点的样式可以通过这个参数传入
    async svg(name, plusCssText) {
        const { node } = await this.getSvgData();
        // 开启了节点富文本编辑
        if (this.mindMap.richText) {
            if (plusCssText) {
                const foreignObjectList = node.find('foreignObject');
                if (foreignObjectList.length > 0) {
                    foreignObjectList[0].add(
                        SVG(`<style>${plusCssText}</style>`),
                    );
                }
            }
        }
        node.first().before(SVG(`<title>${name}</title>`));
        await this.drawBackgroundToSvg(node);
        let str = node.svg();
        str = removeHTMLEntities(str);
        // 转换成blob数据
        const blob = new Blob([str], {
            type: 'image/svg+xml',
        });
        const res = await readBlob(blob);
        return res;
    }

    //  导出为json
    async json(name, withConfig = true) {
        const data = this.mindMap.getData(withConfig);
        const str = JSON.stringify(data);
        const blob = new Blob([str]);
        const res = await readBlob(blob);
        return res;
    }

    //  专有文件，其实就是json文件
    async smm(name, withConfig) {
        const res = await this.json(name, withConfig);
        return res;
    }

    // markdown文件
    async md() {
        const data = this.mindMap.getData();
        const content = transformToMarkdown(data);
        const blob = new Blob([content]);
        const res = await readBlob(blob);
        return res;
    }
}

Export.instanceName = 'doExport';

export default Export;
