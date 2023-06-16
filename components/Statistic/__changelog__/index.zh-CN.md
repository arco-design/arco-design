## 2.49.2

2023-06-16

### 🐛 问题修复

- 修复 `Statistic` 组件 `value` 不为数字时，传入的 `prefix` 未被渲染的问题。([#2037](https://github.com/arco-design/arco-design/pull/2037))

## 2.47.0

2023-04-14

### 🆕 功能升级

- `Statistic` 组件新增 `styleDecimal` 属性设置小数部分样式。([#1900](https://github.com/arco-design/arco-design/pull/1900))

## 2.40.0

2022-09-16

### 💅 样式更新

- 修复 `Statistic` 不传 `prefix` / `suffix` 时，对应 dom 节点仍然渲染的 bug。([#1388](https://github.com/arco-design/arco-design/pull/1388))

## 2.36.0

2022-06-24

### 🆕 功能升级

- `Statistic` 新增 `renderFormat` 参数支持自定义渲染。([#1044](https://github.com/arco-design/arco-design/pull/1044))

## 2.29.0

2022-02-11

### 🐛 问题修复

- 修复 `Statistic` 组件 `precision=0` 不生效的 问题([#531](https://github.com/arco-design/arco-design/pull/531))

## 2.23.0

2021-09-27

### 🆎 类型修正

- `Statistic` 组件 `value` 支持传入 string, number, date 类型。

## 2.20.0

2021-07-30

### 🆕 Feature

- `Statistic` 组件新增 `loading` 属性以设置加载中的状态。

## 2.17.3

2021-06-24

### 💅 Style

- 修复 `Statistic` 组件 `styleValue` 传入的样式未应用到整数部分的问题。

## 2.11.0

2021-03-12

### 🐛 Bugfix

- 修复 `Statistic` 组件在传入 `value` `为字符串时，suffix` 不生效的 bug。



## 2.5.1

2020-12-31

### 💅 Style

- 解决 `Statistic` 组件 value 为非数字的时候字体样式大小不一致的问题。

## 2.2.0

2020-11-20

### 🐛 Bugfix

- 修复 `Statistic` 组件设置 `value` 为 `0` 且 `countUp` 为 `true` 时显示 `NaN` 的 bug。

