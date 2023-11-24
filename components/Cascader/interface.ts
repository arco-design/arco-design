import { ReactNode, CSSProperties } from 'react';
import Store from './base/store';
import { TriggerProps } from '../Trigger';
import { SelectViewCommonProps } from '../_class/select-view';
import { NodeProps } from './base/node';
import { VirtualListProps } from '../_class/VirtualList';

/**
 * @title Cascader
 */
export interface CascaderProps<T = any> extends Omit<SelectViewCommonProps, 'showSearch'> {
  /**
   * @zh 选择框的默认值
   * @en Initial value
   */
  defaultValue?: (string | string[])[];

  /**
   * @zh 输入框的值
   * @en Input Value
   * @version 2.34.0
   */
  inputValue?: string;

  /**
   * @zh 选中值
   * @en To set value
   */
  value?: (string | string[])[];
  /**
   * @zh 级联数据
   * @en The data of options
   * @defaultValue []
   */
  options?: T[];
  trigger?: TriggerProps['trigger'];
  /**
   * @zh 展开下一级方式
   * @en Set the way to display the next level menu. One of hover and click
   * @defaultValue click
   */
  expandTrigger?: 'click' | 'hover';
  /**
   * @zh 每当选择的时候，值都会发生改变。多选时如果设置为`true`，会取消父子关系的关联。(默认只有在选择完成的时候，值才会更新)
   * @en Each selection will change value  if set to true.  when `mode=multiple`, child node and parent node will not affect each other.
   */
  changeOnSelect?: boolean;
  /**
   * @zh 是否在非动态加载时，选中项children为[]的时候渲染下一级节点。
   * @en Whether to render the next level node when the children of the selected option is an empty array
   */
  showEmptyChildren?: boolean;
  /**
   * @zh 是否在隐藏之后销毁DOM结构，默认为 `true`。如果是动态加载时，默认为`false`。
   * @en Whether destroy popup when hidden.
   */
  unmountOnExit?: boolean;
  /**
   * @zh 是否开启多选
   * @en Set mode
   */
  mode?: 'multiple';
  /**
   * @zh 可以接受所有 Trigger 组件的 Props
   * @en All `Trigger` component props
   */
  triggerProps?: Partial<TriggerProps>;
  /**
   * @zh
   * 使单选模式可搜索，传入 `{ retainInputValue: true }` 在搜索框聚焦时保留现有内容
   * 传入 `{ retainInputValueWhileSelect: true }` 在多选选择时保留输入框内容。
   * 传入 `{ panelMode: 'select' }` 以搜索面板形式展示可选项 (`2.39.0`)
   * `renderOption` 自定义渲染搜索项 (`2.39.0`)
   * @en
   * Whether single mode Select is searchable. `{ retainInputValue: true }` to retain the existing content when the search box is focused,
   * `{ retainInputValueWhileSelect: true }` to retain the existing content when multiple selection is selected.
   * `{ panelMode: 'select' }` Display options as a search panel (`2.39.0`)
   * `renderOption` Custom rendering search option (`2.39.0`)
   */
  showSearch?:
    | boolean
    | {
        panelMode?: 'cascader' | 'select';
        renderOption?: (
          inputValue: string,
          option: NodeProps<T>,
          options: extraOptions
        ) => ReactNode;
        retainInputValue?: boolean;
        retainInputValueWhileSelect?: boolean;
      };

  /**
   * @zh 没有数据时显示的内容
   * @en The content to show when no result matches
   */
  notFoundContent?: ReactNode;
  /**
   * @zh 指定label，value，isLeaf，disabled，children 对应的字段
   * @en Custom field name for label, value, isLeaf, disabled and children
   * @defaultValue DefaultFieldNames
   */
  fieldNames?: FieldNamesType;
  /**
   * @zh 控制下拉框的展开收起
   * @en Whether the popup is visible
   */
  popupVisible?: boolean;
  /**
   * @zh 默认下拉框的展开收起状态
   * @en Whether the popup is visible by default
   */
  defaultPopupVisible?: boolean;
  /**
   * @zh
   * 定制回填方式 <br/> parent: 子节点都被选中时候返回父节点 <br/> child: 返回子节点
   * @en
   * Customize the return value  <br/> parent:
   * Only return the parent node when all child nodes are selected <br/> child: Return child nodes
   * @defaultValue child
   * @version 2.31.0
   */
  checkedStrategy?: 'parent' | 'child';
  /**
   * @zh 自定义下拉列表类名
   * @en Custom dropdown list classname
   * @version 2.35.0
   */
  dropdownMenuClassName?: string | string[];
  /**
   * @zh 菜单列样式
   * @en dropdown menu column style
   * @version 2.35.0
   */
  dropdownMenuColumnStyle?: CSSProperties;
  /**
   * @zh 传递虚拟滚动属性。开启虚拟滚动后，每列级联菜单的会存在默认宽度，可通过 `dropdownMenuColumnStyle` 进行样式调整
   * @en virtual list props. After virtual scrolling is enabled, there will be a default width for each column of cascading menus, which can be adjusted by `dropdownMenuColumnStyle`
   * @version 2.35.0
   */
  virtualListProps?: Pick<VirtualListProps<any>, 'threshold' | 'isStaticItemHeight'>;
  /**
   * @zh 是否默认高亮搜索结果第一个选项。
   * @en Whether to highlight the first option of search results by default
   * @version 2.37.0
   * @defaultValue true
   */
  defaultActiveFirstOption?: boolean;
  /**
   * @zh 自定义下拉菜单的展示。
   * @en Customize the popup menu.
   * @version 2.15.0
   */
  dropdownRender?: (menu: ReactNode) => ReactNode;
  /**
   * @zh 自定义下拉菜单每一列的展示。
   * @en Customize columns of the menu.
   * @version 2.15.0, `level` in 2.17.0
   */
  dropdownColumnRender?: (menu: ReactNode, level: number) => ReactNode;
  /**
   * @zh 默认搜索从 `label` 属性中进行关键字搜索。通过该方法可以自定义搜索逻辑
   * @en Customize the search logic.
   */
  filterOption?: (inputValue: string, option: NodeProps<T>) => boolean;
  /**
   * @zh 自定义展示 `option`
   * @en Custom rendering `option`
   */
  renderOption?: (option: NodeProps<T>, level: number) => ReactNode;
  /**
   * @zh 定义每一层级的 `footer`。参数：level: 当前层级, activeOption: 当前点击的节点。返回 `null` 不展示
   * @en Custom rendering the `footer` of each level menu.
   */
  renderFooter?: (level: number, activeOption: NodeProps<T> | null) => ReactNode;
  /**
   * @zh 格式化显示内容。
   * @en The return value will be displayed in the input box.
   */
  renderFormat?: (valueShow: any[]) => ReactNode;
  /**
   * @zh 搜索时的回调。(reason in `2.34.0`)
   * @en Callback when input changed.(reason in `2.34.0`)
   * @version 2.20.0
   */
  onSearch?: (inputValue: string, reason: InputValueChangeReason) => void;
  /**
   * @zh 点击选择框的回调。
   * @en Callback when finishing select.
   */
  onChange?: (
    value: (string | string[])[],
    selectedOptions,
    extra: { dropdownVisible?: boolean }
  ) => void;
  /**
   * @zh inputValue改变时的回调
   * @en Callback when inputValue change.
   * @version 2.34.0
   */
  onInputValueChange?: (inputValue: string, reason: InputValueChangeReason) => void;
  /**
   * @zh 弹出框挂在的父节点
   * @en ParentNode which the selector should be rendered to.
   */
  getPopupContainer?: (node: HTMLElement) => Element;
  /**
   * @zh 动态加载数据。pathValue: 当前选中项的路径 value； level: 选中项层级。
   * @en To load option lazily
   */
  loadMore?: (pathValue: string[], level: number) => Promise<T[]>;
  /**
   * @zh 下拉框收起展开时触发。
   * @en Callback when popup shown or hidden.
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * @zh 点击清除时触发，参数是当前下拉框的展开状态。
   * @en Callback when click clear icon.
   */
  onClear?: (visible: boolean) => void;
  /**
   * @zh 图标配置。
   * @en Icon configuration.
   * @version 2.50.0
   */
  icons?: {
    loading?: ReactNode;
    checked?: ReactNode;
    next?: ReactNode;
  };
}

export interface OptionProps {
  /**
   * @zh 选项的值
   * @en: the value of Option
   *
   */
  value?: string;
  /**
   * @zh 选项文本
   * @en option text
   */
  label?: string;
  /**
   * @zh 是否禁用该选项
   * @en whether to disabled
   */
  disabled?: boolean;
  /**
   * @zh 下一级选项
   * @en next level menu
   */
  children?: OptionProps[];
  /**
   * @zh 是否是叶子节点
   * @en Flag whether it is a leaf node
   */
  isLeaf?: boolean;
  /**
   * @zh 是否禁用复选框选中
   * @en Whether to disable the check box is selected
   * @version 2.21.0
   */
  disableCheckbox?: boolean;

  /**
   * @zh 其他字段
   * @en other fields
   */
  [key: string]: any;
}

/**
 * fieldnames 属性类型
 */
export type FieldNamesType = {
  /* Custom field name for label */
  label?: string;
  /** Custom field name for value */
  value?: string;
  /** Custom field name for children */
  children?: string;
  /** Custom field name for disabled  */
  disabled?: string;
  /** Custom field name for isLeaf */
  isLeaf?: string;
};

// 造成输入框值改变的原因：用户输入、选项下拉框收起、其他
export type InputValueChangeReason = 'manual' | 'optionListHide' | 'optionChecked';

export interface CascaderPanelProps<T> {
  className?: string | string[];
  style?: CSSProperties;
  store: Store<T>;
  multiple?: boolean;
  defaultValue?: string[][];
  value?: string[][];
  changeOnSelect?: boolean;
  popupVisible?: boolean;
  expandTrigger?: 'click' | 'hover';
  trigger?: 'click';
  prefixCls?: string;
  rtl?: boolean;
  showEmptyChildren?: boolean;
  virtualListProps?: CascaderProps<T>['virtualListProps'];
  renderOption?: (option: NodeProps<T>, level: number) => ReactNode;
  onChange?: (value: string[][]) => void;
  loadMore?: (activeValue, level: number) => void;
  renderEmpty?: (width?: CSSProperties['width']) => ReactNode;
  renderFooter?: (level: number, activeOption: NodeProps<T> | null) => ReactNode;
  onDoubleClickOption?: () => void;
  onEsc?: () => void;
  dropdownColumnRender?: CascaderProps<T>['dropdownColumnRender'];
  dropdownMenuColumnStyle?: CascaderProps<T>['dropdownMenuColumnStyle'];
  getTriggerElement: () => HTMLElement;
  icons?: {
    loading?: ReactNode;
    checked?: ReactNode;
    next?: ReactNode;
  };
}

export interface extraOptions {
  checked: boolean;
}
