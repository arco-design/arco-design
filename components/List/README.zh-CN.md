`````
组件 / 数据展示

# 列表 List

最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。
`````

%%Content%%

## API

### List

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|className|节点类名|`string \| string[]`|`-`|-|
|style|节点样式|`CSSProperties`|`-`|-|
|wrapperStyle|指定最外层包裹元素的样式|`CSSProperties`|`-`|-|
|wrapperClassName|指定最外层包裹元素的类名|`string \| string[]`|`-`|-|
|dataSource|列表渲染数据源，当children存在时，可不传此参数 (dataSource优先级更高）|`T[]`|`-`|-|
|render|单个列表渲染函数，当 children 存在时，可不传此参数|`(item: T, index: number) => ReactNode`|`-`|-|
|children|当 dataSource 和 render 存在时，可不传此参数|`ReactNode`|`-`|-|
|size|列表的尺寸|`'small' \| 'default' \| 'large'`|`-`|-|
|header|列表头部|`ReactNode`|`-`|-|
|footer|列表底部|`ReactNode`|`-`|-|
|pagination|是否使用翻页，也可传入 `Pagination` 的配置|`boolean \| PaginationProps`|`-`|-|
|bordered|是否显示边框|`boolean`|`true`|-|
|split|是否显示分割线|`boolean`|`true`|-|
|grid|列表栅格配置|`ListGridProps`|`-`|`column` in 2.20.0|
|loading|是否加载中|`boolean`|`-`|-|
|hoverable|列表项是否可悬浮|`boolean`|`2.9.0`|-|
|onReachBottom|滚动至底部触发函数|`(currentPage: number) => void`|`-`|-|
|offsetBottom|触发底部函数的距离阙值|`number`|`0`|-|
|defaultCurrent|滚动加载数据当前页码|`number`|`1`|-|
|throttleDelay|节流延时|`number`|`500`|-|
|listRef|当前列表的引用|`MutableRefObject<ListHandle>`|`-`|2.20.0|
|onListScroll|列表滚动回调函数,参数为列表滚动元素，当onReachBottom无法满足需求，可自定义滚动监听函数。|`(elem: Element) => void`|`-`|-|
|scrollLoading|滚动加载状态时，滚动到底部的提示|`string \| ReactNode`|`-`|-|
|noDataElement|没有数据的时候显示的元素|`ReactNode`|`-`|-|
|virtualListProps|传递虚拟列表属性，传入此参数以开启虚拟滚动|`AvailableVirtualListProps`|`-`|2.11.0|

### List.Item

|参数名|描述|类型|默认值|
|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|
|className|节点类名|`string \| string[]`|`-`|
|actions|列表项下方内容（列表操作组）|`ReactNode[]`|`-`|
|extra|列表最右侧内容，额外内容|`ReactNode`|`-`|
|actionLayout|列表操作组的位置，默认horizontal，出现在右侧；vertical出现在下方。|`'horizontal' \| 'vertical'`|`horizontal`|

### List.Item.Meta

|参数名|描述|类型|默认值|
|---|---|---|---|
|className|节点类名|`string \| string[]`|`-`|
|style|节点样式|`CSSProperties`|`-`|
|title|列表元素标题|`ReactNode`|`-`|
|avatar|列表元素的图标|`ReactNode`|`-`|
|description|列表元素描述内容|`ReactNode`|`-`|

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
