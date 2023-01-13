import { CSSProperties, ReactNode } from 'react';

export type ObjectValueType = {
  value?: any;
  label?: ReactNode;
  closable?: boolean;
};

export type ValueChangeReason = 'add' | 'remove' | 'clear' | 'sort';

/**
 * @title InputTag
 */
export interface InputTagProps<T = any> {
  className?: string | string[];
  style?: CSSProperties;
  /**
   * @zh 不同尺寸
   * @en Different sizes
   */
  size?: 'mini' | 'small' | 'default' | 'large';
  /**
   * @zh 预设文案
   * @en Placeholder of input element
   */
  placeholder?: string;
  /**
   * @zh 是否是错误状态
   * @en Error style
   */
  error?: boolean;
  /**
   * @zh 是否禁用
   * @en Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * @zh 自动聚焦
   * @en Whether the input is focused by default
   */
  autoFocus?: boolean;
  /**
   * @zh 是否只读
   * @en Whether the input is read only
   */
  readOnly?: boolean;
  /**
   * @zh 是否允许清除
   * @en Whether to allow clear input value
   */
  allowClear?: boolean;
  /**
   * @zh 是否为内部标签变化添加动画。
   * @en Whether to add animation for internal label changes
   * @version 2.15.0
   * @defaultValue true
   */
  animation?: boolean;
  /**
   * @zh 是否在失焦时自动存储正在输入的文本
   * @en Whether to automatically store the text entering when blur InputTag
   * @version 2.25.0
   */
  saveOnBlur?: boolean;
  /**
   * @zh 默认值
   * @en To set default value
   */
  defaultValue?: T[];
  /**
   * @zh 控件值
   * @en To set value
   */
  value?: T[];
  /**
   * @zh 控件的输入框内的值
   * @en To set input value
   */
  inputValue?: string;
  /**
   * @zh 设置传入和回调出的值均为 `{ label: '', value: ''}` 格式。
   * @en If true, the incoming and callback values will be `{label: '', value: '')` format
   */
  labelInValue?: boolean;
  /**
   * @zh 是否可以通过拖拽为 Tag 排序
   * @en Weather it is possible to sort tags by drag
   * @version 2.27.0
   */
  dragToSort?: boolean;
  /**
   * @zh 后缀
   * @en The suffix for the InputTag
   */
  suffix?: ReactNode;
  /**
   * @zh 自定义图标
   * @en Custom icons
   */
  icon?: { removeIcon?: ReactNode; clearIcon?: ReactNode };
  /**
   * @zh 触发自动分词的分隔符
   * @en Separator used to tokenize
   * @version 2.44.0
   */
  tokenSeparators?: string[];
  /**
   * @zh 校验函数，默认在 按下enter时候触发。
   * @en Function to check user's input, which is triggered when `Enter` is pressed
   * @defaultValue (inputValue, values) => inputValue && values.every((item) => item !== inputValue)
   * @version return type T and `Promise<T>` in 2.37.0
   */
  validate?: (inputValue: string, values: T[]) => boolean | Promise<boolean> | T | Promise<T>;
  /**
   * @zh 自定义标签渲染，`props` 为当前标签属性，`index` 为当前标签的顺序，`values` 为所有标签的值.
   * @en Custom tag rendering, `props` is the current tag attribute, `index` is the order of the current tag, `values` is the value of all tags
   * @version index、values added in 2.15.0
   */
  renderTag?: (
    props: {
      value: any;
      label: ReactNode;
      closable: boolean;
      onClose: (event) => void;
    },
    index: number,
    values: ObjectValueType[]
  ) => ReactNode;
  /**
   * @zh 移除某一个标签时改变时触发
   * @en Callback when a tag is removed
   */
  onRemove?: (value: T, index: number, event) => void;
  /**
   * @zh 控件值改变时触发
   * @en Callback when value changes
   * @version `reason` in 2.27.0
   */
  onChange?: (value: T[], reason: ValueChangeReason) => void;
  /**
   * @zh 失去焦点时候触发
   * @en Callback when input is blurred
   */
  onBlur?: (e) => void;
  /**
   * @zh 聚焦时触发
   * @en Callback when input is focused
   */
  onFocus?: (e) => void;
  /**
   * @zh 按 enter 键触发
   * @en Callback when `Enter` key is pressed
   */
  onPressEnter?: (e) => void;
  /**
   * @zh 输入框文本改变的回调。
   * @en Callback when the value of input changes
   */
  onInputChange?: (inputValue: string, event?) => void;
  /**
   * @zh 键盘事件回调
   * @en Callback when the keyboard is pressed
   */
  onKeyDown?: (e) => void;
  /**
   * @zh 输入框文本粘贴的回调。
   * @en Callback when you paste text in input box
   */
  onPaste?: (e) => void;
  /**
   * @zh 点击清除按钮的回调
   * @en Callback when clear button is clicked
   * @version 2.20.0
   */
  onClear?: () => void;
  /**
   * @zh 单击组件的回调。
   * @en Callback when the component is clicked
   */
  onClick?: (e) => void;
  tagClassName?: string;
  disableInput?: boolean;
}
