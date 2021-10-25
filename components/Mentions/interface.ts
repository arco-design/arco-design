import { ReactNode } from 'react';
import { TextAreaProps } from '../Input';
import { TriggerProps } from '../Trigger';

/**
 * @title Mentions
 */
export interface MentionsProps extends Omit<TextAreaProps, 'prefix' | 'maxLength'> {
  maxLength?: number;
  children?: ReactNode;
  /**
   * @zh 输入框的值
   * @en To set value
   */
  value?: string;
  /**
   * @zh 输入框默认值
   * @en To set default value
   */
  defaultValue?: string;
  /**
   * @zh 下拉框可选项
   * @en Options of dropdown
   */
  options?: (
    | string
    | number
    | { label: ReactNode | string; value: string | number; disabled?: boolean }
  )[];
  /**
   * @zh 触发关键字
   * @en Set trigger prefix keyword
   * @defaultValue `@`
   */
  prefix?: string | string[];
  /**
   * @zh 选中项前后分隔符
   * @en Set split string before and after selected mention
   */
  split?: string;
  /**
   * @zh 弹出框是否与输入框对齐
   * @en Whether the popup is aligned with the input
   * @defaultValue true
   */
  alignTextarea?: boolean;
  /**
   * @zh 下拉框的弹出位置
   * @en Position of dropdown
   * @defaultValue bl
   */
  position?: 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br';
  /**
   * @zh 可以接受所有 Trigger 组件的 Props
   * @en All `Trigger` component props
   */
  triggerProps?: Partial<TriggerProps>;
  /**
   * @zh 下拉列表没有数据时显示的内容
   * @en The content displayed when there is no data
   */
  notFoundContent?: ReactNode;
  /**
   * @zh 弹出框挂载的父节点
   * @en Set the mount HTML node for suggestions
   */
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  /**
   * @zh 是否根据输入的值筛选数据，可传入函数自定义过滤逻辑。
   * @en Customize filter option logic
   */
  filterOption?: false | ((inputValue: string, option) => boolean);
  /**
   * @zh 输入改变时的回调
   * @en Callback when input value is changed
   */
  onChange?: (value: string) => void;
  /**
   * @zh 搜索时的回调
   * @en Callback on search
   */
  onSearch?: (text: string, prefix: string) => void;
  /**
   * @zh 聚焦时的回调
   * @en Trigger when mentions get focus
   */
  onFocus?: (e) => void;
  /**
   * @zh 失焦时的回调
   * @en Trigger when mentions lose focus
   */
  onBlur?: (e) => void;
}
