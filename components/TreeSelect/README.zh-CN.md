`````
组件 / 数据输入

# 树选择 TreeSelect

可以对树形结构数据进行选择。目前仅支持单选
`````

%%Content%%

## API

### TreeSelect

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|multiple|是否多选|`boolean`|`-`|-|
|defaultValue|选择框的默认值|`\| string\| string[]\| { label: ReactNode; value: string; disabled?: boolean }\| { label: ReactNode; value: string; disabled?: boolean }[]`|`-`|-|
|value|选中值|`\| string\| string[]\| { label: ReactNode; value: string; disabled?: boolean }\| { label: ReactNode; value: string; disabled?: boolean }[]`|`-`|-|
|fieldNames|指定 key，title，isLeaf，disabled，children 对应的字段|`TreeProps['fieldNames']`|`DefaultFieldNames`|2.11.0|
|treeData|数据|`TreeSelectDataType[]`|`-`|-|
|labelInValue|设置 value 格式。默认是 `string`，设置为 `true` 时候，value 格式为： `{ label: string, value: string }`|`boolean`|`-`|-|
|unmountOnExit|是否在隐藏之后销毁 DOM 结构|`boolean`|`-`|-|
|treeCheckable|是否展示复选框|`boolean`|`-`|-|
|treeCheckStrictly|父子节点是否关联|`boolean`|`-`|-|
|treeCheckedStrategy|定制回显方式|`TreeProps['checkedStrategy']`|`all`|-|
|treeProps|可以接受所有 [Tree](/react/components/tree) 组件的参数|`Partial<TreeProps>`|`-`|-|
|triggerProps|可以接受所有 Trigger 组件的参数|`Partial<TriggerProps>`|`-`|-|
|triggerElement|自定义上方显示元素|`ReactNode`|`-`|-|
|bordered|是否显示边框|`boolean`|`true`|-|
|notFoundContent|没有数据时显示的内容|`ReactNode`|`-`|-|
|popupVisible|控制下拉框的展开收起|`boolean`|`-`|-|
|dropdownMenuStyle|设置下拉框样式|`CSSProperties`|`-`|2.3.0|
|dropdownRender|自定义下拉框展示|`(dom: ReactNode) => ReactNode`|`-`|2.3.0|
|onChange|选中值改变的回调|`(value: any,extra: {trigger?: NodeProps;checked?: boolean;selected?: boolean;}) => void`|`-`|`extra` in `2.29.0`|
|getPopupContainer|弹出框挂载的父节点|`(node: HTMLElement) => Element`|`-`|-|
|onVisibleChange|下拉框收起展开时触发|`(visible: boolean) => void`|`-`|-|
|filterTreeNode|根据输入的值筛选数据。接收 `inputText` 和 `treeNode` 两个参数，当 `option` 符合筛选条件时，返回 `true`，反之返回 `false`。treeNode 是树节点。|`(inputText, treeNode: any) => boolean \| void`|`-`|-|
|loadMore|动态加载数据|`(treeNode: NodeProps, dataRef) => void`|`-`|-|
|onSearch|自定义搜索方法。未定义的时候将会在已经在数据中进行搜索|`(inputValue: string) => void`|`-`|-|
|onClear|点击清除时触发，参数是当前下拉框的展开状态。|`(visible: boolean) => void`|`-`|-|
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|placeholder|选择框默认文字。|`string`|`-`|-|
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
|dragToSort|是否可以通过拖拽为 Tag 排序|`boolean`|`-`|2.27.0|
