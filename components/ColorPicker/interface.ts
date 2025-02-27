import { CSSProperties, ReactNode } from 'react';
import { TriggerProps } from '../Trigger';
import { InputProps } from '../Input';

/**
 * @title ColorPicker
 */
export interface ColorPickerProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 默认值
   * @en The initial input content
   */
  defaultValue?: string | GradientColor[];
  /**
   * @zh 颜色值，受控模式
   * @en The input content value
   */
  value?: string | GradientColor[];
  /**
   * @zh 显示颜色值
   * @en Show color value
   */
  showText?: boolean;
  /**
   * @zh 颜色值的格式
   * @en Color value format
   */
  format?: 'hex' | 'rgb';
  /**
   * @zh 单一颜色或渐变色模式
   * @en Whether to use single color or gradient color mode
   * @defaultValue single
   */
  mode?: 'single' | 'gradient' | ['single', 'gradient'];
  /**
   * @zh 禁用
   * @en disabled
   */
  disabled?: boolean;
  /**
   * @zh 输入框的尺寸
   * @en The size of the input box
   * @defaultValue default
   */
  size?: InputProps['size'];
  /**
   * @zh 默认弹出框是打开还是关闭
   * @en Whether the confirmation box is visible by default
   */
  defaultPopupVisible?: boolean;
  /**
   * @zh 弹出框是打开还是关闭。(受控)
   * @en Whether the confirmation box is visible
   */
  popupVisible?: boolean;
  /**
   * @zh 隐藏后是否销毁 DOM 结构
   * @en Whether to umount the node on hiding
   * @defaultValue true
   */
  unmountOnExit?: boolean;
  /**
   * @zh 可以接受所有 Trigger 组件的 Props
   * @en All `Trigger` component props
   */
  triggerProps?: Partial<TriggerProps>;
  /**
   * @zh 禁用透明通道
   * @en Disable transparency channel
   */
  disabledAlpha?: boolean;
  /**
   * @zh 显示历史颜色
   * @en Show history colors
   */
  showHistory?: boolean;
  /**
   * @zh 历史颜色的颜色数组
   * @en Color array of history colors
   */
  historyColors?: string[];
  /**
   * @zh 显示预设颜色
   * @en Show preset colors
   */
  showPreset?: boolean;
  /**
   * @zh 预设颜色的颜色数组
   * @en Color array of preset colors
   */
  presetColors?: string[];
  /**
   * @zh 自定义触发元素。
   * @en The trigger element which executes the dropdown action.
   * @version 2.60.0
   */
  triggerElement?: ReactNode | ((params: { value: string | GradientColor[] }) => ReactNode);
  /**
   * @zh 颜色值改变时触发
   * @en Callback when the color value changes
   */
  onChange?: (value: string | GradientColor[]) => void;
  /**
   * @zh 下拉框收起展开时触发。
   * @en Callback when popup shown or hidden.
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * @zh 自定义面板底部内容
   * @en Customize the bottom content of the panel
   * @version 2.62.0
   */
  renderFooter?: () => ReactNode;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSV {
  h: number;
  s: number;
  v: number;
}

export interface Color {
  hsv: HSV;
  rgb: RGB;
  hex: string;
}

export enum ColorPickerMode {
  Single = 'single',
  Gradient = 'gradient',
}

export interface GradientColor {
  color: string;
  percent: number;
}

export interface InternalGradientColor {
  id: string;
  color: Color;
  alpha: number;
  percent: number;
}
