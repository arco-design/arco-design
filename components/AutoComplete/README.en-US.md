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
|style|Additional style|CSSProperties |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|disabled|Whether to disable the autocomplete|boolean |`-`|-|
|children|Custom input/source data|React.ReactNode |`-`|-|
|allowClear|Whether to allow clear the content|boolean |`-`|-|
|data|Data source|(string \| { value: string; name: string; [key: string]: any } \| React.ReactNode)[] |`-`|-|
|placeholder|Placeholder of input|string |`-`|-|
|defaultValue|The default value of the autocomplete.|string |`-`|-|
|value|The value of the autocomplete.|string |`-`|-|
|error|Error style|boolean |`-`|-|
|strict|Case sensitive when set `strict: true`|boolean |`-`|-|
|loading|Whether the component is loading data.|boolean |`-`|2.10.0|
|triggerElement|Custom trigger element|ReactElement \| (({ value }) => ReactElement) |`<Input />`|`() => ReactElement` in 2.31.0|
|onSearch|Callback when searching items|(value: string) => void |`-`|-|
|onSelect|Callback when an option is selected.|(value: string, option: [OptionInfo](#optioninfo)) => void |`-`|-|
|onChange|Callback when an option is selected or input value changes|(value: string, option?: [OptionInfo](#optioninfo)) => void |`-`|-|
|onPressEnter|Callback when Enter is pressed|(event, activeOption?: [OptionInfo](#optioninfo)) => void |`-`|`activeOption` in 2.25.1|
|onFocus|Callback when component gets focus|(event) => void |`-`|-|
|onBlur|Callback when component is blurred|(event) => void |`-`|-|
|virtualListProps|Virtual scroll properties.|[AvailableVirtualListProps](#availablevirtuallistprops) |`-`|2.2.0|
|inputProps|Properties of Input component.|Partial&lt;[InputProps](input#input)&gt; |`-`|2.10.0|
|filterOption|If it's true, filter options by input value. If it's a function, filter options base on the function.|boolean \| ((inputValue: string, option: ReactElement) => boolean) |`true`|-|
|dropdownRender|Customize dropdown content|(menu: ReactNode) => ReactNode |`-`|-|
|triggerProps|Pass all `Trigger` component properties|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|getPopupContainer|To set the container of the dropdown.|(node: HTMLElement) => Element |`-`|-|
|defaultActiveFirstOption|Whether to highlight the first option by default|boolean |`true`|-|

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
