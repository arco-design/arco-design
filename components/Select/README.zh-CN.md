`````
组件 / 数据输入

# 选择器 Select

当用户需要从一组同类数据中选择一个或多个时，可以使用下拉选择器，点击后选择对应项。
`````

%%Content%%

## API

### Select

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|allowClear|允许清除值。|boolean |`-`|-|
|animation|是否为内部标签变化添加动画。|boolean |`true`|2.15.0|
|bordered|是否需要边框|boolean |`true`|-|
|defaultActiveFirstOption|是否默认高亮第一个选项|boolean |`true`|-|
|defaultPopupVisible|下拉框是否默认打开。|boolean |`-`|2.14.0|
|disabled|是否为禁用状态。|boolean |`-`|-|
|dragToSort|是否可以通过拖拽为 Tag 排序|boolean |`-`|2.27.0|
|error|是否是错误状态。(废弃，下个大版本移除，使用 status='error' 替代)|boolean |`-`|-|
|labelInValue|设置 `onChange` 回调中 `value` 的格式。默认是string，设置为true时候，value格式为： { label: string, value: string }|boolean |`-`|-|
|loading|是否为加载状态。|boolean |`-`|-|
|popupVisible|控制下拉框是否打开。|boolean |`-`|2.6.0|
|unmountOnExit|是否在隐藏的时候销毁 DOM 结构|boolean |`true`|-|
|inputValue|输入框的值（受控模式）|string |`-`|-|
|placeholder|选择框默认文字。|string |`-`|-|
|allowCreate|是否允许通过输入创建新的选项。|\| boolean\| {formatter: (inputValue: string, creating: boolean) => [SelectProps](select#select)['options'][number];} |`-`|2.13.0, `{ formatter }` in 2.54.0|
|autoWidth|设置宽度自适应。minWidth 默认为 0，maxWidth 默认为 100%|\| boolean\| { minWidth?: CSSProperties['minWidth']; maxWidth?: CSSProperties['maxWidth'] } |`-`|2.54.0|
|mode|是否开启多选模式或标签模式 (**`tags` 推荐使用 `mode: multiple; allowCreate: true` 替代，下一大版本将移除此模式**)|'multiple' \| 'tags' |`-`|-|
|size|分别不同尺寸的选择器。对应 `24px`, `28px`, `32px`, `36px`|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|status|状态|'error' \| 'warning' |`-`|2.45.0|
|trigger|触发方式。|[TriggerProps](trigger#trigger)['trigger'] |`click`|-|
|addBefore|选择框前添加元素|ReactNode |`-`|2.41.0|
|clearIcon|`allowClear` 时配置清除按钮的图标。|ReactNode |`-`|2.26.0|
|notFoundContent|没有数据时显示的内容|ReactNode |`-`|-|
|prefix|前缀。|ReactNode |`-`|2.11.0|
|suffixIcon|自定义选择框后缀图标。|ReactNode |`-`|-|
|arrowIcon|自定义箭头图标，设置为 `null` 不显示箭头图标。|ReactNode \| null |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|defaultValue|选择框的默认值|string \| string[] \| number \| number[] \| [LabeledValue](#labeledvalue) \| [LabeledValue](#labeledvalue)[] |`-`|-|
|dropdownMenuClassName|下拉列表的类。|string \| string[] |`-`|-|
|dropdownMenuStyle|下拉列表的样式。|CSSProperties |`-`|-|
|options|指定可选项|(\| string\| number\| { label: ReactNode \| string; value: string \| number; disabled?: boolean; extra?: any })[] |`-`|`extra` in 2.2.0|
|removeIcon|多选时配置选中项的删除图标。当传入`null`，不显示删除图标。|ReactNode \| null |`-`|-|
|showSearch|使单选模式可搜索，传入 `{ retainInputValue: true }` 在搜索框聚焦时保留现有内容传入 `{ retainInputValueWhileSelect: true }` 在多选选择时保留输入框内容。|boolean \| { retainInputValue?: boolean; retainInputValueWhileSelect?: boolean } |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|tokenSeparators|在多选模式下自动分词的分隔符。|string[] |`-`|-|
|triggerProps|可以接受所有 `Trigger` 的 `Props`|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|value|选择器的值（受控模式）|string \| string[] \| number \| number[] \| [LabeledValue](#labeledvalue) \| [LabeledValue](#labeledvalue)[] |`-`|-|
|virtualListProps|传递虚拟滚动属性。|[AvailableVirtualListProps](#availablevirtuallistprops) |`-`|2.1.0|
|dropdownRender|自定义弹出内容。|(menu: ReactNode) => ReactNode |`-`|-|
|filterOption|是否根据输入的值筛选数据。如果传入函数的话，接收 `inputValue` 和 `option` 两个参数，当option符合筛选条件时，返回 `true`，反之返回 `false`。|boolean \| ((inputValue: string, option: ReactElement) => boolean) |`true`|-|
|getPopupContainer|弹出框挂载的父节点。|(node: HTMLElement) => Element |`-`|-|
|maxTagCount|最多显示多少个 `tag`，仅在多选或标签模式有效。|\| number\| {count: number;render?: (invisibleTagCount: number) => ReactNode;} |`-`|Object type in 2.37.0|
|onBlur|失去焦点时的回调|(e) => void |`-`|-|
|onChange|点击选择框的回调|(value, option: [OptionInfo](#optioninfo) \| [OptionInfo](#optioninfo)[]) => void |`-`|-|
|onClear|点击清除时触发，参数是当前下拉框的展开状态。|(visible: boolean) => void |`-`|-|
|onClick|鼠标点击下拉框时的回调|(e) => void |`-`|-|
|onDeselect|取消选中的时候触发的回调，(只在 `multiple` 模式下触发)。|(value: string \| number \| [LabeledValue](#labeledvalue), option: [OptionInfo](#optioninfo)) => void |`-`|-|
|onFocus|获得焦点时的回调|(e) => void |`-`|-|
|onInputValueChange|输入框文本改变的回调。|(value: string, reason: [InputValueChangeReason](#inputvaluechangereason)) => void |`-`|2.3.0|
|onKeyDown|键盘输入时的回调|(e) => void |`-`|2.40.0|
|onPaste|输入框文本粘贴的回调。|(e) => void |`-`|2.9.0|
|onPopupScroll|下拉框的滚动监听函数，参数为滚动元素。|(elem) => void |`-`|-|
|onSearch|搜索时的回调|(value: string, reason: [InputValueChangeReason](#inputvaluechangereason)) => void |`-`|-|
|onSelect|选中选项时触发的回调，(只在 `multiple` 模式下触发)。|(value: string \| number \| [LabeledValue](#labeledvalue), option: [OptionInfo](#optioninfo)) => void |`-`|2.52.0|
|onVisibleChange|下拉框收起展开时触发|(visible: boolean) => void |`-`|-|
|renderFormat|定制回显内容。返回值将会显示在下拉框内。若 `value` 对应的 `Option` 不存在，则第一个参数是 null|(option: [OptionInfo](#optioninfo) \| null, value: string \| number \| [LabeledValue](#labeledvalue)) => ReactNode |`-`|-|
|renderTag|自定义标签渲染，`props` 为当前标签属性，`index` 为当前标签的顺序，`values` 为所有标签的值.|(props: {value: any;label: ReactNode;closable: boolean;onClose: (event) => void;},index: number,values: [ObjectValueType](#objectvaluetype)[]) => ReactNode |`-`|index、values added in 2.15.0|
|triggerElement|自定义触发元素。|\| ReactNode\| ((params: { value: any; option: [OptionInfo](#optioninfo) \| [OptionInfo](#optioninfo)[] }) => ReactNode) |`-`|`() => ReactNode` in 2.31.0|

### Select.Option

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|disabled|是否禁用|boolean |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|extra|携带任意自定义数据。|any |`-`|2.2.0|
|style|节点样式|CSSProperties |`-`|-|
|value|默认根据此属性值进行筛选|string \| number  **(必填)**|`-`|-|

### Select.OptGroup

|参数名|描述|类型|默认值|
|---|---|---|---|
|label|组名|ReactNode |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|

### Select Reference Type

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|activeOptionValue|处于悬浮态的选项的值|[OptionProps](select#selectoption)['value']  **(必填)**|`-`|-|
|getOptionInfoByValue|根据选项值获得对应的选项信息|(value: [OptionProps](select#selectoption)['value']) => [OptionInfo](#optioninfo)  **(必填)**|`-`|-|
|scrollIntoView|将下拉列表滚动至指定选项|(value: [OptionProps](select#selectoption)['value'], options?: ScrollIntoViewOptions) => void  **(必填)**|`-`|2.46.0|
|dom|DOM 节点|HTMLDivElement  **(必填)**|`-`|-|
|blur|使选择框失焦|() => void  **(必填)**|`-`|-|
|focus|使选择框聚焦|() => void  **(必填)**|`-`|-|
|getOptionInfoList|获得选项信息的列表|() => [OptionInfo](#optioninfo)[]  **(必填)**|`-`|-|
|hotkeyHandler|鼠标快捷操作的处理函数|(event: KeyboardEvent) => void  **(必填)**|`-`|-|

### LabeledValue

```js
export type LabeledValue = {
  value: string | number;
  label: ReactNode;
};
```

### OptionInfo

```js
export interface OptionInfo extends PropsWithChildren<OptionProps> {
  child?: ReactElement;
  _valid: boolean;
  _index: number;
  _origin: "children" | "options" | "userCreatedOptions" | "userCreatingOption";
}
```

### AvailableVirtualListProps

```js
export type AvailableVirtualListProps = Pick<
  VirtualListProps<any>,
  "height" | "itemHeight" | "threshold" | "isStaticItemHeight" | "scrollOptions"
>;
```

### InputValueChangeReason

```js
// 造成输入框值改变的原因：用户输入、选中选项、选项下拉框收起、触发自动分词
export type InputValueChangeReason =
  | "manual"
  | "optionChecked"
  | "optionListHide"
  | "tokenSeparator";
```

### ObjectValueType

```js
export type ObjectValueType = {
  value?: any;
  label?: ReactNode;
  closable?: boolean;
};
```

### VirtualListProps

|参数名|描述|类型|默认值|
|------|:----------:|:--------:|-----:|
|height|可视区高度 (`2.11.0` 开始支持如 `80%` 的 `string` 类型)|`number`|200|
|threshold|自动开启虚拟滚动的元素数量阈值，传入`null`以禁用虚拟滚动。|`number`\|`null`|100|
|isStaticItemHeight|是否为相同高度的静态元素|`boolean`|true|
