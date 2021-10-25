---
file: interface
---

`````
Component / Feedback

# Message

Lightweight global feedback triggered by user actions.
`````

%%Content%%

## API

%%Props%%

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
