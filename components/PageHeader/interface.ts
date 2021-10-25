import { CSSProperties, ReactNode } from 'react';
import { BreadcrumbProps } from '../Breadcrumb';

/**
 * @title PageHeader
 */
export interface PageHeaderProps {
  className?: string | string[];
  style?: CSSProperties;
  /**
   * @zh 主标题
   * @en The title element
   */
  title?: ReactNode;
  /**
   * @zh 次级标题
   * @en The subtitle element
   */
  subTitle?: ReactNode;
  /**
   * @zh 面包屑，接受面包屑的所有属性, [BreadcrumbProps](/react/components/breadcrumb)
   * @en The props of [Breadcrumb](/react/components/breadcrumb) component
   */
  breadcrumb?: BreadcrumbProps;
  /**
   * @zh 返回图标，设置为 `false` 时会隐藏图标
   * @en Customize back icon, if false The back icon will not be displayed
   */
  backIcon?: ReactNode | boolean;
  /**
   * @zh 展示额外内容
   * @en Customize the extra content. The extra element will be rendered to the end of the title line
   */
  extra?: ReactNode;
  /**
   * @zh 底部内容
   * @en The footer element
   */
  footer?: ReactNode;
  /**
   * @zh 点击返回图标的回调
   * @en Callback when click the back icon
   */
  onBack?: (e: MouseEvent) => void;
}
