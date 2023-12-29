## 2.58.0

2023-12-29

### 💎 功能优化

- 优化 `InputTag` 清除所有标签时高度抖动的问题。([#2455](https://github.com/arco-design/arco-design/pull/2455))

## 2.56.1

2023-11-24

### 🐛 问题修复

- 修复 `InputTag` 组件 `onChange` 回调用时较长时自动分词将会连续触发两次的问题。([#2381](https://github.com/arco-design/arco-design/pull/2381))

## 2.48.0

2023-05-12

### 🐛 问题修复

- 调整 `InputTag` 组件的拖拽样式类名 `arco-draggable` => `@{prefix}-draggable`([#1963](https://github.com/arco-design/arco-design/pull/1963))

## 2.47.1

2023-04-21

### 🐛 问题修复

- 修复 `InputTag` 组件 `dragToSort` 功能不可用的问题。([#1936](https://github.com/arco-design/arco-design/pull/1936))

## 2.47.0

2023-04-14

### 🆕 功能升级

- `InputTag` 组件新增 `prefix/addBefore/addAfter` 属性（同 `Input`）。([#1918](https://github.com/arco-design/arco-design/pull/1918))

## 2.45.0

2023-02-17

### 🐛 问题修复

- 修复 `InputTag` 粘贴文本自动分词的校验结果全部不通过时 `validate` 函数会连续触发两轮的问题。([#1784](https://github.com/arco-design/arco-design/pull/1784))

## 2.44.3

2023-02-14

### 🐛 问题修复

- 修复 `InputTag` 的 `validate` 回调返回非布尔值时，`onChange` 回调中的 `value.label` 值不为用户输入文本的问题。([#1774](https://github.com/arco-design/arco-design/pull/1774))

## 2.44.2

2023-02-10

### 🐛 问题修复

- 修复 `InputTag` 组件 `validate` 回调未对 `tokenSeparators` 触发的值更新生效的问题。([#1764](https://github.com/arco-design/arco-design/pull/1764))

## 2.44.0

2023-01-13

### 🆕 功能升级

- `InputTag` 组件新增 `tokenSeparators` 属性以支持自动分词。([#1720](https://github.com/arco-design/arco-design/pull/1720))

## 2.41.0

2022-10-28

### 🐛 问题修复

- 修复 `InputTag` 组件开启 `dragToSort` 时，切换禁用状态时会将 Tag 重复渲染两遍的 bug。([#1457](https://github.com/arco-design/arco-design/pull/1457))

## 2.39.3

2022-09-02

### 🐛 问题修复

- 修复 `InputTag` 设置 `disabled` 时 `placeholder` 未按预期展示的 bug。([#1357](https://github.com/arco-design/arco-design/pull/1357))

## 2.39.2

2022-08-26

### 💅 样式更新

- `InputTag` 组件 `placeholder` 过长时末尾使用 `...` 展示。([#1339](https://github.com/arco-design/arco-design/pull/1339))

## 2.37.0

2022-07-08

### 🆕 功能升级

- `InputTag` 组件允许通过 `validate` 属性格式化用户输入的值。([#1110](https://github.com/arco-design/arco-design/pull/1110))

## 2.30.2

2022-03-18

### 🐛 问题修复

- 修复 `InputTag` 组件同时设置 `allowClear` 和 `readOnly` 时， 依然展示清除按钮的 bug。([#651](https://github.com/arco-design/arco-design/pull/651))

## 2.29.2

2022-02-25

### 🐛 问题修复

- 修复 `InputTag` 的 `clear-icon` 样式未生效的bug([#589](https://github.com/arco-design/arco-design/pull/589))

## 2.28.2

2022-01-21

### 💎 优化

- `InputTag` 阻止回车时提交表单。([#482](https://github.com/arco-design/arco-design/pull/482))

## 2.27.0

2021-12-17

### 🆕 功能升级

- `InputTag` 新增 `dragToSort` 属性以支持通过拖拽为已输入的值排序 。([#325](https://github.com/arco-design/arco-design/pull/325))

## 2.25.0

2021-11-19

### 🆕 功能升级

- `InputTag` 新增 `saveOnBlur` 属性以支持在失焦时自动保存用户正在输入的内容。([#183](https://github.com/arco-design/arco-design/pull/183))

## 2.23.5

2021-10-29

### 🐛 问题修复

- 修复InputTag组件默认的validate函数永远返回false的bug([#43](https://github.com/arco-design/arco-design/pull/43))

## 2.23.1

2021-10-15

### 🐛 问题修复

- 修复 `InputTag` 组件输入连续空格时输入框宽度异常的 bug。

## 2.21.0

2021-08-20

### 💅 Style

- 修复 `InputTag` 组件允许清除时，鼠标悬浮界面可能抖动的问题。

## 2.20.0

2021-07-30

### 🆕 Feature

- `InputTag` 组件新增 `onClear` 和 `onClick` 回调。



