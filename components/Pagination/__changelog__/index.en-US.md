## 2.54.1

2023-10-16

### 💎 Enhancement

- In `simple` mode of Pagination, the update event is no longer triggered when the value of the jumper remains unchanged.([#2287](https://github.com/arco-design/arco-design/pull/2287))

## 2.49.0

2023-06-02

### 💅 Style

- The `Pagination` component adjusts the default text: Goto => Goto x pages([#2004](https://github.com/arco-design/arco-design/pull/2004))
- The `Pagination` component adjusts the quick jump font color to `color-text-2`([#2004](https://github.com/arco-design/arco-design/pull/2004))

## 2.48.2

2023-05-26

### 🐛 BugFix

- Fix the bug that `Pagination` reports an error when the `props` update is empty([#1989](https://github.com/arco-design/arco-design/pull/1989))

## 2.42.1

2022-12-02

### 🐛 BugFix

- Fix the bug that `defaultPageSize` does not take effect in `sizeOptions` mode of `Pagination` component.([#1627](https://github.com/arco-design/arco-design/pull/1627))

## 2.39.2

2022-08-26

### 🐛 BugFix

- Fixed a bug where the initial `pageSize` of the `Pagination` component was inconsistent with the selected `sizeOptions`.([#1333](https://github.com/arco-design/arco-design/pull/1333))

## 2.39.0

2022-08-12

### 💎 Enhancement

- `Pagination` supports switching page numbers via keyboard events([#1276](https://github.com/arco-design/arco-design/pull/1276))

## 2.36.0

2022-06-24

### 💅 Style

- Fixed ellipsis in `Pagination` not vertically centered in some cases.([#1040](https://github.com/arco-design/arco-design/pull/1040))

## 2.35.0

2022-06-10

### 🐛 BugFix

- Fixed a bug where `showJumper=false` did not work for `Pagination` component in `simple` mode.([#979](https://github.com/arco-design/arco-design/pull/979))

## 2.32.0

2022-04-15

### 🆕 Feature

- The `Pagination` component adds a `bufferSize` prop, which supports setting the display area when the page number is collapsed.([#767](https://github.com/arco-design/arco-design/pull/767))

## 2.24.0

2021-11-05

### 🐛 BugFix

- fix: When the `Pagination` component is under control of both `pageSize` and `current`, the calculation result of `pageSize` will overwrite `props.current`, causing the control of `current` to fail([#119](https://github.com/arco-design/arco-design/pull/119))

## 2.14.2

2021-04-23

### 🐛 Bugfix

- Fix the bug that the `pageSize` and `current` are changed at the same time when the `Pagination` component is in the controlled mode. The value of `current` is incorrect.

## 2.14.1

2021-04-16

### 💅 Style

- Increase the priority of the input box in `Pagination` to avoid being affected by the global input box component.

## 2.10.1

2021-03-05

### 🐛 Bugfix

- Fixed the issue that the `Pagination` component did not reset the current page after the `pageSize` was modified.



