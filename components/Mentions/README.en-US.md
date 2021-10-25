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
|value|To set value|`string`|`-`|-|
|defaultValue|To set default value|`string`|`-`|-|
|options|Options of dropdown|`(\| string\| number\| { label: ReactNode \| string; value: string \| number; disabled?: boolean })[]`|`-`|-|
|prefix|Set trigger prefix keyword|`string \| string[]`|``@``|-|
|split|Set split string before and after selected mention|`string`|`-`|-|
|alignTextarea|Whether the popup is aligned with the input|`boolean`|`true`|-|
|position|Position of dropdown|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br'`|`bl`|-|
|triggerProps|All `Trigger` component props|`Partial<TriggerProps>`|`-`|-|
|notFoundContent|The content displayed when there is no data|`ReactNode`|`-`|-|
|getPopupContainer|Set the mount HTML node for suggestions|`(node: HTMLElement) => HTMLElement`|`-`|-|
|filterOption|Customize filter option logic|`false \| ((inputValue: string, option) => boolean)`|`-`|-|
|onChange|Callback when input value is changed|`(value: string) => void`|`-`|-|
|onSearch|Callback on search|`(text: string, prefix: string) => void`|`-`|-|
|onFocus|Trigger when mentions get focus|`(e) => void`|`-`|-|
|onBlur|Trigger when mentions lose focus|`(e) => void`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|placeholder|textarea placeholder|`string`|`-`|-|
|style|Additional style|`CSSProperties`|`-`|-|
|disabled|Whether the textarea is disabled|`boolean`|`-`|-|
|error|Whether the textarea is error|`boolean`|`-`|-|
|allowClear|Whether allow clear the content|`boolean`|`-`|2.2.0|
|onClear|Callback when click clear button|`() => void`|`-`|2.2.0|
|wrapperStyle|With `showWordLimit`, a `div` will be outside the `textarea` tag, and `wrapperStyle` is used to configure the style of it.|`CSSProperties`|`-`|-|
|autoSize|Height autoSize feature|`boolean \| { minRows?: number; maxRows?: number }`|`-`|-|
|onPressEnter|Callback when press enter key|`(e) => void`|`-`|-|

