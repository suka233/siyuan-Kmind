# 思源挂件：Kmind


### 基于下面这位大佬的导图库二次开发而成，感谢大佬[@wangling2](https://github.com/wanglin2)：

[wanglin2/mind-map](https://github.com/wanglin2/mind-map)

### 注意：
反馈此挂件的问题请不要去原项目反馈！！！我看不到不说，还会打扰到原作者，谢谢配合。

快捷反馈[点我](https://github.com/suka233/siyuan-Kmind/issues)

### 特点：

1.富文本节点，比较完善的功能，原作者的项目的完整功能[演示地址](https://wanglin2.github.io/mind-map/#/)

2.此挂件为精简版（主要没啥空添加所有功能），如果需要完整版，可以去原作者项目体验使用

3.原项目开启了electron分支，意味着可以跟思源一样，多端跨平台使用，只需要保存好导出的导图数据即可任意导入。

## 更新记录：

#### v0.1.8
- 其它：
  -  更新smm库：0.5.2 -> 0.5.3
    - 摘要：修复多个节点同时更改样式，节点内容会被覆盖为第一个激活的节点的bug
    - smm库的完整更新日期请查看 [simple-mind-map](https://wanglin2.github.io/mind-map/#/doc/zh/changelog)

#### v0.1.7
- 其它：
  - 更新smm库：0.4.7 -> 0.5.2
    - 摘要：提升渲染性能，修复快速操作的时候节点位置不正确的问题
    - smm库的完整更新日期请查看 [simple-mind-map](https://wanglin2.github.io/mind-map/#/doc/zh/changelog)

#### v0.1.6
- 新增：
  - 节点样式 设置菜单（现在可以在节点样式选项卡中快速为节点添加或者删除icon图标了）
- 优化：
  - 保存，重设画布大小，构建大纲树结构，均从节流更改为防抖 [issue #5](https://github.com/suka233/siyuan-Kmind/issues/5)

#### v0.1.5
- 新增：
  - 新增禅模式（[issue #4](https://github.com/suka233/siyuan-Kmind/issues/4)）：使用方式：右键菜单-禅模式
    - 备注：禅模式的状态会保存并同步，并且下次重新进入导图的时候可以点击弹出的通知快捷关闭禅模式~
- 其它：
  - 更新simple-mind-map库: 0.4.5 -> 0.4.7 ,由此给本挂件带来的新功能和优化摘要如下：
    - 优化：1.富文本编辑时初始聚焦时不再默认全选；2.富文本编辑时使用节点填充色作为背景色，避免节点颜色为白色时看不见。 3.节点激活状态切换不再触发历史记录。 4.短时间多次触发历史记录，只会添加最后一次的数据。 5.优化历史记录添加，当有回退时，再次添加新记录时删除当前指针后面的历史数据。6.添加历史数据时过滤和上一次相比没有改变的数据。
    - 修复：1.修复节点编辑时方向键和方向键导航功能的冲突问题。 2.修复拖拽移动节点时节点id的丢失问题
    - 详细更新日志请查看 [simple-mind-map](https://wanglin2.github.io/mind-map/#/doc/zh/changelog)
#### v0.1.4
- 优化：
  - 优化数据存储，导图源文件交由思源内核管理，避免被当成未引用的资源而被用户误清理
    - 注意，移除掉某个页面的kmind挂件后，此挂件对应的那份导图数据会被思源内核标记为未引用资源，可在 设置-资源-未引用资源 查看，请按需清理或者另存
- 新增：
  - 新增ctrl+鼠标左键点选多个节点的功能
  - 新增按住根节点，可以拖动导图的功能
#### v0.1.3
- 变更：
  - 图片保存变更：不再保存至思源，而是base64方式保存于导图内部，方便导出的时候，在其它地方导入也可以看到图片
  - 数据存储位置保存变更：不再保存至挂件块的属性上污染挂件属性，而是存储于/data/assets文件夹下，具体文件名可以查看挂件块的file-path属性
- 新增：
  - 开发者模式：在挂件块上添加自定义debugger属性，值为true，即可开启开发者模式

#### v0.1.2
- 新增：
  - 右键菜单
- 修复：
  - 不能连续更改同一个节点的图标的Bug

#### v0.1.1
- 添加快捷键说明，新增：复制，粘贴，剪贴节点 快捷键

