`````
Component / Data Entry

# AutoComplete

An input box or custom input control, with enhanced automatic completion functionality.
`````

%%Content%%

## API

### AutoComplete

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|disabled|Whether to disable the autocomplete|`boolean`|`-`|-|
|children|Custom input/source data|`React.ReactNode`|`-`|-|
|allowClear|Whether to allow clear the content|`boolean`|`-`|-|
|data|Data source|`(string \| { value: string; name: string; [key: string]: any } \| React.ReactNode)[]`|`-`|-|
|placeholder|Placeholder of input|`string`|`-`|-|
|defaultValue|The default value of the autocomplete.|`string`|`-`|-|
|value|The value of the autocomplete.|`string`|`-`|-|
|error|Error style|`boolean`|`-`|-|
|strict|Case sensitive when set `strict: true`|`boolean`|`-`|-|
|loading|Whether the component is loading data.|`boolean`|`-`|2.10.0|
|triggerElement|Custom trigger element|`ReactElement`|`<Input />`|-|
|onSearch|Callback when searching items|`(value: string) => void`|`-`|-|
|onSelect|Callback when an option is selected.|`(value: string, option: OptionInfo) => void`|`-`|-|
|onChange|Callback when an option is selected or input value changes|`(value: string, option?: OptionInfo) => void`|`-`|-|
|onPressEnter|Callback when Enter is pressed|`(event) => void`|`-`|-|
|onFocus|Callback when component gets focus|`(event) => void`|`-`|-|
|onBlur|Callback when component is blurred|`(event) => void`|`-`|-|
|virtualListProps|Virtual scroll properties.|`AvailableVirtualListProps`|`-`|2.2.0|
|inputProps|Properties of Input component.|`Partial<InputProps>`|`-`|2.10.0|
|filterOption|If it's true, filter options by input value. If it's a function, filter options base on the function.|`boolean \| ((inputValue: string, option: ReactElement) => boolean)`|`true`|-|
|dropdownRender|Customize dropdown content|`(menu: ReactNode) => ReactNode`|`-`|-|
|triggerProps|Pass all `Trigger` component properties|`Partial<TriggerProps>`|`-`|-|
|getPopupContainer|To set the container of the dropdown.|`(node: HTMLElement) => Element`|`-`|-|
|defaultActiveFirstOption|Whether to highlight the first option by default|`boolean`|`true`|-|

### AutoComplete.Option

Same as `Select.Option`, refer to [Select](/react/en-US/components/select).

### AutoComplete.OptGroup

Same as `Select.OptGroup`, refer to [Select](/react/en-US/components/select).
