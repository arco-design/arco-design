`````
Component / Data Entry

# TreeSelect

Can choose tree structure data.Only Single choice is supports.
`````

%%Content%%

## API

### TreeSelect

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|allowClear|Whether allow to clear selected options|boolean |`-`|-|
|animation|Whether to add animation for internal label changes|boolean |`true`|2.15.0|
|bordered|Whether show border|boolean |`true`|-|
|disabled|Whether is disabled|boolean |`-`|-|
|dragToSort|Weather it is possible to sort tags by drag|boolean |`-`|2.27.0|
|error|Whether the textarea is error.(Deprecated, removed in the next major version, use status='error' instead)|boolean |`-`|-|
|labelInValue|Setting value format.The default is `string`, when set to `true`, the value format will turn to: `{ label: string, value: string }`|boolean |`-`|-|
|loading|Whether is in loading|boolean |`-`|-|
|multiple|Whether to select multiple|boolean |`-`|-|
|popupVisible|Whether the popup is visible or not|boolean |`-`|-|
|treeCheckable|Whether to show checkbox|boolean |`-`|-|
|treeCheckStrictly|Whether the parent and child nodes are related|boolean |`-`|-|
|unmountOnExit|Whether to destroy the DOM after hiding|boolean |`-`|-|
|inputValue|To set input search value|string |`-`|2.39.0|
|placeholder|Placeholder of element|string |`-`|-|
|autoWidth|auto width. minWidth defaults to 0, maxWidth defaults to 100%|\| boolean\| { minWidth?: CSSProperties['minWidth']; maxWidth?: CSSProperties['maxWidth'] } |`-`|2.54.0|
|fieldNames|Custom field name for key, title, isLeaf, disabled and children|[TreeProps](tree#tree)['fieldNames'] |`DefaultFieldNames`|2.11.0|
|size|Height of element, `24px` `28px` `32px` `36px`|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|status|Status|'error' \| 'warning' |`-`|2.45.0|
|treeCheckedStrategy|Customize the return value|[TreeProps](tree#tree)['checkedStrategy'] |`all`|-|
|addBefore|The label text displayed before (on the left side of) the select field|ReactNode |`-`|2.41.0|
|clearIcon|Configure the icon of the clear button when `allowClear`.|ReactNode |`-`|2.26.0|
|notFoundContent|The content display when no data|ReactNode |`-`|-|
|prefix|Customize select suffix|ReactNode |`-`|2.11.0|
|suffixIcon|Customize select suffix icon|ReactNode |`-`|-|
|arrowIcon|Customize select arrow icon.|ReactNode \| null |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|defaultValue|The key of node selected by default|\| string\| string[]\| { label: ReactNode; value: string; disabled?: boolean }\| { label: ReactNode; value: string; disabled?: boolean }[] |`-`|-|
|dropdownMenuStyle|The additional css style for dropdown menu|CSSProperties |`-`|2.3.0|
|removeIcon|Customize the delete icon of tags selected in `multiple` and `label` mode.|ReactNode \| null |`-`|-|
|showSearch|Whether single mode Select is searchable. `{ retainInputValue: true }` to retain the existing content when the search box is focused,`{ retainInputValueWhileSelect: true }` to retain the existing content when multiple selection is selected.|boolean \| { retainInputValue?: boolean; retainInputValueWhileSelect?: boolean } |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|treeData|The data of tree|[TreeSelectDataType](#treeselectdatatype)[] |`-`|-|
|treeProps|The props of the [Tree](/react/components/tree) component|Partial&lt;[TreeProps](tree#tree)&gt; |`-`|-|
|triggerProps|The props of the `Trigger` component|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|value|The key of the selected node|\| string\| string[]\| { label: ReactNode; value: string; disabled?: boolean }\| { label: ReactNode; value: string; disabled?: boolean }[] |`-`|-|
|dropdownRender|Customize dropdown rendering|(dom: ReactNode) => ReactNode |`-`|2.3.0|
|filterTreeNode|Filter data based on entered value. Accepted two parameters, inputText and treeNode.When the option matches the filter conditions, it returns true, otherwise it returns false. treeNode is the tree node.|(inputText, treeNode: any) => boolean \| void |`-`|-|
|getPopupContainer|The parent node of the popup|(node: HTMLElement) => Element |`-`|-|
|loadMore|Callback when loaded data asynchronously|(treeNode: [NodeProps](tree#treenode), dataRef) => void |`-`|-|
|maxTagCount|The maximum number of `tags` is displayed, only valid in `multiple` and `label` mode.|\| number\| {count: number;render?: (invisibleTagCount: number) => ReactNode;} |`-`|Object type in 2.37.0|
|onChange|Callback when the selection changed|(value: any,extra: {trigger?: [NodeProps](tree#treenode);checked?: boolean;selected?: boolean;}) => void |`-`|`extra` in `2.29.0`|
|onClear|Callback when clicked clear, the parameter is the visible state of current dropdown|(visible: boolean) => void |`-`|-|
|onClick|Callback when the mouse clicks on the drop-down box|(e) => void |`-`|-|
|onInputValueChange|Callback when the search value of input is changed.|(value: string, reason: [InputValueChangeReason](#inputvaluechangereason)) => void |`-`|2.39.0|
|onKeyDown|Callback when keyboard pressed|(e) => void |`-`|2.40.0|
|onSearch|Callback when searching data. When undefined, it will search in the data already|(inputValue: string) => void |`-`|-|
|onVisibleChange|Callback when the visibility of the popup is changed|(visible: boolean) => void |`-`|-|
|renderFormat|Customize the content that will be displayed in the Select.If the `Option` corresponding to `value` does not exist, the first parameter will be `null`|(option: [NodeProps](tree#treenode) \| null, value: string \| [LabelValue](#labelvalue)) => ReactNode |`-`|2.46.0|
|renderTag|Custom tag rendering, `props` is the current tag attribute, `index` is the order of the current tag, `values` is the value of all tags|(props: {value: any;label: ReactNode;closable: boolean;onClose: (event) => void;},index: number,values: [ObjectValueType](#objectvaluetype)[]) => ReactNode |`-`|index、values added in 2.15.0|
|triggerElement|Customize the trigger element|ReactNode \| ((params: { value: any }) => ReactNode) |`-`|`() => ReactNode` in 2.31.0|

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
