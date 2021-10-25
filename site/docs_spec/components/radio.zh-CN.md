`````
组件 / 数据输入

# 单选框 Radio

在一组相关且互斥数据中，用户仅能选择一个选项。
`````

## 基本属性

### 组件定义

从一组互斥的选项中选择一个选项。

### 组件构成

单选框组件由一组可点击的选项按钮组成，选项按钮中的文本标签位于单选按钮右侧。

1. **标题文本（可选）：** 描述选项组或提供选择指南。
2. **单选按钮（必有）：** 按钮通常为一个圆圈，代表数据输入、任务设置。默认情况下会选择一个选项，指示当前状态。
3. **选项文本标签（必有）：** 描述要选择或取消选择的信息，除描述之外，还可以作为操作热区，当用户点击标签，对应的单选框就会被选中。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/ed860f026f4f496197523e4ceb6ac2a3~tplv-uwbnlip3yd-image.image)

### 组件类型

单选框组件的类型包含：1.基础型、2.纯文本型、3.按钮型、4.图标组合型。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/7bbc905e3ba24e0dbc60e920bf2d79fd~tplv-uwbnlip3yd-image.image)

### 组件状态

单选框组件状态分为：可选态、焦点态和禁用态。

1. 可选态：包含默认可选项和当前选中项，点击其他选项后，当前选项会被取消；
2. 焦点态：聚焦选框时的状态；
3. 禁用态：包含未选中禁用和已选中禁用。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c988ef36b6f84418a4f3fbd7e3dc47af~tplv-uwbnlip3yd-image.image)

## 何时使用

1. 只允许从一组选项中选择 1 个时：常用于在菜单、页面或组件中从一种设置更改为另一种设置，单选按钮组件置于整页、模态弹窗或展开面板的表单中。
2. 需要直观地展示出所有选项，在选项之间进行比较时。

## 何时不使用

1. 如果用户可以从列表中选择多个选项，建议使用复选框。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b4bfe3cca4eb46efb9459db02110b556~tplv-uwbnlip3yd-image.image)

2. 单选框的选项数量一般为2-5个之间，当选项数量特别多时，建议使用选择器或下拉菜单展示。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/4760e5d28af44764b220b2214caa1d2d~tplv-uwbnlip3yd-image.image)

## 组件布局

### 排列方式

单选框组件可按结构水平或垂直排列，文本标签一般出现在单选按钮输入的右侧。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/023196fd46d4413c949695ff40faec2b~tplv-uwbnlip3yd-image.image)

### 文本溢出

当文本标签过长时，允许绕到第二行，不建议用省略号截断单选按钮标签文本，且文本应在单选按钮右侧左对齐，选择控件与文本标签顶部对齐。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/dc3f231c936b4769831e8c6262ce2981~tplv-uwbnlip3yd-image.image)

## 文案指南

1. 建议使用清晰简洁的文本标签，明确说明选择选项后将出现的结果。
2. 文本标签的长度应大致相等。
3. 如果需要未选中的状态，建议考虑添加“无”选项。

## 交互行为

### 默认选择

在一组单选框中，可以设置一个默认选项，这个选项应该为最有可能被选择或者最安全的选项。

当用户选择一个新项目时，先前的选择将自动取消选择。

### 触发形式

1. **鼠标：** 用户可以通过直接单击单选按钮输入或单击单选按钮标签来触发项目。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/f9c69bc2615e4dd1a9b136c6a28a4dd5~tplv-uwbnlip3yd-image.image)

2. **键盘：** 用户可以通过按向上或向下箭头键在单选按钮输入之间切换。 当选框输入有焦点时，用户可以通过按 Space 来触发更改状态。

## 关联组件

[复选框](/react/components/checkbox)

[开关](/react/components/switch)

[选择器](/react/components/select)
