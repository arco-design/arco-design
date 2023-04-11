## 2.46.3

2023-04-07

### 🆎 类型修正

- 完善 `Input.Textarea` TS 定义([#1899](https://github.com/arco-design/arco-design/pull/1899))

## 2.36.1

2022-07-01

### 🐛 问题修复

- 修复 `Input` 组件导致的控制台 React Warning(not recognize prop on a DOM element)。([#1070](https://github.com/arco-design/arco-design/pull/1070))

## 2.35.0

2022-06-10

### 🐛 问题修复

- 修复 `Input.TextArea` 组件输入中文时长度有可能超过 `maxLength` 的 bug。([#988](https://github.com/arco-design/arco-design/pull/988))

## 2.32.1

2022-04-22

### 💎 功能优化

- 优化 `Input.Textarea` 组件外部调用 `focus` 时光标位置。([#800](https://github.com/arco-design/arco-design/pull/800))

## 2.31.0

2022-03-25

### 💅 样式更新

- 修复在特定场景下 `Input` 的清除按钮无法隐藏的bug([#685](https://github.com/arco-design/arco-design/pull/685))

## 2.30.2

2022-03-18

### 🐛 问题修复

- 修复 `Input` 同时设置  `allowClear` 和 `readOnly` 属性时， 依然展示清除按钮的问题。([#640](https://github.com/arco-design/arco-design/pull/640))

## 2.29.2

2022-02-25

### 🐛 问题修复

- 修复 `Input` 组件粘贴文本并清空之后，无法再次粘贴同样文本的 bug。([#584](https://github.com/arco-design/arco-design/pull/584))

## 2.29.0

2022-02-11

### 🐛 问题修复

- 修复 `Input` 组件在 Firefox 中输入中文会连续触发两次 `onChange` 的 bug。([#522](https://github.com/arco-design/arco-design/pull/522))

## 2.28.1

2022-01-14

### 🐛 问题修复

- 修复 `Input` 组件点击清除图标边缘区域未清除文本的 `bug`。([#438](https://github.com/arco-design/arco-design/pull/438))
- 修复 `Input.Search` 在不同尺寸下，`searchButton` 尺寸未调整的问题。([#438](https://github.com/arco-design/arco-design/pull/438))

## 2.28.0

2022-01-07

### 🐛 问题修复

- 修复 `Input` 组件在输入中文并直接选中自动补全选项时，未触发 `onChange` 的 bug。([#407](https://github.com/arco-design/arco-design/pull/407))

## 2.23.0

2021-09-27

### 🆕 功能升级

- `Input` 组件 `maxLength` 支持 `errorOnly` 模式。在超过 `maxLength` 时不会限制用户输入，但会展示错误状态

## 2.18.0

2021-07-02

### ⚠️ Important attention

- 之前同时设置 `allowClear` 和 `props.className` 时，className 会错误的应用到内层 input 标签上，**抱歉这个改动可能会引起 breaking change，请关注**。



## 2.17.3

2021-06-24

### 🐛 Bugfix

- 修复 `Input.Search` 未触发 `onPressEnter` 的问题。

## 2.16.0

2021-05-28

### 🐛 Bugfix

- 修复 `Input` 样式在less 4.x中编译失败的问题。

## 2.15.2

2021-05-14

### 🐛 Bugfix

- 修复 `Input.Search` 禁用时，右侧的搜索按钮未禁用的 bug。

## 2.13.2

2021-04-01

### 💅 Style

- 调整不同尺寸的 `Input` 组件的左右内边距样式。
- 修复 `Input` 组件在父元素设置了高度，且设置 `allowClear` 时，输入框高度变为父元素高度的 100% 的问题。



## 2.13.0

2021-03-26

### 🐛 Bugfix

- 修复 `Input` 组件在使用 `addBefore` 时，输入框内的内容无法被鼠标选中的 bug。

## 2.12.0

2021-03-19

### 🐛 Bugfix

- 修复 `Input` 组件的前后缀中的 `Tooltip` 内容无法被复制的问题。

### 💅 Style

- 修复 `Input` 组件的前后置标签中，`Select` 选中的内容不居中的问题。



## 2.9.1

2021-02-20

### 🐛 Bugfix

- 修复 `Input.Search` 组件被禁用时，点击搜索图标仍然触发了 `onSearch` 回调的 bug。



## 2.8.2

2021-01-29

### 💅 Style

- 修复 `Input` 组件禁用样式在 safari 下可能出现文字颜色变白色的问题。

## 2.8.1

2021-01-28

### 🐛 Bugfix

- 修复 `Input` 组件引入了全量图标导致按需加载失效的 bug。



## 2.8.0

2021-01-22

### 💅 Style

- 修复 `Input` 组件前后缀分割线样式丢失的问题。

## 2.6.0

2021-01-08

### 🆕 Feature

- `Input.Search` 支持 `loading`属性。
- `Input.Search` 的`searchButton`属性支持传入 `ReactNode`。



### 🐛 Bugfix

- 修复 `Input.Search` 在设置 `allowClear`后，搜索图标被遮盖，无法被点击的问题。

### 💅 Style

- 修复 `Input.Search`默认 `searchButton`的宽度为 `32px` ，对齐设计稿。



## 2.4.0

2020-12-11

### 🆎 TypeScript

- 修改 `Input`，`Upload` 组件的 ref 定义。

## 2.2.0

2020-11-20

### 🆕 Feature

- `Input.TextArea` 组件新增 `allowClear` 和 `onClear` 属性，支持清除已输入内容。

## 2.1.2

2020-11-13

### 💅 Style

- 修复 `Input.TextArea` 结合 `showWordLimit` 使用时，宽度不为 `100%` 的问题。



## 2.0.0

2020-10-30

### 🐛 Bugfix

- `Input` 组件当值是 `null` 的时候展示空字符串。


