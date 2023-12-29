## 2.58.0

2023-12-29

### 🐛 BugFix

- Fix the problem that `Message` is called with the same id and is not updated during([#2459](https://github.com/arco-design/arco-design/pull/2459))

## 2.56.2

2023-12-01

### 🐛 BugFix

- Fixed a bug where some nodes would never disappear when `Message[method]` was triggered quickly.([#2407](https://github.com/arco-design/arco-design/pull/2407))

## 2.56.1

2023-11-24

### 🐛 BugFix

- Fix logic for `Message` component to update after setting `maxCount`.([#2385](https://github.com/arco-design/arco-design/pull/2385))

## 2.53.2

2023-09-22

### 🐛 BugFix

- Fixed the issue that `Message` could not disable RTL mode after it was enabled.([#2250](https://github.com/arco-design/arco-design/pull/2250))

## 2.53.1

2023-09-15

### 💎 Enhancement

- Export `MessageHookReturnType` type.([#2235](https://github.com/arco-design/arco-design/pull/2235))

## 2.50.0

2023-06-30

### 🆕 Feature

- `Message` supports closeIcon([#2060](https://github.com/arco-design/arco-design/pull/2060))

## 2.49.1

2023-06-09

### 🐛 BugFix

- Fix the bug that the `Message` component will report an error when `getContainer` changes in a special scenario.([#2018](https://github.com/arco-design/arco-design/pull/2018))

## 2.47.2

2023-05-06

### 🐛 BugFix

- Fix the bug that the `Message` component is called repeatedly in `useEffect`.([#1954](https://github.com/arco-design/arco-design/pull/1954))

## 2.43.0

2022-12-23

### 🆕 Feature

- Message adds `transitionTimeout` attribute to improve custom animation configuration.([#1667](https://github.com/arco-design/arco-design/pull/1667))

## 2.40.0

2022-09-16

### 🆕 Feature

- `Message` component supports `useMessage` usage for reading `context`([#1401](https://github.com/arco-design/arco-design/pull/1401))

### 🐛 BugFix

- Fixed the bug that `Message` could not be displayed properly in pages with `body { display: 'flex' }` set.([#1373](https://github.com/arco-design/arco-design/pull/1373))

## 2.33.1

2022-05-20

### 🐛 BugFix

- Fixed a bug that the prefix of the prompt icon did not change after `Message` was set to `prefixCls`.([#887](https://github.com/arco-design/arco-design/pull/887))

## 2.18.0

2021-07-02

### 💅 Style

- Fix the problem that the close icon of the `Message` component is not vertically centered.



## 2.11.0

2021-03-12

### 🐛 Bugfix

- Fix the bug that the new message appears at the bottom when the `Message` and `Notifaction` components are set to `maxCount`.

