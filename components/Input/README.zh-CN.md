`````
组件 / 数据输入

# 输入框 Input

基本表单组件，并在原生控件基础上进行了功能扩展，可以组合使用。
`````

%%Content%%

## API

### Input

**Input 接受所有原生的属性值**

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|allowClear|允许清空输入框|`boolean`|`-`|-|
|disabled|是否禁用|`boolean`|`-`|-|
|readOnly|是否只读|`boolean`|`-`|-|
|defaultValue|默认值|`string`|`-`|-|
|placeholder|输入框提示文字|`string`|`-`|-|
|error|是否是错误状态|`boolean`|`-`|-|
|onChange|输入时的回调|`(value: string, e) => void`|`-`|-|
|onClear|点击清除按钮的回调|`() => void`|`-`|-|
|onPressEnter|按下回车键的回调|`(e) => void`|`-`|-|
|addBefore|输入框前添加元素|`ReactNode`|`-`|-|
|addAfter|输入框后添加元素|`ReactNode`|`-`|-|
|prefix|添加前缀文字或者图标|`ReactNode`|`-`|-|
|suffix|添加后缀文字或者图标|`ReactNode`|`-`|-|
|value|输入框的值，受控模式|`string`|`-`|-|
|beforeStyle|输入框前添加元素的样式|`object`|`-`|-|
|afterStyle|输入框后添加元素的样式|`object`|`-`|-|
|size|输入框的尺寸|`'mini' \| 'small' \| 'default' \| 'large'`|`default`|-|
|height|自定义输入框高度|`number \| string`|`-`|-|
|maxLength|输入框最大输入的长度；设置 `errorOnly`为 `true` 后，超过 `maxLength` 会展示 `error` 状态，并不限制用户输入。|`number \| { length: number; errorOnly?: boolean }`|`-`|`errorOnly` in 2.23.0|
|showWordLimit|配合 `maxLength`，显示字数统计|`boolean`|`-`|-|

### Input.TextArea

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|-|
|wrapperStyle|开启字数统计之后，会在 `textarea` 标签外包一层 `div`，`wrapperStyle` 用来配置这个 `div` 的样式。|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|disabled|是否禁用|`boolean`|`-`|-|
|defaultValue|默认值|`string`|`-`|-|
|value|值|`string`|`-`|-|
|autoSize|是否自动调整输入框的高度|`boolean \| { minRows?: number; maxRows?: number }`|`-`|-|
|error|是否是错误状态|`boolean`|`-`|-|
|placeholder|输入框提示文字|`string`|`-`|-|
|onChange|输入时的回调|`(value: string, e) => void`|`-`|-|
|onPressEnter|按下回车键的回调|`(e) => void`|`-`|-|
|maxLength|输入框最大输入的长度；设置 `errorOnly`为 `true` 后，超过 `maxLength` 会展示 `error` 状态，并不限制用户输入。|`number \| { length: number; errorOnly?: boolean }`|`-`|`errorOnly` in 2.23.0|
|allowClear|允许清空输入框|`boolean`|`-`|2.2.0|
|onClear|点击清除按钮的回调|`() => void`|`-`|2.2.0|

### Input.Group

|参数名|描述|类型|默认值|
|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|
|className|节点类名|`string \| string[]`|`-`|
|compact|是否使用紧凑模式|`boolean`|`-`|

### Input.Search

包含 Input 组件所有参数

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|loading|搜索时展示加载状态|`boolean`|`-`|2.6.0|
|onSearch|点击搜索按钮的回调|`(value: string) => void`|`-`|-|
|searchButton|搜索按钮|`boolean \| ReactNode`|`-`|`ReactNode` in 2.6.0|

### Input.Password

包含 Input 组件所有参数

|参数名|描述|类型|默认值|
|---|---|---|---|
|visibilityToggle|是否显示切换密码可见状态的按钮|`boolean`|`-`|
|defaultVisibility|初始是否显示|`boolean`|`-`|
|visibility|是否显示|`boolean`|`-`|
|onVisibilityChange|visibility 改变时触发|`(visibility: boolean) => void`|`-`|

## 方法

| 参数名 |     描述     |    类型    | 默认值 |
| ------ | :----------: | :--------: | -----: |
| focus  |   焦点事件   | `Function` |    `-` |
| blur   | 失去焦点事件 | `Function` |    `-` |

**示例**

```js
<Input ref={(ref) => (this.input = ref)} />;

this.input.focus();
this.input.blur();
```
