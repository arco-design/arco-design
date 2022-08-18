`````
Component / Feedback

# Notification

Display a notification message globally.
`````

%%Content%%

## API

### Notification

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|closable|Whether to show the close button|boolean |`-`|
|showIcon|Whether to show the icon|boolean |`true`|
|duration|Automatic shutdown time, the unit is `ms`|number |`3000`|
|id|The unique identifier of the current notification, which can be used to update the message|string |`-`|
|position|The position of the message|'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' |`-`|
|btn|Add action button|ReactNode |`-`|
|icon|Custom icon|ReactNode |`-`|
|className|Additional css class|string \| string[] |`-`|
|content|Notification content|ReactNode \| string  **(Required)**|`-`|
|style|Additional style|CSSProperties |`-`|
|title|Notification title|ReactNode \| string |`-`|
|onClose|Callback when close|() => void |`-`|

### Methods

- `Notification.info(config)`
- `Notification.success(config)`
- `Notification.warning(config)`
- `Notification.error(config)`
- `Notification.normal(config)`
- `Notification.remove(id)`
- `Notification.clear()`

### Global config

`Notification.config(options)`

|Property|Description|Type|Default|
|---|:---:|:---:|---:|
|maxCount|Maximum number of notifications|`number`|`-`|
|getContainer|Container of the notification|`() => HTMLElement`|`() => document.body`|
|duration|The time when the notification is automatically closed|`number`|`3000`|
|prefixCls|ClassName prefix|`string`|`arco`|
