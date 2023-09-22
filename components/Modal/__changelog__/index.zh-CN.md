## 2.53.2

2023-09-22

### 🐛 问题修复

- 修复 `Modal` 组件隐藏时重渲染组件可能触发子组件 ref 丢失的 bug。([#2251](https://github.com/arco-design/arco-design/pull/2251))

## 2.53.1

2023-09-15

### 💎 功能优化

- 导出 `ModalHookReturnType` 类型。([#2235](https://github.com/arco-design/arco-design/pull/2235))

## 2.51.0

2023-07-28

### 🐛 问题修复

- 修复 `Modal` 组件设置 `unmountOnExit=true` 并关闭弹窗后，弹窗外层节点未被 `unmount` 的 bug。([#2096](https://github.com/arco-design/arco-design/pull/2096) '')

## 2.48.1

2023-05-19

### 🐛 问题修复

- 修复 `Modal` 第一次挂载时，内部弹出型组件 `Modal` 计算错误的 bug.([#1977](https://github.com/arco-design/arco-design/pull/1977))

## 2.42.1

2022-12-02

### 🐛 问题修复

- 修复 `Modal.useModal` 返回的 `modal.confirm` 在 `useCallback` 中调用时，不显示弹出层的 bug。([#1628](https://github.com/arco-design/arco-design/pull/1628))
- 修复通过 `Modal.useModal` 创建的弹出层在通过 `update` 方法更新 title 时，icon 丢失的 bug。([#1628](https://github.com/arco-design/arco-design/pull/1628))
- 修复通过 `Modal.useModal` 创建的弹出层在 onOK 设置为 Promise 时，Promise 中通过 `update` 更新弹出层内容不生效的 bug。([#1628](https://github.com/arco-design/arco-design/pull/1628))

## 2.42.0

2022-11-25

### 🐛 问题修复

- 修复 `Modal` 组件通过 `update` 方法更新弹窗内容时丢失创建弹出层时传入的 config 的 bug.([#1609](https://github.com/arco-design/arco-design/pull/1609))
- 修复 `Modal` 组件通过静态方法创建弹出层时设置 `title={null}` & `icon={null}` 时，`.arco-modal-title` 节点仍然被渲染的 bug。([#1609](https://github.com/arco-design/arco-design/pull/1609))

## 2.40.2

2022-09-30

### 🐛 问题修复

- 修复 `Modal` 组件在 React 18  下卸载时控制台出现 warning 的 bug([#1440](https://github.com/arco-design/arco-design/pull/1440))

## 2.40.1

2022-09-23

### 🐛 问题修复

- 修复 `useModal` 的 `holderRef` 可能不存在的 bug([#1418](https://github.com/arco-design/arco-design/pull/1418))

## 2.39.3

2022-09-02

### 🐛 问题修复

- 修复 `Modal` 组件在 `iframe` 内强制锁定焦点导致父页面无法获取焦点的 bug。([#1359](https://github.com/arco-design/arco-design/pull/1359))

## 2.39.1

2022-08-19

### 🐛 问题修复

- 修复通过 `useModal` 创建弹窗实例时返回的方法 `update`为 `undefined` 的bug([#1300](https://github.com/arco-design/arco-design/pull/1300))

## 2.35.0

2022-06-10

### 🐛 问题修复

- 修复 `Modal` 组件通过 `useModal` 创建弹出框时传入的 `simple` 属性不生效的 bug。([#980](https://github.com/arco-design/arco-design/pull/980))

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



