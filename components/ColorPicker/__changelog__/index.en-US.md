## 2.66.9

2026-01-09

### 🐛 BugFix

- Fix the issue in the `ColorPicker` component where when clearing a value in the RGB Input, it causes the color information to display as NAN and makes it impossible to input values normally thereafter.([#3096](https://github.com/arco-design/arco-design/pull/3096))

## 2.66.2

2025-07-15

### 🐛 BugFix

- Fixed the issue that RGB value cannot be input when cleared([#3017](https://github.com/arco-design/arco-design/pull/3017))

## 2.66.1

2025-04-09

### 🐛 BugFix

- Fixed the bug that `ColorPicker` component style variable reference was not prefixed with css variable.([#2965](https://github.com/arco-design/arco-design/pull/2965))

## 2.66.0

2025-04-03

### 🆕 Feature

- `ColorPicker` supports `mode` to select a single color or gradient colors.([#2906](https://github.com/arco-design/arco-design/pull/2906))

## 2.64.1

2024-10-28

### 🐛 BugFix

- Fix for `ColorPicker` to select the outer DOM element when the mouse is moved out of the popup artboard after pressing the mouse([#2824](https://github.com/arco-design/arco-design/pull/2824))
- Fixed the bug that the size attribute provided by `ConfigProvider` for `ColorPicker` does not take effect.([#2822](https://github.com/arco-design/arco-design/pull/2822))

## 2.62.0

2024-04-26

### 🆕 Feature

- `ColorPicker` component adds `onChangeComplete` and `renderFooter` properties([#2633](https://github.com/arco-design/arco-design/pull/2633))

## 2.60.0

2024-02-23

### 🆕 Feature

- `ColorPicker` component adds support for custom trigger elements([#2548](https://github.com/arco-design/arco-design/pull/2548))

### 🐛 BugFix

- Add support for disabledAlpha([#2538](https://github.com/arco-design/arco-design/pull/2538))
- Fix the bug that triggers `onChange` when `ColorPicker` is initialized([#2521](https://github.com/arco-design/arco-design/pull/2521))
- Fix the bug of missing on-demand style introduction in `ColorPicker`([#2520](https://github.com/arco-design/arco-design/pull/2520))

## 2.58.0

2023-12-29

### 🆕 Feature

- Add  `ColorPicker` component([#2383](https://github.com/arco-design/arco-design/pull/2383))

