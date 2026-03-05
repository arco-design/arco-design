## 2.67.0

2025-07-23

### 🐛 BugFix

- `InputTag` component adds `maxLength` property to support limiting the maximum input length of the input box.([#XXXX](https://github.com/arco-design/arco-design/pull/XXXX))

## 2.66.2

2025-07-15

### 🐛 BugFix

- Fixed the issue where maxTagCount="responsive" does not take effect when the `InputTag` component imports styles on demand([#2992](https://github.com/arco-design/arco-design/pull/2992))

## 2.65.0

2024-11-29

### 🐛 BugFix

- Fixed the bug that `renderTag` of `InputTag` component will execute for `+x...` tag. (Introduced in `2.62.0`)([#2877](https://github.com/arco-design/arco-design/pull/2877))

## 2.63.0

2024-06-11

### 💎 Enhancement

- reduce time complexity of InputTag([#2690](https://github.com/arco-design/arco-design/pull/2690))

## 2.62.1

2024-05-17

### 🐛 BugFix

- Fixed the bug where the maxTagCount.render property of the `InputTag` component reported an error.([#2684](https://github.com/arco-design/arco-design/pull/2684))

## 2.62.0

2024-04-26

### 🆕 Feature

- `InputTag` supports responsive Tag number([#2656](https://github.com/arco-design/arco-design/pull/2656))

### 🐛 BugFix

- Fixed the bug that `maxTagCount` of `InputTag` component does not take effect when setting `renderTag`.

## 2.59.0

2024-01-19

### 🆕 Feature

- `InputTag` adds a `maxTagCount` property to support customizing the maximum number of displayed tags.([#2503](https://github.com/arco-design/arco-design/pull/2503))

## 2.58.0

2023-12-29

### 💎 Enhancement

- Optimize the issue of vertical jitter when clearing all tags in `InputTag`.([#2455](https://github.com/arco-design/arco-design/pull/2455))

## 2.56.1

2023-11-24

### 🐛 BugFix

- Fixed the bug that automatic word segmentation would be triggered twice in a row when the `onChange` callback of the `InputTag` took a long time.([#2381](https://github.com/arco-design/arco-design/pull/2381))

## 2.48.0

2023-05-12

### 🐛 BugFix

- Adjust the drag style class name of `InputTag` component `arco-draggable` => `@{prefix}-draggable`([#1963](https://github.com/arco-design/arco-design/pull/1963))

## 2.47.1

2023-04-21

### 🐛 BugFix

- Fix the issue that `dragToSort` of `InputTag` not work.([#1936](https://github.com/arco-design/arco-design/pull/1936))

## 2.47.0

2023-04-14

### 🆕 Feature

- The `InputTag` component has added `prefix/addBefore/addAfter` props (same as `Input`).([#1918](https://github.com/arco-design/arco-design/pull/1918))

## 2.45.0

2023-02-17

### 🐛 BugFix

- Fix the issue that `validate` function will trigger two consecutive rounds when all the verification results of the automatic word segmentation of the pasted text of `InputTag` fail.([#1784](https://github.com/arco-design/arco-design/pull/1784))

## 2.44.3

2023-02-14

### 🐛 BugFix

- Fix `value.label` value in `onChange` callback is not user input text when `validate` callback of `InputTag` returns non-boolean value.([#1774](https://github.com/arco-design/arco-design/pull/1774))

## 2.44.2

2023-02-10

### 🐛 BugFix

- Fix the issue that `validate` callback of `InputTag` does not take effect for value updates triggered by `tokenSeparators`.([#1764](https://github.com/arco-design/arco-design/pull/1764))

## 2.44.0

2023-01-13

### 🆕 Feature

- `InputTag` adds the `tokenSeparators` property to support automatic word segmentation.([#1720](https://github.com/arco-design/arco-design/pull/1720))

## 2.41.0

2022-10-28

### 🐛 BugFix

- Fixed the bug that when the `InputTag` component has enabled `dragToSort`, the tag will be rendered twice when the disabled state is toggled.([#1457](https://github.com/arco-design/arco-design/pull/1457))

## 2.39.3

2022-09-02

### 🐛 BugFix

- Fixed the bug that `placeholder` was not displayed as expected when `InputTag` was set to `disabled`.([#1357](https://github.com/arco-design/arco-design/pull/1357))

## 2.39.2

2022-08-26

### 💅 Style

- When the `placeholder` of the `InputTag` component is too long, it will be displayed with `...` at the end.([#1339](https://github.com/arco-design/arco-design/pull/1339))

## 2.37.0

2022-07-08

### 🆕 Feature

- The `InputTag` component allows formatting of values entered by the user via the `validate` property.([#1110](https://github.com/arco-design/arco-design/pull/1110))

## 2.30.2

2022-03-18

### 🐛 BugFix

- Fixed `InputTag` display cleat button when set `allowClear` and `readOnly` together.([#651](https://github.com/arco-design/arco-design/pull/651))

## 2.29.2

2022-02-25

### 🐛 BugFix

- Fixed the bug that the `clear-icon` style of `InputTag` did not take effect([#589](https://github.com/arco-design/arco-design/pull/589))

## 2.28.2

2022-01-21

### 💎 Optimization

- `InputTag` prevents form submission on `Enter` pressed.([#482](https://github.com/arco-design/arco-design/pull/482))

## 2.27.0

2021-12-17

### 🆕 Feature

- `InputTag` adds `dragToSort` property to support sorting the entered value by dragging.([#325](https://github.com/arco-design/arco-design/pull/325))

## 2.25.0

2021-11-19

### 🆕 Feature

- `InputTag` adds `saveOnBlur` property to support automatically saving what the user is typing when blur it.([#183](https://github.com/arco-design/arco-design/pull/183))

## 2.23.5

2021-10-29

### 🐛 BugFix

- Fix  the InputTag component default validate function  always returns false([#43](https://github.com/arco-design/arco-design/pull/43))

## 2.23.1

2021-10-15

### 🐛 BugFix

- Fix the bug that the input box width is abnormal when inputting continuous spaces in the `InputTag` component.

## 2.21.0

2021-08-20

### 💅 Style

- Fixed an issue where the mouse hovering interface may jitter when the `InputTag` component is allowed to be cleared.

## 2.20.0

2021-07-30

### 🆕 Feature

- Added `onClear` and `onClick` callbacks to the `InputTag` component.



