`````
Component / Data Entry

# ColorPicker

Used for select and display colors
`````

%%Content%%

## API

### ColorPicker

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|defaultPopupVisible|Whether the confirmation box is visible by default|boolean |`-`|
|disabled|disabled|boolean |`-`|
|disabledAlpha|Disable transparency channel|boolean |`-`|
|popupVisible|Whether the confirmation box is visible|boolean |`-`|
|readOnly|readOnly|boolean |`-`|
|defaultValue|The initial input content|string |`-`|
|value|The input content value|string |`-`|
|format|Color value format|'hex' \| 'rgb' |`-`|
|size|The size of the input box|[InputProps](input#input)['size'] |`default`|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|
|triggerProps|All `Trigger` component props|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|
|onVisibleChange|Callback when popup shown or hidden.|(visible: boolean) => void |`-`|
