---
file: interface
---

`````
组件 / 数据输入

# 输入框 Input

基本表单组件，并在原生控件基础上进行了功能扩展，可以组合使用。
`````

%%Content%%

## API

%%Props%%

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
