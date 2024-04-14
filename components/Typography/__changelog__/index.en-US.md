## 2.61.0

2024-03-15

### 🆕 Feature

- `Typography.Ellipsis` to support the display of single-line expand buttons([#2596](https://github.com/arco-design/arco-design/pull/2596))

## 2.60.1

2024-02-28

### 🐛 BugFix

- Fix the problem of single line omission failure in `Ellipsis` component([#2564](https://github.com/arco-design/arco-design/pull/2564))

## 2.60.0

2024-02-23

### 🆕 Feature

- Add `Typography.Ellipsis` Component([#2525](https://github.com/arco-design/arco-design/pull/2525))

## 2.59.0

2024-01-19

### 🐛 BugFix

- Fix `Typography` component `resize` throttling issue([#2488](https://github.com/arco-design/arco-design/pull/2488))

## 2.57.1

2023-12-15

### 💎 Enhancement

- Optimize `Typography` component node length calculation logic([#2435](https://github.com/arco-design/arco-design/pull/2435))

## 2.57.0

2023-12-08

### 🆕 Feature

- The `Typography` component supports `tooltip` configuration for copy and edit buttons.([#2428](https://github.com/arco-design/arco-design/pull/2428))

## 2.51.0

2023-07-28

### 🐛 BugFix

- Fix the bug that the font style does not inherit the Title style when `Typography.Title` is switched to the edit state.([#2109](https://github.com/arco-design/arco-design/pull/2109) '')
- Fix the bug that the `className` and `style` attributes passed in by the user are lost when `Typography` is switched to the editing state.([#2109](https://github.com/arco-design/arco-design/pull/2109) '')

## 2.44.2

2023-02-10

### 🐛 BugFix

- Fix the bug that `Typography` cannot be adaptively omitted under `cssEllipsis`([#1766](https://github.com/arco-design/arco-design/pull/1766))

## 2.41.1

2022-11-04

### 🐛 BugFix

- Fixed a bug where `Tooltip`, `Popover`, `Input` styles were not introduced when `Typography` component loads styles on demand.([#1541](https://github.com/arco-design/arco-design/pull/1541))

## 2.39.3

2022-09-02

### 🐛 BugFix

- Fixed a bug where the `Typography` component would jitter in the folding calculation([#1366](https://github.com/arco-design/arco-design/pull/1366))

## 2.37.1

2022-07-14

### 🐛 BugFix

- Fix the problem of `Typography` text omission under different text styles such as `underline`([#1137](https://github.com/arco-design/arco-design/pull/1137))

## 2.37.0

2022-07-08

### 💅 Style

- The `Typography` default style adds `white-space: 'normal'` to remove the parent element's effect on ellipsis.([#1109](https://github.com/arco-design/arco-design/pull/1109))

## 2.34.0

2022-05-27

### 💎 Enhancement

- Reduce the number of computations for `Typography` on first render([#935](https://github.com/arco-design/arco-design/pull/935))

## 2.33.1

2022-05-20

### 🐛 BugFix

- Fixed the bug that the `Expand/Collapse` button of the `Typography` component was displayed at the wrong time([#890](https://github.com/arco-design/arco-design/pull/890))

## 2.33.0

2022-05-13

### 🆕 Feature

- The `Typography` component omits the scene to support expanding controlled.([#867](https://github.com/arco-design/arco-design/pull/867))

### 🐛 BugFix

- Fix the bug of folding error when `Typography` component uses inline elements such as `code`.([#866](https://github.com/arco-design/arco-design/pull/866))

## 2.32.2

2022-04-29

### 🐛 BugFix

- Fix the bug that the `Tooltip` is invalid when the `Typography` component is omitted from a single line([#822](https://github.com/arco-design/arco-design/pull/822))

## 2.32.0

2022-04-15

### 🐛 BugFix

- `Typography` component multi-line omit folding supports different styles of text。([#776](https://github.com/arco-design/arco-design/pull/776))
- Fix the bug of folding error after `Typography` sets `white-space`([#772](https://github.com/arco-design/arco-design/pull/772))

## 2.31.0

2022-03-25

### 🆕 Feature

- `Typography`'s `copyable` and `editable` expose the `event` parameter corresponding to the click callback.([#684](https://github.com/arco-design/arco-design/pull/684))

## 2.29.2

2022-02-25

### 🐛 BugFix

- Fix the bug that the `onStart` input parameter was wrong when the `Typography` component was editing the state([#555](https://github.com/arco-design/arco-design/pull/555))

## 2.29.1

2022-02-18

### 💎 Optimization

- Reduce the impact of the mirror `dom` on automated tests after `Typography` folding calculation([#554](https://github.com/arco-design/arco-design/pull/554))

## 2.28.1

2022-01-14

### 🐛 BugFix

- Fixed the bug that the `Typography` component was folded incorrectly in the browser zoom scene.([#441](https://github.com/arco-design/arco-design/pull/441))

## 2.27.0

2021-12-17

### 🆕 Feature

- The `event` parameter has been added to the `onExpand` callback parameter of the Typography` component.([#328](https://github.com/arco-design/arco-design/pull/328))

## 2.26.2

2021-12-10

### 🐛 BugFix

- Fix the bug that the calculation result of `Typography` is incorrectly when ellipsised in the international scene([#301](https://github.com/arco-design/arco-design/pull/301))
- Fix the bug that the copy result is wrong when `Typography` wraps multiple dynamic strings and `copyable`([#301](https://github.com/arco-design/arco-design/pull/301))

## 2.26.0

2021-12-03

### 🐛 BugFix

- Fix the bug that the `Typography` component does not take effect after setting `showTooltip`.([#266](https://github.com/arco-design/arco-design/pull/266))

## 2.25.0

2021-11-19

### 🆕 Feature

- The `Ellipsis` of `Typography` supports the `cssEllipsis` property. In simple scenarios, css is used by default.([#191](https://github.com/arco-design/arco-design/pull/191))

## 2.24.1

2021-11-12

### 🐛 BugFix

- `Typography` folding calculation optimization, fix display error in extreme cases of single-line folding.([#152](https://github.com/arco-design/arco-design/pull/152))

## 2.23.5

2021-10-29

### 🐛 BugFix

- Fix the bug of using unupdated variables for calculation when the `Typography` component is in the collapsed state.([#57](https://github.com/arco-design/arco-design/pull/57))

## 2.23.1

2021-10-15

### 🐛 BugFix

- Fix the bug that the `Typography` component will be parsed into an array when multiple dynamic strings are wrapped.
- Fix the bug that the `Typography` component will throw an error in the `editing` state after setting `ellipsis`.

## 2.23.0

2021-09-27

### 💎 Optimization

- Optimize the calculation timing in the case of `Typography` ellipsised.

### 🐛 BugFix

- Fix the bug of `Typography` component truncating English characters, causing text overflow.

## 2.22.0

2021-09-10

### 🐛 BugFix

- Fix text display width calculation error of `Typography` in `flex` mode
-  Fix the bug that the `Typography` component `ellipsis` cannot be re-rendered when the `ellipsis` is under control
-  Fix the bug that the call of `Typography` component `ellipsis` cannot be triggered when passing `onExpand`
-  Fix the bug that the status of `ellipsis` cannot be automatically updated according to the taste when `resize` of the `Typography` window

## 2.20.1

2021-08-06

### 🐛 Bugfix

- Fix the bug that the `Typography` component does not support the native `dom` attribute.
- Fix the bug that the `Typography` component sometimes jitters when it is rendered for the first time.

### 🆎 TypeScript

- Modify the `ellipsis.showTooltip.props` of the `Typography` component to be optional.



## 2.19.1

2021-07-18

### 🐛 Bugfix

- Fix the bug that the copy function of `Typography` component does not work in Android webview.



## 2.19.0

2021-07-16

### 🐛 Bugfix

- Fix the bug that the copy function of `Typography` component does not work in Android webview.

## 2.14.1

2021-04-16

### 🐛 Bugfix

- Fix the bug that the copy function of `Typography` component does not work on the Android system browser.

