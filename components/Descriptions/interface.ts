import React, { CSSProperties, ReactNode } from 'react';

export type DataType = { key?: React.Key; label?: ReactNode; value?: ReactNode; span?: number }[];

/**
 * @title Descriptions
 */
export interface DescriptionsProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 显示标签的单元格的样式
   * @en Style of label
   */
  labelStyle?: CSSProperties;
  /**
   * @zh 显示值的单元格的样式
   * @en Style of value
   */
  valueStyle?: CSSProperties;
  /**
   * @zh 描述列表的数据
   * @en Data of the description
   */
  data?: DataType;
  /**
   * @zh
   * 一行放置几列数据，一个数据为一列。支持配置 `column` 为数字或者对象，配置对象格式时，
   * 支持配置为 `{ xs: 1, md: 2, lg: 3 }` 这种形式来支持响应式排列
   * @en Number of data columns in a row, with one data counted as one column. Can be set with a number or object.
   * Use object format such as `{ xs: 1, md: 2, lg: 3 }` for responsive arrangement
   * @defaultValue 3
   */
  column?:
    | number
    | {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        xxl?: number;
        xxxl?: number;
      };
  /**
   * @zh 标题
   * @en Title of the description
   */
  title?: ReactNode;
  /**
   * @zh 标签文字后显示的内容，一般配置为 ` :`
   * @en The content displayed after the label text, generally configured as `:`
   */
  colon?: ReactNode;
  /**
   * @zh 是否显示边框
   * @en Whether to display the border
   */
  border?: boolean;
  /**
   * @zh 排列方式
   * @en Layout arrangement
   * @defaultValue horizontal
   */
  layout?: 'horizontal' | 'vertical' | 'inline-horizontal' | 'inline-vertical';
  /**
   * @zh 描述列表的尺寸，如不指定默认为 `default`
   * @en Size of the list
   */
  size?: 'mini' | 'small' | 'medium' | 'default' | 'large';
  /**
   * @zh 描述中表格样式的 `layout-fixed`，当设置成 `fixed` 时，宽度会均分。
   * @en The `layout-fixed` of the table style in the description. The width will be evenly distributed when it's set to `fixed`.
   * @defaultValue auto
   * @version 2.6.0
   */
  tableLayout?: 'auto' | 'fixed';
}
