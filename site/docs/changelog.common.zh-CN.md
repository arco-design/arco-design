## 2.57.0

2023-12-08

### 🆕 功能升级

- 支持 `pt-br` 语言。([#2429](https://github.com/arco-design/arco-design/pull/2429))

## 2.53.0

2023-09-08

### 🐛 问题修复

- 修复内部组件 `VirtualList `  边界场景下控制台报错问题([#2216](https://github.com/arco-design/arco-design/pull/2216))

## 2.48.2

2023-05-26

### 💎 功能优化

- `Select` / `Cascader` / `TreeSelect` 内部 `<input />` 节点处于隐藏状态时，移除其 `value` 属性，避免用户复制操作出现多余文本。([#1993](https://github.com/arco-design/arco-design/pull/1993))

## 2.48.0

2023-05-12

### 💎 功能优化

- 优化 `ResizeObserver` 监听逻辑，避免某些场景下出现 `ResizeObserver loop limit exceeded` 报错([#1962](https://github.com/arco-design/arco-design/pull/1962))

### 🆕 功能升级

- 支持土耳其语([#1942](https://github.com/arco-design/arco-design/pull/1942))

## 2.45.0

2023-02-17

### 🆕 功能升级

- `Input` 、`Select`、 `DatePicker`、 `TimePicker`、`Cascader` 、`TreeSelect`、`AutoComplete ` 支持通过 `status` 属性设置 `warning` 状态([#1786](https://github.com/arco-design/arco-design/pull/1786))

## 2.43.1

2022-12-30

### 💎 功能优化

- 优化虚拟列表在列表项设置了 `margin` 值时滚动定位偏移的问题。([#1690](https://github.com/arco-design/arco-design/pull/1690))
- 移除内部函数组件的 `defaultProps` 用法，避免在 React 18 严格模式下控制台 warning。([#1687](https://github.com/arco-design/arco-design/pull/1687))

### 🐛 问题修复

- 修复部分组件在 React 18 严格模式下，defaultValue 不生效的 bug。([#1689](https://github.com/arco-design/arco-design/pull/1689))

## 2.41.2

2022-11-11

### 🆎 类型修正

- 调整 `Modal` `Drawer` `Popconfirm` 参数 `okText` 和 `cancelText` 属性的 TS 定义为 `ReactNode`。([#1558](https://github.com/arco-design/arco-design/pull/1558))

## 2.41.1

2022-11-04

### 🐛 问题修复

- 更新 `IconLarkColor` 图标([#1541](https://github.com/arco-design/arco-design/pull/1541))

## 2.39.3

2022-09-02

### 💎 功能优化

- 优化 `Modal`, `Notification`, `Message` 组件在 React 18 下通过 `createRoot` 渲染节点。([#1367](https://github.com/arco-design/arco-design/pull/1367))

## 2.39.2

2022-08-26

### 🐛 问题修复

- 修复由于自动生成的 DOM `id` 导致的服务端渲染报错的问题。([#1334](https://github.com/arco-design/arco-design/pull/1334))
- 修复按需加载引入 `Cascader` / `TreeSelect` 样式时，`Select` 组件被重复引入的问题([#1327](https://github.com/arco-design/arco-design/pull/1327))

## 2.39.1

2022-08-19

### 💎 功能优化

- 组件库对外暴露 `version` 字段。([#1303](https://github.com/arco-design/arco-design/pull/1303))

## 2.35.0

2022-06-10

### 🐛 问题修复

- 调整 `Popconfirm`，`Popover`， `Tooltip` 组件动画弹出效果，避免边界场景下过冲效果导致的页面抖动。([#986](https://github.com/arco-design/arco-design/pull/986))

## 2.34.0

2022-05-27

### 🆕 功能升级

- 新增阿拉伯语。([#932](https://github.com/arco-design/arco-design/pull/932))
- 新增葡萄牙语。([#924](https://github.com/arco-design/arco-design/pull/924))
- 新增俄语。([#922](https://github.com/arco-design/arco-design/pull/922))

## 2.33.0

2022-05-13

### 🆕 功能升级

- 国际化支持设置越南语([#824](https://github.com/arco-design/arco-design/pull/824))

## 2.29.0

2022-02-11

### 🆕 功能升级

- 升级 `b-validate` 版本以支持 `Form` 在 `validator` 中传入 `ReactNode`([#518](https://github.com/arco-design/arco-design/pull/518))

## 2.28.0

2022-01-07

### 🆕 功能升级

- 支持通过 `arco-vars-prefix` less 变量修改css变量前缀([#403](https://github.com/arco-design/arco-design/pull/403))

## 2.23.0

2021-09-27

### 💎 优化

- lodash方法引用方式由 lodash.x 改为 lodash/x

## 2.22.0

2021-09-10

### 🆕 功能升级

- 虚拟列表新增 `scrollOptions` 属性，用于指定滚动时的默认行为。

### 🆎 类型修正

- 所有组件 ts 定义放到 interface.ts 中，并且每个组件入口文件暴露所需类型。

## 2.16.0

2021-05-28

### 🆕 Feature

- 国际化新增繁体中文(中国香港)，繁体中文(中国台湾)。

## 2.15.3

2021-05-21

### 💎 Optimization

- 虚拟列表滚动时减少子节点的重绘，防止卡顿。

## 2.15.1

**注意：本次发版修复了 `2.15.0` 可能存在的隐患，如果你想升级 `2.15.0`，请直接升级到 `2.15.1`。**
**`2.15.0` 可能会在打包时出现 less 字体报错。**

### 💎 Optimization

- 字体使用 cdn 路径，防止打包出现 loader 或者路径相关的报错。



## 2.15.0

2021-04-30

### 💎 Optimization

- css 字体文件从 base64 换成字体文件，解决按需加载重复引入入口 css 文件过大的问题。



## 2.14.2

2021-04-23

### 🐛 Bugfix

- 修复图标中包含 es6 语法可能导致打包报错的问题。
- 修复 `AutoComplete inputProps.suffix` 不生效的 bug。



## 2.14.1

2021-04-16

### 🐛 Bugfix

- 修复 `less@4` 打包报错的 bug。
- 修复多色图标导致的开发环境控制台警告。



## 2.14.0

2021-04-09

### 🆕 Feature

- 重构图标打包脚本和逻辑，图标的全局配置不再使用全局变量，切换为 context，为后续更丰富的全局配置做铺垫。
- 国际化新增印度尼西亚语的支持。
- 国际化新增泰语的支持。

## 2.13.0

2021-03-26

### 🐛 Bugfix

- 修复弹出型组件在弹出层所挂载的父节点 resize 的时候，未更新自身位置的 bug。

## 2.11.0

2021-03-12

### 🆕 Feature

- `VirtualList` 支持传入百分比高度，并且不再需要强制指定视窗高度。

## 2.10.1

2021-03-05

### 🐛 Bugfix

- 修复微前端下，加载样式顺序导致组件内部图标样式被全局样式覆盖的问题。

## 2.10.0 🏮

2020-02-26

### 💅 Style

- 修复右对齐表头文字有 2px 右边距，导致和表身的数字没有严格对齐的样式问题。

## 2.9.1

2021-02-20

### 💅 Style

- 修复带有悬浮底色的图标按钮垂直方向未居中的问题。



## 2.9.0 🔥

2021-02-05

### 🆕 Feature

- 对外暴露所有组件的 interface。

## 2.8.1

2021-01-28

### 💅 Style

- 修复 2.7 版本更新之后，图标样式跟 2.7 版本之前存在冲突的问题。

## 2.8.0

2021-01-22

### 🆕 Feature

- 新增属性 `affixStyle` 和 `affixClassname` 用于给 fixed 元素设置样式。
- 兼容 `less@4.0`。

### 💅 Style

- 更新部分面性图标，路径为透明，避免在部分场景中会无法区分的问题。

## 2.7.2

2021-01-19

### 💅 Style

- 修复 Spin 组件会影响被包裹元素的字体样式的问题。

## 2.4.0

2020-12-11

### 🆎 TypeScript

- 完善组件中带有 `React.useImperactiveHandle` 用法的 ref 类型。

## 2.3.1

2020-12-04

### 💎 Optimization

- 搜索图标修正。

## 2.2.1

2020-11-24

### 💎 Optimization

- 字体打包成 base64，避免路径问题出现。



## 2.2.0

2020-11-20

### 💅 Style

- 解决 CSS 变量被重复引入的问题。

## 2.1.0

2020-11-06

### 💎 Optimization

- 优化色板算法，处理极端情况下的色彩运算，比如纯黑和纯白为主色。



