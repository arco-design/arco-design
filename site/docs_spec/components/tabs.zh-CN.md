`````
组件 / 数据展示

# 标签页 Tabs

将内容组织同一视图中，一次可查看一个视图内容。查看其他内容可切换选项卡查看。
`````

## 基本属性

### 组件定义

标签页是将相似的内容组织在同一视图中的单选组件，通过标签让用户在层级相同的不同子任务，视图、模式之间切换，具有全局导航的作用。

### 组件构成

1. **标签（必有）** ：简短的文字描述（必要时可附带图标），用于总结相应视图中的内容，同时作为切换视图的按钮，建议每个标签不超过4个汉字，一次展示不超过7个标签；
2. **内容区域（必有）** ：展示选中标签对应的内容，内容形式不限，区域大小根据内容量和页面布局而定；
3. **滑动按钮（可选）** ：当页面空间不足时，部分标签会出现溢出容器的情况，通过滑动按钮左右或上下滑动显示剩余标签；
4. **新增&关闭按钮（可选）** ：在支持定制标签页的场景下，可以通过新增和关闭按钮进行标签页的删减；

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/966a6fd73c364868b40b7dc5e0e70559~tplv-uwbnlip3yd-image.image)

### 组件类型

| 类型     | 说明                                               |
| ------ | ------------------------------------------------ |
| 默认标签页  | 通过下划线标识，配合颜色的变化来指示选中的标签页。                        |
| 文字标签页  | 轻量的标签页类型，仅通过文本颜色的变化来指示选中的标签页，适合用于页面信息量多时的次级内容模块。 |
| 选项卡标签页 | 给标签文本增加背景容器，适合用于强调重要标签页，或内容区域较大的场景下。             |

1. 默认标签页：

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24ceefdc0d764bec9427d048169a9ac3~tplv-uwbnlip3yd-image.image)

2. 文字标签页：

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/73e7d3af2a9a42028e501d9e0a65b727~tplv-uwbnlip3yd-image.image)

3. 选项卡标签页：

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e51de18279bb404a921c9df8fb27f7e5~tplv-uwbnlip3yd-image.image)

### 组件尺寸

1. 标签页一般可分为4个尺寸，按照使用场景的不同选择适合的尺寸，大尺寸常用于页头区，小尺寸常用在弹框等狭小的容器内。
2. 标签的默认文字为14px，在页面空间不足的情况下可使用12px，同一组标签页的文字尺寸需要相同；

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/ecdd01774c6e4fff91d73130c66dcd9f~tplv-uwbnlip3yd-image.image)

### 组件状态

根据状态不同，标签页中的标签可分为选中态、默认态、禁用态、焦点态；

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8ed7cd84696240bd8c25895b841498f7~tplv-uwbnlip3yd-image.image)

## 何时使用

1. **展示同层级但不同类别的内容时**：当需要展示的内容层级相同，但类别不同时（如：动物的图片集），使用标签页可以更清晰的按类别展示内容，方便用户快速获取想要的内容；

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/bd3a5597eb46413c86da0aa66cf06132~tplv-uwbnlip3yd-image.image)

2. **总信息量过多时**：当页面的信息量过多时（如：班级人员详情），可考虑使用标签页精简用户单次获取的信息量，帮助用户更专注于当前显示的内容，当信息量较少时，使用列表等组件形式即可；

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/67430fc6dfdc425eb5d43b0e9fd326f3~tplv-uwbnlip3yd-image.image)

## 何时不使用

1. **内容不能通过标签进行明显分类时**：当使用标签页时，每个标签下的内容需要与其他标签下的内容有明显区别（如：不同类型的音乐），若无法进行明显的分类，不应使用标签页，以免造成用户对内容的误解；

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/be81bec5a003456495e32a2fb808a979~tplv-uwbnlip3yd-image.image)

2. **需要进行比较的场景下**：当需要比较多块内容时（如：同一物品的不同尺寸），将内容平铺于界面中才能更方便的比较差别，此时不应使用标签页；

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/bf6b23a416b54e61ac971df81b75bec1~tplv-uwbnlip3yd-image.image)

3. **内容有固定阅读顺序时**：当内容期望被以固定顺序阅读或交互时（如：预定演出门票时），不应使用标签页；

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6ce1cd9aeb28418388711677b8d2b388~tplv-uwbnlip3yd-image.image)

## 布局

根据标签位置的不同，标签页可分为上下布局和左右布局：

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c9c20452d12f40a289d328b2dde74940~tplv-uwbnlip3yd-image.image)

## 文案指南

1. **总结性强**：标签文本需要使用简洁直接的强总结性词语，能够精确的概括标签下包含的内容；
2. **表意清晰**：标签文本之间需要有明显的含义，不引起歧义；

## 交互行为

标签根据交互行为的不同会触发不同的状态，具体状态见【组件状态】模块。

当有标签溢出组件容器时，通过滑动按钮左右或上下滑动显示剩余标签（当设备为触摸屏时，需要支持触摸滑动）。

## 关联组件

[列表](/react/components/list)

[菜单](/react/components/menu)
