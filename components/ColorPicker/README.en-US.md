`````
Component / Data Entry

# ColorPicker

Used for select and display colors
`````

%%Content%%

## API

### ColorPicker

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|defaultPopupVisible|Whether the confirmation box is visible by default|boolean |`-`|-|
|disabled|disabled|boolean |`-`|-|
|disabledAlpha|Disable transparency channel|boolean |`-`|-|
|popupVisible|Whether the confirmation box is visible|boolean |`-`|-|
|showHistory|Show history colors|boolean |`-`|-|
|showPreset|Show preset colors|boolean |`-`|-|
|showText|Show color value|boolean |`-`|-|
|unmountOnExit|Whether to umount the node on hiding|boolean |`true`|-|
|defaultValue|The initial input content|string |`-`|-|
|value|The input content value|string |`-`|-|
|format|Color value format|'hex' \| 'rgb' |`-`|-|
|size|The size of the input box|[InputProps](input#input)['size'] |`default`|-|
|className|Additional css class|string \| string[] |`-`|-|
|historyColors|Color array of history colors|string[] |`-`|-|
|presetColors|Color array of preset colors|string[] |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|triggerProps|All `Trigger` component props|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|onChange|Callback when the color value changes|(value: string) => void |`-`|-|
|onVisibleChange|Callback when popup shown or hidden.|(visible: boolean) => void |`-`|-|
|renderFooter|Customize the bottom content of the panel|() => ReactNode |`-`|2.62.0|
|triggerElement|The trigger element which executes the dropdown action.|ReactNode \| ((params: { value: string }) => ReactNode) |`-`|2.60.0|
