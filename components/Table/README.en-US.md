`````
Component / Data Display

# Table

Used for data collection, display, analysis, and processing.
`````

%%Content%%

## API

### Table

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|tableLayoutFixed|The table's `table-layout` property is set to `fixed`. After set to `fixed`, the width of the table will not be stretched by the content beyond 100%.|`boolean`|`-`|-|
|rowKey|Table row key|`string \| ((record: T) => string)`|`key`|-|
|columns|An array of column objects|`ColumnProps<T>[]`|`-`|-|
|components|Override native table tag|`ComponentsProps`|`-`|-|
|data|Data record array to be displayed|`T[]`|`-`|-|
|border|Configure border|`\| boolean\| { wrapper?: boolean; headerCell?: boolean; bodyCell?: boolean; cell?: boolean }`|`true`|-|
|borderCell|Whether to display the table cell border, equivalent to `border={{ cell: true }}`|`boolean`|`-`|-|
|hover|Whether to enable the hover style|`boolean`|`true`|-|
|defaultExpandAllRows|Expand all expandable rows by default|`boolean`|`-`|-|
|expandedRowKeys|To set expanded rows.|`(string \| number)[]`|`-`|-|
|defaultExpandedRowKeys|To set default expanded rows|`(string \| number)[]`|`-`|-|
|expandedRowRender|Click to expand additional rows, rendering functions. When the return value is `null`, the expand button will not be rendered|`(record: T, index: number) => ReactNode`|`-`|-|
|expandProps|Customize the icon, width, and title of the expandable column, see [this example](/react/components/table#custom expand parameters) for usage|`ExpandProps<T>`|`-`|-|
|onExpand|Callback when click to expand|`(record: T, expanded: boolean) => void`|`-`|-|
|onExpandedRowsChange|Callback when expanded button is clicked, the parameter is an array of expanded rows|`(expandedRows: (string \| number)[]) => void`|`-`|-|
|loading|Whether the table is in loading|`boolean \| SpinProps`|`-`|-|
|noDataElement|Element to be displayed when there is no data|`string \| ReactNode`|`-`|-|
|showHeader|Whether to show the header|`boolean`|`true`|-|
|showSorterTooltip|Whether the header shows the tooltip for the next sorting. The object can be set,and all the parameters of the `Tooltip` component can be passed.|`boolean \| TooltipProps`|`true`|2.19.0|
|stripe|Whether to show stripe style|`boolean`|`-`|-|
|size|The table size is divided into four sizes, `default` `medium` `small` `mini`|`'default' \| 'middle' \| 'small' \| 'mini'`|`-`|-|
|onChange|Callback when pagination, sorting, and filtering changes|`(pagination: PaginationProps,sorter: SorterResult,filters: Partial<Record<keyof T, string[]>>,extra: { currentData: T[]; action: 'paginate' \| 'sort' \| 'filter' }) => void`|`-`|extra in `2.19.0`|
|pagination|Pagination settings, refer to [Pagination components](/react/components/pagination), set `false` to hide pagination|`PaginationProps \| boolean`|`-`|-|
|renderPagination|Customized pagination render|`(paginationNode?: ReactNode) => ReactNode`|`-`|2.11.0|
|scroll|Set the scroll of x-axis or y-axis. Setting `x` to `true` will add `table-layout: fixed` to the table and `overflow: auto` to the parent element.If `y` is set to `true`, the header and body will be separated and placed in two tables|`{ x?: number \| string \| boolean; y?: number \| string \| boolean }`|`-`|-|
|rowClassName|ClassName of table row|`(record: T, index: number) => string`|`-`|-|
|rowSelection|Set whether the table row is selectable, select event, etc. [Configuration item](#rowselection)|`RowSelectionProps<T>`|`-`|-|
|onHeaderRow|Set the event callback of the header row|`(columns: ColumnProps<T>[], index: number) => RowCallbackProps`|`-`|-|
|onRow|Set the event callback of the table row|`(record: T, index: number) => RowCallbackProps`|`-`|-|
|placeholder|When the cell content is empty, a placeholder is displayed, and the priority is lower than `column.placeholder`.|`ReactNode`|`-`|2.23.0|
|pagePosition|Set the position of the pagination, there are six positions `bottom right` `bottom left` `top right` `top left` `top center` `bottom center`|`'br' \| 'bl' \| 'tr' \| 'tl' \| 'topCenter' \| 'bottomCenter'`|`br`|-|
|childrenColumnName|The field name of the tree data in `data`, default is `children`|`string`|`children`|-|
|indentSize|The pixel offset to the left of each level of the tree data|`number`|`15`|-|
|footer|The footer of the table|`(currentPageDate) => ReactNode`|`-`|-|
|virtualized|The table enables virtual scrolling for processing big data scenarios.(Note: Virtual scrolling will automatically turn off support for tree data)|`boolean`|`-`|-|
|summary|Table Summary|`(currentData?: T[]) => ReactNode`|`-`|2.17.0|

### RowSelection

The detailed parameters of `rowSelection`.

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|checkAll|Whether to show check all button|`boolean`|`-`|-|
|checkCrossPage|Whether the checkboxes in multi-select mode cross pages, only work in uncontrolled mode|`boolean`|`-`|-|
|columnTitle|Customize the title of the selection column|`string \| ReactNode`|`-`|-|
|columnWidth|The width of the selection column|`number`|`-`|-|
|checkboxProps|Configure the selection checkbox|`(record: T) => { [key: string]: any }`|`-`|-|
|fixed|Whether to fix column to the left|`boolean`|`-`|-|
|onChange|Callback when the checkbox/radio changes|`(selectedRowKeys: (string \| number)[], selectedRows: T[]) => void`|`-`|-|
|onSelect|Callback for user manual selection/deselection|`(selected: boolean, record: T, selectedRows: T[]) => void`|`-`|2.22.0|
|onSelectAll|Callback when the user to manually select/deselect all rows|`(selected: boolean, selectedRows) => void`|`-`|2.6.0|
|pureKeys|In the big data scenario, optimizing the experience of the checkbox, there are only keys in the onChange callback,and the corresponding rows are not returned and calculated|`boolean`|`-`|2.15.0|
|preserveSelectedRowKeys|The `key` is still retained in `selectedRowKeys` when the data item is deleted|`boolean`|`-`|2.19.0|
|renderCell|Customize checkbox, the usage is same as `column.render`.|`(originNode, checked: boolean, record: T) => ReactNode`|`-`|2.19.0|
|selectedRowKeys|Table selected row, (controlled mode, need to be used with `onChange`)|`(string \| number)[]`|`-`|-|
|type|Multi-select or single-select|`'checkbox' \| 'radio'`|`-`|-|

### ExpandProps

The detailed parameters of `expandProps`.

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|icon|Customize the icon of the expand button|`(props: { expanded: boolean; record: Record<string, any> }) => ReactNode`|`-`|-|
|width|The width of expand icon column|`number`|`-`|-|
|columnTitle|The table header title of expand icon column|`ReactNode`|`-`|-|
|rowExpandable|Whether to allow row expansion. If this parameter is not specified,it will be determined by whether expandedRowRender has a return value. When performance problems occur, rowExpandable is recommended.|`(record: T) => boolean`|`-`|2.16.0|
|expandRowByClick|Clicking on the row to expand|`boolean`|`-`|2.19.0|

### Column

The column describes the data object and is an item in `columns`.

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|className|ClassName of the column|`string \| string[]`|`-`|-|
|align|Set the alignment of the column|`'left' \| 'center' \| 'right'`|`left`|-|
|ellipsis|If the cell content exceeds the length, whether it is automatically omitted and displays `...`.After setting this property, the `table-layout` of the table will automatically become `fixed`.|`boolean`|`-`|-|
|headerCellStyle|Table header cell style|`CSSProperties`|`-`|-|
|bodyCellStyle|Table body cell style|`CSSProperties`|`-`|-|
|title|Column title|`React.ReactNode` **(Required)**|`-`|-|
|width|Column width|`number \| string`|`-`|-|
|dataIndex|The `key` corresponding to the column data in the data item is used to display the value.It supports the nested writing of `a[0].bc[1]`, see [lodash.get](https:// www.npmjs.com/package/lodash.get).|`string`|`-`|-|
|key|React key value, if not specified, the default value of `dataIndex` is taken|`string \| number`|`-`|-|
|render|Customize the content displayed in the cell|`(col, item: T, index: number) => any`|`-`|-|
|placeholder|When the cell content is empty, a placeholder is displayed, and the priority is lower than `render`.|`ReactNode`|`-`|2.22.0|
|sorter|Sorting function, if you want server-side sorting or adding more custom operations, set to true and use the `onChange` function for custom sorting|`((a, b) => any) \| boolean`|`-`|-|
|filters|Filter items, need to be used with `onFilter` or `onChange`|`{text?: ReactNode;value?: any;[key: string]: any;}[]`|`[]`|-|
|defaultFilters|To set default filters|`string[]`|`-`|-|
|defaultSortOrder|To set default sort order|`'ascend' \| 'descend'`|`-`|-|
|filteredValue|To set filtered value, the value is the filtered value array|`string[]`|`-`|-|
|sortOrder|To set sort order, which can control the sorting of columns, can be set to `ascend` `descend`|`'ascend' \| 'descend'`|`-`|-|
|sortDirections|Supported sorting methods.|`Array<'ascend' \| 'descend'>`|`['ascend','descend']`|-|
|filterMultiple|Is it possible to filter multiple items|`boolean`|`true`|-|
|filterIcon|Custom filter icon.|`ReactNode`|`-`|-|
|filterDropdown|Custom filter popup box.|`(props: {filterKeys?: string[];setFilterKeys?: (filterKeys: string[], callback?: Function) => void;confirm?: Function;}) => ReactNode`|`-`|-|
|filterDropdownProps|Configure properties of the filter popup box.|`{ triggerProps?: TriggerProps }`|`-`|-|
|onFilterDropdownVisibleChange|Callback when the visible of filter popup changes|`(visible: boolean) => void`|`-`|-|
|onFilter|Callback when filter changes|`(value, row) => any`|`-`|-|
|fixed|Fixed header and column to the left or right|`'left' \| 'right'`|`-`|-|
|onHeaderCell|Set the event callback of the table head cell|`(column, index) => RowCallbackProps`|`-`|-|
|onCell|Set the event callback of the table body cell|`(record, index) => RowCallbackProps`|`-`|-|

### Hide Pagination

If you want to hide pagination when the number of pages is less than or equal to one page, you can configure `pagination.hideOnSinglePage = true`. If you want to configure it globally,
You can configure the `tablePagination.hideOnSinglePage = true` of the `ConfigProvider` component.

### onRow

`onRow`, `onHeaderRow`, `onCell`, `onHeaderCell` have the same usage.

```js
<Table
  onRow={(record, index) => {
    return {
      onClick: (event) => {}, // Click on the body row
      onDoubleClick: (event) => {},
      onContextMenu: (event) => {},
      onMouseEnter: (event) => {},
      onMouseLeave: (event) => {},
    };
  }}
  onHeaderRow={(column, index) => {
    return {
      onClick: (event) => {}, // Click on the head row
      onDoubleClick: (event) => {},
      onContextMenu: (event) => {},
      onMouseEnter: (event) => {},
      onMouseLeave: (event) => {},
    };
  }}
/>
```
