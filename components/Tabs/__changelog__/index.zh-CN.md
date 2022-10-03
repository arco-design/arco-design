## 2.40.0

2022-09-16

### 💅 样式更新

- 修复深色模式下 `capsule` 类型的 `Tabs` 组件中禁用的 `TabPane` 标题区域的 hover 样式。([#1368](https://github.com/arco-design/arco-design/pull/1368))

## 2.39.0

2022-08-12

### 🐛 问题修复

- 修复 `Tabs` 组件 `extra` 节点宽度导致头部滚动临界值计算错误的 bug([#1275](https://github.com/arco-design/arco-design/pull/1275))

## 2.33.0

2022-05-13

### 🆕 功能升级

- `rounded` 类型的 `Tabs` 组件支持不同尺寸。([#817](https://github.com/arco-design/arco-design/pull/817))

## 2.32.2

2022-04-29

### 🐛 问题修复

- 修复 `Tabs` 组件滚动按钮展示/消失临界计算错误的 bug。([#819](https://github.com/arco-design/arco-design/pull/819))

## 2.28.1

2022-01-14

### 🐛 问题修复

- 修复`Tabs` 组件在子元素 `autofocus`情况下滚动出错的问题([#440](https://github.com/arco-design/arco-design/pull/440))

## 2.25.1

2021-11-26

### 🐛 问题修复

- 修复 `Tabs` 组件透传 `scrollPosition` 到 dom 的 warning。([#225](https://github.com/arco-design/arco-design/pull/225))
- 修复 `Tabs` 组件 的 `card` 类型头部高度不对的问题。([#220](https://github.com/arco-design/arco-design/pull/220))

## 2.23.0

2021-09-27

### 💅 样式更新

- 修复 `Tabs` 组件在 `vertical capsule` 时样式错误问题

## 2.20.1

2021-08-06

### 🐛 Bugfix

- 修复 `Tabs` 组件 `renderTabTitle` 被错误地传递给了 `div`，导致控制台报错的 bug。

## 2.19.0

2021-07-16

### 🆕 Feature

- `Tabs` 组件支持通过滚轮和触摸板进行滚动。

## 2.18.0

2021-07-02

### 🆕 Feature

- `Tabs` 组件新增 `renderTabTitle` 属性用于支持自定义每个 Tab 的头部内容。



## 2.16.0

2021-05-28

### 🆕 Feature

- `Tabs` 支持自定义删除/新增按钮。

## 2.15.0

2021-04-30

### 🆕 Feature

- `Tabs` 组件新增 `icons` 属性以支持配置删除按钮和新增按钮的图标。

### 🆎 TypeScript

- 补充 `Tabs` 组件 `renderTabHeader` 回调 `DefaultTabHeader` 参数的 TS 定义。

## 2.14.0

2021-04-09

### 🐛 Bugfix

- 修复 `Tabs` 组件 `headerPadding` 样式未生效的 bug。

## 2.9.1

2021-02-20

### 🐛 Bugfix

- 修复 `Tabs` 组件滚动更新异常的 bug。

## 2.7.0

2021-01-15

### 🐛 Bugfix

- 修复 `Tabs` 在 `type` 为 `capsule` 时滚动计算错误的问题。
- 修复 `Tabs` 的 header 滚动定位错误的问题。

### 💅 Style

- 修复 `Tab` 组件 `line` 类型的选项卡嵌套在 `card` 类型的选项卡内部时内容区域出现边框的问题。


## 2.6.0

2021-01-08

### 🆕 Feature

- `Tabs` 新增 `headerPadding`属性，控制`line`和`text`类型的选项卡是否存在左侧外边距。

## 2.5.1

2020-12-31

### 🐛 Bugfix

- `Tabs` 的 `header` 限制向左移动的最小值为 0，解决因动画引起的显示错误问题。

## 2.2.0

2020-11-20

### 🐛 Bugfix

- 修复 `Tabs` 组件 `TabPane` 的 `children` 都为 `null` 时显示内容的 DOM 节点仍然被渲染的 bug。



