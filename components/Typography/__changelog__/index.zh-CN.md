## 2.23.1

2021-10-15

### 🐛 问题修复

- 修复 `Typography` 组件对包裹多个动态字符串时会被解析成数组的 bug。
- 修复 `Typography` 组件设置 `ellipsis`后， 在 `editing` 状态时会报错的 bug。
## 2.23.0

2021-09-27

### 💎 优化

- 优化 `Typography` 超出省略情况下计算时机。

### 🐛 问题修复

- 修复 `Typography` 组件对英文字符截断错误导致文字溢出。

## 2.22.0

2021-09-10

### 🐛 问题修复

- 修复 `Typography` 在 `flex` 模式下文字展示宽度计算错误
- 修复 `Typography` 组件 `ellipsis` 受控时，无法重新渲染的 bug
- 修复 `Typography` 组件 `ellipsis` 传入 `onExpand` 时，无法触发调用的 bug
- 修复 `Typography` 窗口 `resize` 时，无法根据适口自动更新 `ellipsis` 状态的 bug

## 2.20.1

2021-08-06

### 🐛 Bugfix

- 修复 `Typography` 组件不支持传入原生 `dom` 属性的 bug。
- 修复 `Typography` 组件第一次渲染时有时候会抖动一下的 bug。

### 🆎 TypeScript

- 修改 `Typography` 组件的 `ellipsis.showTooltip.props` 为非必填



## 2.19.1

2021-07-18

### 🐛 Bugfix

- 修复 `Typography` 组件复制功能在安卓 webview 下不生效的 bug。



## 2.19.0

2021-07-16

### 🐛 Bugfix

- 修复 `Typography` 组件复制功能在安卓 webview 下不生效的 bug。

## 2.14.1

2021-04-16

### 🐛 Bugfix

- 修复 `Typography` 组件复制功能在 Android 系统浏览器上不生效的 bug。

## 2.5.0 🎅🏽

2020-12-25 🎄

### 🐛 Bugfix

- 修复 `Typography` 组件在展开后 `...` 依旧存在的 bug。

## 2.2.1

2020-11-24

### 🐛 Bugfix

- 修复 `Typography` 组件 `editable.onStart` 没有在点击 edit 图标时触发的 bug。

