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
|allowClear|Whether to allow clear the content|boolean |`-`|-|
|defaultActiveFirstOption|Whether to highlight the first option by default|boolean |`true`|-|
|disabled|Whether to disable the autocomplete|boolean |`-`|-|
|error|Whether the textarea is error.(Deprecated, removed in the next major version, use status='error' instead)|boolean |`-`|-|
|loading|Whether the component is loading data.|boolean |`-`|2.10.0|
|strict|Case sensitive when set `strict: true`|boolean |`-`|-|
|defaultValue|The default value of the autocomplete.|string |`-`|-|
|placeholder|Placeholder of input|string |`-`|-|
|value|The value of the autocomplete.|string |`-`|-|
|status|Status|'error' \| 'warning' |`-`|2.45.0|
|children|Custom input/source data|ReactNode |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|data|Data source|(string \| { value: string; name: string; [key: string]: any } \| ReactNode)[] |`-`|-|
|inputProps|Properties of Input component.|Partial&lt;[InputProps](input#input)&gt; |`-`|2.10.0|
|style|Additional style|CSSProperties |`-`|-|
|triggerProps|Pass all `Trigger` component properties|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|virtualListProps|Virtual scroll properties.|[AvailableVirtualListProps](#availablevirtuallistprops) |`-`|2.2.0|
|dropdownRender|Customize dropdown content|(menu: ReactNode) => ReactNode |`-`|-|
|filterOption|If it's true, filter options by input value. If it's a function, filter options base on the function.|boolean \| ((inputValue: string, option: ReactElement) => boolean) |`true`|-|
|getPopupContainer|To set the container of the dropdown.|(node: HTMLElement) => Element |`-`|-|
|onBlur|Callback when component is blurred|(event) => void |`-`|-|
|onChange|Callback when an option is selected or input value changes|(value: string, option?: [OptionInfo](#optioninfo)) => void |`-`|-|
|onFocus|Callback when component gets focus|(event) => void |`-`|-|
|onPressEnter|Callback when Enter is pressed|(event, activeOption?: [OptionInfo](#optioninfo)) => void |`-`|`activeOption` in 2.25.1|
|onSearch|Callback when searching items|(value: string) => void |`-`|-|
|onSelect|Callback when an option is selected.|(value: string, option: [OptionInfo](#optioninfo)) => void |`-`|-|
|triggerElement|Custom trigger element|ReactElement \| (({ value }) => ReactElement) |`<Input />`|`() => ReactElement` in 2.31.0|

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

### AutoComplete.Option

Same as `Select.Option`, refer to [Select](/react/en-US/components/select).

### AutoComplete.OptGroup

Same as `Select.OptGroup`, refer to [Select](/react/en-US/components/select).
