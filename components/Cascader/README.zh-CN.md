`````
组件 / 数据输入

# 级联选择 Cascader

指在选择器选项数量较多时，采用多级分类的方式将选项进行分隔。
`````

%%Content%%

## API

### Cascader

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|allowClear|允许清除值。|boolean |`-`|-|
|animation|是否为内部标签变化添加动画。|boolean |`true`|2.15.0|
|bordered|是否需要边框|boolean |`true`|-|
|changeOnSelect|每当选择的时候，值都会发生改变。多选时如果设置为`true`，会取消父子关系的关联。(默认只有在选择完成的时候，值才会更新)|boolean |`-`|-|
|defaultActiveFirstOption|是否默认高亮搜索结果第一个选项。|boolean |`true`|2.37.0|
|defaultPopupVisible|默认下拉框的展开收起状态|boolean |`-`|-|
|disabled|是否为禁用状态。|boolean |`-`|-|
|dragToSort|是否可以通过拖拽为 Tag 排序|boolean |`-`|2.27.0|
|error|是否是错误状态。(废弃，下个大版本移除，使用 status='error' 替代)|boolean |`-`|-|
|loading|是否为加载状态。|boolean |`-`|-|
|popupVisible|控制下拉框的展开收起|boolean |`-`|-|
|showEmptyChildren|是否在非动态加载时，选中项children为[]的时候渲染下一级节点。|boolean |`-`|-|
|unmountOnExit|是否在隐藏之后销毁DOM结构，默认为 `true`。如果是动态加载时，默认为`false`。|boolean |`-`|-|
|inputValue|输入框的值|string |`-`|2.34.0|
|placeholder|选择框默认文字。|string |`-`|-|
|autoWidth|设置宽度自适应。minWidth 默认为 0，maxWidth 默认为 100%|\| boolean\| { minWidth?: CSSProperties['minWidth']; maxWidth?: CSSProperties['maxWidth'] } |`-`|2.54.0|
|checkedStrategy|定制回填方式 <br/> parent: 子节点都被选中时候返回父节点 <br/> child: 返回子节点|'parent' \| 'child' |`child`|2.31.0|
|expandTrigger|展开下一级方式|'click' \| 'hover' |`click`|-|
|mode|是否开启多选|'multiple' |`-`|-|
|showSearch|使单选模式可搜索，传入 `{ retainInputValue: true }` 在搜索框聚焦时保留现有内容传入 `{ retainInputValueWhileSelect: true }` 在多选选择时保留输入框内容。传入 `{ panelMode: 'select' }` 以搜索面板形式展示可选项 (`2.39.0`)`renderOption` 自定义渲染搜索项 (`2.39.0`)|\| boolean\| {panelMode?: 'cascader' \| 'select';renderOption?: (inputValue: string,option: NodeProps&lt;T&gt;,options: [extraOptions](#extraoptions)) =&gt; ReactNode;retainInputValue?: boolean;retainInputValueWhileSelect?: boolean;} |`-`|-|
|size|分别不同尺寸的选择器。对应 `24px`, `28px`, `32px`, `36px`|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|status|状态|'error' \| 'warning' |`-`|2.45.0|
|virtualListProps|传递虚拟滚动属性。开启虚拟滚动后，每列级联菜单的会存在默认宽度，可通过 `dropdownMenuColumnStyle` 进行样式调整|Pick&lt;VirtualListProps&lt;any&gt;, 'threshold' \| 'isStaticItemHeight'&gt; |`-`|2.35.0|
|addBefore|选择框前添加元素|ReactNode |`-`|2.41.0|
|clearIcon|`allowClear` 时配置清除按钮的图标。|ReactNode |`-`|2.26.0|
|notFoundContent|没有数据时显示的内容|ReactNode |`-`|-|
|prefix|前缀。|ReactNode |`-`|2.11.0|
|suffixIcon|自定义选择框后缀图标。|ReactNode |`-`|-|
|arrowIcon|自定义箭头图标，设置为 `null` 不显示箭头图标。|ReactNode \| null |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|defaultValue|选择框的默认值|(string \| string[])[] |`-`|-|
|dropdownMenuClassName|自定义下拉列表类名|string \| string[] |`-`|2.35.0|
|dropdownMenuColumnStyle|菜单列样式|CSSProperties |`-`|2.35.0|
|fieldNames|指定label，value，isLeaf，disabled，children 对应的字段|[FieldNamesType](#fieldnamestype) |`DefaultFieldNames`|-|
|filterOption|默认搜索从 `label` 属性中进行关键字搜索。通过该方法可以自定义搜索逻辑|(inputValue: string, option: NodeProps&lt;T&gt;) =&gt; boolean |`-`|-|
|icons|图标配置。|{loading?: ReactNode;checked?: ReactNode;next?: ReactNode;} |`-`|2.50.0|
|loadMore|动态加载数据。pathValue: 当前选中项的路径 value； level: 选中项层级。|(pathValue: string[], level: number) =&gt; Promise&lt;T[]&gt; |`-`|-|
|options|级联数据|T[] |`[]`|-|
|removeIcon|多选时配置选中项的删除图标。当传入`null`，不显示删除图标。|ReactNode \| null |`-`|-|
|renderFooter|定义每一层级的 `footer`。参数：level: 当前层级, activeOption: 当前点击的节点。返回 `null` 不展示|(level: number, activeOption: NodeProps&lt;T&gt; \| null) =&gt; ReactNode |`-`|-|
|renderOption|自定义展示 `option`|(option: NodeProps&lt;T&gt;, level: number) =&gt; ReactNode |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|triggerProps|可以接受所有 Trigger 组件的 Props|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|value|选中值|(string \| string[])[] |`-`|-|
|dropdownColumnRender|自定义下拉菜单每一列的展示。|(menu: ReactNode, level: number) => ReactNode |`-`|2.15.0, `level` in 2.17.0|
|dropdownRender|自定义下拉菜单的展示。|(menu: ReactNode) => ReactNode |`-`|2.15.0|
|getPopupContainer|弹出框挂在的父节点|(node: HTMLElement) => Element |`-`|-|
|maxTagCount|最多显示多少个 `tag`，仅在多选或标签模式有效。|\| number\| {count: number;render?: (invisibleTagCount: number) => ReactNode;} |`-`|Object type in 2.37.0|
|onChange|点击选择框的回调。|(value: (string \| string[])[],selectedOptions,extra: { dropdownVisible?: boolean }) => void |`-`|-|
|onClear|点击清除时触发，参数是当前下拉框的展开状态。|(visible: boolean) => void |`-`|-|
|onClick|鼠标点击下拉框时的回调|(e) => void |`-`|-|
|onInputValueChange|inputValue改变时的回调|(inputValue: string, reason: [InputValueChangeReason](#inputvaluechangereason)) => void |`-`|2.34.0|
|onKeyDown|键盘输入时的回调|(e) => void |`-`|2.40.0|
|onSearch|搜索时的回调。(reason in `2.34.0`)|(inputValue: string, reason: [InputValueChangeReason](#inputvaluechangereason)) => void |`-`|2.20.0|
|onVisibleChange|下拉框收起展开时触发。|(visible: boolean) => void |`-`|-|
|renderFormat|格式化显示内容。|(valueShow: any[]) => ReactNode |`-`|-|
|renderTag|自定义标签渲染，`props` 为当前标签属性，`index` 为当前标签的顺序，`values` 为所有标签的值.|(props: {value: any;label: ReactNode;closable: boolean;onClose: (event) => void;},index: number,values: [ObjectValueType](#objectvaluetype)[]) => ReactNode |`-`|index、values added in 2.15.0|

### extraOptions

```js
export interface extraOptions {
  checked: boolean;
}
```

### FieldNamesType

```js
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
```

### InputValueChangeReason

```js
// 造成输入框值改变的原因：用户输入、选项下拉框收起、其他
export type InputValueChangeReason =
  | "manual"
  | "optionListHide"
  | "optionChecked";
```

### ObjectValueType

```js
export type ObjectValueType = {
  value?: any;
  label?: ReactNode;
  closable?: boolean;
};
```


## 方法

| 参数名 |     描述     |    类型    | 默认值 |
| ------ | :----------: | :--------: | -----: |
| focus  |   焦点事件。   | `Function` |    `-` |
| blur   | 失去焦点事件。 | `Function` |    `-` |

**示例**

```js
<Cascader ref={(ref) => (this.select = ref)} />;

this.select.focus();
this.select.blur();
```
