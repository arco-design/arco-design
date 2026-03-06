## 2.66.11

2026-03-06

### 🆕 功能升级

- 为`Notification.useNotification` 添加手动remove方法([#3145](https://github.com/arco-design/arco-design/pull/3145))

## 2.66.10

2026-01-23

### 🐛 问题修复

- 修复 `Message` 组件和 `Notification` 组件触发后将 locale 重置为中文的问题([#3109](https://github.com/arco-design/arco-design/pull/3109))

## 2.58.0

2023-12-29

### 🐛 问题修复

- 修复 `Notification` 相同 id 调用，during 不更新问题([#2456](https://github.com/arco-design/arco-design/pull/2456))

## 2.56.2

2023-12-01

### 🐛 问题修复

- 修复 `Notification` 组件类名前缀未生效于用户自定义内容的 bug。([#2409](https://github.com/arco-design/arco-design/pull/2409))

## 2.56.1

2023-11-24

### 🐛 问题修复

- 修复 `Notification` 组件在设置 `maxCount` 之后更新的逻辑。([#2385](https://github.com/arco-design/arco-design/pull/2385))

## 2.53.1

2023-09-15

### 💎 功能优化

- 导出 `NotificationHookReturnType` 类型。([#2235](https://github.com/arco-design/arco-design/pull/2235))

## 2.50.0

2023-06-30

### 🆕 功能升级

- `Notification` 支持配置关闭按钮([#2061](https://github.com/arco-design/arco-design/pull/2061))

## 2.49.1

2023-06-09

### 🐛 问题修复

- 修复 `Notification` 组件在特殊场景下 `getContainer` 变化导致组件报错的bug。([#2018](https://github.com/arco-design/arco-design/pull/2018))

## 2.49.0

2023-06-02

### 🆕 功能升级

- `Notification.useNotification` 支持通过 `getContainer` 设置元素挂载节点。([#2008](https://github.com/arco-design/arco-design/pull/2008))

## 2.47.2

2023-05-06

### 🐛 问题修复

- 修复 `Notification` 组件在 `useEffect` 里连续调用出现重叠的 bug。([#1954](https://github.com/arco-design/arco-design/pull/1954))

## 2.44.0

2023-01-13

### 🐛 问题修复

- 修复 `Notification` 组件偶现更新延迟后定时器错乱的 bug([#1716](https://github.com/arco-design/arco-design/pull/1716))

## 2.40.0

2022-09-16

### 🆕 功能升级

- `Notification` 组件支持 `useNotification` 用法以便读取 `context`([#1401](https://github.com/arco-design/arco-design/pull/1401))

## 2.33.1

2022-05-20

### 🐛 问题修复

- 修复 `Notification` 设置 `prefixCls` 后，提示图标前缀未改变的 bug。([#887](https://github.com/arco-design/arco-design/pull/887))

## 2.32.1

2022-04-22

### 🐛 问题修复

- 修复 `Notification` 组件在并发弹出多个提醒框时，只渲染出部分通知的 bug。([#797](https://github.com/arco-design/arco-design/pull/797))

## 2.2.0

2020-11-20

### 💅 Style

- 修复 `Notification` 组件英文长文本没有折行的问题。

