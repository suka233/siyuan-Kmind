import {
    ClusterOutlined,
    SkinOutlined,
    LaptopOutlined,
} from '@ant-design/icons-vue';
// side-bar-trigger
export const sideBarTriggerList = [
    {
        title: '主题',
        value: 'theme',
        icon: SkinOutlined,
    },
    // {
    //     title: '结构',
    //     value: 'structure',
    //     icon: DeploymentUnitOutlined,
    // },
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
