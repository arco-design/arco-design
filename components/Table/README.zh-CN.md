`````
组件 / 数据展示

# 表格 Table

用于数据收集展示、分析整理、操作处理。
`````

%%Content%%

## API

### Table

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|tableLayoutFixed|表格的 `table-layout` 属性设置为 `fixed`，设置为 `fixed` 后，表格的宽度不会被内容撑开超出 100%。|`boolean`|`-`|-|
|rowKey|表格行 key 的取值字段|`string \| ((record: T) => string)`|`key`|-|
|columns|列描述数据对象的数组|`ColumnProps<T>[]`|`-`|-|
|components|覆盖原生表格标签|`ComponentsProps`|`-`|-|
|data|表格数据|`T[]`|`-`|-|
|border|边框设置|`\| boolean\| { wrapper?: boolean; headerCell?: boolean; bodyCell?: boolean; cell?: boolean }`|`true`|-|
|borderCell|是否显示单元格边框，作用等同于 `border={{ cell: true }}`|`boolean`|`-`|-|
|hover|是否开启鼠标悬浮效果|`boolean`|`true`|-|
|defaultExpandAllRows|默认展开所有可展开的行|`boolean`|`-`|-|
|expandedRowKeys|展开的行（受控）|`(string \| number)[]`|`-`|-|
|defaultExpandedRowKeys|默认展开的行|`(string \| number)[]`|`-`|-|
|expandedRowRender|点击展开额外的行，渲染函数。返回值为 `null` 时，不会渲染展开按钮|`(record: T, index: number) => ReactNode`|`-`|-|
|expandProps|自定义展开/关闭列的图标，宽度，标题，具体用法看[这个例子](/react/components/table#定制展开参数)|`ExpandProps<T>`|`-`|-|
|onExpand|点击展开的回调|`(record: T, expanded: boolean) => void`|`-`|-|
|onExpandedRowsChange|点击展开时触发，参数为展开行数组|`(expandedRows: (string \| number)[]) => void`|`-`|-|
|loading|表格是否在加载中|`boolean \| SpinProps`|`-`|-|
|noDataElement|没有数据的时候显示的元素|`string \| ReactNode`|`-`|-|
|showHeader|是否显示表头|`boolean`|`true`|-|
|showSorterTooltip|表头是否显示下一次排序的 tooltip 提示。可以设置对象，可以传 `Tooltip` 组件的所有参数。|`boolean \| TooltipProps`|`true`|2.19.0|
|stripe|是否开启斑马纹|`boolean`|`-`|-|
|size|表格尺寸，分为 默认，`默认` `中` `小` `迷你` 四个尺寸|`'default' \| 'middle' \| 'small' \| 'mini'`|`-`|-|
|onChange|分页、排序、筛选时的回调|`(pagination: PaginationProps,sorter: SorterResult,filters: Partial<Record<keyof T, string[]>>,extra: { currentData: T[]; action: 'paginate' \| 'sort' \| 'filter' }) => void`|`-`|extra in `2.19.0`|
|pagination|分页器设置，参考[Pagination组件](/react/components/pagination)，设置 `false` 不展示分页|`PaginationProps \| boolean`|`-`|-|
|renderPagination|自定义分页渲染。|`(paginationNode?: ReactNode) => ReactNode`|`-`|2.11.0|
|scroll|设置x轴或y轴的滚动。`x` 设置为 `true`，会给 table 添加 `table-layout: fixed` 以及给父元素添加 `overflow: auto`。`y` 设置为 `true`，表头和表身会分离，放在两个 table 中|`{ x?: number \| string \| boolean; y?: number \| string \| boolean }`|`-`|-|
|rowClassName|表格行的类名|`(record: T, index: number) => string`|`-`|-|
|rowSelection|设置表格行是否可选，选中事件等。[配置项](#rowselection)|`RowSelectionProps<T>`|`-`|-|
|onHeaderRow|设置表头行单元格的各项事件回调|`(columns: ColumnProps<T>[], index: number) => RowCallbackProps`|`-`|-|
|onRow|设置表格行的各项事件回调|`(record: T, index: number) => RowCallbackProps`|`-`|-|
|placeholder|当单元格内容为空时，显示占位符，优先级低于 `column.placeholder`。|`ReactNode`|`-`|2.23.0|
|pagePosition|设置分页器的位置，有四个方位 `右下` `左下` `右上` `左上` `上中` `下中`|`'br' \| 'bl' \| 'tr' \| 'tl' \| 'topCenter' \| 'bottomCenter'`|`br`|-|
|childrenColumnName|树形数据在 `data` 中的字段名，默认是 `children`|`string`|`children`|-|
|indentSize|树形数据每个层级向左偏移的像素|`number`|`15`|-|
|footer|表格尾部|`(currentPageDate) => ReactNode`|`-`|-|
|virtualized|表格开启虚拟滚动，用于处理大数据场景。( 注意：虚拟滚动会自动关闭对树形数据的支持 )|`boolean`|`-`|-|
|summary|总结栏|`(currentData?: T[]) => ReactNode`|`-`|2.17.0|

### RowSelection

`<Table>` 参数 `rowSelection` 的详细参数。

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|checkAll|多选模式下是否开启全选功能|`boolean`|`-`|-|
|checkCrossPage|多选模式下的复选框是否跨分页，只在非受控模式下生效|`boolean`|`-`|-|
|columnTitle|自定义列表选择的标题|`string \| ReactNode`|`-`|-|
|columnWidth|选择框列的宽度|`number`|`-`|-|
|checkboxProps|选择框的属性配置|`(record: T) => { [key: string]: any }`|`-`|-|
|fixed|是否固定选择列到左边|`boolean`|`-`|-|
|onChange|单选或多选的选中项发生改变时的回调|`(selectedRowKeys: (string \| number)[], selectedRows: T[]) => void`|`-`|-|
|onSelect|用户手动选择/取消选择的回调|`(selected: boolean, record: T, selectedRows: T[]) => void`|`-`|2.22.0|
|onSelectAll|用户手动选择/取消选择所有行的回调|`(selected: boolean, selectedRows) => void`|`-`|2.6.0|
|pureKeys|大数据场景下优化复选框选中体验，onChange 回调里只有 keys，而不返回和计算相应的 rows|`boolean`|`-`|2.15.0|
|preserveSelectedRowKeys|在数据项被删除时仍然保留选项的 `key`|`boolean`|`-`|2.19.0|
|renderCell|定制复选框，用法与 `column.render` 相同。|`(originNode, checked: boolean, record: T) => ReactNode`|`-`|2.19.0|
|selectedRowKeys|Table选中的项，（受控模式，需要跟 `onChange` 配合使用）|`(string \| number)[]`|`-`|-|
|type|多选或者单选|`'checkbox' \| 'radio'`|`-`|-|

### ExpandProps

`<Table>` 参数 `expandProps` 的详细参数。

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|icon|定制展开按钮的图标|`(props: { expanded: boolean; record: Record<string, any> }) => ReactNode`|`-`|-|
|width|展开按钮列的宽度|`number`|`-`|-|
|columnTitle|展开按钮列的表头标题|`ReactNode`|`-`|-|
|rowExpandable|是否允许行展开。如果不指定该参数，会以 expandedRowRender 是否有返回值决定。当出现性能问题时，建议使用 rowExpandable。|`(record: T) => boolean`|`-`|2.16.0|
|expandRowByClick|支持通过点击行来展开|`boolean`|`-`|2.19.0|

### Column

列描述数据对象，是 `columns` 中的一项。

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|className|列的类名|`string \| string[]`|`-`|-|
|align|设置列的对齐方式|`'left' \| 'center' \| 'right'`|`left`|-|
|ellipsis|单元格内容超出长度后，是否自动省略，显示 `...`。设置这个属性后，table 的 `table-layout` 将自动变成 `fixed`。|`boolean`|`-`|-|
|headerCellStyle|表头单元格自定义样式|`CSSProperties`|`-`|-|
|bodyCellStyle|表身单元格自定义样式|`CSSProperties`|`-`|-|
|title|列标题|`React.ReactNode` **(必填)**|`-`|-|
|width|列宽度|`number \| string`|`-`|-|
|dataIndex|列数据在数据项中对应的 `key`，用于取值显示，支持 `a[0].b.c[1]` 的嵌套写法，详情看 [lodash.get](https://www.npmjs.com/package/lodash.get)。|`string`|`-`|-|
|key|React的 key值，如果不指定，默认取 `dataIndex` 的值|`string \| number`|`-`|-|
|render|自定义单元格显示的内容|`(col, item: T, index: number) => any`|`-`|-|
|placeholder|当单元格内容为空时，显示占位符，优先级低于 `render`。|`ReactNode`|`-`|2.22.0|
|sorter|排序函数，如果想要服务端排序或者添加更多自定义操作，设置为true，利用`onChange`函数进行自定义排序|`((a, b) => any) \| boolean`|`-`|-|
|filters|筛选项，需要配合 `onFilter` 或者 `onChange` 使用|`{text?: ReactNode;value?: any;[key: string]: any;}[]`|`[]`|-|
|defaultFilters|默认筛选条件|`string[]`|`-`|-|
|defaultSortOrder|默认排序方式|`'ascend' \| 'descend'`|`-`|-|
|filteredValue|筛选的受控属性，值为筛选的 value 数组|`string[]`|`-`|-|
|sortOrder|排序的受控属性，可以控制列的排序，可设置为 `ascend` `descend`|`'ascend' \| 'descend'`|`-`|-|
|sortDirections|支持的排序方式。|`Array<'ascend' \| 'descend'>`|`['ascend','descend']`|-|
|filterMultiple|是否可以筛选多项|`boolean`|`true`|-|
|filterIcon|自定义筛选图标。|`ReactNode`|`-`|-|
|filterDropdown|自定义筛选框。|`(props: {filterKeys?: string[];setFilterKeys?: (filterKeys: string[], callback?: Function) => void;confirm?: Function;}) => ReactNode`|`-`|-|
|filterDropdownProps|配置筛选弹出框的一些属性。|`{ triggerProps?: TriggerProps }`|`-`|-|
|onFilterDropdownVisibleChange|筛选框打开关闭的回调|`(visible: boolean) => void`|`-`|-|
|onFilter|筛选函数，配合`filters`|`(value, row) => any`|`-`|-|
|fixed|固定头和列到左边或者右边|`'left' \| 'right'`|`-`|-|
|onHeaderCell|设置头部单元格的各项事件回调|`(column, index) => RowCallbackProps`|`-`|-|
|onCell|设置表身单元格的各项事件回调|`(record, index) => RowCallbackProps`|`-`|-|

### 隐藏分页

如果想在页数小于或等于一页时隐藏分页，可以配置 `pagination.hideOnSinglePage = true`，如果想全局配置，
可以配置 `ConfigProvider` 组件的 `tablePagination.hideOnSinglePage = true`。

### onRow 用法

`onRow`, `onHeaderRow`, `onCell`, `onHeaderCell` 用法一致。

```js
<Table
  onRow={(record, index) => {
    return {
      onClick: (event) => {}, // 点击表身行
      onDoubleClick: (event) => {},
      onContextMenu: (event) => {},
      onMouseEnter: (event) => {},
      onMouseLeave: (event) => {},
    };
  }}
  onHeaderRow={(column, index) => {
    return {
      onClick: (event) => {}, // 点击表头行
      onDoubleClick: (event) => {},
      onContextMenu: (event) => {},
      onMouseEnter: (event) => {},
      onMouseLeave: (event) => {},
    };
  }}
/>
```
