## 2.44.0

2023-01-13

### 🆕 Feature

- `Popconfirm` supports `content` property([#1714](https://github.com/arco-design/arco-design/pull/1714))

## 2.40.2

2022-09-30

### 🐛 BugFix

- Fixed the issue that when the `Popconfirm` component enables `focusLock`, the performance of the DOM level inside the Footer is inconsistent with the default, causing the button margin style to fail.([#1437](https://github.com/arco-design/arco-design/pull/1437))

## 2.39.3

2022-09-02

### 🐛 BugFix

- Fixed a bug where the `Popconfirm` component was forced to lock the focus inside an `iframe`, causing the parent page to fail to get the focus.([#1359](https://github.com/arco-design/arco-design/pull/1359))

## 2.31.0

2022-03-25

### 🆎 TypeScript

- Modify the TS definition of the `onOk` parameter of the `Popconfirm` component to support returning `Promise<void>`([#689](https://github.com/arco-design/arco-design/pull/689))

## 2.29.0

2022-02-11

### 🆕 Feature

- `Popconfirm` component `onOk`, `onCancel` callback methods expose `event` parameter([#501](https://github.com/arco-design/arco-design/pull/501))

## 2.25.0

2021-11-19

### 🆕 Feature

- `Popconfirm` allow close confirmation box by pressing `ESC`.([#167](https://github.com/arco-design/arco-design/pull/167))

## 2.20.0

2021-07-30

### 🐛 Bugfix

- Fixed the bug that the Loading status was also displayed when the `Popconfirm` component clicked the confirmation button `onOk` callback did not return a Promise.

## 2.15.2

2021-05-14

### 🐛 Bugfix

- Fix the bug that the `Popconfirm` component `onOk` will not close loading after returning the `promise` to `reject`.

