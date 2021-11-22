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
|defaultValue|To set default value|`string \| string[] \| number \| number[] \| LabeledValue \| LabeledValue[]`|`-`|-|
|value|To set value|`string \| string[] \| number \| number[] \| LabeledValue \| LabeledValue[]`|`-`|-|
|inputValue|To set input value|`string`|`-`|-|
|mode|Set mode of Select(**`tags` recommends using `mode: multiple; allowCreate: true` instead, this mode will be removed in the next major version**)|`'multiple' \| 'tags'`|`-`|-|
|options|Select options|`(\| string\| number\| { label: ReactNode \| string; value: string \| number; disabled?: boolean; extra?: any })[]`|`-`|`extra` in 2.2.0|
|labelInValue|Whether to embed label in value, turn the format of value from string to `{ value: string, label: ReactNode }`|`boolean`|`-`|-|
|filterOption|If it's true, filter options by input value. If it's a function, filter options base on the function.|`boolean \| ((inputValue: string, option: ReactElement) => boolean)`|`true`|-|
|renderFormat|Customize the content that will be displayed in the Select.If the `Option` corresponding to `value` does not exist, the first parameter will be `null`|`(option: OptionInfo \| null, value: string \| number \| LabeledValue) => ReactNode`|`-`|-|
|defaultActiveFirstOption|Whether to highlight the first option by default|`boolean`|`true`|-|
|unmountOnExit|Whether to destroy the DOM when hiding|`boolean`|`true`|-|
|defaultPopupVisible|Whether to show dropdown by default.|`boolean`|`-`|2.14.0|
|popupVisible|Whether to show dropdown.|`boolean`|`-`|2.6.0|
|notFoundContent|Specify content to show when no result matches.|`ReactNode`|`-`|-|
|tokenSeparators|Separator used to tokenize on `multiple` mode.|`string[]`|`-`|-|
|getPopupContainer|To set the container of the dropdown.|`(node: HTMLElement) => Element`|`-`|-|
|trigger|The trigger mode which executes the dropdown action.|`TriggerProps['trigger']`|`click`|-|
|triggerElement|The trigger element which executes the dropdown action.|`ReactNode`|`-`|-|
|triggerProps|Pass all `Trigger` component properties|`Partial<TriggerProps>`|`-`|-|
|dropdownRender|Customize dropdown content|`(menu: ReactNode) => ReactNode`|`-`|-|
|dropdownMenuStyle|The style of dropdown menu.|`CSSProperties`|`-`|-|
|dropdownMenuClassName|The className of dropdown menu.|`string \| string[]`|`-`|-|
|virtualListProps|Pass properties used by VirtualList.|`AvailableVirtualListProps`|`-`|2.1.0|
|onChange|Callback when select an option or input value change.|`(value, option: OptionInfo \| OptionInfo[]) => void`|`-`|-|
|onDeselect|Called when a option is deselected.Only called for `multiple` mode.|`(value: string \| number \| LabeledValue, option: OptionInfo) => void`|`-`|-|
|onClear|Called when clear|`(visible: boolean) => void`|`-`|-|
|onSearch|Callback when input changed|`(value: string, reason: InputValueChangeReason) => void`|`-`|-|
|onFocus|Callback when get focus|`(e) => void`|`-`|-|
|onBlur|Callback when lose focus|`(e) => void`|`-`|-|
|onPopupScroll|Callback when dropdown scrolls.|`(elem) => void`|`-`|-|
|onVisibleChange|Callback when visibility of dropdown is changed.|`(visible: boolean) => void`|`-`|-|
|onInputValueChange|Callback when the value of input is changed.|`(value: string, reason: InputValueChangeReason) => void`|`-`|2.3.0|
|onPaste|Callback when the you paste text in input box.|`(e) => void`|`-`|2.9.0|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|placeholder|Placeholder of element|`string`|`-`|-|
|bordered|Whether to render border|`boolean`|`true`|-|
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
|clearIcon|Configure the icon of the clear button when `allowClear`.|`ReactNode`|`-`|2.26.0|
|onClick|Callback when the mouse clicks on the drop-down box|`(e) => void`|`-`|-|
|animation|Whether to add animation for internal label changes|`boolean`|`true`|2.15.0|
|renderTag|Custom tag rendering, `props` is the current tag attribute, `index` is the order of the current tag, `values` is the value of all tags|`(props: {value: any;label: ReactNode;closable: boolean;onClose: (event) => void;},index: number,values: ObjectValueType[]) => React.ReactNode`|`-`|index、values added in 2.15.0|
|dragToSort|Weather it is possible to sort tags by drag|`boolean`|`-`|2.27.0|

### Select.Option

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|disabled|Whether the option is disabled|`boolean`|`-`|-|
|value|Value of this Option|`string \| number` **(Required)**|`-`|-|
|extra|Any data you want to pass to Option.|`any`|`-`|2.2.0|

### Select.OptGroup

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|label|Name of Group|`ReactNode`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|style|Additional style|`CSSProperties`|`-`|

### Select Reference Type

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|dom|DOM|`HTMLDivElement` **(Required)**|`-`|
|focus|Focus Select|`() => void` **(Required)**|`-`|
|blur|Blur Select|`() => void` **(Required)**|`-`|
|hotkeyHandler|Processor of mouse shortcut operation|`(event: KeyboardEvent) => void` **(Required)**|`-`|
|activeOptionValue|The value of active option|`OptionProps['value']` **(Required)**|`-`|
|getOptionInfoList|Get the list of option info|`() => OptionInfo[]` **(Required)**|`-`|
|getOptionInfoByValue|Get the option info by its value|`(value: OptionProps['value']) => OptionInfo` **(Required)**|`-`|

### VirtualListProps

|Property|Description|Type|Default|
|---|:---:|:---:|---:|
|height|Viewable area height (`2.11.0` starts to support `string` type such as `80%`)|`number`| 200 |
|threshold|The threshold of the number of elements that automatically enable virtual scrolling, pass in `null` to disable virtual scrolling.|`number` \| `null`| 100 |
|isStaticItemHeight|Whether it is a static element of the same height|`boolean`|true|
