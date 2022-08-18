---
file: interface
---

`````
组件 / 通用

# 排版 Typography

用于展示标题、段落、文本内容。
`````

%%Content%%

## API

%%Props%%

## 关于超出省略

超出省略目前通过两种方式实现分别是 **js二分法计算截断值** 和 **CSS超出省略** 两种优缺点如下：

|指标|js二分法|CSS省略|
|---|---|---|
|性能|差(二分法多次操作dom计算)|好|
|功能|好|差（只支持字符串)|

- 默认使用 **js二分法** 不断进行截断计算从而得到省略临界值，同时 `resize` 时还会多次触发重新计算。所以在大量使用对性能影响较大，但此方法不会在排版组件下插入额外样式dom。

- 开启 `ellipsis.cssEllipsis` 将通过 **CSS样式** 进行省略展示，对于大量使用场景下会有显著性能提高。但因为需要添加 `text-overflow` 样式，`.arco-typography` 节点下将会新增两个 `<span/>` dom.

**注意 `2.36.0` 版本对超出省略进行重构优化，造成Breaking Change 主要如下：**
- 开启 `ellipsis.cssEllipsis` 时，为了添加 `text-overflow` 在排版组件下插入了额外样式 dom，造成 dom 结构变化。
- `ellipsis.cssEllipsis` 支持多行省略场景，并且默认值由 `true` 变为 `false` （规避升级后 dom 结构变化）。
