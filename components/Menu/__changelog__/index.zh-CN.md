## 2.21.1

2021-08-27

### 💎 优化

- 优化水平菜单自适应宽度隐藏菜单项的临界表现

### 🆕 功能升级

- `Menu` 组件支持键盘快捷键操作。

### 💅 Style

- `Menu` 组件暗色主题时优化其弹出菜单为暗色；

## 2.19.1

2021-07-18

### 🐛 Bugfix

- 修复 `Menu` 组件 `children` 传入假值时导致页面报错的 bug。

## 2.19.0

2021-07-16

### 💎 Optimization

- 优化 `Menu` 组件水平菜单的弹出层在鼠标移动较慢时点击不到的问题。

### 🆕 Feature

- `Menu` 组件 `onClickMenuItem` 和 `onClickSubMenu` 回调支持 `keyPath` 参数。
- `Menu` 组件 `Menu.SubMenu` 新增 `triggerProps` 属性以自定义弹出行为。

## 2.16.1

2021-06-04

### 🐛 Bugfix

- 修复 `Menu` 组件开发环境控制台的 HTML attribute 警告。



## 2.16.0

2021-05-28

### 🆕 Feature

- `Menu.Item` 组件新增 `wrapper` 属性以支持自定义外层 HTML 标签。

### 🐛 Bugfix

- 修复 `Menu` 组件在服务端渲染时 `useLayoutEffect` 报警告的问题。

## 2.15.0

2021-04-30

### 🆕 Feature

- `Menu` 组件 `onClickMenuItem` 回调新增 `event` 参数。

## 2.14.0

2021-04-09

### 💅 Style

- 修复 `Menu` 组件位于 `SubMenu` 中的菜单项文字长度过长时未展示为省略号的问题。



## 2.8.1

2021-01-28

### 🐛 Bugfix

- 设定 `Menu` 组件 `autoScrollIntoView` 的滚动边界，避免 `body` 的异常滚动。

## 2.8.0

2021-01-22

### 🆕 Feature

- `Menu.SubMenu` 新增 `popup` 属性强制指定使用弹出模式。

### 🐛 Bugfix

- 修复 `Menu` 组件 `hasCollapseButton` 设置 `icons.collapseActive` 时导致报错。

## 2.7.0

2021-01-15

### 🐛 Bugfix

- 修复 `Menu` 组件 `autoOpen` 对于多层嵌套的 `SubMenu` 不生效的问题。

## 2.5.1

2020-12-31

### 🐛 Bugfix

- 修复 `Menu` 组件动态修改 `children` 时，`autoOpen` 属性失效的 bug。

## 2.5.0 🎅🏽

2020-12-25 🎄

### 🐛 Bugfix

- 修复 `Menu` 组件水平模式在服务端渲染时存在抖动的 bug。

## 2.4.1

2020-12-18

### 🐛 Bugfix

- 修复 `Menu`组件`horizontal`模式下自适应宽度菜单项收缩表现异常。



## 2.3.1

2020-12-04

### 🐛 Bugfix

- 修复 `SubMenu` 热更新时 undefined 导致的报错问题。

### 💅 Style

- 消除 `Menu` 中 `<a>` 的默认样式。

## 2.3.0

2020-11-27

### 💎 Optimization

- 优化 `Menu` 组件水平模式时设置高度的简易程度。
