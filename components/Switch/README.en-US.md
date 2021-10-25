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
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|disabled|Whether to disable|`boolean`|`-`|
|onChange|Callback when click|`(value: boolean, event) => void`|`-`|
|size|The size of the switch|`'small' \| 'default'`|`-`|
|type|Three style types|`'circle' \| 'round' \| 'line'`|`circle`|
|checkedText|The text when the switch is turned on, the small size does not work.|`ReactNode`|`-`|
|uncheckedText|The text when the switch is turned off, the small size does not work.|`ReactNode`|`-`|
|uncheckedIcon|The icon displayed on the button when the switch is off|`ReactNode`|`-`|
|checkedIcon|The icon displayed on the button when the switch is turned on|`ReactNode`|`-`|
|defaultChecked|To set default checked|`boolean`|`-`|
|checked|To set checked|`boolean`|`-`|
|loading|Loading state|`boolean`|`-`|
