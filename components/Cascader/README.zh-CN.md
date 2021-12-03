`````
组件 / 数据输入

# 级联选择 Cascader

指在选择器选项数量较多时，采用多级分类的方式将选项进行分隔。
`````

%%Content%%

## 属性/Props

### Cascader

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|defaultValue|选择框的默认值|`(string \| string[])[]`|`-`|-|
|value|选中值|`(string \| string[])[]`|`-`|-|
|options|级联数据|`T[]`|`[]`|-|
|expandTrigger|展开下一级方式|`'click' \| 'hover'`|`click`|-|
|changeOnSelect|每当选择的时候，值都会发生改变。多选时如果设置为`true`，会取消父子关系的关联。(默认只有在选择完成的时候，值才会更新)|`boolean`|`-`|-|
|showEmptyChildren|是否在非动态加载时，选中项children为[]的时候渲染下一级节点。|`boolean`|`-`|-|
|unmountOnExit|是否在隐藏之后销毁DOM结构，默认为 `true`。如果是动态加载时，默认为`false`。|`boolean`|`-`|-|
|mode|是否开启多选|`'multiple'`|`-`|-|
|notFoundContent|没有数据时显示的内容|`ReactNode`|`-`|-|
|fieldNames|指定label，value，isLeaf，disabled，children 对应的字段|`FieldNamesType`|`DefaultFieldNames`|-|
|popupVisible|控制下拉框的展开收起|`boolean`|`-`|-|
|defaultPopupVisible|默认下拉框的展开收起状态|`boolean`|`-`|-|
|dropdownRender|自定义下拉菜单的展示。|`(menu: ReactNode) => ReactNode`|`-`|2.15.0|
|dropdownColumnRender|自定义下拉菜单每一列的展示。|`(menu: ReactNode, level: number) => ReactNode`|`-`|2.15.0, `level` in 2.17.0|
|filterOption|默认搜索从 `label` 属性中进行关键字搜索。通过该方法可以自定义搜索逻辑|`(inputValue: string, option: NodeProps<T>) => boolean`|`-`|-|
|renderOption|自定义展示 `option`|`(option: NodeProps<T>, level: number) => ReactNode`|`-`|-|
|renderFooter|定义每一层级的 `footer`。参数：level: 当前层级, activeOption: 当前点击的节点。返回 `null` 不展示|`(level: number, activeOption: NodeProps<T> \| null) => ReactNode`|`-`|-|
|renderFormat|格式化显示内容。|`(valueShow: any[]) => ReactNode`|`-`|-|
|onSearch|搜索时的回调|`(inputValue: string) => void`|`-`|2.20.0|
|onChange|点击选择框的回调。|`(value: (string \| string[])[],selectedOptions,extra: { dropdownVisible?: boolean }) => void`|`-`|-|
|getPopupContainer|弹出框挂在的父节点|`(node: HTMLElement) => Element`|`-`|-|
|loadMore|动态加载数据。pathValue: 当前选中项的路径 value； level: 选中项层级。|`(pathValue: string[], level: number) => Promise<T[]>`|`-`|-|
|onVisibleChange|下拉框收起展开时触发。|`(visible: boolean) => void`|`-`|-|
|onClear|点击清除时触发，参数是当前下拉框的展开状态。|`(visible: boolean) => void`|`-`|-|
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|placeholder|选择框默认文字。|`string`|`-`|-|
|bordered|是否需要边框|`boolean`|`true`|-|
|showSearch|使单选模式可搜索，传入 `{ retainInputValue: true }` 在搜索框聚焦时保留现有内容传入 `{ retainInputValueWhileSelect: true }` 在多选选择时保留输入框内容。|`boolean \| { retainInputValue?: boolean; retainInputValueWhileSelect?: boolean }`|`-`|-|
|size|分别不同尺寸的选择器。对应 `24px`, `28px`, `32px`, `36px`|`'mini' \| 'small' \| 'default' \| 'large'`|`-`|-|
|disabled|是否为禁用状态。|`boolean`|`-`|-|
|error|是否为错误状态。|`boolean`|`-`|-|
|loading|是否为加载状态。|`boolean`|`-`|-|
|allowClear|允许清除值。|`boolean`|`-`|-|
|allowCreate|是否允许通过输入创建新的选项。|`boolean`|`-`|2.13.0|
|maxTagCount|最多显示多少个 `tag`，仅在多选或标签模式有效。|`number`|`-`|-|
|prefix|前缀。|`ReactNode`|`-`|2.11.0|
|suffixIcon|自定义选择框后缀图标。|`ReactNode`|`-`|-|
|arrowIcon|自定义箭头图标，设置为 `null` 不显示箭头图标。|`ReactNode \| null`|`-`|-|
|removeIcon|多选时配置选中项的删除图标。当传入`null`，不显示删除图标。|`ReactNode \| null`|`-`|-|
|clearIcon|`allowClear` 时配置清除按钮的图标。|`ReactNode`|`-`|2.26.0|
|onClick|鼠标点击下拉框时的回调|`(e) => void`|`-`|-|
|animation|是否为内部标签变化添加动画。|`boolean`|`true`|2.15.0|
|renderTag|自定义标签渲染，`props` 为当前标签属性，`index` 为当前标签的顺序，`values` 为所有标签的值.|`(props: {value: any;label: ReactNode;closable: boolean;onClose: (event) => void;},index: number,values: ObjectValueType[]) => React.ReactNode`|`-`|index、values added in 2.15.0|


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

### `OptionProps`

```
interface OptionProps {
  value?: string;
  label?: string;
  disabled?: boolean;
  children?: OptionProps[];
  isLeaf?: boolean;
}
```

### `FieldNamesType`

```
type FieldNamesType = {
  /** 指定 label 在选项中对应的字段  */
  label?: string;
  /** 指定 value 在选项中对应的字段  */
  value?: string;
  /** 指定 children 在选项中对应的字段  */
  children?: string;
  /** 指定 disabled 在选项中对应的字段  */
  disabled?: string;
  /** 指定 isLeaf 在选项中对应的字段  */
  isLeaf?: string;
}
```
