## 2.53.2

2023-09-22

### 🐛 BugFix

- Fixed a bug where re-rendering the component may trigger the loss of sub-component ref when the `Modal` component is hidden.([#2251](https://github.com/arco-design/arco-design/pull/2251))

## 2.53.1

2023-09-15

### 💎 Enhancement

- Export `ModalHookReturnType` type.([#2235](https://github.com/arco-design/arco-design/pull/2235))

## 2.51.0

2023-07-28

### 🐛 BugFix

- Fix the bug that when the `Modal` component sets `unmountOnExit=true` and closes the pop-up window, the outer node of the pop-up window is not `unmount` bug.([#2096](https://github.com/arco-design/arco-design/pull/2096) '')

## 2.48.1

2023-05-19

### 🐛 BugFix

- Fix the bug that internal popup component `zIndex` is calculated incorrectly when `Modal` is mounted for the first time.([#1977](https://github.com/arco-design/arco-design/pull/1977))

## 2.42.1

2022-12-02

### 🐛 BugFix

- Fix the bug that the popup layer is not displayed when `modal.confirm` returned by `Modal.useModal` is called in `useCallback`.([#1628](https://github.com/arco-design/arco-design/pull/1628))
- Fix the bug that the icon is lost when the title of the popup layer created by `Modal.useModal` is updated by the `update` method([#1628](https://github.com/arco-design/arco-design/pull/1628))
- Fix the bug that updating the content of the popup layer through `update` in Promise does not take effect when onOK is set to Promise for the popup layer created by `Modal.useModal`.([#1628](https://github.com/arco-design/arco-design/pull/1628))

## 2.42.0

2022-11-25

### 🐛 BugFix

- Fixed the bug that the config passed in when creating the popup layer was lost when the `Modal` component updated the popup content through the `update` method.([#1609](https://github.com/arco-design/arco-design/pull/1609))
- Fixed a bug where the `.arco-modal-title` node was still rendered when `title={null}` & `icon={null}` were set when the `Modal` component created a popup layer through a static method.([#1609](https://github.com/arco-design/arco-design/pull/1609))

## 2.40.2

2022-09-30

### 🐛 BugFix

- Fix the bug of console warning when `Modal` component is uninstalled under React 18([#1440](https://github.com/arco-design/arco-design/pull/1440))

## 2.40.1

2022-09-23

### 🐛 BugFix

- Fix the bug that the `holderRef` of `useModal` may not exist([#1418](https://github.com/arco-design/arco-design/pull/1418))

## 2.39.3

2022-09-02

### 🐛 BugFix

- Fixed a bug where the `Modal` component was forced to lock the focus inside an `iframe`, causing the parent page to fail to get the focus.([#1359](https://github.com/arco-design/arco-design/pull/1359))

## 2.39.1

2022-08-19

### 🐛 BugFix

- Fix the bug that the method `update` returned by `useModal` is `undefined` when creating a modal instance.([#1300](https://github.com/arco-design/arco-design/pull/1300))

## 2.35.0

2022-06-10

### 🐛 BugFix

- Fixed a bug where the `simple` property passed in when the `Modal` component created a popup via `useModal` did not take effect.([#980](https://github.com/arco-design/arco-design/pull/980))

## 2.32.0

2022-04-15

### 🐛 BugFix

- Optimize 'Modal' closing all popover when closing with ESC([#629](https://github.com/arco-design/arco-design/pull/629))

## 2.27.1

2021-12-24

### 🐛 BugFix

- fix when `Modal` component  the visible is true, the locale does not work([#339](https://github.com/arco-design/arco-design/pull/339))

## 2.23.0

2021-09-27

### 💎 Optimization

- The `Modal` component `onOk` will automatically handle loading when it returns a Promise.

## 2.21.0

2021-08-20

### 🆕 Feature

- `Modal` add `useModal` function.
- `Modal` supports `closeIcon` prop.
## 2.19.3

2021-07-23

### 💅 Style

- Fix the problem that the icon in the title may jitter when the `Modal` component is opened.



## 2.19.0

2021-07-16

### 🐛 Bugfix

- Fix the bug that the parameters of the `footer` of the `Modal` component are not consistent with the `propTypes`.

## 2.17.0

2021-06-18

### 🐛 Bugfix

- Fix the bug that the `onCancel` method will be triggered twice when the `mask` is continuously clicked on the `Modal` component.

## 2.16.0

2021-05-28

### 🆕 Feature

- The `wrapStyle` property is added to the `Modal` component.

### 🐛 Bugfix

- Fix the problem that the bold style of the title text of the `Modal` component is invalid.
- Fix the problem that the zoom animation of the `Modal` component behaves abnormally.

## 2.15.3

2021-05-21

### 💎 Optimization

- Optimize the `Modal` closing interaction. When the mouse is pressed in the content area and moved to the `mask` area, it will not be closed.

## 2.15.2

2021-05-14

### 💅 Style

- Add a default font size to the content area of the `Modal` component.



## 2.14.2

2021-04-23

### 💎 Optimization

- Calculate the scrollbar width to avoid jitter when displaying `Modal` and `Drawer` components.



## 2.14.1

2021-04-16

### 💅 Style

- The `box-sizing` of the `Modal` component has been adjusted to `border-box`.

## 2.14.0

2021-04-09

### 🐛 Bugfix

- `Modal` component specifies zindex according to its own style.



## 2.13.2

2021-04-01

### 🐛 Bugfix

- Fix the bug that the global overflow will not be updated when the `Modal` component is unmount.

## 2.12.0

2021-03-19

### 🆕 Feature

- The `footer` property of the `Modal` component supports passing in custom rendering functions.



## 2.11.1

2021-03-15

### 🐛 Bugfix

- Fix the problem that the width percentage setting of the `Modal` component is invalid.



## 2.11.0

2021-03-12

### 🆕 Feature

- `Modal` component supports `Modal.destroyAll` to close all confirmation dialogs.

### 💅 Style

- The `Modal` component separates the scrollbar animation to prevent the scrollbar from flickering.



## 2.10.0 🏮

2020-02-26

### 🐛 Bugfix

- Fix the bug that the pop-up window closes when clicking the scrollbar in `Modal`.



## 2.7.2

2021-01-19

### 🐛 Bugfix

- Fixed the pop-up window created by static method in `Modal`. If the `title` property is not passed in when calling the `update` method, the `icon` property passed in when the pop-up window is created will take effect repeatedly, causing multiple icons to appear bug.

