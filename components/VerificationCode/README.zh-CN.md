`````
组件 / 输入

# 验证码输入 VerificationCode


验证码输入组件，`2.55.0` 支持
`````


%%Content%%

## API

### VerificationCode

`2.55.0` 支持

|参数名|描述|类型|默认值|
|---|---|---|---|
|disabled|禁用|boolean |`-`|
|masked|是否是密码模式|boolean |`-`|
|readOnly|只读|boolean |`-`|
|length|验证码的长度，根据长度渲染对应个数的输入框|number |`6`|
|defaultValue|默认值|string |`-`|
|value|验证码输入框的值，受控模式|string |`-`|
|size|尺寸|[InputProps](input#input)['size'] |`-`|
|status|状态|'error' |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|
|onChange|输入值改变时触发的回调|(value: string) => void |`-`|
|onFinish|输入框都被填充后触发的回调|(value: string) => void |`-`|
|separator|分隔符。可在不同索引的输入框后自定义渲染分隔符|(data: { index: number; character: string }) => ReactNode |`-`|
|validate|校验函数，用户输入值改变时触发|(data: { inputValue: string; value: string; index: number }) => boolean \| string |`-`|
