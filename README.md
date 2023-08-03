# 思源挂件：Kmind

## \*\*kmind 插件版已经上架思源插件市场，欢迎大家前去下载

### 提醒：该挂件需要 kmind 插件的 api 支持，才能使用悬浮预览思源块的功能

### 基于下面这位大佬的导图库二次开发而成，感谢大佬[@wangling2](https://github.com/wanglin2)：

[wanglin2/mind-map](https://github.com/wanglin2/mind-map)

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

### 此挂件已知缺陷：

1.节点内直接粘贴图片后，下次进入该导图，此节点的图片可能会显示不出来，需要双击一下那个节点才能显示出来，建议使用上方操作按钮栏的图片按钮为节点添加图片

## 最新更新记录：

#### v1.0.0

说明：

-   kmind 插件版已经上架思源插件市场，欢迎大家前去下载，并且此次挂件新增的悬浮预览思源块的功能，也需要 kmind 插件提供的 api 支持

新增：

-   导图节点的超链接当为思源块链接的时候，按住 alt+左键单击，即可弹出悬浮预览窗（需要 kmind 插件支持，kmind 插件请去集市中的插件板块下载）
-   新增全屏模式，进入方式：导图右击 -> 全屏；再次点击或者按下 esc 键即可退出全屏
-   新增几个内置主题，新增导图结构切换按钮，可以切换导图结构
-   点击节点上的备注 icon，即可弹出备注编辑框
-   导图节点图片可以拖动调整大小
-   新建的节点默认选中，可以直接输入文本
-   新增导出 & 导入 xmind 功能，新增导出更多格式（图片，pdf 等）

优化：

-   新建节点，自动选中，可以直接输入文本
-   概览快捷键改为 ctrl+G
-   性能优化：切换主题不再卡顿。移除 整理布局 按钮，因为此按钮是在切换主题卡顿的时候使用的，现在它已经完成了它的历史使命，光荣退休啦~

其它：

-   更新 smm 库：0.6.0-fix.1 -> 0.6.11-fix.1
-   摘要：修复富文本模式下，新建节点不随主题变化而变化的问题；某些情况（通常是英文节点），节点文本显示不完全；[more...](https://wanglin2.github.io/mind-map/#/doc/zh/changelog)

## 历史更新记录[点我查看](https://github.com/suka233/siyuan-Kmind/blob/dev/CHANGELOG.md)
