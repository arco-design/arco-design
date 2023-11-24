import { CSSProperties, ReactNode } from 'react';
import { TriggerProps } from '../Trigger';
import { InputProps } from '../Input';

/**
 * @title ColorPicker
 */
export interface ColorPickerProps {
  style?: CSSProperties;
  className?: string | string[];
  value?: string;
  defaultValue?: string;
  format?: 'hex' | 'rgb';
  onChange?: (value: string) => void;
  /**
   * @zh 禁用
   * @en disabled
   */
  disabled?: boolean;
  /**
   * @zh 只读
   * @en readOnly
   */
  readOnly?: boolean;
  /**
   * @zh 尺寸
   * @en Size
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
   * @zh 可以接受所有 Trigger 组件的 Props
   * @en All `Trigger` component props
   */
  triggerProps?: Partial<TriggerProps>;
  /**
   * @zh 下拉框收起展开时触发。
   * @en Callback when popup shown or hidden.
   */
  onVisibleChange?: (visible: boolean) => void;

  disabledAlpha?: boolean;

  showRecently?: boolean;
  recentlyColors?: string[];
  showPreset?: boolean;
  presetColors?: string[];
  renderRecently?: () => ReactNode;
  renderPreset?: () => ReactNode;
  renderPickSection?: () => ReactNode;
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
  rgb: RGB;
  hsv: HSV;
  hex: string;
  alpha: number;
}
