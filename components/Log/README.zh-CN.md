`````
组件 / 数据展示

# 日志 Log

用于显示系统日志、操作记录等信息的组件。

## 何时使用

- 需要展示系统日志信息时
- 需要显示操作记录或历史信息时
- 需要按时间顺序展示信息流时

## 代码演示

@import ./__demo__/basic.md

@import ./__demo__/type.md

@import ./__demo__/with-timestamp.md

@import ./__demo__/without-icon.md

## API

### Log

|参数名|描述|类型|默认值|
|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|
|className|节点类名|`string \| string[]`|`-`|
|content|日志内容|`ReactNode`|`-`|
|type|日志类型|`'default' \| 'info' \| 'success' \| 'warning' \| 'error'`|`default`|
|showIcon|是否显示图标|`boolean`|`true`|
|icon|自定义图标（当 `showIcon` 为 `true` 时生效）|`ReactNode`|`-`|
|showTimestamp|是否显示时间戳|`boolean`|`false`|
|timestamp|时间戳|`string \| number \| Date`|`-`|
`````
