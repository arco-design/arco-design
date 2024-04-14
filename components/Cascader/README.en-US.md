`````
Component / Data Entry

# Cascader

Display options in a multi-level cascading dropdown component.
`````

%%Content%%

## API

### Cascader

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|allowClear|Whether allow to clear selected options|boolean |`-`|-|
|animation|Whether to add animation for internal label changes|boolean |`true`|2.15.0|
|bordered|Whether to render border|boolean |`true`|-|
|changeOnSelect|Each selection will change valueif set to true.when `mode=multiple`, child node and parent node will not affect each other.|boolean |`-`|-|
|defaultActiveFirstOption|Whether to highlight the first option of search results by default|boolean |`true`|2.37.0|
|defaultPopupVisible|Whether the popup is visible by default|boolean |`-`|-|
|disabled|Whether is disabled|boolean |`-`|-|
|dragToSort|Weather it is possible to sort tags by drag|boolean |`-`|2.27.0|
|error|Whether the textarea is error.(Deprecated, removed in the next major version, use status='error' instead)|boolean |`-`|-|
|loading|Whether is in loading|boolean |`-`|-|
|popupVisible|Whether the popup is visible|boolean |`-`|-|
|showEmptyChildren|Whether to render the next level node when the children of the selected option is an empty array|boolean |`-`|-|
|unmountOnExit|Whether destroy popup when hidden.|boolean |`-`|-|
|inputValue|Input Value|string |`-`|2.34.0|
|placeholder|Placeholder of element|string |`-`|-|
|autoWidth|auto width. minWidth defaults to 0, maxWidth defaults to 100%|\| boolean\| { minWidth?: CSSProperties['minWidth']; maxWidth?: CSSProperties['maxWidth'] } |`-`|2.54.0|
|checkedStrategy|Customize the return value<br/> parent:Only return the parent node when all child nodes are selected <br/> child: Return child nodes|'parent' \| 'child' |`child`|2.31.0|
|expandTrigger|Set the way to display the next level menu. One of hover and click|'click' \| 'hover' |`click`|-|
|mode|Set mode|'multiple' |`-`|-|
|showSearch|Whether single mode Select is searchable. `{ retainInputValue: true }` to retain the existing content when the search box is focused,`{ retainInputValueWhileSelect: true }` to retain the existing content when multiple selection is selected.`{ panelMode: 'select' }` Display options as a search panel (`2.39.0`)`renderOption` Custom rendering search option (`2.39.0`)|\| boolean\| {panelMode?: 'cascader' \| 'select';renderOption?: (inputValue: string,option: NodeProps&lt;T&gt;,options: [extraOptions](#extraoptions)) =&gt; ReactNode;retainInputValue?: boolean;retainInputValueWhileSelect?: boolean;} |`-`|-|
|size|Height of element, `24px` `28px` `32px` `36px`|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|status|Status|'error' \| 'warning' |`-`|2.45.0|
|virtualListProps|virtual list props. After virtual scrolling is enabled, there will be a default width for each column of cascading menus, which can be adjusted by `dropdownMenuColumnStyle`|Pick&lt;VirtualListProps&lt;any&gt;, 'threshold' \| 'isStaticItemHeight'&gt; |`-`|2.35.0|
|addBefore|The label text displayed before (on the left side of) the select field|ReactNode |`-`|2.41.0|
|clearIcon|Configure the icon of the clear button when `allowClear`.|ReactNode |`-`|2.26.0|
|notFoundContent|The content to show when no result matches|ReactNode |`-`|-|
|prefix|Customize select suffix|ReactNode |`-`|2.11.0|
|suffixIcon|Customize select suffix icon|ReactNode |`-`|-|
|arrowIcon|Customize select arrow icon.|ReactNode \| null |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|defaultValue|Initial value|(string \| string[])[] |`-`|-|
|dropdownMenuClassName|Custom dropdown list classname|string \| string[] |`-`|2.35.0|
|dropdownMenuColumnStyle|dropdown menu column style|CSSProperties |`-`|2.35.0|
|fieldNames|Custom field name for label, value, isLeaf, disabled and children|[FieldNamesType](#fieldnamestype) |`DefaultFieldNames`|-|
|filterOption|Customize the search logic.|(inputValue: string, option: NodeProps&lt;T&gt;) =&gt; boolean |`-`|-|
|icons|Icon configuration.|{loading?: ReactNode;checked?: ReactNode;next?: ReactNode;} |`-`|2.50.0|
|loadMore|To load option lazily|(pathValue: string[], level: number) =&gt; Promise&lt;T[]&gt; |`-`|-|
|options|The data of options|T[] |`[]`|-|
|removeIcon|Customize the delete icon of tags selected in `multiple` and `label` mode.|ReactNode \| null |`-`|-|
|renderFooter|Custom rendering the `footer` of each level menu.|(level: number, activeOption: NodeProps&lt;T&gt; \| null) =&gt; ReactNode |`-`|-|
|renderOption|Custom rendering `option`|(option: NodeProps&lt;T&gt;, level: number) =&gt; ReactNode |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|triggerProps|All `Trigger` component props|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|value|To set value|(string \| string[])[] |`-`|-|
|dropdownColumnRender|Customize columns of the menu.|(menu: ReactNode, level: number) => ReactNode |`-`|2.15.0, `level` in 2.17.0|
|dropdownRender|Customize the popup menu.|(menu: ReactNode) => ReactNode |`-`|2.15.0|
|getPopupContainer|ParentNode which the selector should be rendered to.|(node: HTMLElement) => Element |`-`|-|
|maxTagCount|The maximum number of `tags` is displayed, only valid in `multiple` and `label` mode.|\| number\| {count: number;render?: (invisibleTagCount: number) => ReactNode;} |`-`|Object type in 2.37.0|
|onChange|Callback when finishing select.|(value: (string \| string[])[],selectedOptions,extra: { dropdownVisible?: boolean }) => void |`-`|-|
|onClear|Callback when click clear icon.|(visible: boolean) => void |`-`|-|
|onClick|Callback when the mouse clicks on the drop-down box|(e) => void |`-`|-|
|onInputValueChange|Callback when inputValue change.|(inputValue: string, reason: [InputValueChangeReason](#inputvaluechangereason)) => void |`-`|2.34.0|
|onKeyDown|Callback when keyboard pressed|(e) => void |`-`|2.40.0|
|onSearch|Callback when input changed.(reason in `2.34.0`)|(inputValue: string, reason: [InputValueChangeReason](#inputvaluechangereason)) => void |`-`|2.20.0|
|onVisibleChange|Callback when popup shown or hidden.|(visible: boolean) => void |`-`|-|
|renderFormat|The return value will be displayed in the input box.|(valueShow: any[]) => ReactNode |`-`|-|
|renderTag|Custom tag rendering, `props` is the current tag attribute, `index` is the order of the current tag, `values` is the value of all tags|(props: {value: any;label: ReactNode;closable: boolean;onClose: (event) => void;},index: number,values: [ObjectValueType](#objectvaluetype)[]) => ReactNode |`-`|index、values added in 2.15.0|

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

## Methods

| Name |     Description     |    Type    | Default Value |
| ------ | :----------: | :--------: | -----: |
| focus  |   Get focus   | `Function` |    `-` |
| blur   | Remove focus | `Function` |    `-` |

**Demo**

```js
<Cascader ref={(ref) => (this.select = ref)} />;

this.select.focus();
this.select.blur();
```
