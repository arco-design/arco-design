## 2.56.2

2023-12-01

### 🐛 BugFix

- Fix the problem of `Drawer` component `autoFocus` failure([#2412](https://github.com/arco-design/arco-design/pull/2412))

## 2.53.1

2023-09-15

### 🐛 BugFix

- Fixed a bug where text in the content area of the `Drawer` component could not be selected and copied. (This bug was introduced in `2.53.0`)([#2232](https://github.com/arco-design/arco-design/pull/2232) )

## 2.53.0

2023-09-08

### 🐛 BugFix

- Fix the bug that escToExit does not take effect after clicking on the text content of the `Drawer` component.([#2222](https://github.com/arco-design/arco-design/pull/2222) )

## 2.49.0

2023-06-02

### 🆕 Feature

- The `Drawer` component supports customizing the close button via the `closeIcon` property.([#2006](https://github.com/arco-design/arco-design/pull/2006))

## 2.48.1

2023-05-19

### 🐛 BugFix

- Fix the bug that internal popup component `zIndex` is calculated incorrectly when `Drawer` is mounted for the first time.([#1977](https://github.com/arco-design/arco-design/pull/1977))

## 2.46.3

2023-04-07

### 🐛 BugFix

- Fix the bug that all drawers are closed by pressing `ESC` when there are multiple layers of `Drawer` at the same time.([#1902](https://github.com/arco-design/arco-design/pull/1902))

## 2.46.2

2023-03-31

### 🐛 BugFix

- Fix the disappearing animation problem caused by the `Drawer` component resetting the `overflow` property of the mounted node before the popup layer completely exits.([#1882](https://github.com/arco-design/arco-design/pull/1882))

## 2.42.0

2022-11-25

### 🆕 Feature

- `Drawer` component supports `zIndex` property([#1604](https://github.com/arco-design/arco-design/pull/1604))

## 2.40.0

2022-09-16

### 🆎 TypeScript

- Improve typescript definition of the `placement` property of `Drawer`.([#1377](https://github.com/arco-design/arco-design/pull/1377))

## 2.39.3

2022-09-02

### 🐛 BugFix

- Fixed a bug where the `Drawer` component was forced to lock the focus inside an `iframe`, causing the parent page to fail to get the focus.([#1359](https://github.com/arco-design/arco-design/pull/1359))

## 2.36.1

2022-07-01

### 🐛 BugFix

- Fixed the bug that when the `Drawer` was set to `visible=true` during the hiding process, clicking again on the masked drawer could not be hidden.([#1079](https://github.com/arco-design/arco-design/pull/1079))

## 2.26.0

2021-12-03

### 🆕 Feature

- The `Drawer` component supports the `okButtonProps` and `cancelButtonProps` properties.([#260](https://github.com/arco-design/arco-design/pull/260))

## 2.23.0

2021-09-27

### 🐛 BugFix

- Fix the problem that the external elements of the drawer cannot be operated when the `mask={false}` is set in the `Drawer` component

## 2.19.0

2021-07-16

### 🐛 Bugfix

- Fixed the issue that the `Drawer` component would jitter the first time it opened when the content contained focusable elements.



## 2.13.0

2021-03-26

## 2.10.0 🏮

2020-02-26

### 🆕 Feature

- `Drawer` supports clicking esc to hide the drawer.

## 2.9.1

2021-02-20

### 🐛 Bugfix

- Fixed the bug that when the initial value of `visible` of `Drawer` component `visible` is `true` and `getPopupContainer` is set, `Drawer` is still fixed.

## 2.9.0 🔥

2021-02-05

### 🆕 Feature

- Added attributes `bodyStyle` and `headerStyle` to the `Drawer` component.

