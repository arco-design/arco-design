---
file: interface
---

`````
组件 / 数据展示

# 列表 List

最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。
`````

%%Content%%

## API

%%Props%%

### `<ListGridProps>`

|参数名|描述|类型|默认值|
|---|:---:|:---:|---:|
|gutter|行间距|`number`|`-`|
|span|栅格占位格数|`number`|`-`|
|xs|`xs` 对应的栅格占位格数|`number`|`-`|
|sm|`sm` 对应的栅格占位格数|`number`|`-`|
|md|`md` 对应的栅格占位格数|`number`|`-`|
|lg|`lg` 对应的栅格占位格数|`number`|`-`|
|xl|`xl` 对应的栅格占位格数|`number`|`-`|
|xxl|`xxl` 对应的栅格占位格数|`number`|`-`|

### VirtualListProps

|参数名|描述|类型|默认值|
|------|:----------:|:--------:|-----:|
|height|可视区高度 (`2.11.0` 开始支持如 `80%` 的 `string` 类型)|`number`|`200`|
|threshold|自动开启虚拟滚动的元素数量阈值，传入`null`以禁用虚拟滚动。|`number`\|`null`|`100`|
|isStaticItemHeight|是否为相同高度的静态元素|`boolean`|`true`|
