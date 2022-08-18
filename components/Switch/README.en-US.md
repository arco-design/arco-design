`````
Component / Data Entry

# Switch

Mutually exclusive operation controls, users can turn on or turn off a certain function.
`````

%%Content%%

## API

### Switch

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|checked|To set checked|boolean |`-`|
|defaultChecked|To set default checked|boolean |`-`|
|disabled|Whether to disable|boolean |`-`|
|loading|Loading state|boolean |`-`|
|size|The size of the switch|'small' \| 'default' |`-`|
|type|Three style types|'circle' \| 'round' \| 'line' |`circle`|
|checkedIcon|The icon displayed on the button when the switch is turned on|ReactNode |`-`|
|checkedText|The text when the switch is turned on, the small size does not work.|ReactNode |`-`|
|uncheckedIcon|The icon displayed on the button when the switch is off|ReactNode |`-`|
|uncheckedText|The text when the switch is turned off, the small size does not work.|ReactNode |`-`|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|
|onChange|Callback when click|(value: boolean, event) => void |`-`|
