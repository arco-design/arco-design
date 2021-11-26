import React, { CSSProperties, ReactElement } from 'react';
import { InputProps } from '../Input';
import { OptionInfo, SelectProps } from '../Select/interface';

import { AvailableVirtualListProps } from '../_class/VirtualList';

type PartialSelectProps = Pick<
  SelectProps,
  | 'filterOption'
  | 'dropdownRender'
  | 'triggerProps'
  | 'getPopupContainer'
  | 'defaultActiveFirstOption'
>;

/**
 * @title AutoComplete
 */
export interface AutoCompleteProps extends PartialSelectProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 是否禁用
   * @en Whether to disable the autocomplete
   */
  disabled?: boolean;
  /**
   * @zh 自定义输入框/数据源
   * @en Custom input/source data
   */
  children?: React.ReactNode;
  /**
   * @zh 是否允许一键清除
   * @en Whether to allow clear the content
   */
  allowClear?: boolean;
  /**
   * @zh 自动完成的数据源
   * @en Data source
   */
  data?: (string | { value: string; name: string; [key: string]: any } | React.ReactNode)[];
  /**
   * @zh 输入框提示
   * @en Placeholder of input
   */
  placeholder?: string;
  /**
   * @zh 自动补全组件的默认值
   * @en The default value of the autocomplete.
   */
  defaultValue?: string;
  /**
   * @zh 自动补全组件的值（受控模式）
   * @en The value of the autocomplete.
   */
  value?: string;
  /**
   * @zh 报错状态
   * @en Error style
   */
  error?: boolean;
  /**
   * @zh `strict: true` 的时候大小写敏感
   * @en Case sensitive when set `strict: true`
   */
  strict?: boolean;
  /**
   * @zh 是否处于加载状态。
   * @en Whether the component is loading data.
   * @version 2.10.0
   */
  loading?: boolean;
  /**
   * @zh 自定义触发元素
   * @en Custom trigger element
   * @defaultValue <Input />
   */
  triggerElement?: ReactElement;
  /**
   * @zh 搜索补全时的回调
   * @en Callback when searching items
   */
  onSearch?: (value: string) => void;
  /**
   * @zh 点击补全项时的回调
   * @en Callback when an option is selected.
   */
  onSelect?: (value: string, option: OptionInfo) => void;
  /**
   * @zh 输入或者点击补全项，value 改变时的回调（仅在点击补全项时存在第二个参数）
   * @en Callback when an option is selected or input value changes
   */
  onChange?: (value: string, option?: OptionInfo) => void;
  /**
   * @zh 按下回车键的回调
   * @en Callback when Enter is pressed
   * @version `activeOption` in 2.25.1
   */
  onPressEnter?: (event, activeOption?: OptionInfo) => void;
  /**
   * @zh 聚焦时的回调
   * @en Callback when component gets focus
   */
  onFocus?: (event) => void;
  /**
   * @zh 失去焦点的回调
   * @en Callback when component is blurred
   */
  onBlur?: (event) => void;
  /**
   * @zh 传递虚拟滚动属性。
   * @en Virtual scroll properties.
   * @version 2.2.0
   */
  virtualListProps?: AvailableVirtualListProps;
  /**
   * @zh 传递 Input 组件的属性。
   * @en Properties of Input component.
   * @version 2.10.0
   */
  inputProps?: Partial<InputProps>;
}
