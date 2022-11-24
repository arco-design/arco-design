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
|checked|Whether the radio is checked (Controlled)|boolean |`-`|
|defaultChecked|Whether the radio is initially selected|boolean |`-`|
|disabled|Whether the radio is disabled|boolean |`-`|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|
|value|The value of radio|T |`-`|
|onChange|Callback when radio status change|(checked: boolean, event: ChangeEvent) => void |`-`|

### Radio.Group

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|name|`Radio`'s name attr|string |`-`|
|direction|Arrangement direction|'vertical' \| 'horizontal' |`horizontal`|
|size|The size of radio button style(Only effective under `button` type)|'small' \| 'default' \| 'large' \| 'mini' |`-`|
|type|type of `Radio`|'radio' \| 'button' |`radio`|
|className|Additional css class|string \| string[] |`-`|
|defaultValue|To set default value|any |`-`|
|options|Set children options|(string \| number \| { label: ReactNode; value: any; disabled?: boolean })[] |`-`|
|style|Additional style|CSSProperties |`-`|
|value|To set value|any |`-`|
|onChange|Callback when radio status change|(value: any, event: ChangeEvent) => void |`-`|
