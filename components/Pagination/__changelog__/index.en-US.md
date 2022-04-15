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



