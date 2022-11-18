`````
组件 / 数据输入

# 数字输入框 InputNumber

仅允许输入数字格式的输入框。
`````

%%Content%%

## API

### InputNumber

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|disabled|是否禁用|boolean |`-`|-|
|error|错误状态|boolean |`-`|-|
|hideControl|隐藏右侧按钮|boolean |`-`|-|
|readOnly|是否只读|boolean |`-`|2.17.0|
|strictMode|严格模式下，`onChange` 回调将返回字符串类型|boolean |`-`|2.42.0|
|max|最大值|number |`Infinity`|-|
|min|最小值|number |`-Infinity`|-|
|precision|数字精度。设置精度小于`step`的小数位时，取`step`的小数个数。|number |`-`|-|
|step|数字变化步长|number |`1`|-|
|placeholder|默认显示文案|string |`-`|-|
|mode|`embed` - 按钮内嵌模式，`button` - 左右按钮模式|'embed' \| 'button' |`embed`|-|
|size|不同尺寸的数字输入框。分别对应 `24px`, `28px`, `32px`, `36px`|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|prefix|显示前缀|ReactNode |`-`|-|
|suffix|显示后缀|ReactNode |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|defaultValue|初始值|number \| string |`-`|-|
|icons|配置图标|{up?: ReactNode;down?: ReactNode;plus?: ReactNode;minus?: ReactNode;} |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|value|当前值|undefined \| number \| string |`-`|-|
|formatter|定义输入框展示值|(value: number \| string, info: { userTyping: boolean; input: string }) => string |`-`|Param `info` in `2.41.0`|
|onBlur|输入框失去聚焦事件的回调|(e) => void |`-`|-|
|onChange|变化回调|(value: number) => void |`-`|-|
|onFocus|输入框聚焦事件的回调|(e) => void |`-`|-|
|onKeyDown|键盘事件回调|(e: Event) => void |`-`|-|
|parser|从 formatter 转换为数字，和 formatter 搭配使用。|(value: string) => number \| string |`(input) => input.replace(/[^\w\.-]+/g, '')`|-|

## 方法/Methods

|名称|描述|
|---|:---:|
|blur()|	移除焦点|
|focus()|	获取焦点|
