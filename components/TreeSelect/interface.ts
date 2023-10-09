import { ReactNode, CSSProperties } from 'react';
import { TreeDataType, NodeProps, TreeProps } from '../Tree/interface';
import { TriggerProps } from '../Trigger';
import { SelectViewCommonProps } from '../_class/select-view';

export type TreeSelectDataType = TreeDataType & { value?: string };
export type LabelValue = { label: ReactNode; value: string; disabled?: boolean };

/**
 * @title TreeSelect
 */
export interface TreeSelectProps extends SelectViewCommonProps {
  /**
   * @zh 是否多选
   * @en Whether to select multiple
   */
  multiple?: boolean;
  /**
   * @zh 选择框的默认值
   * @en The key of node selected by default
   */
  defaultValue?:
    | string
    | string[]
    | { label: ReactNode; value: string; disabled?: boolean }
    | { label: ReactNode; value: string; disabled?: boolean }[];
  /**
   * @zh 选中值
   * @en The key of the selected node
   */
  value?:
    | string
    | string[]
    | { label: ReactNode; value: string; disabled?: boolean }
    | { label: ReactNode; value: string; disabled?: boolean }[];
  /**
   * @zh
   * 定制回显内容。返回值将会显示在下拉框内。若 `value` 对应的 `Option` 不存在，则第一个参数是 null
   * @en
   * Customize the content that will be displayed in the Select.
   * If the `Option` corresponding to `value` does not exist, the first parameter will be `null`
   * @version 2.46.0
   */
  renderFormat?: (option: NodeProps | null, value: string | LabelValue) => ReactNode;
  /**
   * @zh 输入框搜索文本的受控值
   * @en To set input search value
   * @version 2.39.0
   */
  inputValue?: string;
  /**
   * @zh 指定 key，title，isLeaf，disabled，children 对应的字段
   * @en Custom field name for key, title, isLeaf, disabled and children
   * @defaultValue DefaultFieldNames
   * @version 2.11.0
   */
  fieldNames?: TreeProps['fieldNames'];
  /**
   * @zh 数据
   * @en The data of tree
   */
  treeData?: TreeSelectDataType[];
  /**
   * @zh 设置 value 格式。默认是 `string`，设置为 `true` 时候，value 格式为： `{ label: string, value: string }`
   * @en Setting value format.The default is `string`, when set to `true`, the value format will turn to: `{ label: string, value: string }`
   */
  labelInValue?: boolean;
  /**
   * @zh 是否在隐藏之后销毁 DOM 结构
   * @en Whether to destroy the DOM after hiding
   */
  unmountOnExit?: boolean;
  /**
   * @zh 是否展示复选框
   * @en Whether to show checkbox
   */
  treeCheckable?: boolean;
  /**
   * @zh 父子节点是否关联
   * @en Whether the parent and child nodes are related
   */
  treeCheckStrictly?: boolean;
  /**
   * @zh 定制回显方式
   * @en Customize the return value
   * @defaultValue all
   */
  treeCheckedStrategy?: TreeProps['checkedStrategy'];
  /**
   * @zh 可以接受所有 [Tree](/react/components/tree) 组件的参数
   * @en The props of the [Tree](/react/components/tree) component
   */
  treeProps?: Partial<TreeProps>;
  /**
   * @zh 可以接受所有 Trigger 组件的参数
   * @en The props of the `Trigger` component
   */
  triggerProps?: Partial<TriggerProps>;
  /**
   * @zh 自定义上方显示元素
   * @en Customize the trigger element
   * @version `() => ReactNode` in 2.31.0
   */
  triggerElement?: ReactNode | ((params: { value: any }) => ReactNode);
  /**
   * @zh 是否显示边框
   * @en Whether show border
   * @defaultValue true
   */
  bordered?: boolean;
  /**
   * @zh 没有数据时显示的内容
   * @en The content display when no data
   */
  notFoundContent?: ReactNode;
  /**
   * @zh 控制下拉框的展开收起
   * @en Whether the popup is visible or not
   */
  popupVisible?: boolean;
  /**
   * @zh 设置下拉框样式
   * @en The additional css style for dropdown menu
   * @version 2.3.0
   */
  dropdownMenuStyle?: CSSProperties;
  /**
   * @zh 自定义下拉框展示
   * @en Customize dropdown rendering
   * @version 2.3.0
   */
  dropdownRender?: (dom: ReactNode) => ReactNode;
  /**
   * @zh 选中值改变的回调
   * @en Callback when the selection changed
   * @version `extra` in `2.29.0`
   */
  onChange?: (
    value: any,
    extra: {
      trigger?: NodeProps;
      checked?: boolean;
      selected?: boolean;
    }
  ) => void;
  /**
   * @zh 弹出框挂载的父节点
   * @en The parent node of the popup
   */
  getPopupContainer?: (node: HTMLElement) => Element;
  /**
   * @zh 下拉框收起展开时触发
   * @en Callback when the visibility of the popup is changed
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * @zh
   * 根据输入的值筛选数据。接收 `inputText` 和 `treeNode` 两个参数，当 `option` 符合筛选条件时，返回 `true`，反之返回 `false`。treeNode 是树节点。
   * @en
   * Filter data based on entered value. Accepted two parameters, inputText and treeNode.
   * When the option matches the filter conditions, it returns true, otherwise it returns false. treeNode is the tree node.
   */
  filterTreeNode?: (inputText, treeNode: any) => boolean | void;
  /**
   * @zh 动态加载数据
   * @en Callback when loaded data asynchronously
   */
  loadMore?: (treeNode: NodeProps, dataRef) => void;
  /**
   * @zh 自定义搜索方法。未定义的时候将会在已经在数据中进行搜索
   * @en Callback when searching data. When undefined, it will search in the data already
   */
  onSearch?: (inputValue: string) => void;
  /**
   * @zh 输入框搜索文本改变的回调。
   * @en Callback when the search value of input is changed.
   * @version 2.39.0
   */
  onInputValueChange?: (value: string, reason: InputValueChangeReason) => void;
  /**
   * @zh 点击清除时触发，参数是当前下拉框的展开状态。
   * @en Callback when clicked clear, the parameter is the visible state of current dropdown
   */
  onClear?: (visible: boolean) => void;
}

export type RefTreeSelectType = {
  focus: () => void;
  blur: () => void;
};

export const DefaultFieldNames = {
  key: 'key',
  title: 'title',
  children: 'children',
  selectable: 'selectable',
  disabled: 'disabled',
  disableCheckbox: 'disableCheckbox',
  checkable: 'checkable',
  isLeaf: 'isLeaf',
};

// 造成输入框值改变的原因：用户输入、选中选项、选项下拉框收起
export type InputValueChangeReason = 'manual' | 'optionChecked' | 'optionListHide';
