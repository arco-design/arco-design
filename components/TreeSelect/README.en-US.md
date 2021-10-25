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
|multiple|Whether to select multiple|`boolean`|`-`|-|
|defaultValue|The key of node selected by default|`\| string\| string[]\| { label: ReactNode; value: string; disabled?: boolean }\| { label: ReactNode; value: string; disabled?: boolean }[]`|`-`|-|
|value|The key of the selected node|`\| string\| string[]\| { label: ReactNode; value: string; disabled?: boolean }\| { label: ReactNode; value: string; disabled?: boolean }[]`|`-`|-|
|fieldNames|Custom field name for key, title, isLeaf, disabled and children|`TreeProps['fieldNames']`|`DefaultFieldNames`|2.11.0|
|treeData|The data of tree|`TreeSelectDataType[]`|`-`|-|
|labelInValue|Setting value format.The default is `string`, when set to `true`, the value format will turn to: `{ label: string, value: string }`|`boolean`|`-`|-|
|unmountOnExit|Whether to destroy the DOM after hiding|`boolean`|`-`|-|
|treeCheckable|Whether to show checkbox|`boolean`|`-`|-|
|treeCheckStrictly|Whether the parent and child nodes are related|`boolean`|`-`|-|
|treeCheckedStrategy|Customize the return value|`TreeProps['checkedStrategy']`|`all`|-|
|treeProps|The props of the [Tree](/react/components/tree) component|`Partial<TreeProps>`|`-`|-|
|triggerProps|The props of the `Trigger` component|`Partial<TriggerProps>`|`-`|-|
|triggerElement|Customize the trigger element|`ReactNode`|`-`|-|
|bordered|Whether show border|`boolean`|`true`|-|
|notFoundContent|The content display when no data|`ReactNode`|`-`|-|
|popupVisible|Whether the popup is visible or not|`boolean`|`-`|-|
|dropdownMenuStyle|The additional css style for dropdown menu|`CSSProperties`|`-`|2.3.0|
|dropdownRender|Customize dropdown rendering|`(dom: ReactNode) => ReactNode`|`-`|2.3.0|
|onChange|Callback when the selection changed|`(value: any) => void`|`-`|-|
|getPopupContainer|The parent node of the popup|`(node: HTMLElement) => Element`|`-`|-|
|onVisibleChange|Callback when the visibility of the popup is changed|`(visible: boolean) => void`|`-`|-|
|filterTreeNode|Filter data based on entered value. Accepted two parameters, inputText and treeNode.When the option matches the filter conditions, it returns true, otherwise it returns false. treeNode is the tree node.|`(inputText, treeNode: any) => boolean \| void`|`-`|-|
|loadMore|Callback when loaded data asynchronously|`(treeNode: NodeProps, dataRef) => void`|`-`|-|
|onSearch|Callback when searching data. When undefined, it will search in the data already|`(inputValue: string) => void`|`-`|-|
|onClear|Callback when clicked clear, the parameter is the visible state of current dropdown|`(visible: boolean) => void`|`-`|-|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|placeholder|Placeholder of element|`string`|`-`|-|
|showSearch|Whether single mode Select is searchable. `{ retainInputValue: true }` to retain the existing content when the search box is focused,`{ retainInputValueWhileSelect: true }` to retain the existing content when multiple selection is selected.|`boolean \| { retainInputValue?: boolean; retainInputValueWhileSelect?: boolean }`|`-`|-|
|size|Height of element, `24px` `28px` `32px` `36px`|`'mini' \| 'small' \| 'default' \| 'large'`|`-`|-|
|disabled|Whether is disabled|`boolean`|`-`|-|
|error|Error Style|`boolean`|`-`|-|
|loading|Whether is in loading|`boolean`|`-`|-|
|allowClear|Whether allow to clear selected options|`boolean`|`-`|-|
|allowCreate|Whether to allow new options to be created by input.|`boolean`|`-`|2.13.0|
|maxTagCount|The maximum number of `tags` is displayed, only valid in `multiple` and `label` mode.|`number`|`-`|-|
|prefix|Customize select suffix|`ReactNode`|`-`|2.11.0|
|suffixIcon|Customize select suffix icon|`ReactNode`|`-`|-|
|arrowIcon|Customize select arrow icon.|`ReactNode \| null`|`-`|-|
|removeIcon|Customize the delete icon of tags selected in `multiple` and `label` mode.|`ReactNode \| null`|`-`|-|
|onClick|Callback when the mouse clicks on the drop-down box|`(e) => void`|`-`|-|
|animation|Whether to add animation for internal label changes|`boolean`|`true`|2.15.0|
|renderTag|Custom tag rendering, `props` is the current tag attribute, `index` is the order of the current tag, `values` is the value of all tags|`(props: {value: any;label: ReactNode;closable: boolean;onClose: (event) => void;},index: number,values: ObjectValueType[]) => React.ReactNode`|`-`|index、values added in 2.15.0|
