`````
Component / Data Entry

# Select

When users need to select one or more from a group of similar data, they can use Select to click and select the corresponding item.
`````

%%Content%%

## API

### Select

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|allowClear|Whether allow to clear selected options|boolean |`-`|-|
|animation|Whether to add animation for internal label changes|boolean |`true`|2.15.0|
|bordered|Whether to render border|boolean |`true`|-|
|defaultActiveFirstOption|Whether to highlight the first option by default|boolean |`true`|-|
|defaultPopupVisible|Whether to show dropdown by default.|boolean |`-`|2.14.0|
|disabled|Whether is disabled|boolean |`-`|-|
|dragToSort|Weather it is possible to sort tags by drag|boolean |`-`|2.27.0|
|error|Whether the textarea is error.(Deprecated, removed in the next major version, use status='error' instead)|boolean |`-`|-|
|labelInValue|Whether to embed label in value, turn the format of value from string to `{ value: string, label: ReactNode }`|boolean |`-`|-|
|loading|Whether is in loading|boolean |`-`|-|
|popupVisible|Whether to show dropdown.|boolean |`-`|2.6.0|
|unmountOnExit|Whether to destroy the DOM when hiding|boolean |`true`|-|
|inputValue|To set input value|string |`-`|-|
|placeholder|Placeholder of element|string |`-`|-|
|allowCreate|Whether to allow new options to be created by input.|\| boolean\| {formatter: (inputValue: string, creating: boolean) => [SelectProps](select#select)['options'][number];} |`-`|2.13.0, `{ formatter }` in 2.54.0|
|autoWidth|auto width. minWidth defaults to 0, maxWidth defaults to 100%|\| boolean\| { minWidth?: CSSProperties['minWidth']; maxWidth?: CSSProperties['maxWidth'] } |`-`|2.54.0|
|mode|Set mode of Select(**`tags` recommends using `mode: multiple; allowCreate: true` instead, this mode will be removed in the next major version**)|'multiple' \| 'tags' |`-`|-|
|size|Height of element, `24px` `28px` `32px` `36px`|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|status|Status|'error' \| 'warning' |`-`|2.45.0|
|trigger|The trigger mode which executes the dropdown action.|[TriggerProps](trigger#trigger)['trigger'] |`click`|-|
|addBefore|The label text displayed before (on the left side of) the select field|ReactNode |`-`|2.41.0|
|clearIcon|Configure the icon of the clear button when `allowClear`.|ReactNode |`-`|2.26.0|
|notFoundContent|Specify content to show when no result matches.|ReactNode |`-`|-|
|prefix|Customize select suffix|ReactNode |`-`|2.11.0|
|suffixIcon|Customize select suffix icon|ReactNode |`-`|-|
|arrowIcon|Customize select arrow icon.|ReactNode \| null |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|defaultValue|To set default value|string \| string[] \| number \| number[] \| [LabeledValue](#labeledvalue) \| [LabeledValue](#labeledvalue)[] |`-`|-|
|dropdownMenuClassName|The className of dropdown menu.|string \| string[] |`-`|-|
|dropdownMenuStyle|The style of dropdown menu.|CSSProperties |`-`|-|
|options|Select options|(\| string\| number\| { label: ReactNode \| string; value: string \| number; disabled?: boolean; extra?: any })[] |`-`|`extra` in 2.2.0|
|removeIcon|Customize the delete icon of tags selected in `multiple` and `label` mode.|ReactNode \| null |`-`|-|
|showSearch|Whether single mode Select is searchable. `{ retainInputValue: true }` to retain the existing content when the search box is focused,`{ retainInputValueWhileSelect: true }` to retain the existing content when multiple selection is selected.|boolean \| { retainInputValue?: boolean; retainInputValueWhileSelect?: boolean } |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|tokenSeparators|Separator used to tokenize on `multiple` mode.|string[] |`-`|-|
|triggerProps|Pass all `Trigger` component properties|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|value|To set value|string \| string[] \| number \| number[] \| [LabeledValue](#labeledvalue) \| [LabeledValue](#labeledvalue)[] |`-`|-|
|virtualListProps|Pass properties used by VirtualList.|[AvailableVirtualListProps](#availablevirtuallistprops) |`-`|2.1.0|
|dropdownRender|Customize dropdown content|(menu: ReactNode) => ReactNode |`-`|-|
|filterOption|If it's true, filter options by input value. If it's a function, filter options base on the function.|boolean \| ((inputValue: string, option: ReactElement) => boolean) |`true`|-|
|getPopupContainer|To set the container of the dropdown.|(node: HTMLElement) => Element |`-`|-|
|maxTagCount|The maximum number of `tags` is displayed, only valid in `multiple` and `label` mode.|\| number\| {count: number;render?: (invisibleTagCount: number) => ReactNode;} |`-`|Object type in 2.37.0|
|onBlur|Callback when lose focus|(e) => void |`-`|-|
|onChange|Callback when select an option or input value change.|(value, option: [OptionInfo](#optioninfo) \| [OptionInfo](#optioninfo)[]) => void |`-`|-|
|onClear|Called when clear|(visible: boolean) => void |`-`|-|
|onClick|Callback when the mouse clicks on the drop-down box|(e) => void |`-`|-|
|onDeselect|Called when an option is deselected. Only called for `multiple` mode.|(value: string \| number \| [LabeledValue](#labeledvalue), option: [OptionInfo](#optioninfo)) => void |`-`|-|
|onFocus|Callback when get focus|(e) => void |`-`|-|
|onInputValueChange|Callback when the value of input is changed.|(value: string, reason: [InputValueChangeReason](#inputvaluechangereason)) => void |`-`|2.3.0|
|onKeyDown|Callback when keyboard pressed|(e) => void |`-`|2.40.0|
|onPaste|Callback when the you paste text in input box.|(e) => void |`-`|2.9.0|
|onPopupScroll|Callback when dropdown scrolls.|(elem) => void |`-`|-|
|onSearch|Callback when input changed|(value: string, reason: [InputValueChangeReason](#inputvaluechangereason)) => void |`-`|-|
|onSelect|Called when an option is selected. Only called for `multiple` mode.|(value: string \| number \| [LabeledValue](#labeledvalue), option: [OptionInfo](#optioninfo)) => void |`-`|2.52.0|
|onVisibleChange|Callback when visibility of dropdown is changed.|(visible: boolean) => void |`-`|-|
|renderFormat|Customize the content that will be displayed in the Select.If the `Option` corresponding to `value` does not exist, the first parameter will be `null`|(option: [OptionInfo](#optioninfo) \| null, value: string \| number \| [LabeledValue](#labeledvalue)) => ReactNode |`-`|-|
|renderTag|Custom tag rendering, `props` is the current tag attribute, `index` is the order of the current tag, `values` is the value of all tags|(props: {value: any;label: ReactNode;closable: boolean;onClose: (event) => void;},index: number,values: [ObjectValueType](#objectvaluetype)[]) => ReactNode |`-`|index、values added in 2.15.0|
|triggerElement|The trigger element which executes the dropdown action.|\| ReactNode\| ((params: { value: any; option: [OptionInfo](#optioninfo) \| [OptionInfo](#optioninfo)[] }) => ReactNode) |`-`|`() => ReactNode` in 2.31.0|

### Select.Option

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|disabled|Whether the option is disabled|boolean |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|extra|Any data you want to pass to Option.|any |`-`|2.2.0|
|style|Additional style|CSSProperties |`-`|-|
|value|Value of this Option|string \| number  **(Required)**|`-`|-|

### Select.OptGroup

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|label|Name of Group|ReactNode |`-`|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|

### Select Reference Type

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|activeOptionValue|The value of active option|[OptionProps](select#selectoption)['value']  **(Required)**|`-`|-|
|getOptionInfoByValue|Get the option info by its value|(value: [OptionProps](select#selectoption)['value']) => [OptionInfo](#optioninfo)  **(Required)**|`-`|-|
|scrollIntoView|Scroll the drop-down list to the specified option|(value: [OptionProps](select#selectoption)['value'], options?: ScrollIntoViewOptions) => void  **(Required)**|`-`|2.46.0|
|dom|DOM|HTMLDivElement  **(Required)**|`-`|-|
|blur|Blur Select|() => void  **(Required)**|`-`|-|
|focus|Focus Select|() => void  **(Required)**|`-`|-|
|getOptionInfoList|Get the list of option info|() => [OptionInfo](#optioninfo)[]  **(Required)**|`-`|-|
|hotkeyHandler|Processor of mouse shortcut operation|(event: KeyboardEvent) => void  **(Required)**|`-`|-|

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

|Property|Description|Type|Default|
|---|:---:|:---:|---:|
|height|Viewable area height (`2.11.0` starts to support `string` type such as `80%`)|`number`| 200 |
|threshold|The threshold of the number of elements that automatically enable virtual scrolling, pass in `null` to disable virtual scrolling.|`number` \| `null`| 100 |
|isStaticItemHeight|Whether it is a static element of the same height|`boolean`|true|
