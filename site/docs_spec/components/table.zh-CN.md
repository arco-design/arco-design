`````
组件 / 数据展示

# 表格 Table

用于数据收集展示、分析整理、操作处理。
`````

## 基本属性

### 组件定义

表格是用行列的形式，结构化展示信息的组件；方便用户查看、分析数据。

### 组件构成

1. **表头 （必有）**：说明这一列的信息类别，也可以在表头放置一些排序、筛选等操作按钮。
2. **单元格（必有）** ：表格的主体由多个单元格组成，单元格内支持文字、图标、按钮、标签、单选框、复选框等元素。
3. **行列分割线（非必有）**：从视觉上分隔信息。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/578da9d60e314bf1aa02314a8c2ce78d~tplv-uwbnlip3yd-image.image)

### 组件类型

| 类型      | 说明                            |
| ------- | ----------------------------- |
| 基础表格    | 由表头和单元格组成，无其他拓展操作，对数据进行最基础展示。 |
| 固定行表格   | 用于在固定表格高度内容展示不全场景，出现滚动条可滑动预览。 |
| 固定列+行表格 | 用于固定重要信息列和行，可上下、左右滑动查看其他内容信息。 |
| 单选/多选表格 | 表格可进行单选/多选。                   |
| 可展开表格   | 表格行可以展开，以展示更多信息。              |
| 树表格     | 当数据信息有清晰的层级关系时，可以使用树表格。       |

1. 基础表格：

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/103105bf50024ce78443b214513b4722~tplv-uwbnlip3yd-image.image)

2. 固定行表格：

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/43ddc8d74e4541aca2ca3b1ba7f1532a~tplv-uwbnlip3yd-image.image)

3. 固定行+列表格

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/d21a28de79764e928b09daa999947e6a~tplv-uwbnlip3yd-image.image)

4. 单选/多选表格

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/7dbe7bc6fdc4480ab18c4f79d31267a5~tplv-uwbnlip3yd-image.image)

5. 可展开表格

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5cfe5b8f6d054172aefcbb26b1972b17~tplv-uwbnlip3yd-image.image)

6. 树表格

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/eb93c9f1b39a4a0b91ac86e2105da738~tplv-uwbnlip3yd-image.image)

## 何时使用

1. **需要展示数据时**：当有大量结构化数据需要展示展示时可以使用表格对数据进行有序的展示，更有利于用户对于数据的获取。
2. **需要对数据进行复杂操作时**：当需要对数据进行排序、搜索、筛选等操作时，可以使用表格组件，利于对数据进行操作。
3. **需要对数据进行对比，归纳与分类时**：当需要对数据进行对比、归纳、分类等操作时，可以使用表格组件，使信息之间易于对比，便于用户快速查询其中的差异与变化、关联和区别。

## 何时不使用

- **单独的选择项和对应选项时：** 单独的选择项对应选项时可采用列表组件，而非表格组件。

## 布局

1. 复杂的全局操作一般在表头，例如筛选，排序，搜索等

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/228539d036854fc8bb84ddcd136b2f3b~tplv-uwbnlip3yd-image.image)

2. 分割方式：无分割线、有分割线、斑马线分割等

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/fde23c37bf684a279286648022f5b53b~tplv-uwbnlip3yd-image.image)

## 文案指南

1. **易读性高：** 表格内文字描述应尽量简短，易读性高；
1. **直接**：直接描述信息，不增加装饰性词语；

## 交互行为

1. 表格内可通过单选框和多选框进行勾选交互；
2. 表格内如果信息可编辑，点击可进行编辑交互；
3. 表格信息还在加载时，可显示加载动画的反馈。

## 关联组件

[列表](/react/components/list)

[图标](/react/components/icon)
