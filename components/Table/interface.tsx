import React, { ReactNode, CSSProperties } from 'react';
import { PaginationProps } from '../Pagination/pagination';
import { SpinProps } from '../Spin';
import { TriggerProps } from '../Trigger';
import { TooltipProps } from '../Tooltip';

export type RowCallbackProps = {
  onClick?: (event) => void;
  onDoubleClick?: (event) => void;
  onContextMenu?: (event) => void;
  onMouseEnter?: (event) => void;
  onMouseLeave?: (event) => void;
  onHandleSave?: (row) => void;
  [name: string]: any;
};

/**
 * @title Table
 */
export interface TableProps<T = any> {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 表格的 `table-layout` 属性设置为 `fixed`，设置为 `fixed` 后，表格的宽度不会被内容撑开超出 100%。
   * @en The table's `table-layout` property is set to `fixed`. After set to `fixed`, the width of the table will not be stretched by the content beyond 100%.
   */
  tableLayoutFixed?: boolean;
  /**
   * @zh 表格行 key 的取值字段
   * @en Table row key
   * @defaultValue key
   */
  rowKey?: string | ((record: T) => string);
  /**
   * @zh 列描述数据对象的数组
   * @en An array of column objects
   */
  columns?: ColumnProps<T>[];
  /**
   * @zh 覆盖原生表格标签
   * @en Override native table tag
   */
  components?: ComponentsProps;
  /**
   * @zh 表格数据
   * @en Data record array to be displayed
   */
  data?: T[];
  /**
   * @zh 边框设置
   * @en Configure border
   * @defaultValue true
   */
  border?:
    | boolean
    | { wrapper?: boolean; headerCell?: boolean; bodyCell?: boolean; cell?: boolean };
  /**
   * @zh 是否显示单元格边框，作用等同于 `border={{ cell: true }}`
   * @en Whether to display the table cell border, equivalent to `border={{ cell: true }}`
   */
  borderCell?: boolean;
  /**
   * @zh 是否开启鼠标悬浮效果
   * @en Whether to enable the hover style
   * @defaultValue true
   */
  hover?: boolean;
  /**
   * @zh 默认展开所有可展开的行
   * @en Expand all expandable rows by default
   */
  defaultExpandAllRows?: boolean;
  /**
   * @zh 展开的行（受控）
   * @en To set expanded rows.
   */
  expandedRowKeys?: (string | number)[];
  /**
   * @zh 默认展开的行
   * @en To set default expanded rows
   */
  defaultExpandedRowKeys?: (string | number)[];
  /**
   * @zh 点击展开额外的行，渲染函数。返回值为 `null` 时，不会渲染展开按钮
   * @en Click to expand additional rows, rendering functions. When the return value is `null`, the expand button will not be rendered
   */
  expandedRowRender?: (record: T, index: number) => ReactNode;
  /**
   * @zh 自定义展开/关闭列的图标，宽度，标题，具体用法看[这个例子](/react/components/table#定制展开参数)
   * @en Customize the icon, width, and title of the expandable column, see [this example](/react/components/table#custom expand parameters) for usage
   */
  expandProps?: ExpandProps<T>;
  /**
   * @zh 点击展开的回调
   * @en Callback when click to expand
   */
  onExpand?: (record: T, expanded: boolean) => void;
  /**
   * @zh 点击展开时触发，参数为展开行数组
   * @en Callback when expanded button is clicked, the parameter is an array of expanded rows
   */
  onExpandedRowsChange?: (expandedRows: (string | number)[]) => void;
  /**
   * @zh 表格是否在加载中
   * @en Whether the table is in loading
   */
  loading?: boolean | SpinProps;
  /**
   * @zh 没有数据的时候显示的元素
   * @en Element to be displayed when there is no data
   */
  noDataElement?: string | ReactNode;
  /**
   * @zh 是否显示表头
   * @en Whether to show the header
   * @defaultValue true
   */
  showHeader?: boolean;
  /**
   * @zh
   * 表头是否显示下一次排序的 tooltip 提示。可以设置对象，可以传 `Tooltip` 组件的所有参数。
   * @en
   * Whether the header shows the tooltip for the next sorting. The object can be set,
   * and all the parameters of the `Tooltip` component can be passed.
   * @version 2.19.0
   * @defaultValue true
   */
  showSorterTooltip?: boolean | TooltipProps;
  /**
   * @zh 是否开启斑马纹
   * @en Whether to show stripe style
   */
  stripe?: boolean;
  /**
   * @zh 表格尺寸，分为 默认，`默认` `中` `小` `迷你` 四个尺寸
   * @en The table size is divided into four sizes, `default` `medium` `small` `mini`
   */
  size?: 'default' | 'middle' | 'small' | 'mini';
  /**
   * @zh 分页、排序、筛选时的回调
   * @en Callback when pagination, sorting, and filtering changes
   * @version extra in `2.19.0`
   */
  onChange?: (
    pagination: PaginationProps,
    sorter: SorterResult,
    filters: Partial<Record<keyof T, string[]>>,
    extra: { currentData: T[]; action: 'paginate' | 'sort' | 'filter' }
  ) => void;
  /**
   * @zh 分页器设置，参考[Pagination组件](/react/components/pagination)，设置 `false` 不展示分页
   * @en Pagination settings, refer to [Pagination components](/react/components/pagination), set `false` to hide pagination
   */
  pagination?: PaginationProps | boolean;
  /**
   * @zh 自定义分页渲染。
   * @en Customized pagination render
   * @version 2.11.0
   */
  renderPagination?: (paginationNode?: ReactNode) => ReactNode;
  /**
   * @zh
   * 设置x轴或y轴的滚动。`x` 设置为 `true`，会给 table 添加 `table-layout: fixed` 以及给父元素添加 `overflow: auto`。
   * `y` 设置为 `true`，表头和表身会分离，放在两个 table 中
   * @en
   * Set the scroll of x-axis or y-axis. Setting `x` to `true` will add `table-layout: fixed` to the table and `overflow: auto` to the parent element.
   * If `y` is set to `true`, the header and body will be separated and placed in two tables
   */
  scroll?: { x?: number | string | boolean; y?: number | string | boolean };
  /**
   * @zh 表格行的类名
   * @en ClassName of table row
   */
  rowClassName?: (record: T, index: number) => string;
  /**
   * @zh 设置表格行是否可选，选中事件等。[配置项](#rowselection)
   * @en Set whether the table row is selectable, select event, etc. [Configuration item](#rowselection)
   */
  rowSelection?: RowSelectionProps<T>;
  /**
   * @zh 设置表头行单元格的各项事件回调
   * @en Set the event callback of the header row
   */
  onHeaderRow?: (columns: ColumnProps<T>[], index: number) => RowCallbackProps;
  /**
   * @zh 设置表格行的各项事件回调
   * @en Set the event callback of the table row
   */
  onRow?: (record: T, index: number) => RowCallbackProps;
  prefixCls?: string;
  /**
   * @zh 当单元格内容为空时，显示占位符，优先级低于 `column.placeholder`。
   * @en When the cell content is empty, a placeholder is displayed, and the priority is lower than `column.placeholder`.
   * @version 2.23.0
   */
  placeholder?: ReactNode;
  /**
   * @zh 设置分页器的位置，有四个方位 `右下` `左下` `右上` `左上` `上中` `下中`
   * @en Set the position of the pagination, there are six positions `bottom right` `bottom left` `top right` `top left` `top center` `bottom center`
   * @defaultValue br
   */
  pagePosition?: 'br' | 'bl' | 'tr' | 'tl' | 'topCenter' | 'bottomCenter';
  /**
   * @zh 树形数据在 `data` 中的字段名，默认是 `children`
   * @en The field name of the tree data in `data`, default is `children`
   * @defaultValue children
   */
  childrenColumnName?: string;
  /**
   * @zh 树形数据每个层级向左偏移的像素
   * @en The pixel offset to the left of each level of the tree data
   * @defaultValue 15
   */
  indentSize?: number;
  /**
   * @zh 表格尾部
   * @en The footer of the table
   */
  footer?: (currentPageDate) => ReactNode;
  /**
   * @zh
   * 表格开启虚拟滚动，用于处理大数据场景。( 注意：虚拟滚动会自动关闭对树形数据的支持 )
   * @en
   * The table enables virtual scrolling for processing big data scenarios.
   * (Note: Virtual scrolling will automatically turn off support for tree data)
   */
  virtualized?: boolean;
  /**
   * @zh 总结栏
   * @en Table Summary
   * @version 2.17.0
   */
  summary?: (currentData?: T[]) => ReactNode;
}

/**
 * @title RowSelection
 *
 * @zh `<Table>` 参数 `rowSelection` 的详细参数。
 * @en The detailed parameters of `rowSelection`.
 */
export interface RowSelectionProps<T = any> {
  /**
   * @zh 多选模式下是否开启全选功能
   * @en Whether to show check all button
   */
  checkAll?: boolean;
  /**
   * @zh 多选模式下的复选框是否跨分页，只在非受控模式下生效
   * @en Whether the checkboxes in multi-select mode cross pages, only work in uncontrolled mode
   */
  checkCrossPage?: boolean;
  /**
   * @zh 自定义列表选择的标题
   * @en Customize the title of the selection column
   */
  columnTitle?: string | ReactNode;
  /**
   * @zh 选择框列的宽度
   * @en The width of the selection column
   */
  columnWidth?: number;
  /**
   * @zh 选择框的属性配置
   * @en Configure the selection checkbox
   */
  checkboxProps?: (record: T) => { [key: string]: any };
  /**
   * @zh 是否固定选择列到左边
   * @en Whether to fix column to the left
   */
  fixed?: boolean;
  /**
   * @zh 单选或多选的选中项发生改变时的回调
   * @en Callback when the checkbox/radio changes
   */
  onChange?: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void;
  /**
   * @zh 用户手动选择/取消选择的回调
   * @en Callback for user manual selection/deselection
   * @version 2.22.0
   */
  onSelect?: (selected: boolean, record: T, selectedRows: T[]) => void;
  /**
   * @zh 用户手动选择/取消选择所有行的回调
   * @en Callback when the user to manually select/deselect all rows
   * @version 2.6.0
   */
  onSelectAll?: (selected: boolean, selectedRows) => void;
  /**
   * @zh
   * 大数据场景下优化复选框选中体验，onChange 回调里只有 keys，而不返回和计算相应的 rows
   * @en
   * In the big data scenario, optimizing the experience of the checkbox, there are only keys in the onChange callback,
   * and the corresponding rows are not returned and calculated
   * @version 2.15.0
   */
  pureKeys?: boolean;
  /**
   * @zh 在数据项被删除时仍然保留选项的 `key`
   * @en The `key` is still retained in `selectedRowKeys` when the data item is deleted
   * @version 2.19.0
   */
  preserveSelectedRowKeys?: boolean;
  /**
   * @zh 定制复选框，用法与 `column.render` 相同。
   * @en Customize checkbox, the usage is same as `column.render`.
   * @version 2.19.0
   */
  renderCell?: (originNode, checked: boolean, record: T) => ReactNode;
  /**
   * @zh Table选中的项，（受控模式，需要跟 `onChange` 配合使用）
   * @en Table selected row, (controlled mode, need to be used with `onChange`)
   */
  selectedRowKeys?: (string | number)[];
  /**
   * @zh 多选或者单选
   * @en Multi-select or single-select
   */
  type?: 'checkbox' | 'radio';
}

/**
 * @title ExpandProps
 *
 * @zh `<Table>` 参数 `expandProps` 的详细参数。
 * @en The detailed parameters of `expandProps`.
 */
export interface ExpandProps<T = any> {
  /**
   * @zh 定制展开按钮的图标
   * @en Customize the icon of the expand button
   */
  icon?: (props: { expanded: boolean; record: Record<string, any> }) => ReactNode;
  /**
   * @zh 展开按钮列的宽度
   * @en The width of expand icon column
   */
  width?: number;
  /**
   * @zh 展开按钮列的表头标题
   * @en The table header title of expand icon column
   */
  columnTitle?: ReactNode;
  /**
   * @zh
   * 是否允许行展开。如果不指定该参数，会以 expandedRowRender 是否有返回值决定。当出现性能问题时，建议使用 rowExpandable。
   * @en
   * Whether to allow row expansion. If this parameter is not specified,
   * it will be determined by whether expandedRowRender has a return value. When performance problems occur, rowExpandable is recommended.
   * @version 2.16.0
   */
  rowExpandable?: (record: T) => boolean;
  /**
   * @zh 支持通过点击行来展开
   * @en Clicking on the row to expand
   * @version 2.19.0
   */
  expandRowByClick?: boolean;
}

/**
 * @title Column
 *
 * @zh 列描述数据对象，是 `columns` 中的一项。
 * @en The column describes the data object and is an item in `columns`.
 */
export interface ColumnProps<T = any> {
  /**
   * @zh 列的类名
   * @en ClassName of the column
   */
  className?: string | string[];
  /**
   * @zh 设置列的对齐方式
   * @en Set the alignment of the column
   * @defaultValue left
   */
  align?: 'left' | 'center' | 'right';
  /**
   * @zh
   * 单元格内容超出长度后，是否自动省略，显示 `...`。设置这个属性后，table 的 `table-layout` 将自动变成 `fixed`。
   * @en
   * If the cell content exceeds the length, whether it is automatically omitted and displays `...`.
   * After setting this property, the `table-layout` of the table will automatically become `fixed`.
   */
  ellipsis?: boolean;
  /**
   * @zh 表头单元格自定义样式
   * @en Table header cell style
   */
  headerCellStyle?: CSSProperties;
  /**
   * @zh 表身单元格自定义样式
   * @en Table body cell style
   */
  bodyCellStyle?: CSSProperties;
  cellStyle?: CSSProperties;
  /**
   * @zh 列标题
   * @en Column title
   */
  title: React.ReactNode;
  /**
   * @zh 列宽度
   * @en Column width
   */
  width?: number | string;
  /**
   * @zh
   * 列数据在数据项中对应的 `key`，用于取值显示，支持 `a[0].b.c[1]` 的嵌套写法，
   * 详情看 [lodash.get](https://www.npmjs.com/package/lodash.get)。
   * @en
   * The `key` corresponding to the column data in the data item is used to display the value.
   * It supports the nested writing of `a[0].bc[1]`, see [lodash.get](https:// www.npmjs.com/package/lodash.get).
   */
  dataIndex?: string;
  /**
   * @zh React的 key值，如果不指定，默认取 `dataIndex` 的值
   * @en React key value, if not specified, the default value of `dataIndex` is taken
   */
  key?: string | number;
  /**
   * @zh 自定义单元格显示的内容
   * @en Customize the content displayed in the cell
   */
  render?: (col, item: T, index: number) => any;
  /**
   * @zh 当单元格内容为空时，显示占位符，优先级低于 `render`。
   * @en When the cell content is empty, a placeholder is displayed, and the priority is lower than `render`.
   * @version 2.22.0
   */
  placeholder?: ReactNode;
  /**
   * @zh 排序函数，如果想要服务端排序或者添加更多自定义操作，设置为true，利用`onChange`函数进行自定义排序
   * @en Sorting function, if you want server-side sorting or adding more custom operations, set to true and use the `onChange` function for custom sorting
   */
  sorter?: ((a, b) => any) | boolean;
  /**
   * @zh 筛选项，需要配合 `onFilter` 或者 `onChange` 使用
   * @en Filter items, need to be used with `onFilter` or `onChange`
   * @defaultValue []
   */
  filters?: {
    text?: ReactNode;
    value?: any;
    [key: string]: any;
  }[];
  /**
   * @zh 默认筛选条件
   * @en To set default filters
   */
  defaultFilters?: string[];
  /**
   * @zh 默认排序方式
   * @en To set default sort order
   */
  defaultSortOrder?: 'ascend' | 'descend';
  /**
   * @zh 筛选的受控属性，值为筛选的 value 数组
   * @en To set filtered value, the value is the filtered value array
   */
  filteredValue?: string[];
  /**
   * @zh 排序的受控属性，可以控制列的排序，可设置为 `ascend` `descend`
   * @en To set sort order, which can control the sorting of columns, can be set to `ascend` `descend`
   */
  sortOrder?: 'ascend' | 'descend';
  /**
   * @zh 支持的排序方式。
   * @en Supported sorting methods.
   * @defaultValue ['ascend','descend']
   */
  sortDirections?: Array<'ascend' | 'descend'>;
  /**
   * @zh 是否可以筛选多项
   * @en Is it possible to filter multiple items
   * @defaultValue true
   */
  filterMultiple?: boolean;
  /**
   * @zh 自定义筛选图标。
   * @en Custom filter icon.
   */
  filterIcon?: ReactNode;
  /**
   * @zh 自定义筛选框。
   * @en Custom filter popup box.
   */
  filterDropdown?: (props: {
    filterKeys?: string[];
    setFilterKeys?: (filterKeys: string[], callback?: Function) => void;
    confirm?: Function;
  }) => ReactNode;
  /**
   * @zh 配置筛选弹出框的一些属性。
   * @en Configure properties of the filter popup box.
   */
  filterDropdownProps?: { triggerProps?: TriggerProps };
  /**
   * @zh 筛选框打开关闭的回调
   * @en Callback when the visible of filter popup changes
   */
  onFilterDropdownVisibleChange?: (visible: boolean) => void;
  /**
   * @zh 筛选函数，配合`filters`
   * @en Callback when filter changes
   */
  onFilter?: (value, row) => any;
  /**
   * @zh 固定头和列到左边或者右边
   * @en Fixed header and column to the left or right
   */
  fixed?: 'left' | 'right';
  /**
   * @zh 设置头部单元格的各项事件回调
   * @en Set the event callback of the table head cell
   */
  onHeaderCell?: (column, index) => RowCallbackProps;
  /**
   * @zh 设置表身单元格的各项事件回调
   * @en Set the event callback of the table body cell
   */
  onCell?: (record, index) => RowCallbackProps;
  children?: ColumnProps<T>[];
  rowSpan?: number;
  colSpan?: number;
  headerCellProps?: RowCallbackProps;
  editable?: boolean;
  prefixCls?: string;
  currentFilters?: { [key: string]: any };
  components?: ComponentsProps;
  columnFixedStyle?: CSSProperties;
  column?: any;
}

// private use
export type InternalColumnProps<T = any> = ColumnProps<T> & {
  $$isOperation?: boolean;
  $$isFirstColumn?: boolean;
  node?: ReactNode;
};

export interface ColumnComponentProps<T = any> extends ColumnProps<T> {
  onSort: (direction: string | undefined, field: string | number) => void;
  onHandleFilter: (column: Record<string, any>, filter: Record<string, any>) => void;
  onHandleFilterReset: (column: { [key: string]: any }) => void;
  currentSorter?: SorterResult;
  currentFilter?: { [key: string]: any };
  _key?: string | number;
  showSorterTooltip?: boolean | TooltipProps;
  index?: number;
}

export type ComponentsProps = {
  table?: any;
  header?: {
    operations?: (nodes: { selectionNode?: ReactNode; expandNode?: ReactNode }) => {
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
    operations?: (nodes: { selectionNode?: ReactNode; expandNode?: ReactNode }) => {
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

export interface TheadProps<T = any> {
  expandedRowRender?: (record: { [key: string]: any }, index: number) => ReactNode;
  onCheckAll: (_, e) => void;
  onSort: (direction, field) => void;
  data: T[];
  onHandleFilter: (column, filter) => void;
  onHandleFilterReset: (filter) => void;
  sorter: SorterResult;
  selectedRowKeys: (string | number)[];
  onHeaderRow?: (columns, index: number) => RowCallbackProps;
  prefixCls?: string;
  rowSelection?: RowSelectionProps;
  columnTitle?: string | ReactNode;
  currentFilters?: Partial<Record<keyof T, string[]>>;
  rowKey?: string | ((record: T) => string);
  components?: ComponentsProps;
  expandProps?: ExpandProps<T>;
  allSelectedRowKeys?: (string | number)[];
  groupColumns?: InternalColumnProps<T>[][];
  stickyOffsets?: number[];
  groupStickyClassNames?: string[][];
  showSorterTooltip?: boolean | TooltipProps;
}

export type GetRowKeyType<T> = (record: T) => string;

export interface TbodyProps<T = any> {
  data: T[];
  selectedRowKeys: (string | number)[];
  components?: ComponentsProps;
  expandedRowKeys: (string | number)[];
  columns: InternalColumnProps<T>[];
  noDataElement?: string | ReactNode;
  onCheck: (checked: boolean, record) => void;
  onCheckRadio: (key, record) => void;
  onClickExpandBtn: (key: string | number) => void;
  pagination?: PaginationProps | boolean;
  scroll?: { x?: number | string | boolean; y?: number | string | boolean };
  expandedRowRender?: (record: T, index: number) => ReactNode;
  rowClassName?: (record: T, index: number) => string;
  onRow?: (record: T, index: number) => RowCallbackProps;
  prefixCls?: string;
  rowSelection?: RowSelectionProps<T>;
  expandProps?: ExpandProps<T>;
  childrenColumnName?: string;
  indentSize?: number;
  hasFixedColumn?: boolean;
  tableViewWidth?: number;
  currentSorter?: SorterResult;
  virtualized?: boolean;
  stickyOffsets?: number[];
  stickyClassNames?: string[];
  getRowKey?: GetRowKeyType<T>;
  placeholder?: ReactNode;
  saveVirtualWrapperRef?: (ref: HTMLDivElement) => void;
}

export interface TfootProps<T = any> {
  prefixCls?: string;
  summary?: (currentData?: T[]) => ReactNode;
  data?: T[];
  columns?: InternalColumnProps<T>[];
  stickyOffsets?: number[];
  stickyClassNames?: string[];
}

export declare type SortDirection = 'descend' | 'ascend';

export interface SorterResult {
  direction?: SortDirection;
  field?: string;
}

export interface SummaryProps {
  fixed?: 'top' | 'bottom';
  children?: ReactNode;
}
