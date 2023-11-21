`````
Hooks / useVerificationCode

# useVerificationCode

useVerificationCode hook

`````

%%Content%%

## API

### VerificationCodeOptions

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|length|length|number |`-`|
|defaultValue|The initial input content|string |`-`|
|value|value|string |`-`|
|getInputRefList|input list|() => (HTMLInputElement \| HTMLTextAreaElement)[] |`-`|
|onChange|onChange|(value: string) => void |`-`|
|onFinish|onFinish|(value: string) => void |`-`|

### VerificationCodeReturnType

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|filledValue|-|[VerificationCodeOptions](_hooks#verificationcodeoptions)['value'][]  **(Required)**|`-`|
|setValue|-|(v: [VerificationCodeOptions](_hooks#verificationcodeoptions)['value']) => void  **(Required)**|`-`|
|getInputProps|-|(index: number) => {key: string \| number;value: string;onClick: (e: MouseEvent) => void;onKeyDown: (e: KeyboardEvent) => void;onChange: (v: string) => void;onPaste: (e: ClipboardEvent) => void;}  **(Required)**|`-`|
