import { CSSProperties, ReactNode } from 'react';
import { TriggerProps } from '../Trigger';

/**
 * @title Avatar
 */
export interface AvatarProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 头像的形状，有圆形(circle)和正方形(square)两种
   * @en The shape of the avatar. Two shapes are available: `circle` and `square`
   * @defaultValue circle
   */
  shape?: 'circle' | 'square';
  /**
   * @zh 头像的尺寸大小，单位是 `px`
   * @en The size of the avatar in `px`
   */
  size?: number;
  /**
   * @zh 是否自动根据头像尺寸调整字体大小。
   * @en Whether to automatically adjust the font size according to the size of the avatar.
   * @defaultValue true
   */
  autoFixFontSize?: boolean;
  /**
   * @zh 可点击的头像交互图标。
   * @en Clickable avatar interaction icon.
   */
  triggerIcon?: ReactNode;
  /**
   * @zh 交互图标的样式
   * @en Interactive icon style
   */
  triggerIconStyle?: CSSProperties;
  /**
   * @zh 可点击的头像交互类型。
   * @en Clickable avatar interaction type.
   * @defaultValue button
   */
  triggerType?: 'mask' | 'button';
  /**
   * @zh 点击回调
   * @en Callback when avatar is clicked
   */
  onClick?: (e) => void;
}

/**
 * @title Avatar.Group
 */
export interface AvatarGroupProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 头像的形状，(优先级低于 Avatar 组件本身)
   * @en The shape of the avatar, (priority is lower than the Avatar component itself)
   * @defaultValue circle
   */
  shape?: 'circle' | 'square';
  /**
   * @zh 头像的尺寸大小，单位是 `px`，(优先级低于 Avatar 组件本身)
   * @en The size of the avatar in `px`, (the priority is lower than the Avatar component itself)
   */
  size?: number;
  /**
   * @zh 是否自动根据头像尺寸调整字体大小，(优先级低于 Avatar 组件本身)
   * @en Whether to automatically adjust the font size according to the size of the avatar (the priority is lower than the Avatar component itself)
   * @defaultValue true
   */
  autoFixFontSize?: boolean;
  /**
   * @zh 头像组内的头像 `z-index` 递增，默认是递减。
   * @en Whether `z-index` of the avatars in group are in ascending order. The default is in descending order.
   * @version 2.3.0
   */
  zIndexAscend?: boolean;
  /**
   * @zh 头像组最多显示的头像数量，多余头像将以 `+x` 的形式展示。
   * @en The maximum number of avatars displayed in the avatar group. The rest of avatars will be displayed as a `+x`.
   * @version 2.4.0
   */
  maxCount?: number;
  /**
   * @zh 多余头像样式。
   * @en Style for `+x`.
   * @version 2.4.0
   */
  maxStyle?: CSSProperties;
  /**
   * @zh 多余头像气泡的 `TriggerProps`。
   * @en `TriggerProps` for popover around `+x`.
   * @version 2.4.0
   */
  maxPopoverTriggerProps?: TriggerProps;
}
