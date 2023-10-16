import { ReactNode, CSSProperties, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

import { Omit } from '../_util/type';

/**
 * @title Input
 * @zh **Input 接受所有原生的属性值**
 * @en **Input Accept all native attribute values**
 */
export interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'prefix' | 'className' | 'size' | 'height' | 'maxLength'
  > {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 允许清空输入框
   * @en Whether allow clear value
   */
  allowClear?: boolean;
  /**
   * @zh 是否禁用
   * @en Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * @zh 是否只读
   * @en Whether the input is readOnly
   */
  readOnly?: boolean;
  /**
   * @zh 默认值
   * @en The initial input content
   */
  defaultValue?: string;
  /**
   * @zh 输入框提示文字
   * @en Input box prompt text
   */
  placeholder?: string;
  /**
   * @zh 是否是错误状态.(废弃，下个大版本移除，使用 status='error' 替代)
   * @en Whether the input is error.(Deprecated, removed in the next major version, use status='error' instead)
   * @deprecated status="error"
   */
  error?: boolean;
  /**
   * @zh 状态
   * @en Status
   * @version 2.45.0
   */
  status?: 'error' | 'warning';
  /**
   * @zh 设置宽度自适应。minWidth 默认为 0，maxWidth 默认为 100%
   * @en auto width. minWidth defaults to 0, maxWidth defaults to 100%
   * @version 2.54.0
   */
  autoWidth?:
    | boolean
    | { minWidth?: CSSProperties['minWidth']; maxWidth?: CSSProperties['maxWidth'] };
  /**
  /**
   * @zh 输入时的回调
   * @en Callback when user input
   */
  onChange?: (value: string, e) => void;
  /**
   * @zh 点击清除按钮的回调
   * @en Callback when click clear button
   */
  onClear?: () => void;
  /**
   * @zh 按下回车键的回调
   * @en Callback when press enter key
   */
  onPressEnter?: (e) => void;
  /**
   * @zh 指定 normalize 执行的时机
   * @en Specify the timing of normalize execution
   * @version 2.50.0
   * @defaultValue ['onBlur']
   */
  normalizeTrigger?: ('onBlur' | 'onPressEnter')[];
  /**
   * @zh 在指定时机对用户输入的值进行格式化处理。前后值不一致时，会触发 onChange
   * @en Format the value entered by the user at the specified time, and when the previous and subsequent values are inconsistent, onChange will be triggered
   * @version 2.50.0
   */
  normalize?: (value: string) => string;
  /**
   * @zh 输入框前添加元素
   * @en The label text displayed before (on the left side of) the input field
   */
  addBefore?: ReactNode;
  /**
   * @zh 输入框后添加元素
   * @en The label text displayed after (on the right side of) the input field
   */
  addAfter?: ReactNode;
  /**
   * @zh 添加前缀文字或者图标
   * @en The prefix icon or text for the Input
   */
  prefix?: ReactNode;
  /**
   * @zh 添加后缀文字或者图标
   * @en The suffix icon or text for the Input
   */
  suffix?: ReactNode;
  /**
   * @zh 输入框的值，受控模式
   * @en The input content value
   */
  value?: string;
  /**
   * @zh 输入框前添加元素的样式
   * @en The additional css style of the `addBefore` element
   */
  beforeStyle?: object;
  /**
   * @zh 输入框后添加元素的样式
   * @en The additional css style of the `addAfter` element
   */
  afterStyle?: object;
  /**
   * @zh 输入框的尺寸
   * @en The size of the input box
   * @defaultValue default
   */
  size?: 'mini' | 'small' | 'default' | 'large';
  /**
   * @zh 自定义输入框高度
   * @en Custom input height
   */
  height?: number | string;
  /**
   * @zh 输入框最大输入的长度；设置 `errorOnly`为 `true` 后，超过 `maxLength` 会展示 `error` 状态，并不限制用户输入。
   * @en The max content length；After setting `errorOnly` to `true`, if `maxLength` is exceeded, the `error` status will be displayed, and user input will not be restricted.
   * @version `errorOnly` in 2.23.0
   */
  maxLength?: number | { length: number; errorOnly?: boolean };
  /**
   * @zh 配合 `maxLength`，显示字数统计
   * @en With `maxLength`, Show word count.
   */
  showWordLimit?: boolean;
  /**
   * @zh `allowClear` 时配置清除按钮的图标。
   * @en Configure the icon of the clear button when `allowClear`.
   * @version 2.50.0
   */
  clearIcon?: ReactNode;
}

/**
 * @title Input.TextArea
 */
export interface TextAreaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'onChange' | 'className' | 'maxLength'
  > {
  style?: CSSProperties;
  /**
   * @zh 开启字数统计之后，会在 `textarea` 标签外包一层 `div`，`wrapperStyle` 用来配置这个 `div` 的样式。
   * @en With `showWordLimit`, a `div` will be outside the `textarea` tag, and `wrapperStyle` is used to configure the style of it.
   */
  wrapperStyle?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 是否禁用
   * @en Whether the textarea is disabled
   */
  disabled?: boolean;
  /**
   * @zh 默认值
   * @en To set default value
   */
  defaultValue?: string;
  /**
   * @zh 值
   * @en To set value
   */
  value?: string;
  /**
   * @zh 是否自动调整输入框的高度
   * @en Height autoSize feature
   */
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  /**
   * @zh 是否是错误状态。(废弃，下个大版本移除，使用 status='error' 替代)
   * @en Whether the textarea is error.(Deprecated, removed in the next major version, use status='error' instead)
   * @deprecated
   */
  error?: boolean;
  /**
   * @zh 状态
   * @en Status
   * @version 2.45.0
   */
  status?: 'error' | 'warning';
  /**
   * @zh 输入框提示文字
   * @en textarea placeholder
   */
  placeholder?: string;
  /**
   * @zh 输入时的回调
   * @en Callback when user input
   */
  onChange?: (value: string, e) => void;
  /**
   * @zh 按下回车键的回调
   * @en Callback when press enter key
   */
  onPressEnter?: (e) => void;
  /**
   * @zh 输入框最大输入的长度；设置 `errorOnly`为 `true` 后，超过 `maxLength` 会展示 `error` 状态，并不限制用户输入。
   * @en The max content length；After setting `errorOnly` to `true`, if `maxLength` is exceeded, the `error` status will be displayed, and user input will not be restricted.
   * @version `errorOnly` in 2.23.0
   */
  maxLength?: number | { length: number; errorOnly?: boolean };
  showWordLimit?: boolean;
  /**
   * @zh 允许清空输入框
   * @en Whether allow clear the content
   * @version 2.2.0
   */
  allowClear?: boolean;
  /**
   * @zh 点击清除按钮的回调
   * @en Callback when click clear button
   * @version 2.2.0
   */
  onClear?: () => void;
  /**
   * @zh `allowClear` 时配置清除按钮的图标。
   * @en Configure the icon of the clear button when `allowClear`.
   * @version 2.50.0
   */
  clearIcon?: ReactNode;
}

/**
 * @title Input.Group
 */
export interface InputGroupProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 是否使用紧凑模式
   * @en Whether to use compact mode
   */
  compact?: boolean;
}

/**
 * @title Input.Search
 * @zh 包含 Input 组件所有参数
 * @en Contains all the parameters of the Input component
 * @notExtends
 */
export interface InputSearchProps extends InputProps {
  /**
   * @zh 搜索时展示加载状态
   * @en Show loading status when searching
   * @version 2.6.0
   */
  loading?: boolean;
  /**
   * @zh 点击搜索按钮的回调
   * @en Callback when click search button
   */
  onSearch?: (value: string) => void;
  /**
   * @zh 搜索按钮
   * @en Search button
   * @version `ReactNode` in 2.6.0
   */
  searchButton?: boolean | ReactNode;
}

/**
 * @title Input.Password
 * @zh 包含 Input 组件所有参数
 * @en Contains all the parameters of the Input component
 * @notExtends
 */
export interface InputPasswordProps extends InputProps {
  /**
   * @zh 是否显示切换密码可见状态的按钮
   * @en Whether to display the button to switch the visible state of the password
   */
  visibilityToggle?: boolean;
  /**
   * @zh 初始是否显示
   * @en To set default visibility
   */
  defaultVisibility?: boolean;
  /**
   * @zh 是否显示
   * @zh To set visibility
   */
  visibility?: boolean;
  /**
   * @zh visibility 改变时触发
   * @en Callback when visibility changes
   */
  onVisibilityChange?: (visibility: boolean) => void;
}

export interface InputComponentProps extends InputProps {
  prefixCls?: string;
  hasParent?: boolean;
  // input 随输入文本的宽度变化
  autoFitWidth?:
    | boolean
    | {
        minWidth?: CSSProperties['minWidth'];
        maxWidth?: CSSProperties['maxWidth'];
        pure?: boolean; // 是否只测量内容宽度，排除 padding ，border 等因素
        delay: number | ((width: number, prevWidth: number) => number);
      };
}

export type RefInputType = {
  /** 使输入框失去焦点 */
  blur: () => void;
  /** 使输入框获取焦点 */
  focus: () => void;
  /** input dom元素 */
  dom: HTMLInputElement;
};
