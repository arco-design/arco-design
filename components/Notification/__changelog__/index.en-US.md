## 2.58.0

2023-12-29

### 🐛 BugFix

- Fix the problem that `Notification` is called with the same id and is not updated during([#2456](https://github.com/arco-design/arco-design/pull/2456))

## 2.56.2

2023-12-01

### 🐛 BugFix

- Fixed the bug that the `Notification` component class name prefix did not take effect for user-defined content.([#2409](https://github.com/arco-design/arco-design/pull/2409))

## 2.56.1

2023-11-24

### 🐛 BugFix

- Fix logic for `Notification` component to update after setting `maxCount`.([#2385](https://github.com/arco-design/arco-design/pull/2385))

## 2.53.1

2023-09-15

### 💎 Enhancement

- Export `NotificationHookReturnType` type.([#2235](https://github.com/arco-design/arco-design/pull/2235))

## 2.50.0

2023-06-30

### 🆕 Feature

- `Notification`  supports closeIcon([#2061](https://github.com/arco-design/arco-design/pull/2061))

## 2.49.1

2023-06-09

### 🐛 BugFix

- Fix the bug that the `Notification` component will report an error when `getContainer` changes in a special scenario.([#2018](https://github.com/arco-design/arco-design/pull/2018))

## 2.49.0

2023-06-02

### 🆕 Feature

- `Notification.useNotification` supports setting elements to mount nodes via `getContainer`.([#2008](https://github.com/arco-design/arco-design/pull/2008))

## 2.47.2

2023-05-06

### 🐛 BugFix

- Fix the bug that the `Notification` component is called repeatedly in `useEffect`.([#1954](https://github.com/arco-design/arco-design/pull/1954))

## 2.44.0

2023-01-13

### 🐛 BugFix

- Fix the bug that the `Notification` component occasionally updates the timer after the delay.([#1716](https://github.com/arco-design/arco-design/pull/1716))

## 2.40.0

2022-09-16

### 🆕 Feature

- `Notification` component supports `useNotification` usage for reading `context`([#1401](https://github.com/arco-design/arco-design/pull/1401))

## 2.33.1

2022-05-20

### 🐛 BugFix

- Fixed a bug that the prefix of the prompt icon did not change after `Notification` was set to `prefixCls`.([#887](https://github.com/arco-design/arco-design/pull/887))

## 2.32.1

2022-04-22

### 🐛 BugFix

- Fixed a bug where the `Notification` component only rendered some notifications when multiple reminder boxes popped up concurrently.([#797](https://github.com/arco-design/arco-design/pull/797))

## 2.2.0

2020-11-20

### 💅 Style

- Fix the problem that the English long text of the `Notification` component does not wrap.
