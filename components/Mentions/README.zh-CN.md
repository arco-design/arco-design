`````
组件 / 数据输入

# 提及 Mentions

用于在输入中提及某人或某事，常用于发布、聊天或评论功能。
`````

%%Content%%

## API

### Mentions

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|alignTextarea|弹出框是否与输入框对齐|boolean |`true`|-|
|allowClear|允许清空输入框|boolean |`-`|2.2.0|
|disabled|是否禁用|boolean |`-`|-|
|error|是否是错误状态。(废弃，下个大版本移除，使用 status='error' 替代)|boolean |`-`|-|
|defaultValue|输入框默认值|string |`-`|-|
|placeholder|输入框提示文字|string |`-`|-|
|split|选中项前后分隔符|string |`-`|-|
|value|输入框的值|string |`-`|-|
|position|下拉框的弹出位置|'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' |`bl`|-|
|status|状态|'error' \| 'warning' |`-`|2.45.0|
|clearIcon|`allowClear` 时配置清除按钮的图标。|ReactNode |`-`|2.50.0|
|notFoundContent|下拉列表没有数据时显示的内容|ReactNode |`-`|-|
|autoSize|是否自动调整输入框的高度|boolean \| { minRows?: number; maxRows?: number } |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|options|下拉框可选项|(\| string\| number\| { label: ReactNode \| string; value: string \| number; disabled?: boolean })[] |`-`|-|
|prefix|触发关键字|string \| string[] |``@``|-|
|style|节点样式|CSSProperties |`-`|-|
|triggerProps|可以接受所有 Trigger 组件的 Props|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|wrapperStyle|开启字数统计之后，会在 `textarea` 标签外包一层 `div`，`wrapperStyle` 用来配置这个 `div` 的样式。|CSSProperties |`-`|-|
|filterOption|是否根据输入的值筛选数据，可传入函数自定义过滤逻辑。|false \| ((inputValue: string, option) => boolean) |`-`|-|
|getPopupContainer|弹出框挂载的父节点|(node: HTMLElement) => HTMLElement |`-`|-|
|onBlur|失焦时的回调|(e) => void |`-`|-|
|onChange|输入改变时的回调|(value: string) => void |`-`|-|
|onClear|点击清除按钮的回调|() => void |`-`|2.2.0|
|onFocus|聚焦时的回调|(e) => void |`-`|-|
|onPressEnter|按下回车键的回调|(e) => void |`-`|-|
|onSearch|搜索时的回调|(text: string, prefix: string) => void |`-`|-|

