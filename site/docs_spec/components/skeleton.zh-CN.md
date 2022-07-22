`````
组件 / 反馈

# 骨架屏 Skeleton

将加载中的数据用灰色占位。
`````

## 基本属性

### 组件定义

在数据完整加载之前，通过占位图形给用户展示简单的页面布局。

### 组件构成

骨架屏一般由灰色或中性色调的3种占位图形组合构成，包括条形、圆形和方形。

1. **条形占位图：** 用于表示中英文或数字，存在多个尺寸。
2. **圆形占位图：** 用于表示头像、logo、圆形icon等。
3. **方形占位图：** 用于表示按钮、方形icon、图片等，尺寸不限。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b709f4b46dc5422bac7de0ab3fb88652~tplv-uwbnlip3yd-image.image)

### 组件类型

1. **按内容类型划分**：分为文本骨架屏、带操作的骨架屏、带头像的骨架屏以及带图片的骨架屏。

    1. 文本骨架屏

    ![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cfcf1cfe57ef4ec89a42e52483d093ee~tplv-uwbnlip3yd-image.image)

    2. 带操作

    ![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/fc6e67da325b478e9b707c30bccbf659~tplv-uwbnlip3yd-image.image)

    3. 带头像

    ![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9325b56c7f9c71c4a6ea1bb752f72eb7.png~tplv-uwbnlip3yd-webp.webp)

    4. 带图片、带视频

    ![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b355af68aec02362c364b6add409ed53.png~tplv-uwbnlip3yd-webp.webp)

2.  **按颜色来分：** 分为灰色/中性色骨架屏、带色彩的骨架屏。其中带色彩的有以下几种场景：

    1. 有颜色的文字、图标

    ![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8cce11a5b02f949815582cb15b7cad0a.png~tplv-uwbnlip3yd-webp.webp)

    2. 以图片为主要内容的页面，颜色已预设好或由图片进行算法计算。

    ![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/20402c8575c8c12f9266a9ae8a3e961c.png~tplv-uwbnlip3yd-webp.webp)

    3. **带动画的** **骨架屏**

    常见为微弱的渐变滑动效果，可以将其更改为一个波浪动画，适用于通用样式的单色场景，强化页面正在加载中。

    ![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/7b7ed9100d8492425d048bebafe0ddd9.png~tplv-uwbnlip3yd-webp.webp)

## 何时使用

1. **当网络较慢或加载内容较多时：** 使用骨架屏向用户提供一个对即将出现内容的预期，解决等待加载过程中出现白屏或界面闪烁造成的割裂感，如：

    1.  首次进入（非第一次使用）时
    2.  新页面跳转时
    3.  下载中
    4.  搜索中

2.  **当内容区域的布局排版固定时：** 使用骨架屏展现内容的大概轮廓，如列表、文章、个人信息。

3.  **当该模块信息暂时空缺，但需要提前占位时：** 可以使用该组件进行展示。

### 用法建议

1. **有秩序的加载顺序**

    数据的加载应保证一定的规则，例如按照模块排列顺序、主次顺序等。尽可能缩短不同元素加载的时差，保证良好的用户体验。

    1. 局部加载应保证一定主次顺序

    ![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6d45aa86fb77b810e84408d84b2fd396.png~tplv-uwbnlip3yd-webp.webp)

    2. 整体加载顺序应该保持一致

    ![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/822e02487e7ca8b7dde73ab550d7dcaf.png~tplv-uwbnlip3yd-webp.webp)

2. **随机性强的内容**

用于之前使用过，第二次请求数据加载的场景，网页记忆住网页的骨架，内容随机性强时更适用骨架屏。已缓存过的固定的元素不建议使用占位图形，例如返回、搜索等操作，包括固定的标题等文字。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c684e536f0814bc8a7d5d162313d6244~tplv-uwbnlip3yd-image.image)

## 何时不使用

1. **当内容布局和排版不固定时，** 轮廓和内容布局之间会有巨大差异，使用骨架屏不仅不能给用户顺畅和期待感，反而会造成落差。
2. **当内容区域有空页面时，** 不建议使用骨架屏。
3. **当加载时长低于 1 秒时**，不建议展示加载样式；当加载时长高于 10 秒时，建议给出用户加载失败反馈和出口。

## 关联组件

[加载中](/react/components/spin)

区别在于一般情况骨架屏和实际内容的结构是类似的，因此内容的出现不会过于突兀。可以认为骨架屏是加载的升级版。
