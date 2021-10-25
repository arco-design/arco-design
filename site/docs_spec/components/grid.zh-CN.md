`````
组件 / 布局

# 栅格 Grid

栅格可以有效的保证页面的一致性、逻辑性、加强团队协作和统一。
`````

## 基本属性

### 组件定义

栅格可以有效的保证页面的一致性、逻辑性、加强团队协作和统一。

### 组件构成

1. **页面宽度W** ：指页面的的整体宽度，由W代表。
2. **栅格个数A** ：指整体页面有多少个栅格。
3. **水槽个数B**：指栅格之间的间距有多少个。
4. **栅格宽度C**：指每一个栅格的宽度（Column）
5. **水槽宽度G** ：指每个水槽的宽度（Gutter）
6. **边距**：指第一个栅格距离页面边框的距离（Margin）

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/aceeb26b9c6745019a359207fc65e868~tplv-uwbnlip3yd-image.image)

### 组件类型

可根据业务场景设计侧进行调整

目前有两种比较主流的等分方式：12等分与24等分

| 类型       | 说明                                |
| -------- | --------------------------------- |
| 12等分栅格系统 | 整体页面由12个栅格等分，适用于业务信息分组较少的中后台页面设计。 |
| 24等分栅格系统 | 整体页面由24个栅格等分，适用于业务信息量大，场景复杂的页面设计  |

1. **12等分栅格系统**：在流行的前端开发工具库Bootstrap与Foundation中广泛使用，适用于业务信息分组较少，单个盒子内信息体积较大的中后台页面设计。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c263adbaab194834a3bd030d101a8111~tplv-uwbnlip3yd-image.image)

2. **24等分栅格系统**：适用于业务信息量较大，信息分组较多、单个盒子内信息体积较小的中后台页面设计；相较12栅格系统，24栅格系统变化更加灵活，更适合内容比较多样的复杂场景设计

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/23db1f1fa08042bcaa8265c2a2c1996f~tplv-uwbnlip3yd-image.image)

### 组件尺寸

1. **栅格宽度**：建议栅格系统的网格大小选定8作为栅格系统的原子单位，目前主流设计屏幕分辨率在水平以及垂直方向都可以被8整除，使用8作为最小原子足够适配。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/642155a43ac341fb8a48d51226eb0ab2~tplv-uwbnlip3yd-image.image)

2. **水槽宽度**：根据业务可自定义水槽的值。比如8、16、24、32、40等，经过实践经验，正常情况下，水槽宽度为24时，视觉效果最佳。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/50db79aca9d84fffbe34b413cd16e709~tplv-uwbnlip3yd-image.image)

## 何时使用

1. **板式设计与内容布局时**：栅格系统可以辅助设计师调整内容的位置以及对齐方式，可以使内容变得规律、有序。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/72d86d2aaf424e0c9bfae464b0db14c3~tplv-uwbnlip3yd-image.image)

2. **内容元素不要留在水槽中**：内容元素应对齐栅格而非水槽。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/d667be8c4f9a4bd28a513a4722b9a1cf~tplv-uwbnlip3yd-image.image)

## 何时不使用

**非常规设计时**：不需要死板的坚持传统栅格系统，根据设计场景可自行修订。

## 布局

- **盒子模型**：Padding就是主体内容距离盒子外侧的距离，（主体内容可以是一个按钮、一段文本、一张图片或者一个表格等）；Margin就是相邻两个盒子的距离，对应在后台栅格系统就是水槽的大小。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5129496216db4296bfd965e644b38e2f~tplv-uwbnlip3yd-image.image)

- **常见栅格**：市面上大多的门户网站、电商网站基本上都采用了960栅格。页面宽度为960px，12列，每列60px，水槽20。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b593618525d54e0aac8f1db85b3904c1~tplv-uwbnlip3yd-image.image)
