import { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export type GridResponsiveBreakpoint = 'xxxl' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export type GridRowGutter = number | Partial<Record<GridResponsiveBreakpoint, number>>;

/**
 * @title Row
 */
export interface RowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh
   * 栅格间隔，单位是`px` 栅格间隔。可传入响应式对象写法 { xs: 4, sm: 6, md: 12}，传入数组 [ 水平间距， 垂直间距 ] 来设置两个方向。
   * @en
   * Spacing between grids, could be a number or a object like { xs: 8, sm: 16, md: 24}.
   * Or you can use array to make horizontal and vertical spacing work at the same time [horizontal, vertical]
   * @version vertical gutter in 2.5.0
   * @defaultValue 0
   */
  gutter?: GridRowGutter | Array<GridRowGutter>;
  /**
   * @zh 开启这个选项 `<Row>` 和 `<Col>` 都会被当作 div 而不会附带任何 Grid 相关的类和样式
   * @en If true, `<Row>` and `<Col>` will be treated as a div without any Grid related classes and styles
   */
  div?: boolean;
  /**
   * @zh 竖直对齐方式 ( `align-items` )
   * @en Vertical alignment, same as css `align-items`
   * @defaultValue start
   */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /**
   * @zh 水平对齐方式 (`justify-content`)
   * @en Horizontal alignment, same as css `justify-content`
   * @defaultValue start
   */
  justify?: 'start' | 'center' | 'end' | 'space-around' | 'space-between';
}

/**
 * @title Col
 */
export interface ColProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'ref'> {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 栅格占位格数
   * @en Raster number of cells to occupy
   * @defaultValue 24
   */
  span?: number;
  /**
   * @zh 栅格左侧的间隔格数，间隔内不可以有栅格
   * @en The number of cells to offset Col from the left
   */
  offset?: number;
  /**
   * @zh 对元素进行排序
   * @en Raster order
   */
  order?: number;
  /**
   * @zh 对元素进行排序
   * @en Raster order
   * @version 2.20.0
   */
  push?: number;
  /**
   * @zh 对元素进行排序
   * @en Raster order
   * @version 2.20.0
   */
  pull?: number;
  /**
   * @zh < 576px 响应式栅格
   * @en `screen < 576px`
   */
  xs?: number | { [key: string]: any };
  /**
   * @zh >= 576px 响应式栅格
   * @en `screen >= 576px`
   */
  sm?: number | { [key: string]: any };
  /**
   * @zh >= 768px 响应式栅格
   * @en `screen >= 768px`
   */
  md?: number | { [key: string]: any };
  /**
   * @zh >= 992px 响应式栅格
   * @en `screen >= 992px`
   */
  lg?: number | { [key: string]: any };
  /**
   * @zh >= 1200px 响应式栅格
   * @en `screen >= 1200px`
   */
  xl?: number | { [key: string]: any };
  /**
   * @zh >= 1600px 响应式栅格
   * @en `screen >= 1600px`
   */
  xxl?: number | { [key: string]: any };
  /**
   * @zh >= 2000px 响应式栅格
   * @en `screen >= 2000px`
   * @version 2.40.0
   */
  xxxl?: number | { [key: string]: any };
  /**
   * @zh 设置 flex 布局属性
   * @en Set flex layout properties
   * @version 2.26.0
   */
  flex?: FlexType;
}

/**
 * @title Grid
 */
export interface GridProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 每一行展示的列数
   * @en Number of columns displayed in each row
   * @defaultValue 24
   */
  cols?: number | ResponsiveValue;
  /**
   * @zh 行与行之间的间距
   * @en The space in row-to-row
   * @defaultValue 0
   */
  rowGap?: number | ResponsiveValue;
  /**
   * @zh 列与列之间的间距
   * @en The space in column-to-column
   * @defaultValue 0
   */
  colGap?: number | ResponsiveValue;
  /**
   * @zh 是否折叠
   * @en Whether to collapsed
   * @defaultValue false
   */
  collapsed?: boolean;
  /**
   * @zh 折叠时显示的行数
   * @en Number of rows displayed when collapsed
   * @defaultValue 1
   */
  collapsedRows?: number;
}

/**
 * @title GridItem
 */
export interface GridItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 跨越的格数
   * @en Number of grids spanned
   * @defaultValue 1
   */
  span?: number | ResponsiveValue;
  /**
   * @zh 左侧的间隔格数
   * @en Number of grids on the left
   * @defaultValue 0
   */
  offset?: number | ResponsiveValue;
  /**
   * @zh 是否是后缀元素
   * @en Is it a suffix element
   * @defaultValue false
   */
  suffix?: boolean;
  __index__?: number;
  children?: ReactNode | ((info: { overflow: boolean }) => ReactNode);
}

export interface GridItemData extends GridItemProps {
  span: number;
  offset: number;
}

/**
 * @title ResponsiveValue
 */
export interface ResponsiveValue {
  /**
   * @zh >= 2000px 响应式栅格
   * @en `screen >= 2000px`
   */
  xxxl?: number;
  /**
   * @zh >= 1600px 响应式配置
   * @en >= 1600px responsive configuration
   */
  xxl?: number;
  /**
   * @zh >= 1200px 响应式配置
   * @en >= 1200px responsive configuration
   */
  xl?: number;
  /**
   * @zh >= 992px 响应式配置
   * @en >= 992px responsive configuration
   */
  lg?: number;
  /**
   * @zh >= 768px 响应式配置
   * @en >= 768px responsive configuration
   */
  md?: number;
  /**
   * @zh >= 576px 响应式配置
   * @en >= 576px responsive configuration
   */
  sm?: number;
  /**
   * @zh < 576px 响应式配置
   * @en < 576px responsive configuration
   */
  xs?: number;
}

export type FlexType = string | number | 'auto' | 'none';
