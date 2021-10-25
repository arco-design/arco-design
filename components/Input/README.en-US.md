`````
Component / Data Entry

# Input

The basic form components have been expanded on the basis of native controls and can be used in combination.
`````

%%Content%%

## API

### Input

**Input Accept all native attribute values**

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|allowClear|Whether allow clear value|`boolean`|`-`|-|
|disabled|Whether the input is disabled|`boolean`|`-`|-|
|readOnly|Whether the input is readOnly|`boolean`|`-`|-|
|defaultValue|The initial input content|`string`|`-`|-|
|placeholder|Input box prompt text|`string`|`-`|-|
|error|Whether the input is error|`boolean`|`-`|-|
|onChange|Callback when user input|`(value: string, e) => void`|`-`|-|
|onClear|Callback when click clear button|`() => void`|`-`|-|
|onPressEnter|Callback when press enter key|`(e) => void`|`-`|-|
|addBefore|The label text displayed before (on the left side of) the input field|`ReactNode`|`-`|-|
|addAfter|The label text displayed after (on the right side of) the input field|`ReactNode`|`-`|-|
|prefix|The prefix icon or text for the Input|`ReactNode`|`-`|-|
|suffix|The suffix icon or text for the Input|`ReactNode`|`-`|-|
|value|The input content value|`string`|`-`|-|
|beforeStyle|The additional css style of the `addBefore` element|`object`|`-`|-|
|afterStyle|The additional css style of the `addAfter` element|`object`|`-`|-|
|size|The size of the input box|`'mini' \| 'small' \| 'default' \| 'large'`|`default`|-|
|height|Custom input height|`number \| string`|`-`|-|
|maxLength|The max content length；After setting `errorOnly` to `true`, if `maxLength` is exceeded, the `error` status will be displayed, and user input will not be restricted.|`number \| { length: number; errorOnly?: boolean }`|`-`|`errorOnly` in 2.23.0|
|showWordLimit|With `maxLength`, Show word count.|`boolean`|`-`|-|

### Input.TextArea

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|wrapperStyle|With `showWordLimit`, a `div` will be outside the `textarea` tag, and `wrapperStyle` is used to configure the style of it.|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|disabled|Whether the textarea is disabled|`boolean`|`-`|-|
|defaultValue|To set default value|`string`|`-`|-|
|value|To set value|`string`|`-`|-|
|autoSize|Height autoSize feature|`boolean \| { minRows?: number; maxRows?: number }`|`-`|-|
|error|Whether the textarea is error|`boolean`|`-`|-|
|placeholder|textarea placeholder|`string`|`-`|-|
|onChange|Callback when user input|`(value: string, e) => void`|`-`|-|
|onPressEnter|Callback when press enter key|`(e) => void`|`-`|-|
|maxLength|The max content length；After setting `errorOnly` to `true`, if `maxLength` is exceeded, the `error` status will be displayed, and user input will not be restricted.|`number \| { length: number; errorOnly?: boolean }`|`-`|`errorOnly` in 2.23.0|
|allowClear|Whether allow clear the content|`boolean`|`-`|2.2.0|
|onClear|Callback when click clear button|`() => void`|`-`|2.2.0|

### Input.Group

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|compact|Whether to use compact mode|`boolean`|`-`|

### Input.Search

Contains all the parameters of the Input component

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|loading|Show loading status when searching|`boolean`|`-`|2.6.0|
|onSearch|Callback when click search button|`(value: string) => void`|`-`|-|
|searchButton|Search button|`boolean \| ReactNode`|`-`|`ReactNode` in 2.6.0|

### Input.Password

Contains all the parameters of the Input component

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|visibilityToggle|Whether to display the button to switch the visible state of the password|`boolean`|`-`|
|defaultVisibility|To set default visibility|`boolean`|`-`|
|visibility|-|`boolean`|`-`|
|onVisibilityChange|Callback when visibility changes|`(visibility: boolean) => void`|`-`|

## Method

|Property|Description|Type|Default|
| ------ | :----------: | :--------: | -----: |
| focus  |   Get focus   | `Function` |    `-` |
| blur   | Remove focus | `Function` |    `-` |

**Demo**

```js
<Input ref={(ref) => (this.input = ref)} />;

this.input.focus();
this.input.blur();
```
