## 2.44.0

2023-01-13

### 🆕 功能升级

- `Popconfirm` 支持 `content` 属性([#1714](https://github.com/arco-design/arco-design/pull/1714))

## 2.40.2

2022-09-30

### 🐛 问题修复

- 修复 `Popconfirm` 组件开启 `focusLock` 时，Footer 内部 DOM 层级表现和默认不一致，导致按钮外边距样式失效的问题([#1437](https://github.com/arco-design/arco-design/pull/1437))

## 2.39.3

2022-09-02

### 🐛 问题修复

- 修复 `Popconfirm` 组件在 `iframe` 内强制锁定焦点导致父页面无法获取焦点的 bug。([#1359](https://github.com/arco-design/arco-design/pull/1359))

## 2.31.0

2022-03-25

### 🆎 类型修正

- 修改 `Popconfirm` 组件的 `onOk` 参数的 TS 定义支持返回 `Promise<void>`([#689](https://github.com/arco-design/arco-design/pull/689))

## 2.29.0

2022-02-11

### 🆕 功能升级

- `Popconfirm` 组件 `onOk`,`onCancel` 回调方法暴露 `event` 参数([#501](https://github.com/arco-design/arco-design/pull/501))

## 2.25.0

2021-11-19

### 🆕 功能升级

- `Popconfirm` 组件添加按 `ESC` 关闭弹出框功能。([#167](https://github.com/arco-design/arco-design/pull/167))

## 2.20.0

2021-07-30

### 🐛 Bugfix

- 修复 `Popconfirm` 组件点击确认按钮 `onOk` 回调未返回 Promise 时也展示了 Loading 状态的 bug。

## 2.15.2

2021-05-14

### 🐛 Bugfix

- 修复 `Popconfirm` 组件 `onOk` 返回 `promise` 是 `reject` 之后不会关闭 loading 的 bug。

