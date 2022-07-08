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
|value|输入框的值|string |`-`|-|
|defaultValue|输入框默认值|string |`-`|-|
|options|下拉框可选项|(\| string\| number\| { label: ReactNode \| string; value: string \| number; disabled?: boolean })[] |`-`|-|
|prefix|触发关键字|string \| string[] |``@``|-|
|split|选中项前后分隔符|string |`-`|-|
|alignTextarea|弹出框是否与输入框对齐|boolean |`true`|-|
|position|下拉框的弹出位置|'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' |`bl`|-|
|triggerProps|可以接受所有 Trigger 组件的 Props|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|notFoundContent|下拉列表没有数据时显示的内容|ReactNode |`-`|-|
|getPopupContainer|弹出框挂载的父节点|(node: HTMLElement) => HTMLElement |`-`|-|
|filterOption|是否根据输入的值筛选数据，可传入函数自定义过滤逻辑。|false \| ((inputValue: string, option) => boolean) |`-`|-|
|onChange|输入改变时的回调|(value: string) => void |`-`|-|
|onSearch|搜索时的回调|(text: string, prefix: string) => void |`-`|-|
|onFocus|聚焦时的回调|(e) => void |`-`|-|
|onBlur|失焦时的回调|(e) => void |`-`|-|
|error|是否是错误状态|boolean |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|placeholder|输入框提示文字|string |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|disabled|是否禁用|boolean |`-`|-|
|allowClear|允许清空输入框|boolean |`-`|2.2.0|
|onClear|点击清除按钮的回调|() => void |`-`|2.2.0|
|wrapperStyle|开启字数统计之后，会在 `textarea` 标签外包一层 `div`，`wrapperStyle` 用来配置这个 `div` 的样式。|CSSProperties |`-`|-|
|autoSize|是否自动调整输入框的高度|boolean \| { minRows?: number; maxRows?: number } |`-`|-|
|onPressEnter|按下回车键的回调|(e) => void |`-`|-|

