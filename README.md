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

#### v1.1.0

说明：

-   此次更新主要针对 节点和备注的弹出编辑框进行了一些优化，新增了一些功能，优化性能

新增：

-   节点&备注 弹出编辑框，新增了数学公式的输入支持（katex）
-   节点&备注 弹出编辑框，新增有限的支持 markdown 语法，具体支持哪些请查看下方的附录列表

优化：

-   节点&备注 弹出编辑框，插入的图片和网页可以快捷拖动调整大小
-   进入弹出的编辑框的时候，默认自动获取焦点，并聚焦到最后一行，单击编辑框的其他位置，也会自动聚焦到行尾

其它：

-   更新 smm 库：0.6.11-fix.1 -> 0.6.12
    附录：
-   新增的 markdown 语法列表如下，也可以[点我查看](https://patricklee.nyc/quill-markdown-shortcuts/)，注意，仅在弹出编辑框有效：

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

## 历史更新记录[点我查看](https://github.com/suka233/siyuan-Kmind/blob/dev/CHANGELOG.md)
