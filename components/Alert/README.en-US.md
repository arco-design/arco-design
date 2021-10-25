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
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|action|Custom action item|`ReactNode`|`-`|
|closable|Whether Alert can be closed|`boolean`|`-`|
|onClose|Callback when Alert is closed|`(e) => void`|`-`|
|afterClose|Callback when Alert close animation is complete|`() => void`|`-`|
|type|Type of Alert|`'info' \| 'success' \| 'warning' \| 'error'`|`info`|
|title|Alert title|`ReactNode`|`-`|
|content|Alert content|`ReactNode`|`-`|
|icon|Custom icon, effective when `showIcon` is `true`|`ReactNode`|`-`|
|closeElement|Custom close button|`ReactNode`|`-`|
|showIcon|Whether to show icon|`boolean`|`true`|
|banner|Whether to show as banner|`boolean`|`-`|
