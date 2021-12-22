import { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';

/**
 * @title InputNumber
 */
export interface InputNumberProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'prefix' | 'className' | 'size' | 'onChange' | 'onKeyDown'
  > {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 数字变化步长
   * @en The value of each step. It can be an integer or decimal
   * @defaultValue 1
   */
  step?: number;
  /**
   * @zh 数字精度。设置精度小于`step`的小数位时，取`step`的小数个数。
   * @en The precision of input value
   */
  precision?: number;
  /**
   * @zh 最小值
   * @en The min value
   * @defaultValue -Infinity
   */
  min?: number;
  /**
   * @zh 最大值
   * @en The max value
   * @defaultValue Infinity
   */
  max?: number;
  /**
   * @zh 是否禁用
   * @en Whether input is disabled
   */
  disabled?: boolean;
  /**
   * @zh 错误状态
   * @en Whether input has error status
   */
  error?: boolean;
  /**
   * @zh 是否只读
   * @en Whether input is readonly
   * @version 2.17.0
   */
  readOnly?: boolean;
  /**
   * @zh 初始值
   * @en To set default value
   */
  defaultValue?: number;
  /**
   * @zh 当前值
   * @en To set value
   */
  value?: undefined | number | string;
  /**
   * @zh 默认显示文案
   * @en Placeholder of input element
   */
  placeholder?: string;
  /**
   * @zh `embed` - 按钮内嵌模式，`button` - 左右按钮模式
   * @en `embed`: Button embedded, `button`: Buttons on both sides
   * @defaultValue embed
   */
  mode?: 'embed' | 'button';
  /**
   * @zh 不同尺寸的数字输入框。分别对应 `24px`, `28px`, `32px`, `36px`
   * @en Different sizes
   */
  size?: 'mini' | 'small' | 'default' | 'large';
  /**
   * @zh 显示前缀
   * @en The prefix for the InputNumber
   */
  prefix?: ReactNode;
  /**
   * @zh 显示后缀
   * @en The suffix for the InputNumber
   */
  suffix?: ReactNode;
  /**
   * @zh 定义输入框展示值
   * @en Specifies the format of the value presented
   */
  formatter?: (value: number | string) => string;
  /**
   * @zh 从 formatter 转换为数字，和 formatter 搭配使用。
   * @en Specifies the value extracted from formatter
   * @defaultValue (input) => input.replace(/[^\w\.-]+/g, '')
   */
  parser?: (value: string) => number | string;
  /**
   * @zh 变化回调
   * @en Callback when the value changes
   */
  onChange?: (value: number) => void;
  /**
   * @zh 输入框聚焦事件的回调
   * @en Callback when the input is focused
   */
  onFocus?: (e) => void;
  /**
   * @zh 输入框失去聚焦事件的回调
   * @en Callback when the input is blurred
   */
  onBlur?: (e) => void;
  /**
   * @zh 键盘事件回调
   * @en Callback when the keyboard is pressed
   */
  onKeyDown?: (e: Event) => void;
  /**
   * @zh 隐藏右侧按钮
   * @en Whether to hide the control buttons
   */
  hideControl?: boolean;
  /**
   * @zh 配置图标
   * @en Customize icons
   */
  icons?: {
    up?: ReactNode;
    down?: ReactNode;
    plus?: ReactNode;
    minus?: ReactNode;
  };
}
