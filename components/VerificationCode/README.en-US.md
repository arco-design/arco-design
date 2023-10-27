`````
Component / Data Entry

# VerificationCode

VerificationCode
`````

%%Content%%

## API

### VerificationCode

2.55.0

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|disabled|disabled|boolean |`-`|
|masked|Password mode|boolean |`-`|
|readOnly|readOnly|boolean |`-`|
|length|The length of the verification code, rendering the corresponding number of input boxes according to the length|number |`6`|
|defaultValue|The initial input content|string |`-`|
|value|The input content value|string |`-`|
|size|Size|[InputProps](input#input)['size'] |`-`|
|status|Status|'error' |`-`|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|
|onChange|Callback triggered when input value changes|(value: string) => void |`-`|
|onFinish|A callback triggered after the input boxes are filled in|(value: string) => void |`-`|
|separator|Separator. Customizable rendering separators after input boxes with different indexes|(data: { index: number; character: string }) => ReactNode |`-`|
