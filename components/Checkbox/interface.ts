import { CSSProperties, ReactNode, ReactText, HTMLAttributes } from 'react';

/**
 * @title Checkbox
 * @zh `T = string | number`
 * @en `T = string | number`
 */
export interface CheckboxProps<T extends ReactText = any>
  extends Omit<HTMLAttributes<HTMLLabelElement>, 'children' | 'className' | 'onChange'> {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 是否禁用
   * @en Whether to disable
   */
  disabled?: boolean;
  /**
   * @zh 错误样式
   * @en Whether to show in error style
   */
  error?: boolean;
  /**
   * @zh 是否选中
   * @en Whether the checkbox is checked
   */
  checked?: boolean;
  /**
   * @zh 默认是否选中
   * @en To set default checked
   */
  defaultChecked?: boolean;
  /**
   * @zh 半选状态
   * @en The indeterminate state of checkbox
   */
  indeterminate?: boolean;
  /**
   * @zh 点击复选框的回调
   * @en Callback when the state changes
   */
  onChange?: (checked: boolean, e: Event) => void;
  /**
   * @zh 复选框的 value 属性
   * @en To set checkbox value
   */
  value?: T;
  /**
   * @zh 自定义 IconCheck
   * @en Custom IconCheck
   * @version 2.43.0
   */
  icon?: ReactNode;
  checkboxGroupValue?: T[];
  onGroupChange?: (value: T, checked: boolean) => void;
  isCheckboxGroup?: boolean;
  children?: ReactNode | ((value: { checked: boolean; indeterminate: boolean }) => ReactNode);
}

/**
 * @title Checkbox.Group
 */
export interface CheckboxGroupProps<T extends ReactText> {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 整组失效
   * @en Whether to disable all checkboxes in the group
   */
  disabled?: boolean;
  /**
   * @zh 方向
   * @en Arrangement direction
   * @defaultValue horizontal
   */
  direction?: 'horizontal' | 'vertical';
  error?: boolean;
  /**
   * @zh 默认选中的选项
   * @en Initial selected value
   */
  defaultValue?: T[];
  /**
   * @zh 可选项
   * @en Specifies options
   */
  options?: (T | { label: ReactNode; value: T; disabled?: boolean; icon?: ReactNode })[];
  /**
   * @zh 选中的选项（受控模式）
   * @en To set value
   */
  value?: T[];
  /**
   * @zh 变化时的回调函数
   * @en Callback when the state changes
   */
  onChange?: (value: T[], e: Event) => void;
}
