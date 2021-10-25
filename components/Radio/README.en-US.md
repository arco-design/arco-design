`````
Component / Data Entry

# Radio

In a set of related and mutually exclusive data, the user can only select one option.
`````

%%Content%%

## API

### Radio

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|disabled|Whether the radio is disabled|`boolean`|`-`|
|value|Whether the radio is checked (Controlled)|`T`|`-`|
|checked|The value of radio|`boolean`|`-`|
|defaultChecked|Whether the radio is initially selected|`boolean`|`-`|
|onChange|Callback when radio status change|`(checked: boolean, event: ChangeEvent) => void`|`-`|

### Radio.Group

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|name|`Radio`'s name attr|`string`|`-`|
|type|type of `Radio`|`'radio' \| 'button'`|`radio`|
|direction|Arrangement direction|`'vertical' \| 'horizontal'`|`horizontal`|
|size|The size of radio button style(Only effective under `button` type)|`'small' \| 'default' \| 'large' \| 'mini'`|`-`|
|onChange|Callback when radio status change|`(value: any, event: ChangeEvent) => void`|`-`|
|defaultValue|To set default value|`any`|`-`|
|value|To set value|`any`|`-`|
|options|Set children options|`(string \| number \| { label: ReactNode; value: any; disabled?: boolean })[]`|`-`|
