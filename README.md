# 思源挂件：Kmind

## \*\*kmind 插件版已经上架思源插件市场，欢迎大家前去下载

## QQ 交流群号：130584086

### 提醒：该挂件需要 kmind 插件的 api 支持，才能使用悬浮预览思源块的功能

### 基于下面这位大佬的导图库二次开发而成，感谢大佬[@wangling2](https://github.com/wanglin2)：

[wanglin2/mind-map](https://github.com/wanglin2/mind-map)

## 最新更新记录：

### v1.3.0

新增：

-   新增导图小地图（缩略图）[#16](https://github.com/suka233/siyuan-Kmind/issues/16)
-   新增导图只读模式（需要适配思源的文档只读状态吗？欢迎进群讨论：130584086）
-   新增导图缩放工具条，支持双击缩放工具条重置缩放

优化：

-   导入文件增加覆盖说明，避免误操作

### v1.2.0

变化：

-   破坏性更新：去除了节点激活样式，改为默认支持节点 Hover 效果（鼠标悬浮在节点上，该节点的外框会高亮）

新增：

-   支持**跨 kmind 复制粘贴节点**，现在，你可以把一个节点从挂件版直接复制粘贴到插件版啦，反过来也可以
-   直接在节点上粘贴纯文本数据，会以当前剪贴板的数据新建子节点
-   直接在节点上粘贴图片，会自动为该节点插入剪贴板中的图片
-   新增了节点格式刷的功能：使用方法：点击一个节点 A，然后点击上方操作栏的 格式刷 按钮，再点击其它的节点，即可把节点 A 的样式应用到其它节点中。点击除了节点以外的地方会自动退出格式刷功能
-   直接粘贴进节点的剪贴板文本，将会自动去除样式，只保留纯文本。如果需要保留复制的文本的样式，可以通过点击上方操作栏的 节点 按钮，在弹出的节点编辑器中进行粘贴。
-   收起节点时，展开按钮会显示有多少个子节点
-   支持关联线端点的位置跟随鼠标拖拽变化
-   默认关闭双击复位画布

修复：

-   直接在根节点 ctrl+v 导致的 bug [#7](https://github.com/suka233/siyuan-kmind-plugin/issues/7)

## 历史更新记录[点我查看](https://github.com/suka233/siyuan-Kmind/blob/dev/CHANGELOG.md)

### 此挂件已知缺陷：

1.节点内直接粘贴图片后，下次进入该导图，此节点的图片可能会显示不出来，需要双击一下那个节点才能显示出来，建议使用上方操作按钮栏的图片按钮为节点添加图片

### 注意：

反馈此挂件的问题请不要去底层导图库反馈！！！我看不到不说，还会打扰到底层库作者，谢谢配合~
此挂件为个人业余爱好所作，可能会有不稳定的风险，数据风险自负

使用 Github 快捷反馈[点我](https://github.com/suka233/siyuan-Kmind/issues)
使用腾讯问卷快捷反馈 或者 捐赠[点我](https://wj.qq.com/s2/12591272/adf1/)

### 特点：

1.富文本节点，比较完善的功能，原作者的项目的完整功能[演示地址](https://wanglin2.github.io/mind-map/#/)

2.此挂件为精简版（主要没啥空添加所有功能），如果需要完整版，可以去原作者项目体验使用

3.原项目开启了 electron 分支，意味着可以跟思源一样，多端跨平台使用，只需要保存好此挂件导出的导图数据即可任意导入。

4.当节点插入的超链接为思源块链接的时候（例如 siyuan://xxxx），按住 alt+左键单击，即可弹出悬浮预览窗（需要 kmind 插件支持，请前往思源集市的插件区下载 kmind 插件版）
![kmindguide.gif](img%2Fkmindguide.gif)

5.节点内部的文字可以链接到不同的思源块，并且思源超链接会展示思源的 icon，方便识别。
![siyuanURL.gif](img%2FsiyuanURL.gif)

6.节点的弹出编辑框支持有限的 markdown 语法，具体的支持列表如下：

````
# Headers

**Bold text**

*Italic*

***Bold italic***

~~Strikethrough~~

- Bullet points

1. Numbered lists

[] Checkboxes

[]() Links

> Blockquote

`Inline code block`

```
Fenced Code block
```

--- Horizontal Rule

````
