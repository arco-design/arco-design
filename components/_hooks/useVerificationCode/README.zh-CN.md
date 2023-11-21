`````
Hooks / useVerificationCode

# useVerificationCode

useVerificationCode
`````

%%Content%%

## API

### VerificationCodeOptions

|参数名|描述|类型|默认值|
|---|---|---|---|
|length|长度|number |`-`|
|defaultValue|默认值|string |`-`|
|value|value|string |`-`|
|getInputRefList|input list|() => (HTMLInputElement \| HTMLTextAreaElement)[] |`-`|
|onChange|onChange|(value: string) => void |`-`|
|onFinish|onFinish|(value: string) => void |`-`|

### VerificationCodeReturnType

|参数名|描述|类型|默认值|
|---|---|---|---|
|filledValue|filledValue|[VerificationCodeOptions](_hooks#verificationcodeoptions)['value'][]  **(必填)**|`-`|
|setValue|更新内部 value|(v: [VerificationCodeOptions](_hooks#verificationcodeoptions)['value']) => void  **(必填)**|`-`|
|getInputProps|获取 input 属性，附加到 input|(index: number) => {key: string \| number;value: string;onClick: (e: MouseEvent) => void;onKeyDown: (e: KeyboardEvent) => void;onChange: (v: string) => void;onPaste: (e: ClipboardEvent) => void;}  **(必填)**|`-`|
