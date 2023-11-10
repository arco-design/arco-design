import { CSSProperties, HTMLAttributes, MutableRefObject, ReactNode } from 'react';
import { PaginationProps } from '../Pagination/pagination';
import { AvailableVirtualListProps } from '../_class/VirtualList';
import { RowProps, ColProps, GridResponsiveBreakpoint } from '../Grid/interface';

type ListGridProps = {
  column?: number;
} & Pick<RowProps, 'gutter' | 'justify' | 'align'> &
  Pick<ColProps, 'span' | 'offset' | 'order' | 'pull' | 'push' | GridResponsiveBreakpoint>;

export type ListHandle = {
  dom: HTMLDivElement;
  scrollIntoView: (index: number) => void;
};

/**
 * @title List
 */
export interface ListProps<T = any> {
  className?: string | string[];
  style?: CSSProperties;
  paginationInFooter?: boolean;
  // 设置后开启虚拟滚动，已废弃，下一大版本移除
  // After setting, enable virtual scrolling, which has been discarded and removed from the next major version
  height?: number;
  /**
   * @zh 指定最外层包裹元素的样式
   * @en The additional css style to wrapper element
   */
  wrapperStyle?: CSSProperties;
  /**
   * @zh 指定最外层包裹元素的类名
   * @en The additional css class to wrapper element
   */
  wrapperClassName?: string | string[];
  /**
   * @zh 列表渲染数据源，当children存在时，可不传此参数 (dataSource优先级更高）
   * @en Data source for list rendering. When `children` exist, this parameter can be omitted (`dataSource` has higher priority)
   */
  dataSource?: T[];
  /**
   * @zh 单个列表渲染函数，当 children 存在时，可不传此参数
   * @en Customize list item when using dataSource
   */
  render?: (item: T, index: number) => ReactNode;
  /**
   * @zh 当 dataSource 和 render 存在时，可不传此参数
   * @en Child element of List. when dataSource and render exist, do not use this parameter
   */
  children?: ReactNode;
  /**
   * @zh 列表的尺寸
   * @en Size of List
   */
  size?: 'small' | 'default' | 'large';
  /**
   * @zh 列表头部
   * @en List header
   */
  header?: ReactNode;
  /**
   * @zh 列表底部
   * @en List footer
   */
  footer?: ReactNode;
  /**
   * @zh 是否使用翻页，也可传入 `Pagination` 的配置
   * @en Whether to divide into pages, you can also pass in the configuration of `Pagination`
   */
  pagination?: boolean | PaginationProps;
  /**
   * @zh 是否显示边框
   * @en Whether to render border
   * @defaultValue true
   */
  bordered?: boolean;
  /**
   * @zh 是否显示分割线
   * @en Whether to render the split under the list item
   * @defaultValue true
   */
  split?: boolean;
  /**
   * @zh 列表栅格配置
   * @en The grid type of list
   * @version `column` in 2.20.0
   */
  grid?: ListGridProps;
  /**
   * @zh 是否加载中
   * @en Whether to show a loading indicator while the contents of the list are being fetched
   */
  loading?: boolean;
  /**
   * @zh 列表项是否可悬浮
   * @en Whether list items have hover style
   * @version 2.9.0
   */
  hoverable?: boolean;
  /**
   * @zh 滚动至底部触发函数
   * @en Callback when the list scroll to the bottom
   */
  onReachBottom?: (currentPage: number) => void;
  /**
   * @zh 触发底部函数的距离阙值
   * @en The distance threshold to trigger the `onReachBottom`
   * @defaultValue 0
   */
  offsetBottom?: number;
  /**
   * @zh 滚动加载数据当前页码
   * @en To set default current page
   * @defaultValue 1
   */
  defaultCurrent?: number;
  /**
   * @zh 节流延时
   * @en Interval of throttle for `onListScroll`
   * @defaultValue 500
   */
  throttleDelay?: number;
  /**
   * @zh 当前列表的引用
   * @en Reference to the current list
   * @version 2.20.0
   */
  listRef?: MutableRefObject<ListHandle>;
  /**
   * @zh 列表滚动回调函数,参数为列表滚动元素，当onReachBottom无法满足需求，可自定义滚动监听函数。
   * @en Callback when list is scrolling. When onReachBottom cannot meet your usage, can customize scroll monitor function
   */
  onListScroll?: (elem: Element) => void;
  /**
   * @zh 滚动加载状态时，滚动到底部的提示
   * @en Set the content to be at the list bottom when you load data during scrolling
   */
  scrollLoading?: string | ReactNode;
  /**
   * @zh 没有数据的时候显示的元素
   * @en Content displayed when there is no data
   */
  noDataElement?: ReactNode;
  /**
   * @zh 传递虚拟列表属性，传入此参数以开启虚拟滚动
   * @en Pass the virtual-list properties, pass in this parameter to turn on virtual scrolling
   * @version 2.11.0
   */
  virtualListProps?: AvailableVirtualListProps;
}

/**
 * @title List.Item
 */
export interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  /**
   * @zh 列表项下方内容（列表操作组）
   * @en The list operation group of list item
   */
  actions?: ReactNode[];
  /**
   * @zh 列表最右侧内容，额外内容
   * @en The extra content of list item which is on the far right
   */
  extra?: ReactNode;
  /**
   * @zh 列表操作组的位置，默认horizontal，出现在右侧；vertical出现在下方。
   * @en The position of the list operation group. `horizontal` - right, `vertical` - below.
   * @defaultValue horizontal
   */
  actionLayout?: 'horizontal' | 'vertical';
}

/**
 * @title List.Item.Meta
 */
export interface ListItemMetaProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /**
   * @zh 列表元素标题
   * @en The title of list item
   */
  title?: ReactNode;
  /**
   * @zh 列表元素的图标
   * @en The avatar of list item
   */
  avatar?: ReactNode;
  /**
   * @zh 列表元素描述内容
   * @en The description of list item
   */
  description?: ReactNode;
}
