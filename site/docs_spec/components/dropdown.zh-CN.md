`````
组件 / 导航

# 下拉菜单 Dropdown

页面上的命令过多时，可将备选命令收纳到向下展开的浮层容器中。
`````

## 基本属性

### 组件定义

将备选命令或菜单折叠到向下展开的浮层容器中。

### 组件构成

1. **菜单项（必有）：** 菜单项是为了传达用户当前选择的内容或操作。
2. **下拉项（可选）：** 展示其他菜单项。
3. **搜索（可选）：** 搜索允许用户快捷查找备选菜单项。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cbc72a54138443b7aebe8060fc95f7f2~tplv-uwbnlip3yd-image.image)

### 组件类型

从菜单项和下拉项的样式来分类：

1. **菜单项类型**：分为 1.文字型菜单项、2.按钮型菜单项。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/73a7e2287bfc43fca3e049fce7900808~tplv-uwbnlip3yd-image.image)

2. **下拉项类型**：分为1.文字下拉项、2.左图标下拉项、3.右图标下拉项。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3661fd6999be44c5b01ddca7b1041b27~tplv-uwbnlip3yd-image.image)

从用途来分类，可分为：基础下拉菜单、多级下拉菜单、分组下拉菜单、含搜索的下拉菜单。

1. **基础下拉菜单**

基础下拉菜单看起来与文本输入字段非常相似，用户可以点击它并打开一个菜单。菜单项可由图标+文本标签构成。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3a3f2c9150aa49c0b2cfbf4adc358aaf~tplv-uwbnlip3yd-image.image)

2. **多级下拉菜单**

当操作命令有多个层级时，悬浮在父级上，显示子级的命令。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6bdc12441862416fa016830dc63b9b26~tplv-uwbnlip3yd-image.image)

3. **分组下拉菜单**

当下拉菜单中命令超出10个时，或浮层内出现滚动条，建议对命令进行分类。可以直接使用分割线进行分类，如场景需要明确分组类目可以增加分组标题

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/2c630a50b11c4aebbda3aaa98e9c28c9~tplv-uwbnlip3yd-image.image)

4. **含搜索的下拉菜单**

当操作命令多于25个时，建议支持搜索功能，快速找到指定的相关内容。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/f2b1058203e34b379fe62a8588fefe8d~tplv-uwbnlip3yd-image.image)

### 组件状态

下拉菜单状态包括1.菜单状态、2.选项状态。

并分为默认、悬浮、点击、和禁用等几种状态；其中菜单禁用代表用户无法进行激活，菜单置灰并且用户不可点击；选项禁用代表该选项并不能够被点击，但是不影响整个选项的选择情况。禁用选项字体置灰，在禁用选项中不会有 Hover 状态。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e81681d0f919453d84f56f2000841b10~tplv-uwbnlip3yd-image.image)

## 何时使用

下拉菜单常用于过滤或排序页面上的内容，可以根据需要设置样式，主要的使用场景是在导航、工具菜单以及部分操作集合里。

1. **在导航菜单中**：通过下拉菜单，可以将产品导航进行分组，并且统一放置在一起。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/384543828e484ef39518a607f4700b78~tplv-uwbnlip3yd-image.image)

2. **在工具菜单中**：将工具栏，通过使用下拉菜单进行呈现。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1450dbd309f74f69bb8c986d6735eb04~tplv-uwbnlip3yd-image.image)

3. **在部分操作集合中**：比如在表格的操作区域，经常会使用下拉菜单将多项操作放到一起。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/223bd2948893455f922fbd3090cfbe56~tplv-uwbnlip3yd-image.image)

## 何时不使用

1. 如果有两个选项可供选择，最好不要使用下拉菜单。在这种情况下，建议使用单选框。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/4acbc62f79fb4bcbbe23784cf0ea9b96~tplv-uwbnlip3yd-image.image)

2. 不建议嵌套下拉列表或使用它们来显示过于复杂的信息，尽可能使选项选择直截了当。

## 布局

**弹出方向**

下拉菜单中的下拉面板支持指定 6 种弹出方位。分别为：向上, 左上, 右上, 下方(默认), 左下, 右下。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c74d51f4077e4d37aa9c836940bb2f68~tplv-uwbnlip3yd-image.image)

## 文案指南

1. 下拉菜单内显示的操作命令应该具有相关性。
2. 下拉菜单中的文本标签建议不超过6个中文字符。

## 交互行为

支持悬浮和点击两种触发方式来激活下拉浮层。

1. **鼠标悬浮触发**：移入下拉菜单区域后，下拉浮层展开。当用户移开鼠标或点击页面其他区域或收起箭头时，下拉浮层关闭。
2. **鼠标点击（左键/右键）触发**：用户可以通过鼠标点击来展开下拉菜单。

## 关联组件

[选择器](/react/components/select)

区别在于 Select 用于选择，而 Dropdown 是命令集合。
