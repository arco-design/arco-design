## 2.27.0

2021-12-17

### 🆎 类型修正

- `InputNumber` 允许通过属性传递所有的 `InputHTMLAttributes`。([#326](https://github.com/arco-design/arco-design/pull/326))

## 2.24.0

2021-11-05

### 🐛 问题修复

- 修复 `InputNumber` 在传入与 `precision` 精度不一致的 `value` 时展示了错误状态的 bug。([#116](https://github.com/arco-design/arco-design/pull/116))

## 2.21.0

2021-08-20

### 💎 优化

- `InputNumber` 延长鼠标长按按钮触发自动增减的等待时间以避免误操作。

## 2.19.3

2021-07-23

### 🐛 Bugfix

- 修复 `InputNumber` 组件和 `InputTag` 组件作为 `Popover` 的 children 时，弹出层未弹出的 bug。

## 2.18.2

2021-07-09

### 🐛 Bugfix

- 修复 `InputNumber` 组件 `value` 传入空字符串时被错误解析为 0 的 bug。

## 2.18.0

2021-07-02

### 💎 Optimization

- `InputNumber` 组件 `value` 传入字符串时尝试将其转为数字。
- 调整 `InputNumber` 组件校正传入的非法 `value` 的时机，确保在用户操作过之后才将其校正。



### 🐛 Bugfix

- 修复 `InputNumber` 组件输入字母字符时可能导致输入框的内容变为 undefined 的 bug。

## 2.17.0

2021-06-18

### 💎 Optimization

- `InputNumber` 组件在设置了 `max` 或 `min` 时传入非法的初始值，首次渲染时保留初始值，待用户操作后再纠正。

### 🆕 Feature

- `InputNumber` 组件新增 `readOnly` 属性。

### 🐛 Bugfix

- 修复 `InputNumber` 受控时设置 `value` 为 `undefined` 未生效的 bug.

### 💅 Style

- 修复 `InputNumber` 禁用时，文字在 `Safari`中不显示的 bug。



## 2.14.1

2021-04-16

### 🐛 Bugfix

- 修复 `InputNumber` 组件设置精度时偶现输入后重新聚焦却无法编辑的 bug。

## 2.5.0 🎅🏽

2020-12-25 🎄

### 🐛 Bugfix

- 修复 `InputNumber` 作为 `Popover` 子元素无效的 bug。

## 2.1.0

2020-11-06

### 🐛 Bugfix

- 修复 `InputNumber` 在没有初始值和 `min` 的情况下，点击出现 `-Infinity` 的 bug。

