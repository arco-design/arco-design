import { CSSProperties, ReactNode, HTMLAttributes } from 'react';
import { Omit } from '../_util/type';

/**
 * @title Card
 */
export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'className'> {
  style?: CSSProperties;
  className?: string | string[];
  children?: ReactNode;
  id?: string;
  /**
   * @zh 是否有边框
   * @en Whether to render the border
   * @defaultValue true
   */
  bordered?: boolean;
  /**
   * @zh 是否为加载中
   * @en Whether on loading state
   */
  loading?: boolean;
  /**
   * @zh 是否可悬浮
   * @en Whether the card can be hovered
   */
  hoverable?: boolean;
  /**
   * @zh 卡片尺寸
   * @en Size of the card
   * @defaultValue default
   */
  size?: 'default' | 'small';
  /**
   * @zh 卡片标题
   * @en Title of the card
   */
  title?: string | ReactNode;
  /**
   * @zh 卡片右上角的操作区域
   * @en Content to render in the top-right corner of the card
   */
  extra?: string | ReactNode;
  /**
   * @zh 卡片封面
   * @en Cover of card
   */
  cover?: ReactNode;
  /**
   * @zh 卡片底部的操作组
   * @en The action list which shows at the bottom of the card
   */
  actions?: ReactNode[];
  /**
   * @zh 自定义标题区域样式
   * @en The additional css style to apply to card head
   */
  headerStyle?: CSSProperties;
  /**
   * @zh 内容区域自定义样式
   * @en The additional css style to apply to card content
   */
  bodyStyle?: CSSProperties;
}

/**
 * @title Card.Meta
 */
export interface CardMetaProps {
  style?: CSSProperties;
  className?: string | string[];
  actionList?: ReactNode[];
  /**
   * @zh 头像
   * @en Avatar of the card
   */
  avatar?: ReactNode;
  /**
   * @zh 标题
   * @en Title of the card
   */
  title?: string | ReactNode;
  /**
   * @zh 描述
   * @en Description of the card
   */
  description?: string | ReactNode;
}

/**
 * @title Card.Grid
 */
export interface CardGridProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 是否可以悬浮
   * @en Whether can be hovered
   */
  hoverable?: boolean;
}
