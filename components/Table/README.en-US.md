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
|borderCell|Whether to display the table cell border, equivalent to `border={{ cell: true }}`|boolean |`-`|-|
|defaultExpandAllRows|Expand all expandable rows by default|boolean |`-`|-|
|hover|Whether to enable the hover style|boolean |`true`|-|
|showHeader|Whether to show the header|boolean |`true`|-|
|stripe|Whether to show stripe style|boolean |`-`|-|
|tableLayoutFixed|The table's `table-layout` property is set to `fixed`. After set to `fixed`, the width of the table will not be stretched by the content beyond 100%.|boolean |`-`|-|
|virtualized|The table enables virtual scrolling for processing big data scenarios.(Note: Virtual scrolling will automatically turn off support for tree data)|boolean |`-`|-|
|indentSize|The pixel offset to the left of each level of the tree data|number |`15`|-|
|childrenColumnName|The field name of the tree data in `data`, default is `children`|string |`children`|-|
|onChange|Callback when pagination, sorting, and filtering changes|(pagination: [PaginationProps](pagination#pagination),sorter: [SorterInfo](#sorterinfo) \| [SorterInfo](#sorterinfo)[],filters: Partial&lt;Record&lt;keyof T, string[]&gt;&gt;,extra: { currentData: T[]; currentAllData: T[]; action: 'paginate' \| 'sort' \| 'filter' }) =&gt; void |`-`|extra in `2.19.0`, currentAllData in 2.53.0|
|pagePosition|Set the position of the pagination, there are six positions `bottom right` `bottom left` `top right` `top left` `top center` `bottom center`|'br' \| 'bl' \| 'tr' \| 'tl' \| 'topCenter' \| 'bottomCenter' |`br`|-|
|size|The table size is divided into four sizes, `default` `medium` `small` `mini`|'default' \| 'middle' \| 'small' \| 'mini' |`-`|-|
|noDataElement|Element to be displayed when there is no data|string \| ReactNode |`-`|-|
|placeholder|When the cell content is empty, a placeholder is displayed, and the priority is lower than `column.placeholder`.|ReactNode |`-`|2.23.0|
|border|Configure border|\| boolean\| { wrapper?: boolean; headerCell?: boolean; bodyCell?: boolean; cell?: boolean } |`true`|-|
|className|Additional css class|string \| string[] |`-`|-|
|columns|An array of column objects|[ColumnProps](table#column)&lt;T&gt;[] |`-`|-|
|components|Override native table tag|[ComponentsProps](#componentsprops) |`-`|-|
|data|Data record array to be displayed|T[] |`-`|-|
|defaultExpandedRowKeys|To set default expanded rows|(string \| number)[] |`-`|-|
|expandedRowKeys|To set expanded rows.|(string \| number)[] |`-`|-|
|expandProps|Customize the icon, width, and title of the expandable column, see [this example](/react/components/table#custom expand parameters) for usage|[ExpandProps](table#expandprops)&lt;T&gt; |`-`|-|
|loading|Whether the table is in loading|boolean \| [SpinProps](spin#spin) |`-`|-|
|onHeaderRow|Set the event callback of the header row|(columns: [ColumnProps](table#column)&lt;T&gt;[], index: number) =&gt; [RowCallbackProps](#rowcallbackprops) |`-`|-|
|pagination|Pagination settings, refer to [Pagination components](/react/components/pagination), set `false` to hide pagination|[PaginationProps](pagination#pagination) \| boolean |`-`|-|
|rowSelection|Set whether the table row is selectable, select event, etc. [Configuration item](#rowselection)|[RowSelectionProps](table#rowselection)&lt;T&gt; |`-`|-|
|scroll|Set the scroll of x-axis or y-axis. Setting `x` to `true` will add `table-layout: fixed` to the table and `overflow: auto` to the parent element.If `y` is set to `true`, the header and body will be separated and placed in two tables|{ x?: number \| string \| boolean; y?: number \| string \| boolean } |`-`|-|
|showSorterTooltip|Whether the header shows the tooltip for the next sorting. The object can be set,and all the parameters of the `Tooltip` component can be passed.|boolean \| [TooltipProps](tooltip#tooltip) |`true`|2.19.0|
|style|Additional style|CSSProperties |`-`|-|
|virtualListProps|Used to configure `VirtualList`.|[AvailableVirtualListProps](#availablevirtuallistprops) |`-`|2.46.0|
|expandedRowRender|Click to expand additional rows, rendering functions. When the return value is `null`, the expand button will not be rendered|(record: T, index: number) => ReactNode |`-`|-|
|footer|The footer of the table|(currentPageDate) => ReactNode |`-`|-|
|onExpand|Callback when click to expand|(record: T, expanded: boolean) => void |`-`|-|
|onExpandedRowsChange|Callback when expanded button is clicked, the parameter is an array of expanded rows|(expandedRows: (string \| number)[]) => void |`-`|-|
|onRow|Set the event callback of the table row|(record: T, index: number) => [RowCallbackProps](#rowcallbackprops) |`-`|-|
|renderPagination|Customized pagination render|(paginationNode?: ReactNode) => ReactNode |`-`|2.11.0|
|rowClassName|ClassName of table row|(record: T, index: number) => string |`-`|-|
|rowKey|Table row key|React.Key \| ((record: T) => React.Key) |`key`|-|
|summary|Table Summary|(currentData?: T[]) => ReactNode |`-`|2.17.0|

### RowSelection

The detailed parameters of `rowSelection`.

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|checkAll|Whether to show check all button|boolean |`-`|-|
|checkCrossPage|Whether the checkboxes in multi-select mode cross pages, only works in uncontrolled mode, but also works in controlled mode with preserveSelectedRowKeys: true.|boolean |`-`|-|
|checkStrictly|When set to `false`, parent-child selections are automatically associated.|boolean |`true`|2.33.0|
|fixed|Whether to fix column to the left|boolean |`-`|-|
|preserveSelectedRowKeys|The `key` is still retained in `selectedRowKeys` when the data item is deleted|boolean |`-`|2.19.0|
|columnWidth|The width of the selection column|number |`-`|-|
|type|Multi-select or single-select|'checkbox' \| 'radio' |`-`|-|
|columnTitle|Customize the title of the selection column|string \| ReactNode |`-`|-|
|selectedRowKeys|Table selected row, (controlled mode, need to be used with `onChange`)|(string \| number)[] |`-`|-|
|checkboxProps|Configure the selection checkbox|(record: T) => { [key: string]: any } |`-`|-|
|onChange|Callback when the checkbox/radio changes|(selectedRowKeys: (string \| number)[], selectedRows: T[]) => void |`-`|-|
|onSelect|Callback for user manual selection/deselection|(selected: boolean, record: T, selectedRows: T[]) => void |`-`|2.22.0|
|onSelectAll|Callback when the user to manually select/deselect all rows|(selected: boolean, selectedRows) => void |`-`|2.6.0|
|renderCell|Customize checkbox, the usage is same as `column.render`.|(originNode, checked: boolean, record: T) => ReactNode |`-`|2.19.0|

### ExpandProps

The detailed parameters of `expandProps`.

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|expandRowByClick|Clicking on the row to expand|boolean |`-`|2.19.0|
|strictTreeData|For tree data, only when `children` is an array and the length is greater than 1, the expand icon will be displayed.|boolean |`true`|2.27.0|
|width|The width of expand icon column|number |`-`|-|
|columnTitle|The table header title of expand icon column|ReactNode |`-`|-|
|icon|Customize the icon of the expand button|(props: { expanded: boolean; record: Record&lt;string, any&gt; }) =&gt; ReactNode |`-`|-|
|rowExpandable|Whether to allow row expansion. If this parameter is not specified,it will be determined by whether expandedRowRender has a return value. When performance problems occur, rowExpandable is recommended.|(record: T) => boolean |`-`|2.16.0|

### Column

The column describes the data object and is an item in `columns`.

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|ellipsis|If the cell content exceeds the length, whether it is automatically omitted and displays `...`.After setting this property, the `table-layout` of the table will automatically become `fixed`.|boolean |`-`|-|
|filterMultiple|Is it possible to filter multiple items|boolean |`true`|-|
|dataIndex|The `key` corresponding to the column data in the data item is used to display the value.It supports the nested writing of `a[0].bc[1]`, see [lodash.get](https:// www.npmjs.com/package/lodash.get).|string |`-`|-|
|align|Set the alignment of the column|'left' \| 'center' \| 'right' |`left`|-|
|defaultSortOrder|To set default sort order|'ascend' \| 'descend' |`-`|-|
|fixed|Fixed header and column to the left or right|'left' \| 'right' |`-`|-|
|sortDirections|Supported sorting methods.|Array<'ascend' \| 'descend'> |`['ascend','descend']`|-|
|sortOrder|To set sort order, which can control the sorting of columns, can be set to `ascend` `descend`|'ascend' \| 'descend' |`-`|-|
|filterIcon|Custom filter icon.|ReactNode |`-`|-|
|placeholder|When the cell content is empty, a placeholder is displayed, and the priority is lower than `render`.|ReactNode |`-`|2.22.0|
|title|Column title|React.ReactNode  **(Required)**|`-`|-|
|bodyCellStyle|Table body cell style|CSSProperties |`-`|-|
|className|ClassName of the column|string \| string[] |`-`|-|
|defaultFilters|To set default filters|string[] |`-`|-|
|filterDropdownProps|Configure properties of the filter popup box.|{ triggerProps?: [TriggerProps](trigger#trigger) } |`-`|-|
|filteredValue|To set filtered value, the value is the filtered value array|string[] |`-`|-|
|filters|Filter items, need to be used with `onFilter` or `onChange`|{text?: ReactNode;value?: any;[key: string]: any;}[] |`[]`|-|
|headerCellStyle|Table header cell style|CSSProperties |`-`|-|
|key|React key value, if not specified, the default value of `dataIndex` is taken|string \| number |`-`|-|
|sorter|Sorting function, if you want server-side sorting or adding more custom operations, set to true and use the `onChange` function for custom sorting|[SorterFn](#sorterfn) \| boolean \| { compare?: [SorterFn](#sorterfn); multiple?: number } |`-`|-|
|width|Column width|number \| string |`-`|-|
|filterDropdown|Custom filter popup box.|(props: {filterKeys?: string[];setFilterKeys?: (filterKeys: string[], callback?: Function) => void;confirm?: Function;}) => ReactNode |`-`|-|
|onCell|Set the event callback of the table body cell|(record, index) => [RowCallbackProps](#rowcallbackprops) |`-`|-|
|onFilter|Callback when filter changes|(value, row) => any |`-`|-|
|onFilterDropdownVisibleChange|Callback when the visible of filter popup changes|(visible: boolean) => void |`-`|-|
|onHeaderCell|Set the event callback of the table head cell|(column, index) => [RowCallbackProps](#rowcallbackprops) |`-`|-|
|render|Customize the content displayed in the cell|(col, item: T, index: number) => any |`-`|-|

### ComponentsProps

```js
export type ComponentsProps = {
  table?: any;
  header?: {
    operations?: (nodes: {
      selectionNode?: ReactNode;
      expandNode?: ReactNode;
    }) => {
      name?: string;
      node?: ReactNode;
      width?: number;
    }[];
    wrapper?: any;
    thead?: any;
    row?: any;
    th?: any;
    cell?: any;
  };
  body?: {
    operations?: (nodes: {
      selectionNode?: ReactNode;
      expandNode?: ReactNode;
    }) => {
      name?: string;
      node?: ReactNode | ((record) => ReactNode); // 2.17.0
      width?: number;
    }[];
    wrapper?: any;
    tbody?: any;
    row?: any;
    td?: any;
    cell?: any;
  };
};
```

### SorterInfo

```js
export interface SorterInfo {
  direction?: SortDirection;
  field?: string | number;
  sorterFn?: SorterFn;
  priority?: number;
}
```

### SortDirection

```js
export declare type SortDirection = "descend" | "ascend";
```

### SorterFn

```js
export type SorterFn = (a: any, b: any) => number;
```

### RowCallbackProps

```js
export type RowCallbackProps = {
  onClick?: (event) => void;
  onDoubleClick?: (event) => void;
  onContextMenu?: (event) => void;
  onMouseEnter?: (event) => void;
  onMouseLeave?: (event) => void;
  onHandleSave?: (row) => void;
  [name: string]: any;
};
```

### AvailableVirtualListProps

```js
export type AvailableVirtualListProps = Pick<
  VirtualListProps<any>,
  "height" | "itemHeight" | "threshold" | "isStaticItemHeight" | "scrollOptions"
>;
```

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
