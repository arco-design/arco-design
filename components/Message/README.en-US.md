`````
Component / Feedback

# Message

Lightweight global feedback triggered by user actions.
`````

%%Content%%

## API

### Message

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|transitionClassNames|ClassNames of react-transition-group of the message pop-up animation, see `classNames`|`string`|`-`|
|content|Message content|`ReactNode \| string` **(Required)**|`-`|
|showIcon|Whether to show the icon|`boolean`|`true`|
|icon|Custom icon|`ReactNode`|`-`|
|duration|Automatic shutdown time, the unit is `ms`|`number`|`3000`|
|onClose|Callback when close|`() => void`|`-`|
|id|The unique identifier of the current message, which can be used to update the message|`string`|`-`|
|position|The position of the message|`'top' \| 'bottom'`|`-`|
|closable|Whether to show the close button|`boolean`|`-`|

### Methods

- `Message.info(content: String)` / `Message.info(config: Object)`
- `Message.success(content: String)` / `Message.success(config: Object)`
- `Message.warning(content: String)` / `Message.warning(config: Object)`
- `Message.error(content: String)` / `Message.error(config: Object)`
- `Message.normal(content: String)` / `Message.normal(config: Object)`
- `Message.loading(content: String)` / `Message.loading(config: Object)`
- `Message.clear()`

### Global config

`Message.config(options)`

|Property|Description|Type|Default|
|---|:---:|:---:|---:|
|maxCount|Maximum number of notifications|`number`|`-`|
|getContainer|Container of the notification|`() => HTMLElement`|`() => document.body`|
|duration|The time when the notification is automatically closed|`number`|`3000`|
|prefixCls|ClassName prefix|`string`|`arco`|
