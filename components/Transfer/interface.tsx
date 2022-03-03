import { CSSProperties, DragEvent, ReactNode } from 'react';
import { PaginationProps } from '../Pagination/pagination';
import { InputProps } from '../Input';

export type TransferItem = {
  key: string;
  value: string;
  disabled?: boolean;
};

export type TransferListType = 'source' | 'target';

type TransferListTitle =
  | string
  | ((params: {
      countTotal: number;
      countSelected: number;
      countFilteredShown: number;
      clear: () => void;
      checkbox: ReactNode;
      searchInput: ReactNode;
    }) => ReactNode);

/**
 * @title Transfer
 */
export interface TransferProps {
  prefixCls?: string;
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 自定义列表渲染函数
   * @en Customize render list
   */
  children?: (props: TransferCustomListProps) => ReactNode;
  /**
   * @zh 穿梭框数据源，其中一部分会被渲染到左边一栏，targetKeys 中指定的除外
   * @en Used for setting the source data
   */
  dataSource?: TransferItem[];
  /**
   * @zh 默认的 `targetKeys`
   * @en Initial set of keys of items that are listed on the target column
   * @defaultValue []
   */
  defaultTargetKeys?: string[];
  /**
   * @zh 默认的 `selectKeys`
   * @en Initial set of keys of selected items
   * @defaultValue []
   */
  defaultSelectedKeys?: string[];
  /**
   * @zh 渲染到右边一栏数据的 key 集合
   * @en Set of keys of items that are listed on the target column
   */
  targetKeys?: string[];
  /**
   * @zh 当前应该有哪些项被选中
   * @en Set of keys of selected items
   */
  selectedKeys?: string[];
  /**
   * @zh 穿梭框左右栏标题数组。(函数写法 `2.18.0` 开始支持)
   * @en Title list of Transfer columns. (`2.18.0` began to support function)
   * @defaultValue ['Source', 'Target']
   */
  titleTexts?: Array<TransferListTitle>;
  /**
   * @zh 穿梭按钮的文案数组，顺序从上至下
   * @en Texts of buttons that are used to transfer item
   */
  operationTexts?: string[] | ReactNode[];
  /**
   * @zh 搜索框默认提示文字
   * @en Placeholder of search box
   */
  searchPlaceholder?: string;
  /**
   * @zh 禁用穿梭框
   * @en Whether is disabled
   */
  disabled?: boolean;
  /**
   * @zh 单向
   * @en Whether to allow only one-way movement
   */
  oneWay?: boolean;
  /**
   * @zh 简单模式
   * @en Whether to automatically move an item when it is selected
   * @version `retainSelectedItems` in '2.21.0'
   */
  simple?:
    | boolean
    | {
        retainSelectedItems?: boolean;
      };
  /**
   * @zh 列表内条目是否可拖拽
   * @en Whether the items in the list can be dragged
   */
  draggable?: boolean;
  /**
   * @zh 左右两栏是否显示搜索框
   * @en Whether to display the search box in columns
   */
  showSearch?: boolean | InputProps;
  /**
   * @zh 左右两栏是否显示底部重置按钮
   * @en Whether to display the reset-button in columns
   * @version ReactNode in `2.11.0`
   */
  showFooter?: boolean | ReactNode;
  /**
   * @zh 是否使用翻页，也可传入 `Pagination` 的配置
   * @en Whether to divide into pages, you can also pass in the configuration of `Pagination`
   */
  pagination?: boolean | PaginationProps;
  /**
   * @zh 左右两栏框的样式
   * @en The additional css style of columns
   */
  listStyle?: CSSProperties;
  /**
   * @zh 穿梭中间操作部分的样式
   * @en The additional css style of operation buttons
   */
  operationStyle?: CSSProperties;
  /**
   * @zh 每行数据渲染函数
   * @en A function to generate the item shown on a column.
   */
  render?: (item: TransferItem) => any;
  /**
   * @zh 搜索框筛选算法
   * @en A function to determine whether an item should show in search result list
   * @defaultValue (inputValue, item) => item.value.indexOf(inputValue) !== -1
   */
  filterOption?: (inputValue: string, item: TransferItem) => boolean;
  /**
   * @zh 选中项在两栏之间转移时的回调
   * @en Callback when the transfer between columns is complete
   */
  onChange?: (newTargetKeys: string[], direction: 'source' | 'target', moveKeys: string[]) => void;
  /**
   * @zh 数据项选中状态发生改变的回调
   * @en Callback when selected items are changed
   */
  onSelectChange?: (leftSelectedKeys: string[], rightSelectedKeys: string[]) => void;
  /**
   * @zh 搜索框输入进行搜索时回调函数
   * @en Callback when value of search box is changed
   */
  onSearch?: (value: string, type?: 'source' | 'target') => void;
  /**
   * @zh 点击重置按钮后的回调
   * @en Callback when reset-button is clicked
   */
  onResetData?: () => void;
  /**
   * @zh 节点开始拖拽的回调
   * @en Callback when user start to drag a transfer item
   */
  onDragStart?: (e: DragEvent<HTMLSpanElement>, item: TransferItem) => void;
  /**
   * @zh 节点结束拖拽的回调
   * @en Callback when the user has finished dragging a transfer item
   */
  onDragEnd?: (e: DragEvent<HTMLSpanElement>, item: TransferItem) => void;
  /**
   * @zh 节点离开可释放目标上时的回调
   * @en Callback when a draggable item leaves a valid drop target
   */
  onDragLeave?: (e: DragEvent<HTMLSpanElement>, item: TransferItem) => void;
  /**
   * @zh 节点被拖拽至可释放目标上时的回调
   * @en Callback when a draggable item is being dragged over a valid drop target
   */
  onDragOver?: (e: DragEvent<HTMLSpanElement>, item: TransferItem) => void;
  /**
   * @zh 节点在可释放目标上释放时的回调
   * @en Callback when draggable item is dropped in a `<div>` element
   */
  onDrop?: (info: {
    e: DragEvent<HTMLSpanElement>;
    dragItem: TransferItem;
    dropItem: TransferItem;
    dropPosition: number;
  }) => void;
}

export interface TransferListProps
  extends Pick<
    TransferProps,
    | 'prefixCls'
    | 'style'
    | 'className'
    | 'dataSource'
    | 'searchPlaceholder'
    | 'disabled'
    | 'draggable'
    | 'showSearch'
    | 'showFooter'
    | 'pagination'
    | 'render'
    | 'filterOption'
    | 'onSearch'
    | 'onResetData'
    | 'onDragStart'
    | 'onDragEnd'
    | 'onDragLeave'
    | 'onDragOver'
    | 'onDrop'
  > {
  title: TransferListTitle;
  allowClear: boolean;
  filteredShownKeys: string[];
  filteredHiddenKeys: string[];
  selectedKeys: string[];
  validKeys: string[];
  selectedDisabledKeys: string[];
  listType: TransferListType;
  selectedStatus: 'none' | 'part' | 'all';
  handleSelect: (newSelectKeys: string[]) => void;
  handleRemove: (removeKeys: string[]) => void;
  renderList: (props: TransferCustomListProps) => ReactNode;
}

export interface TransferCustomListProps
  extends Pick<
    TransferListProps,
    'disabled' | 'listType' | 'selectedKeys' | 'validKeys' | 'selectedDisabledKeys'
  > {
  filteredItems: TransferItem[];
  onItemSelect: (key: string, selected: boolean) => void;
  onItemRemove: (key: string) => void;
  onItemSelectAll: (keys: string[], selected: boolean) => void;
}

export interface TransferItemProps
  extends Pick<
    TransferListProps,
    | 'prefixCls'
    | 'className'
    | 'render'
    | 'disabled'
    | 'draggable'
    | 'allowClear'
    | 'selectedKeys'
    | 'onDragStart'
    | 'onDragEnd'
    | 'onDragLeave'
    | 'onDragOver'
  > {
  item: TransferItem;
  droppable: boolean;
  onItemSelect: (key: string, selected: boolean) => void;
  onItemRemove: (key: string) => void;
  onDrop?: (e: DragEvent<HTMLSpanElement>, item: TransferItem, dropPosition: number) => void;
}
