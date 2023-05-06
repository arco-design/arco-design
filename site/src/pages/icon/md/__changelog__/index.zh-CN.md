## 2.21.1

2021-08-27

### 💅 样式更新

- 图标 `image-close` 修正。

## 2.19.3

2021-07-23

### 💎 Optimization

- 添加新图标 `IconPalette`。

## 2.15.3

2021-05-21

### 🐛 Bugfix

- `Icon` 目录的 package.json 添加 `peerDependencies`，防止 webpack5 构建 warning。
- `IconSync` 图标调整。

## 2.14.0

2021-04-09

### 🆕 Feature

- 重构图标打包脚本和逻辑，图标的全局配置不再使用全局变量，切换为 context，为后续更丰富的全局配置做铺垫。

## 2.13.0

2021-03-26

### 🐛 Bugfix

- `IconLink` 图标修正。

## 2.11.0

2021-03-12

### 💅 Style

- 图标 `IconLock` 和 `IconUnlock` 重画，解决区分不明显的问题。


## 2.10.0 🏮

2020-02-26

### 🆕 Feature

- `Icon` 包增加 `sideEffect: false`，支持 tree shaking。

## 2.8.0

2021-01-22

### 💅 Style

- `Icon` 组件类加上 `fill: none`，避免在于低版本组件库混用时出现被覆盖的情况。



## 2.4.0

2020-12-11

### 🆎 TypeScript

- `Icon.addFromIconFontCn` 添加原生 svg 的 ts 定义和 ref 定义。

## 2.2.0

2020-11-20

### 🐛 Bugfix

- 修复 `Icon` 组件中的全局 `prefixCls` 与 1.x 组件库冲突的 bug。

