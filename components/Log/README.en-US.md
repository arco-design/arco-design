`````
Component / Data Display

# Log

Component for displaying system logs, operation records and other information.

## When to use

- When you need to display system log information
- When you need to display operation records or historical information
- When you need to display information flow in chronological order

## Examples

@import ./__demo__/basic.md

@import ./__demo__/type.md

@import ./__demo__/with-timestamp.md

@import ./__demo__/without-icon.md

## API

### Log

|Property|Description|Type|Default|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional class name|`string \| string[]`|`-`|
|content|Log content|`ReactNode`|`-`|
|type|Type of Log|`'default' \| 'info' \| 'success' \| 'warning' \| 'error'`|`default`|
|showIcon|Whether to show icon|`boolean`|`true`|
|icon|Custom icon (effective when `showIcon` is `true`)|`ReactNode`|`-`|
|showTimestamp|Whether to show timestamp|`boolean`|`false`|
|timestamp|Timestamp|`string \| number \| Date`|`-`|
`````
