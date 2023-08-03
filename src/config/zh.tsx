import {
    ClusterOutlined,
    SkinOutlined,
    LaptopOutlined,
    HighlightOutlined,
    DeploymentUnitOutlined,
    SmileOutlined,
    FileTextOutlined,
    FileImageOutlined,
    StarOutlined,
    FileMarkdownOutlined,
    FileExcelOutlined,
    FilePdfOutlined,
} from '@ant-design/icons-vue';
// side-bar-trigger
export const sideBarTriggerList = [
    {
        title: '节点样式',
        value: 'nodeStyle',
        icon: HighlightOutlined,
    },
    {
        title: '主题',
        value: 'theme',
        icon: SkinOutlined,
    },
    {
        title: '结构',
        value: 'structure',
        icon: DeploymentUnitOutlined,
    },
    {
        title: '大纲',
        value: 'mainPoint',
        icon: ClusterOutlined,
    },
    {
        title: '快捷键',
        value: 'shortcutKey',
        icon: LaptopOutlined,
    },
    // {
    //     title: '设置',
    //     value: 'setting',
    //     icon: SettingOutlined,
    // },
];

// 快捷键列表
export const shortcutKeyList = [
    {
        type: '节点操作',
        list: [
            {
                icon: 'icontianjiazijiedian',
                name: '插入下级节点',
                value: 'Tab',
            },
            {
                icon: 'iconjiedian',
                name: '插入同级节点',
                value: 'Enter',
            },
            {
                icon: 'iconshangyi',
                name: '上移节点',
                value: 'Ctrl + ↑',
            },
            {
                icon: 'iconxiayi',
                name: '下移节点',
                value: 'Ctrl + ↓',
            },
            {
                icon: 'icongaikuozonglan',
                name: '插入概要',
                value: 'Ctrl + G',
            },
            {
                icon: 'icongaikuozonglan',
                name: '保存导图',
                value: 'Ctrl + S',
            },
            {
                icon: 'iconzhankai',
                name: '展开/收起节点',
                value: '/',
            },
            {
                icon: 'iconshanchu',
                name: '删除节点',
                value: 'Delete | Backspace',
            },
            {
                icon: 'iconfuzhi',
                name: '复制节点',
                value: 'Ctrl + C',
            },
            {
                icon: 'iconjianqie',
                name: '剪切节点',
                value: 'Ctrl + X',
            },
            {
                icon: 'iconniantie',
                name: '粘贴节点',
                value: 'Ctrl + V',
            },
            {
                icon: 'iconbianji',
                name: '编辑节点',
                value: 'F2',
            },
            {
                icon: 'iconhuanhang',
                name: '文本换行',
                value: 'Shift + Enter',
            },
            {
                icon: 'iconhoutui-shi',
                name: '回退',
                value: 'Ctrl + Z',
            },
            {
                icon: 'iconqianjin1',
                name: '前进',
                value: 'Ctrl + Y',
            },
            {
                icon: 'iconquanxuan',
                name: '全选',
                value: 'Ctrl + A',
            },
            {
                icon: 'iconquanxuan',
                name: '多选',
                value: '右键 / Ctrl + 左键',
            },
            {
                icon: 'iconzhengli',
                name: '一键整理布局',
                value: 'Ctrl + L',
            },
        ],
    },
    {
        type: '画布操作',
        list: [
            {
                icon: 'iconfangda',
                name: '放大',
                value: 'Ctrl + +',
            },
            {
                icon: 'iconsuoxiao',
                name: '缩小',
                value: 'Ctrl + -',
            },
            {
                icon: 'icondingwei',
                name: '恢复默认',
                value: 'Ctrl + Enter',
            },
        ],
    },
];

// 字体列表
export const fontFamilyList = [
    {
        name: '宋体',
        value: '宋体, SimSun, Songti SC',
    },
    {
        name: '微软雅黑',
        value: '微软雅黑, Microsoft YaHei',
    },
    {
        name: '楷体',
        value: '楷体, 楷体_GB2312, SimKai, STKaiti',
    },
    {
        name: '黑体',
        value: '黑体, SimHei, Heiti SC',
    },
    {
        name: '隶书',
        value: '隶书, SimLi',
    },
    {
        name: 'Andale Mono',
        value: 'andale mono',
    },
    {
        name: 'Arial',
        value: 'arial, helvetica, sans-serif',
    },
    {
        name: 'arialBlack',
        value: 'arial black, avant garde',
    },
    {
        name: 'Comic Sans Ms',
        value: 'comic sans ms',
    },
    {
        name: 'Impact',
        value: 'impact, chicago',
    },
    {
        name: 'Times New Roman',
        value: 'times new roman',
    },
    {
        name: 'Sans-Serif',
        value: 'sans-serif',
    },
    {
        name: 'serif',
        value: 'serif',
    },
];

// 字号
export const fontSizeList = [10, 12, 16, 18, 24, 32, 48];

// 行高
export const lineHeightList = [1, 1.5, 2, 2.5, 3];

// 颜色
export const colorList = [
    '#4D4D4D',
    '#999999',
    '#FFFFFF',
    '#F44E3B',
    '#FE9200',
    '#FCDC00',
    '#DBDF00',
    '#A4DD00',
    '#68CCCA',
    '#73D8FF',
    '#AEA1FF',
    '#FDA1FF',
    '#333333',
    '#808080',
    '#cccccc',
    '#D33115',
    '#E27300',
    '#FCC400',
    '#B0BC00',
    '#68BC00',
    '#16A5A5',
    '#009CE0',
    '#7B64FF',
    '#FA28FF',
    '#000000',
    '#666666',
    '#B3B3B3',
    '#9F0500',
    '#C45100',
    '#FB9E00',
    '#808900',
    '#194D33',
    '#0C797D',
    '#0062B1',
    '#653294',
    '#AB149E',
];

// 边框宽度
export const borderWidthList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 边框样式
export const borderDasharrayList = [
    {
        name: '实线',
        value: 'none',
    },
    {
        name: '虚线1',
        value: '5,5',
    },
    {
        name: '虚线2',
        value: '10,10',
    },
    {
        name: '虚线3',
        value: '20,10,5,5,5,10',
    },
    {
        name: '虚线4',
        value: '5, 5, 1, 5',
    },
    {
        name: '虚线5',
        value: '15, 10, 5, 10, 15',
    },
    {
        name: '虚线6',
        value: '1, 5',
    },
];

// 圆角
export const borderRadiusList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 线宽
export const lineWidthList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 连线风格
export const lineStyleList = [
    {
        name: '直线',
        value: 'straight',
    },
    {
        name: '曲线',
        value: 'curve',
    },
    {
        name: '直连',
        value: 'direct',
    },
];

// 图片重复方式
export const backgroundRepeatList = [
    {
        name: '不重复',
        value: 'no-repeat',
    },
    {
        name: '重复',
        value: 'repeat',
    },
    {
        name: '水平方向重复',
        value: 'repeat-x',
    },
    {
        name: '垂直方向重复',
        value: 'repeat-y',
    },
];

// 背景图片定位
export const backgroundPositionList = [
    {
        name: '默认',
        value: '0% 0%',
    },
    {
        name: '左上',
        value: 'left top',
    },
    {
        name: '左中',
        value: 'left center',
    },
    {
        name: '左下',
        value: 'left bottom',
    },
    {
        name: '右上',
        value: 'right top',
    },
    {
        name: '右中',
        value: 'right center',
    },
    {
        name: '右下',
        value: 'right bottom',
    },
    {
        name: '中上',
        value: 'center top',
    },
    {
        name: '居中',
        value: 'center center',
    },
    {
        name: '中下',
        value: 'center bottom',
    },
];

// 背景图片大小
export const backgroundSizeList = [
    {
        name: '自动',
        value: 'auto',
    },
    {
        name: '覆盖',
        value: 'cover',
    },
    {
        name: '保持',
        value: 'contain',
    },
];

// 形状列表
export const shapeList = [
    {
        name: '矩形',
        value: 'rectangle',
    },
    {
        name: '菱形',
        value: 'diamond',
    },
    {
        name: '平行四边形',
        value: 'parallelogram',
    },
    {
        name: '圆角矩形',
        value: 'roundedRectangle',
    },
    {
        name: '八角矩形',
        value: 'octagonalRectangle',
    },
    {
        name: '外三角矩形',
        value: 'outerTriangularRectangle',
    },
    {
        name: '内三角矩形',
        value: 'innerTriangularRectangle',
    },
    {
        name: '椭圆',
        value: 'ellipse',
    },
    {
        name: '圆',
        value: 'circle',
    },
];

// 导出文件类型列表
export const exportTypeList = [
    {
        name: 'kmind',
        icon: SmileOutlined,
        type: 'kmind',
        title: 'kmind',
        class: 'text-blue-500',
        content: '可以用于导入到 kmind 中',
    },
    {
        name: 'json',
        icon: FileTextOutlined,
        type: 'json',
        title: 'json',
        content: '流行的数据交换格式，可用于导入',
    },
    {
        name: '图片',
        icon: FileImageOutlined,
        type: 'png',
        title: '图片',
        content: '静态图片，适合查看分享',
    },
    {
        name: 'svg',
        icon: StarOutlined,
        type: 'svg',
        title: 'svg',
        content: '矢量图，可用于导入到其他矢量图软件',
    },
    {
        name: 'pdf',
        icon: FilePdfOutlined,
        type: 'pdf',
        title: 'pdf',
        content: '可以用于打印',
    },
    {
        name: 'markdown',
        icon: FileMarkdownOutlined,
        type: 'md',
        title: 'markdown',
        content: '可以用于导入到 markdown 编辑器',
    },
    {
        name: 'xmind',
        icon: FileExcelOutlined,
        type: 'xmind',
        title: 'xmind',
        content: '可以用于导入到 xmind 中',
    },
];
