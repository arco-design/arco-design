import { CSSProperties, ReactNode, DetailedHTMLProps, HTMLAttributes } from 'react';
import { ResizeBoxProps } from '../ResizeBox';
import { Omit } from '../_util/type';
import { GridResponsiveBreakpoint } from '../Grid/interface';

/**
 * @title Layout
 */
export interface LayoutProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, 'className' | 'ref'> {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh
   * 表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动
   * @en
   * Indicates that there is a `Sider` in the children. Generally no need to specify.
   * It's used to avoid flicker during server-side rendering
   */
  hasSider?: boolean;
}

/**
 * @title Layout.Header
 */
export interface HeaderProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, 'className' | 'ref'> {
  className?: string | string[];
}

/**
 * @title Layout.Footer
 */
export interface FooterProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, 'className' | 'ref'> {
  className?: string | string[];
}

/**
 * @title Layout.Content
 */
export interface ContentProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, 'className' | 'ref'> {
  className?: string | string[];
}

/**
 * @title Layout.Sider
 */
export interface SiderProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string | string[];
  sign?: 'sider';
  /**
   * @zh 主题颜色
   * @en Theme of layout
   * @defaultValue light
   */
  theme?: 'dark' | 'light';
  /**
   * @zh 当前收起状态
   * @en Whether sider is collapsed
   */
  collapsed?: boolean;
  /**
   * @zh 是否可收起
   * @en Whether sider can be collapsed
   */
  collapsible?: boolean;
  /**
   * @zh 收缩宽度
   * @en Width of collapsed sider
   * @defaultValue 48
   */
  collapsedWidth?: number;
  /**
   * @zh 是否默认收起
   * @en Whether sider is collapsed by default
   */
  defaultCollapsed?: boolean;
  /**
   * @zh 翻转折叠提示箭头的方向，当 Sider 在右边时可以使用
   * @en Reverse the direction of the fold arrow, can be used when sider is on the right
   */
  reverseArrow?: boolean;
  /**
   * @zh 自定义底部折叠触发器，设置为 null 时隐藏 trigger
   * @en Customize the trigger element to collapse sider at bottom. Set it to `null` to hide the trigger
   */
  trigger?: string | ReactNode;
  /**
   * @zh 宽度
   * @en Width of sider
   * @defaultValue 200
   */
  width?: number | string;
  /**
   * @zh 触发响应式布局的断点, 详见[响应式栅格](/react/components/Grid)
   * @en Breakpoint in responsive layout. See details [Grid](/react/components/Grid)
   */
  breakpoint?: GridResponsiveBreakpoint;
  /**
   * @zh 触发响应式布局断点时的回调
   * @en Callback when responsive layout breakpoint is triggered
   */
  onBreakpoint?: (broken: boolean) => void;
  /**
   * @zh 展开-收起时的回调函数，有点击 trigger 以及响应式反馈两种方式可以触发
   * @en Callback when sider collapse state changes
   */
  onCollapse?: (collapse: boolean, type: 'clickTrigger' | 'responsive') => void;
  /**
   * @zh
   * 可以用 ResizeBox 替换原生的 `aside` 标签，这个参数即 ResizeBox的 `directions` 参数。
   * 详情请看 [ResizeBox](/react/components/resize-box)。
   * @en
   * You can replace the native `aside` tag with `ResizeBox`, under which case this param will be the `directions` property of `ResizeBox`.
   * See details [ResizeBox](/react/components/resize-box).
   */
  resizeDirections?: string[];
  /**
   * @zh 可以接受 `ResizeBox` 所有参数，在伸缩开启时，可以通过 `resizeBoxProps` 对菜单栏的 `width` 进行受控展示或者与 `collapsed` 联动
   * @en All props of `ResizeBox` can be accepted. The `width` of the menu bar can be displayed in a controlled manner through `resizeBoxProps` or linked with `collapsed`
   * @version 2.34.0
   */
  resizeBoxProps?: ResizeBoxProps;
  onSiderMount?: (id: string) => void;
  onSiderUnmount?: (id: string) => void;
}
