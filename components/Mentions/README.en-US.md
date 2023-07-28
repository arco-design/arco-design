`````
Component / Data Entry

# Mentions

Mentions is used to mention someone or something in the input.
`````

%%Content%%

## API

### Mentions

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|alignTextarea|Whether the popup is aligned with the input|boolean |`true`|-|
|allowClear|Whether allow clear the content|boolean |`-`|2.2.0|
|disabled|Whether the textarea is disabled|boolean |`-`|-|
|error|Whether the textarea is error.(Deprecated, removed in the next major version, use status='error' instead)|boolean |`-`|-|
|defaultValue|To set default value|string |`-`|-|
|placeholder|textarea placeholder|string |`-`|-|
|split|Set split string before and after selected mention|string |`-`|-|
|value|To set value|string |`-`|-|
|position|Position of dropdown|'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' |`bl`|-|
|status|Status|'error' \| 'warning' |`-`|2.45.0|
|clearIcon|Configure the icon of the clear button when `allowClear`.|ReactNode |`-`|2.50.0|
|notFoundContent|The content displayed when there is no data|ReactNode |`-`|-|
|autoSize|Height autoSize feature|boolean \| { minRows?: number; maxRows?: number } |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|options|Options of dropdown|(\| string\| number\| { label: ReactNode \| string; value: string \| number; disabled?: boolean })[] |`-`|-|
|prefix|Set trigger prefix keyword|string \| string[] |``@``|-|
|style|Additional style|CSSProperties |`-`|-|
|triggerProps|All `Trigger` component props|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|wrapperStyle|With `showWordLimit`, a `div` will be outside the `textarea` tag, and `wrapperStyle` is used to configure the style of it.|CSSProperties |`-`|-|
|filterOption|Customize filter option logic|false \| ((inputValue: string, option) => boolean) |`-`|-|
|getPopupContainer|Set the mount HTML node for suggestions|(node: HTMLElement) => HTMLElement |`-`|-|
|onBlur|Trigger when mentions lose focus|(e) => void |`-`|-|
|onChange|Callback when input value is changed|(value: string) => void |`-`|-|
|onClear|Callback when click clear button|() => void |`-`|2.2.0|
|onFocus|Trigger when mentions get focus|(e) => void |`-`|-|
|onPressEnter|Callback when press enter key|(e) => void |`-`|-|
|onSearch|Callback on search|(text: string, prefix: string) => void |`-`|-|

