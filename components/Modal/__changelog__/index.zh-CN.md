## 2.32.0

2022-04-15

### 🐛 问题修复

- 优化`Modal`在弹窗内弹窗, 使用 ESC 时会关闭所有弹窗的行为([#629](https://github.com/arco-design/arco-design/pull/629))

## 2.27.1

2021-12-24

### 🐛 问题修复

- 修复 `Modal`  组件在默认打开状态时国际化不起作用的问题([#339](https://github.com/arco-design/arco-design/pull/339))

## 2.23.0

2021-09-27

### 💎 优化

- `Modal` 组件 `onOk` 在返回 Promise 时，会自动处理 loading。

## 2.21.0

2021-08-20

### 🆕 功能升级

- `Modal` 组件新增 `useModal` 用法。
- `Modal` 组件支持通过`closeIcon`属性自定义关闭图标

## 2.19.3

2021-07-23

### 💅 Style

- 修复 `Modal` 组件在打开时 title 中图标可能抖动的问题。



## 2.19.0

2021-07-16

### 🐛 Bugfix

- 修复 `Modal` 组件 `footer` 参数与 `propTypes` 中不统一的 bug。

## 2.17.0

2021-06-18

### 🐛 Bugfix

- 修复 `Modal` 在 `mask` 连续点击会触发两次 `onCancel` 的bug。

## 2.16.0

2021-05-28

### 🆕 Feature

- `Modal` 组件新增 `wrapStyle` 属性。

### 🐛 Bugfix

- 修复 `Modal` 组件的标题文本加粗样式失效的问题。
- 修复 `Modal` 组件缩放动画表现异常的问题。

## 2.15.3

2021-05-21

### 💎 Optimization

- 优化 `Modal` 关闭交互，在内容区域按下鼠标移动到 `mask` 区域释放时，不会关闭。

## 2.15.2

2021-05-14

### 💅 Style

- `Modal` 组件内容区域添加默认字体大小。



## 2.14.2

2021-04-23

### 💎 Optimization

- `Modal` 和 `Drawer` 组件显示的时候计算滚动条宽度避免抖动。



## 2.14.1

2021-04-16

### 💅 Style

- `Modal` 组件的 `box-sizing` 调整为 `border-box`。

## 2.14.0

2021-04-09

### 🐛 Bugfix

- `Modal` 组件根据自身样式指定 zindex。



## 2.13.2

2021-04-01

### 🐛 Bugfix

- 修复 `Modal` 组件 unmount 时，全局的 overflow 不会更新的 bug。

## 2.12.0

2021-03-19

### 🆕 Feature

- `Modal` 组件的 `footer` 属性支持传入自定义渲染函数。



## 2.11.1

2021-03-15

### 🐛 Bugfix

- 修复 `Modal` 组件设置宽度百分比失效的问题。



## 2.11.0

2021-03-12

### 🆕 Feature

- `Modal` 组件支持 `Modal.destroyAll` 关闭所有确认型对话框。

### 💅 Style

- `Modal` 组件分离滚动条动画，避免滚动条闪动。



## 2.10.0 🏮

2020-02-26

### 🐛 Bugfix

- 修复 `Modal` 点击滚动条导致弹窗关闭的 bug。



## 2.7.2

2021-01-19

### 🐛 Bugfix

- 修复 `Modal` 通过静态方法创建的弹窗，在调用 `update` 方法时若未传入 `title` 属性，弹窗创建时候传入的 `icon` 属性会重复生效，导致出现多个图标的 bug。

## 2.6.0

2021-01-08

### 🆕 Feature

- `Modal` 组件新增 `maskStyle` 属性，支持设置遮罩层样式。

### 🐛 Bugfix

- 修复 `Modal` 组件卸载后，点击 `esc` 时 `onCancel` 函数仍会执行的 bug。



## 2.3.2

2020-12-10

### 🐛 Bugfix

- 修复 `Modal` 组件内部弹出型组件弹出框定位有误的问题。

## 2.3.1

2020-12-04

### 🐛 Bugfix

- 修复 `Modal` 组件 `modalRender` 仅返回一个 `select`,下拉框被 mask 遮盖的问题。
- 修复 `closable` 属性在 `Modal` 通过静态方法创建弹窗时不生效的 bug。


## 2.3.0

2020-11-27

### 🐛 Bugfix

- 修复 `Modal` 组件静态方法创建的弹窗 `isNotice` 属性被映射到 HTML 标签，造成控制台警告的 bug。

## 2.2.1

2020-11-24

### 💅 Style

- 修复 `Modal` 内容未折行的问题。



## 2.2.0

2020-11-20

### 🆕 Feature

- `Modal` 组件新增 `modalRender` 属性以支持自定义弹窗节点。

### 💅 Style

- 修复 `Modal` 组件宽度 100% 时折行的问题。



## 2.0.0

2020-10-30

### 💎 Optimization

- 优化 `Modal` `Cascader` 组件动画。



