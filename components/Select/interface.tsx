import { ReactNode, CSSProperties, PropsWithChildren, ReactElement, HTMLAttributes } from 'react';
import { TriggerProps } from '../Trigger';
import { SelectViewCommonProps } from '../_class/select-view';
import { AvailableVirtualListProps } from '../_class/VirtualList';

export type OptionsType = SelectProps['options'];

// 造成输入框值改变的原因：用户输入、选中选项、选项下拉框收起、触发自动分词
export type InputValueChangeReason =
  | 'manual'
  | 'optionChecked'
  | 'optionListHide'
  | 'tokenSeparator';

export interface OptionInfo extends PropsWithChildren<OptionProps> {
  child?: ReactElement;
  _valid: boolean;
  _index: number;
  _origin: 'children' | 'options' | 'userCreatedOptions' | 'userCreatingOption';
}

export type LabeledValue = {
  value: string | number;
  label: ReactNode;
};

export type SelectInnerStateValue = string | number | string[] | number[];

/**
 * @title Select
 */
export interface SelectProps extends SelectViewCommonProps {
  /**
   * @zh 选择框的默认值
   * @en To set default value
   */
  defaultValue?: string | string[] | number | number[] | LabeledValue | LabeledValue[];
  /**
   * @zh 选择器的值（受控模式）
   * @en To set value
   */
  value?: string | string[] | number | number[] | LabeledValue | LabeledValue[];
  /**
   * @zh 输入框的值（受控模式）
   * @en To set input value
   */
  inputValue?: string;
  /**
   * @zh 是否开启多选模式或标签模式 (**`tags` 推荐使用 `mode: multiple; allowCreate: true` 替代，下一大版本将移除此模式**)
   * @en Set mode of Select(**`tags` recommends using `mode: multiple; allowCreate: true` instead, this mode will be removed in the next major version**)
   */
  mode?: 'multiple' | 'tags';
  /**
   * @zh 指定可选项
   * @en Select options
   * @version `extra` in 2.2.0
   */
  options?: (
    | string
    | number
    | { label: ReactNode | string; value: string | number; disabled?: boolean; extra?: any }
  )[];
  /**
   * @zh 设置 `onChange` 回调中 `value` 的格式。默认是string，设置为true时候，value格式为： { label: string, value: string }
   * @en Whether to embed label in value, turn the format of value from string to `{ value: string, label: ReactNode }`
   */
  labelInValue?: boolean;
  /**
   * @zh 是否根据输入的值筛选数据。如果传入函数的话，接收 `inputValue` 和 `option` 两个参数，当option符合筛选条件时，返回 `true`，反之返回 `false`。
   * @en If it's true, filter options by input value. If it's a function, filter options base on the function.
   * @defaultValue true
   */
  filterOption?: boolean | ((inputValue: string, option: ReactElement) => boolean);
  /**
   * @zh
   * 定制回显内容。返回值将会显示在下拉框内。若 `value` 对应的 `Option` 不存在，则第一个参数是 null
   * @en
   * Customize the content that will be displayed in the Select.
   * If the `Option` corresponding to `value` does not exist, the first parameter will be `null`
   */
  renderFormat?: (option: OptionInfo | null, value: string | number | LabeledValue) => ReactNode;
  /**
   * @zh 是否默认高亮第一个选项
   * @en Whether to highlight the first option by default
   * @defaultValue true
   */
  defaultActiveFirstOption?: boolean;
  /**
   * @zh 是否在隐藏的时候销毁 DOM 结构
   * @en Whether to destroy the DOM when hiding
   * @defaultValue true
   */
  unmountOnExit?: boolean;
  /**
   * @zh 下拉框是否默认打开。
   * @en Whether to show dropdown by default.
   * @version 2.14.0
   */
  defaultPopupVisible?: boolean;
  /**
   * @zh 控制下拉框是否打开。
   * @en Whether to show dropdown.
   * @version 2.6.0
   */
  popupVisible?: boolean;
  /**
   * @zh 没有数据时显示的内容
   * @en Specify content to show when no result matches.
   */
  notFoundContent?: ReactNode;
  /**
   * @zh 在多选模式下自动分词的分隔符。
   * @en Separator used to tokenize on `multiple` mode.
   */
  tokenSeparators?: string[];
  /**
   * @zh 弹出框挂载的父节点。
   * @en To set the container of the dropdown.
   */
  getPopupContainer?: (node: HTMLElement) => Element;
  /**
   * @zh 触发方式。
   * @en The trigger mode which executes the dropdown action.
   * @defaultValue click
   */
  trigger?: TriggerProps['trigger'];
  /**
   * @zh 自定义触发元素。
   * @en The trigger element which executes the dropdown action.
   * @version `() => ReactNode` in 2.31.0
   */
  triggerElement?:
    | ReactNode
    | ((params: { value: any; option: OptionInfo | OptionInfo[] }) => ReactNode);
  /**
   * @zh 可以接受所有 `Trigger` 的 `Props`
   * @en Pass all `Trigger` component properties
   */
  triggerProps?: Partial<TriggerProps>;
  /**
   * @zh 自定义弹出内容。
   * @en Customize dropdown content
   */
  dropdownRender?: (menu: ReactNode) => ReactNode;
  /**
   * @zh 下拉列表的样式。
   * @en The style of dropdown menu.
   */
  dropdownMenuStyle?: CSSProperties;
  /**
   * @zh 下拉列表的类。
   * @en The className of dropdown menu.
   */
  dropdownMenuClassName?: string | string[];
  /**
   * @zh 传递虚拟滚动属性。
   * @en Pass properties used by VirtualList.
   * @version 2.1.0
   */
  virtualListProps?: AvailableVirtualListProps;
  /**
   * @zh 点击选择框的回调
   * @en Callback when select an option or input value change.
   */
  onChange?: (value, option: OptionInfo | OptionInfo[]) => void;
  /**
   * @zh 取消选中的时候触发的回调，(只在 `multiple` 模式下触发)。
   * @en Called when a option is deselected.Only called for `multiple` mode.
   */
  onDeselect?: (value: string | number | LabeledValue, option: OptionInfo) => void;
  /**
   * @zh 点击清除时触发，参数是当前下拉框的展开状态。
   * @en Called when clear
   */
  onClear?: (visible: boolean) => void;
  /**
   * @zh 搜索时的回调
   * @en Callback when input changed
   */
  onSearch?: (value: string, reason: InputValueChangeReason) => void;
  /**
   * @zh 获得焦点时的回调
   * @en Callback when get focus
   */
  onFocus?: (e) => void;
  /**
   * @zh 失去焦点时的回调
   * @en Callback when lose focus
   */
  onBlur?: (e) => void;
  /**
   * @zh 下拉框的滚动监听函数，参数为滚动元素。
   * @en Callback when dropdown scrolls.
   */
  onPopupScroll?: (elem) => void;
  /**
   * @zh 下拉框收起展开时触发
   * @en Callback when visibility of dropdown is changed.
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * @zh 输入框文本改变的回调。
   * @en Callback when the value of input is changed.
   * @version 2.3.0
   */
  onInputValueChange?: (value: string, reason: InputValueChangeReason) => void;
  /**
   * @zh 输入框文本粘贴的回调。
   * @en Callback when the you paste text in input box.
   * @version 2.9.0
   */
  onPaste?: (e) => void;
}

/**
 * @title Select.Option
 */
export interface OptionProps extends Omit<HTMLAttributes<HTMLLIElement>, 'className'> {
  _key?: any;
  style?: CSSProperties;
  children?: ReactNode;
  prefixCls?: string;
  className?: string | string[];
  wrapperClassName?: string | string[];
  /**
   * @zh 是否禁用
   * @en Whether the option is disabled
   */
  disabled?: boolean;
  /**
   * @zh 默认根据此属性值进行筛选
   * @en Value of this Option
   */
  value: string | number;
  /**
   * @zh 携带任意自定义数据。
   * @en Any data you want to pass to Option.
   * @version 2.2.0
   */
  extra?: any;
  // Some user may use isSelectOption to hack, Do NOT change it to _isSelectOption
  isSelectOption?: boolean;
  _isMultipleMode?: boolean;
  _valueActive?: OptionProps['value'];
  _valueSelect?: SelectInnerStateValue;
  _onClick?: (value: OptionProps['value'], disabled: boolean) => void;
  _onMouseEnter?: (value: OptionProps['value']) => void;
  _onMouseLeave?: () => void;
}

/**
 * @title Select.OptGroup
 */
export interface OptGroupProps extends HTMLAttributes<HTMLLIElement> {
  _key?: any;
  children?: ReactNode;
  prefixCls?: string;
  /**
   * @zh 组名
   * @en Name of Group
   */
  label?: ReactNode;
  // Some user may use isSelectOptGroup to hack, Do NOT change it to _isSelectOptGroup
  isSelectOptGroup?: boolean;
}

/**
 * @title Select Reference Type
 */
export type SelectHandle = {
  /**
   * @zh DOM 节点
   * @en DOM
   */
  dom: HTMLDivElement;
  /**
   * @zh 使选择框聚焦
   * @en Focus Select
   */
  focus: () => void;
  /**
   * @zh 使选择框聚焦
   * @en Blur Select
   */
  blur: () => void;
  /**
   * @zh 鼠标快捷操作的处理函数
   * @en Processor of mouse shortcut operation
   */
  hotkeyHandler: (event: KeyboardEvent) => void;
  /**
   * @zh 处于悬浮态的选项的值
   * @en The value of active option
   */
  activeOptionValue: OptionProps['value'];
  /**
   * @zh 获得选项信息的列表
   * @en Get the list of option info
   */
  getOptionInfoList: () => OptionInfo[];
  /**
   * @zh 根据选项值获得对应的选项信息
   * @en Get the option info by its value
   */
  getOptionInfoByValue: (value: OptionProps['value']) => OptionInfo;
};
