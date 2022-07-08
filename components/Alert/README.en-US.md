`````
Component / Feedback

# Alert

Used to display warning information in a way that attracts attention.
`````

%%Content%%

## API

### Alert

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|banner|Whether to show as banner|boolean |`-`|
|closable|Whether Alert can be closed|boolean |`-`|
|showIcon|Whether to show icon|boolean |`true`|
|type|Type of Alert|'info' \| 'success' \| 'warning' \| 'error' |`info`|
|action|Custom action item|ReactNode |`-`|
|closeElement|Custom close button|ReactNode |`-`|
|content|Alert content|ReactNode |`-`|
|icon|Custom icon, effective when `showIcon` is `true`|ReactNode |`-`|
|title|Alert title|ReactNode |`-`|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|
|afterClose|Callback when Alert close animation is complete|() => void |`-`|
|onClose|Callback when Alert is closed|(e) => void |`-`|
