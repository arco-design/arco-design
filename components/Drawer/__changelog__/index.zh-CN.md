## 2.66.19

2026-11-26

### 🐛 问题修复

- 修复设置 `unmountOnExit` 后，重复关闭抽屉时 `afterClose` 不再触发的问题。([#3215](https://github.com/arco-design/arco-design/pull/3215))

## 2.66.9

2026-01-09

### 🐛 问题修复

- 修复 `Drawer` 配置了unmountOnExit，组件卸载后仍存在wrapper节点的问题([#3098](https://github.com/arco-design/arco-design/pull/3098))

## 2.56.2

2023-12-01

### 🐛 问题修复

- 修复 `Drawer` 组件 `autoFocus` 失效的问题([#2412](https://github.com/arco-design/arco-design/pull/2412))

## 2.53.1

2023-09-15

### 🐛 问题修复

- 修复 `Drawer` 组件的内容区域文本无法被选中复制的 bug。（该 bug 在 `2.53.0` 引入 ）([#2232](https://github.com/arco-design/arco-design/pull/2232) )

## 2.53.0

2023-09-08

### 🐛 问题修复

- 修复 `Drawer` 组件在点击文本内容后，escToExit 不生效的 bug。([#2222](https://github.com/arco-design/arco-design/pull/2222) )

## 2.49.0

2023-06-02

### 🆕 功能升级

- `Drawer` 组件支持通过 `closeIcon` 属性自定义关闭按钮。([#2006](https://github.com/arco-design/arco-design/pull/2006))

## 2.48.1

2023-05-19

### 🐛 问题修复

- 修复 `Drawer` 第一次挂载时，内部弹出型组件 `zIndex` 计算错误的 bug.([#1977](https://github.com/arco-design/arco-design/pull/1977))

## 2.46.3

2023-04-07

### 🐛 问题修复

- 修复同时存在多层 `Drawer` 时，按键`ESC`所有抽屉被关闭的 bug。([#1902](https://github.com/arco-design/arco-design/pull/1902))

## 2.46.2

2023-03-31

### 🐛 问题修复

- 修复 `Drawer` 组件在弹出层完全退出前就重置了挂载节点的 `overflow`  属性导致的消失动画问题。([#1882](https://github.com/arco-design/arco-design/pull/1882))

## 2.42.0

2022-11-25

### 🆕 功能升级

- `Drawer` 组件支持 `zIndex` 属性([#1604](https://github.com/arco-design/arco-design/pull/1604))

## 2.40.0

2022-09-16

### 🆎 类型修正

- 优化 `Drawer` 组件  `placement` 属性的类型。([#1377](https://github.com/arco-design/arco-design/pull/1377))

## 2.39.3

2022-09-02

### 🐛 问题修复

- 修复 `Drawer` 组件在 `iframe` 内强制锁定焦点导致父页面无法获取焦点的 bug。([#1359](https://github.com/arco-design/arco-design/pull/1359))

## 2.36.1

2022-07-01

### 🐛 问题修复

- 修复 `Drawer` 在隐藏过程中设置 `visible=true` 时，再次点击蒙层抽屉无法被隐藏的 bug。([#1079](https://github.com/arco-design/arco-design/pull/1079))

## 2.26.0

2021-12-03

### 🆕 功能升级

- `Drawer` 组件支持 `okButtonProps` 和 `cancelButtonProps` 属性。([#260](https://github.com/arco-design/arco-design/pull/260))

## 2.23.0

2021-09-27

### 🐛 问题修复

- 修复 `Drawer` 组件设置 `mask={false}` 的时候，无法操作抽屉外部元素的问题

## 2.19.0

2021-07-16

### 🐛 Bugfix

- 修复 `Drawer` 组件在内容包含可聚焦元素的情况下，第一次打开会抖动的问题。



## 2.13.0

2021-03-26

### 🆕 Feature

- `Drawer` 组件新增 `focusLock` 和 `autoFocus` 参数。

## 2.10.0 🏮

2020-02-26

### 🆕 Feature

- `Drawer` 支持点击 esc 隐藏抽屉。

## 2.9.1

2021-02-20

### 🐛 Bugfix

- 修复 `Drawer` 组件 `visible` 初始值为 `true` 且设置了 `getPopupContainer` 时，`Drawer` 仍为 fixed 定位的 bug。

## 2.9.0 🔥

2021-02-05

### 🆕 Feature

- `Drawer` 组件新增属性 `bodyStyle` 和 `headerStyle`。

## 2.5.1

2020-12-31

### 💅 Style

- 修改 `Drawer` 和 `Modal` 在暗黑下的背景色为 `color-bg-3（二级容器背景色）`，以便区分容器上的 `tooltip`。



## 2.2.1

2020-11-24

### 🐛 Bugfix

- 修复 `Drawer` 自定义 footer 含有弹出的 tooltip 被遮盖的问题。



## 2.1.0

2020-11-06

### 🐛 Bugfix

- 修复 `Drawer` 组件嵌套 `react-monaco-editor`，编辑器宽度渲染有误的 bug。

