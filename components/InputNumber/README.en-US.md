`````
Component / Data Entry

# InputNumber

An input box which only allows to enter number.
`````

%%Content%%

## API

### InputNumber

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|step|The value of each step. It can be an integer or decimal|`number`|`1`|-|
|precision|The precision of input value|`number`|`-`|-|
|min|The min value|`number`|`-Infinity`|-|
|max|The max value|`number`|`Infinity`|-|
|disabled|Whether input is disabled|`boolean`|`-`|-|
|error|Whether input has error status|`boolean`|`-`|-|
|readOnly|Whether input is readonly|`boolean`|`-`|2.17.0|
|defaultValue|To set default value|`number`|`-`|-|
|value|To set value|`undefined \| number \| string`|`-`|-|
|placeholder|Placeholder of input element|`string`|`-`|-|
|mode|`embed`: Button embedded, `button`: Buttons on both sides|`'embed' \| 'button'`|`embed`|-|
|size|Different sizes|`'mini' \| 'small' \| 'default' \| 'large'`|`-`|-|
|prefix|The prefix for the InputNumber|`ReactNode`|`-`|-|
|suffix|The suffix for the InputNumber|`ReactNode`|`-`|-|
|formatter|Specifies the format of the value presented|`(value: number \| string) => string`|`-`|-|
|parser|Specifies the value extracted from formatter|`(value: string) => number \| string`|`(input) => input.replace(/[^\w\.-]+/g, '')`|-|
|onChange|Callback when the value changes|`(value: number) => void`|`-`|-|
|onFocus|Callback when the input is focused|`(e) => void`|`-`|-|
|onBlur|Callback when the input is blurred|`(e) => void`|`-`|-|
|onKeyDown|Callback when the keyboard is pressed|`(e: Event) => void`|`-`|-|
|hideControl|Whether to hide the control buttons|`boolean`|`-`|-|
|icons|Customize icons|`{up?: ReactNode;down?: ReactNode;plus?: ReactNode;minus?: ReactNode;}`|`-`|-|

## Methods

|Name|Description|
|---|:---:|
|blur()|Remove focus|
|focus()|Get focus|
