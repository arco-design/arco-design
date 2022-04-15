import { CSSProperties, ReactNode } from 'react';
import { SelectProps } from '../Select/interface';

/**
 * @title Pagination
 */
export interface PaginationProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 分页按钮样式
   * @en Pagination button style
   */
  pageItemStyle?: CSSProperties;
  /**
   * @zh 被选中的分页按钮样式
   * @en The style of the selected page button
   */
  activePageItemStyle?: CSSProperties;
  /**
   * @zh 当前页
   * @en Current page
   */
  current?: number;
  /**
   * @zh 每页数据条数
   * @en Number of data items per page
   */
  pageSize?: number;
  /**
   * @zh 数据总数
   * @en Total number of data
   */
  total?: number;
  /**
   * @zh 当前页默认值
   * @en To set default current page
   */
  defaultCurrent?: number;
  /**
   * @zh 默认每页数据条数
   * @en To set default number of data per page
   */
  defaultPageSize?: number;
  /**
   * @zh 是否禁用
   * @en Whether to disable
   */
  disabled?: boolean;
  /**
   * @zh 是否在只有一页的情况下隐藏
   * @en Whether to hide when there is only one page
   * @version 2.6.0
   */
  hideOnSinglePage?: boolean;
  /**
   * @zh 定制分页按钮的结构
   * @en Customized pagination button structure
   */
  itemRender?: (
    page: number,
    type: 'page' | 'more' | 'prev' | 'next',
    originElement: ReactNode
  ) => ReactNode;
  /**
   * @zh 分页器尺寸
   * @en pager size
   */
  size?: 'mini' | 'small' | 'default' | 'large';
  /**
   * @zh 是否显示数据总数
   * @en Whether to display the total number of data
   */
  showTotal?: boolean | ((total: number, range: number[]) => ReactNode);
  /**
   * @zh 是否可以改变每页条数
   * @en Is it possible to change page size
   * @defaultValue true
   */
  sizeCanChange?: boolean;
  /**
   * @zh 每页可以显示数据条数
   * @en The number of data items that can be displayed per page
   */
  sizeOptions?: number[];
  /**
   * @zh `current` 页与 `...` 之间的页码个数
   * @en the number of pages between the `current` page and `...`
   * @defaultValue 2
   * @version 2.32.0
   */
  bufferSize?: number;
  /**
   * @zh 变化时的回调
   * @en Callback when page changes
   */
  onChange?: (pageNumber: number, pageSize: number) => void;
  /**
   * @zh pageSize 变化时的回调
   * @en Callback when pageSize changes
   */
  onPageSizeChange?: (size: number, current: number) => void;
  /**
   * @zh `pageSize` 改变的时候重置当前页码为 `1`
   * @en When pageSize changes, resets the current page number to `1`
   * @defaultValue true
   */
  pageSizeChangeResetCurrent?: boolean;
  /**
   * @zh 是否应用精简分页模式
   * @en Whether to use simplified pagination mode
   */
  simple?: boolean;
  /**
   * @zh 是否显示快速跳转到某页
   * @en Whether to display quick jump
   */
  showJumper?: boolean;
  /**
   * @zh 是否显示更多页码提示（当尚无法计算数据总数时可以使用）
   * @en Whether to show more page number tips (can be used when the total number of data cannot be calculated yet)
   */
  showMore?: boolean;
  /**
   * @zh 用于配置弹出框的属性
   * @en Props of the `Select`
   */
  selectProps?: Partial<SelectProps>;
  /**
   * @zh 设置分页器的图标
   * @en Set icon of the pager
   */
  icons?: {
    prev?: ReactNode;
    next?: ReactNode;
    more?: ReactNode;
  };
  mini?: boolean; // 1.0
}
