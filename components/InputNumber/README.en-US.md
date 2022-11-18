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
|disabled|Whether input is disabled|boolean |`-`|-|
|error|Whether input has error status|boolean |`-`|-|
|hideControl|Whether to hide the control buttons|boolean |`-`|-|
|readOnly|Whether input is readonly|boolean |`-`|2.17.0|
|strictMode|`onChange` will return a string in strict mode|boolean |`-`|2.42.0|
|max|The max value|number |`Infinity`|-|
|min|The min value|number |`-Infinity`|-|
|precision|The precision of input value|number |`-`|-|
|step|The value of each step. It can be an integer or decimal|number |`1`|-|
|placeholder|Placeholder of input element|string |`-`|-|
|mode|`embed`: Button embedded, `button`: Buttons on both sides|'embed' \| 'button' |`embed`|-|
|size|Different sizes|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|prefix|The prefix for the InputNumber|ReactNode |`-`|-|
|suffix|The suffix for the InputNumber|ReactNode |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|defaultValue|To set default value|number \| string |`-`|-|
|icons|Customize icons|{up?: ReactNode;down?: ReactNode;plus?: ReactNode;minus?: ReactNode;} |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|value|To set value|undefined \| number \| string |`-`|-|
|formatter|Specifies the format of the value presented|(value: number \| string, info: { userTyping: boolean; input: string }) => string |`-`|Param `info` in `2.41.0`|
|onBlur|Callback when the input is blurred|(e) => void |`-`|-|
|onChange|Callback when the value changes|(value: number) => void |`-`|-|
|onFocus|Callback when the input is focused|(e) => void |`-`|-|
|onKeyDown|Callback when the keyboard is pressed|(e: Event) => void |`-`|-|
|parser|Specifies the value extracted from formatter|(value: string) => number \| string |`(input) => input.replace(/[^\w\.-]+/g, '')`|-|

## Methods

|Name|Description|
|---|:---:|
|blur()|Remove focus|
|focus()|Get focus|
