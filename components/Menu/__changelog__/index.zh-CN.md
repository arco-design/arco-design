## 2.66.15

2026-05-08

### 🐛 问题修复

- 修复ResizeObserver 回调内同步测量并更新 `Menu`溢出状态，触发连续布局抖动，浏览器上报 loop error问题([#3176](https://github.com/arco-design/arco-design/pull/3176))

## 2.65.0

2024-11-29

### 🐛 问题修复

- 修复 `Menu` 自动省略边界场景会循环计算，导致浏览器不停闪烁的 bug([#2816](https://github.com/arco-design/arco-design/pull/2816))

## 2.57.0

2023-12-08

### 🆕 功能升级

- `Menu` 组件新增 `onEllipsisChange` 回调以通知水平菜单内容自动省略状态发生改变。([#2426](https://github.com/arco-design/arco-design/pull/2426))

## 2.52.2

2023-09-01

### 🐛 问题修复

- 修复 `Menu` 组件 `rtl` 模式下折叠按钮的位置问题。([#2201](https://github.com/arco-design/arco-design/pull/2201))

## 2.51.2

2023-08-11

### 🐛 问题修复

- 修复 `Popover` 作为 `Menu` 直接子节点报错的问题。([#2138](https://github.com/arco-design/arco-design/pull/2138))

## 2.51.0

2023-07-28

### 🆕 功能升级

- `Menu.Item` 组件新增 `renderItemInTooltip` 属性，用以指定 `Menu` 收起时 `Tooltip` 中展示的菜单项节点。([#2106](https://github.com/arco-design/arco-design/pull/2106))

## 2.48.2

2023-05-26

### 💅 样式更新

- 优化 `Menu` 折叠之后，菜单项图标未水平居中的问题。([#1991](https://github.com/arco-design/arco-design/pull/1991))

## 2.44.1

2023-02-03

### 💎 功能优化

- `Menu.SubMenu` 允许传入 HTML 原生属性。([#1746](https://github.com/arco-design/arco-design/pull/1746))
- 优化水平菜单项内图标与文本之间的默认间距。([#1746](https://github.com/arco-design/arco-design/pull/1746))

## 2.44.0

2023-01-13

### 🆕 功能升级

- `Menu` 组件 `ellipsis` 属性支持传入 `{ text: ReactNode }` 属性以自定义溢出文本。([#1700](https://github.com/arco-design/arco-design/pull/1700))

## 2.41.1

2022-11-04

### 💎 功能优化

- 优化 `Menu` 组件水平模式自动折叠时可能出现的抖动问题。([#1543](https://github.com/arco-design/arco-design/pull/1543))

## 2.39.3

2022-09-02

### 💅 样式更新

- 优化 `Menu` 组件中内嵌 `<a/>` 的样式。([#1362](https://github.com/arco-design/arco-design/pull/1362))

## 2.39.2

2022-08-26

### 💎 功能优化

- 优化水平 `Menu` 宽度改变时自动折叠的表现，避免偶发的折行。([#1331](https://github.com/arco-design/arco-design/pull/1331))

### 💅 样式更新

- 修复 `Menu` 组件内置折叠按钮显示位置出错的 bug([#1332](https://github.com/arco-design/arco-design/pull/1332))

## 2.36.0

2022-06-24

### 💎 功能优化

- `Menu` 组件支持使用 Tab 键进行切换操作。([#1038](https://github.com/arco-design/arco-design/pull/1038))

### 💅 样式更新

- 修复 `Menu.SubMenu` 展开时其右侧的箭头方向未改变的问题。([#1022](https://github.com/arco-design/arco-design/pull/1022))

## 2.35.0

2022-06-10

### 💅 样式更新

- 修复 `Menu` 组件子菜单标题栏图标未垂直居中的问题。([#985](https://github.com/arco-design/arco-design/pull/985))

## 2.34.0

2022-05-27

### 💅 样式更新

- 调整 `Menu` 的子菜单从左侧弹出时弹出层的位置。([#923](https://github.com/arco-design/arco-design/pull/923))

## 2.33.1

2022-05-20

### 🐛 问题修复

- 修复 `Menu` 组件折叠状态下子菜单标题的图标未展示的 bug。([#889](https://github.com/arco-design/arco-design/pull/889))

## 2.32.2

2022-04-29

### 🐛 问题修复

- 修复 `Menu` 组件 `collapse` 属性变化时，已经展开的子菜单被收起的 bug。([#820](https://github.com/arco-design/arco-design/pull/820))

## 2.27.1

2021-12-24

### 💎 优化

- `Menu.SubMenu` 在非弹出模式下同样支持 `selectable` 属性。([#355](https://github.com/arco-design/arco-design/pull/355))

## 2.26.0

2021-12-03

### 💅 样式更新

- 修复 `Menu` 组件已选中菜单项中的 Icon 颜色变化没有过渡效果的问题。([#263](https://github.com/arco-design/arco-design/pull/263))

## 2.24.1

2021-11-12

### 🐛 问题修复

- `Menu.SubMenu` 组件修复嵌套使用时，内层 `SubMenu` 属性被父 `SubMenu` 覆盖的 bug。([#145](https://github.com/arco-design/arco-design/pull/145))

### 💅 样式更新

- `Menu` 组件折叠时隐藏菜单项图标后的文字，避免出现 `...` 。([#151](https://github.com/arco-design/arco-design/pull/151))

## 2.24.0

2021-11-05

### 🆕 功能升级

- `Menu` 新增 `ellipsis` 属性以支持禁用水平菜单的菜单项自动折叠功能([#115](https://github.com/arco-design/arco-design/pull/115))

### 🐛 问题修复

- `Menu` 传入的 `tooltipProps` 包含 `triggerProps` 时，会覆盖原有的类名 `menu-item-tooltip`([#99](https://github.com/arco-design/arco-design/pull/99))
- 修复 `Menu` 组件使用深色模式时点击更多菜单按钮弹出的气泡箭头颜色错误问题([#84](https://github.com/arco-design/arco-design/pull/84))
- 修复 `Menu` 因为读取 `null` 的属性导致报错的 bug([#115](https://github.com/arco-design/arco-design/pull/115))

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
