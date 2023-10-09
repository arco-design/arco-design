`````
组件 / 数据输入

# 树选择 TreeSelect

可以对树形结构数据进行选择。
`````

%%Content%%

## API

### TreeSelect

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|allowClear|允许清除值。|boolean |`-`|-|
|animation|是否为内部标签变化添加动画。|boolean |`true`|2.15.0|
|bordered|是否显示边框|boolean |`true`|-|
|disabled|是否为禁用状态。|boolean |`-`|-|
|dragToSort|是否可以通过拖拽为 Tag 排序|boolean |`-`|2.27.0|
|error|是否是错误状态。(废弃，下个大版本移除，使用 status='error' 替代)|boolean |`-`|-|
|labelInValue|设置 value 格式。默认是 `string`，设置为 `true` 时候，value 格式为： `{ label: string, value: string }`|boolean |`-`|-|
|loading|是否为加载状态。|boolean |`-`|-|
|multiple|是否多选|boolean |`-`|-|
|popupVisible|控制下拉框的展开收起|boolean |`-`|-|
|treeCheckable|是否展示复选框|boolean |`-`|-|
|treeCheckStrictly|父子节点是否关联|boolean |`-`|-|
|unmountOnExit|是否在隐藏之后销毁 DOM 结构|boolean |`-`|-|
|inputValue|输入框搜索文本的受控值|string |`-`|2.39.0|
|placeholder|选择框默认文字。|string |`-`|-|
|autoWidth|设置宽度自适应。minWidth 默认为 0，maxWidth 默认为 100%|\| boolean\| { minWidth?: CSSProperties['minWidth']; maxWidth?: CSSProperties['maxWidth'] } |`-`|2.54.0|
|fieldNames|指定 key，title，isLeaf，disabled，children 对应的字段|[TreeProps](tree#tree)['fieldNames'] |`DefaultFieldNames`|2.11.0|
|size|分别不同尺寸的选择器。对应 `24px`, `28px`, `32px`, `36px`|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|status|状态|'error' \| 'warning' |`-`|2.45.0|
|treeCheckedStrategy|定制回显方式|[TreeProps](tree#tree)['checkedStrategy'] |`all`|-|
|addBefore|选择框前添加元素|ReactNode |`-`|2.41.0|
|clearIcon|`allowClear` 时配置清除按钮的图标。|ReactNode |`-`|2.26.0|
|notFoundContent|没有数据时显示的内容|ReactNode |`-`|-|
|prefix|前缀。|ReactNode |`-`|2.11.0|
|suffixIcon|自定义选择框后缀图标。|ReactNode |`-`|-|
|arrowIcon|自定义箭头图标，设置为 `null` 不显示箭头图标。|ReactNode \| null |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|defaultValue|选择框的默认值|\| string\| string[]\| { label: ReactNode; value: string; disabled?: boolean }\| { label: ReactNode; value: string; disabled?: boolean }[] |`-`|-|
|dropdownMenuStyle|设置下拉框样式|CSSProperties |`-`|2.3.0|
|removeIcon|多选时配置选中项的删除图标。当传入`null`，不显示删除图标。|ReactNode \| null |`-`|-|
|showSearch|使单选模式可搜索，传入 `{ retainInputValue: true }` 在搜索框聚焦时保留现有内容传入 `{ retainInputValueWhileSelect: true }` 在多选选择时保留输入框内容。|boolean \| { retainInputValue?: boolean; retainInputValueWhileSelect?: boolean } |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|treeData|数据|[TreeSelectDataType](#treeselectdatatype)[] |`-`|-|
|treeProps|可以接受所有 [Tree](/react/components/tree) 组件的参数|Partial&lt;[TreeProps](tree#tree)&gt; |`-`|-|
|triggerProps|可以接受所有 Trigger 组件的参数|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|value|选中值|\| string\| string[]\| { label: ReactNode; value: string; disabled?: boolean }\| { label: ReactNode; value: string; disabled?: boolean }[] |`-`|-|
|dropdownRender|自定义下拉框展示|(dom: ReactNode) => ReactNode |`-`|2.3.0|
|filterTreeNode|根据输入的值筛选数据。接收 `inputText` 和 `treeNode` 两个参数，当 `option` 符合筛选条件时，返回 `true`，反之返回 `false`。treeNode 是树节点。|(inputText, treeNode: any) => boolean \| void |`-`|-|
|getPopupContainer|弹出框挂载的父节点|(node: HTMLElement) => Element |`-`|-|
|loadMore|动态加载数据|(treeNode: [NodeProps](tree#treenode), dataRef) => void |`-`|-|
|maxTagCount|最多显示多少个 `tag`，仅在多选或标签模式有效。|\| number\| {count: number;render?: (invisibleTagCount: number) => ReactNode;} |`-`|Object type in 2.37.0|
|onChange|选中值改变的回调|(value: any,extra: {trigger?: [NodeProps](tree#treenode);checked?: boolean;selected?: boolean;}) => void |`-`|`extra` in `2.29.0`|
|onClear|点击清除时触发，参数是当前下拉框的展开状态。|(visible: boolean) => void |`-`|-|
|onClick|鼠标点击下拉框时的回调|(e) => void |`-`|-|
|onInputValueChange|输入框搜索文本改变的回调。|(value: string, reason: [InputValueChangeReason](#inputvaluechangereason)) => void |`-`|2.39.0|
|onKeyDown|键盘输入时的回调|(e) => void |`-`|2.40.0|
|onSearch|自定义搜索方法。未定义的时候将会在已经在数据中进行搜索|(inputValue: string) => void |`-`|-|
|onVisibleChange|下拉框收起展开时触发|(visible: boolean) => void |`-`|-|
|renderFormat|定制回显内容。返回值将会显示在下拉框内。若 `value` 对应的 `Option` 不存在，则第一个参数是 null|(option: [NodeProps](tree#treenode) \| null, value: string \| [LabelValue](#labelvalue)) => ReactNode |`-`|2.46.0|
|renderTag|自定义标签渲染，`props` 为当前标签属性，`index` 为当前标签的顺序，`values` 为所有标签的值.|(props: {value: any;label: ReactNode;closable: boolean;onClose: (event) => void;},index: number,values: [ObjectValueType](#objectvaluetype)[]) => ReactNode |`-`|index、values added in 2.15.0|
|triggerElement|自定义上方显示元素|ReactNode \| ((params: { value: any }) => ReactNode) |`-`|`() => ReactNode` in 2.31.0|

### LabelValue

```js
export type LabelValue = {
  label: ReactNode;
  value: string;
  disabled?: boolean;
};
```

### FieldNamesType

```js
export type FieldNamesType = {
  key?: string;
  title?: string;
  disabled?: string;
  children?: string;
  isLeaf?: string;
  disableCheckbox?: string;
  checkable?: string;
};
```

### TreeSelectDataType

```js
export type TreeSelectDataType = TreeDataType & {
  value?: string;
};
```

### TreeDataType

```js
export type TreeDataType = NodeProps & {
  key?: string;
  _index?: number;
  children?: TreeDataType[];
  [key: string]: any;
};
```

### InputValueChangeReason

```js
// 造成输入框值改变的原因：用户输入、选中选项、选项下拉框收起
export type InputValueChangeReason =
  | "manual"
  | "optionChecked"
  | "optionListHide";
```

### ObjectValueType

```js
export type ObjectValueType = {
  value?: any;
  label?: ReactNode;
  closable?: boolean;
};
```
