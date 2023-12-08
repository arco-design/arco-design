## 2.57.0

2023-12-08

### 💎 Enhancement

- Optimize the time-consuming problem of `Trigger` part of the logic([#2427](https://github.com/arco-design/arco-design/pull/2427))

## 2.56.1

2023-11-24

### 🐛 BugFix

- Fixed a bug where the arrow styles would overwrite each other when `Trigger` components with different pop-up directions are used in nests.([#2378](https://github.com/arco-design/arco-design/pull/2378))

## 2.55.0

2023-10-27

### 🆕 Feature

- `Trigger` supports configuring `clickOutside` logic to be triggered during the capture phase.([#2324](https://github.com/arco-design/arco-design/pull/2324))

## 2.51.2

2023-08-11

### 💎 Enhancement

- Optimize the `Trigger` component when there is a decimal in the content height, there will be a positioning error, which will cause unnecessary scroll bars.([#2141](https://github.com/arco-design/arco-design/pull/2141))

## 2.45.1

2023-03-01

### 🐛 BugFix

- Fix the bug that the `onClick` injected by the `Trigger` component when `trigger=hover` causes the default `onClick` of the component to not take effect.([#1808](https://github.com/arco-design/arco-design/pull/1808))

## 2.44.1

2023-02-03

### 🐛 BugFix

- Fix the bug that `props.style` of `Trigger` component does not take effect.([#1750](https://github.com/arco-design/arco-design/pull/1750))
- Fix the bug that `clickToClose` of `Trigger` component does not work when trigger="hover".([#1750](https://github.com/arco-design/arco-design/pull/1750))

## 2.43.0

2022-12-23

### 💎 Enhancement

- Optimize the problem that the position of the popup layer flickers when the trigger node style of the `Trigger` component changes to `display: none`.([#1652](https://github.com/arco-design/arco-design/pull/1652))
- Optimize the flickering problem caused by the size change of the popup layer of the `Trigger` component and the location is not updated in time.([#1652](https://github.com/arco-design/arco-design/pull/1652))

## 2.42.0

2022-11-25

### 🐛 BugFix

- Fix the bug that the `containerScrollToClose` property of the `Trigger` component does not take effect when the page scrolling container is document.documentElement.([#1606](https://github.com/arco-design/arco-design/pull/1606))

## 2.38.0

2022-07-29

### 🐛 BugFix

- Fixed a bug where the `Trigger` component could not display the popup in React 18 strict mode.([#1215](https://github.com/arco-design/arco-design/pull/1215))

## 2.34.0

2022-05-27

### 🆕 Feature

- The `Trigger` component supports the popup layer to be closed when the container is scrolled by setting the `containerScrollToClose` property.([#913](https://github.com/arco-design/arco-design/pull/913))

## 2.32.0

2022-04-15

### 🆕 Feature

- The `Trigger` component supports the `updateOnScroll` property to update the position of the popover when the container is scrolled.([#770](https://github.com/arco-design/arco-design/pull/770))

## 2.26.1

2021-12-07

### 🐛 BugFix

- Fix the bug that when the trigger mode of the `Trigger` component is `contextMenu`, the pop-up layer is not hidden when the trigger node is clicked.([#284](https://github.com/arco-design/arco-design/pull/284))

## 2.26.0

2021-12-03

### 💎 Optimization

- Optimize the logic used by the `Trigger` component to calculate the size and position of child nodes to avoid double-counting([#258](https://github.com/arco-design/arco-design/pull/258))

## 2.25.0

2021-11-19

### 🆕 Feature

- `Trigger` add `escToClose` to set whether to allow close the popup by pressing `ESC`, default value is `false`.([#167](https://github.com/arco-design/arco-design/pull/167))

## 2.24.1

2021-11-12

### 🐛 BugFix

- Fixed a bug where the 'Trigger' component incorrectly triggered the pop-up mouse event before the animation ended.([#149](https://github.com/arco-design/arco-design/pull/149))

## 2.23.5

2021-10-29

### 🐛 BugFix

- Trigger's popup can not get correct width when first render([#69](https://github.com/arco-design/arco-design/pull/69))

## 2.23.1

2021-10-15

### 💎 Optimization

- Optimize the pop-up layer of the `Trigger` component to update the position only according to the resize of the trigger node when the state is displayed.

### 🐛 BugFix

- Fix that when the nested pop-up layer in the pop-up layer of the `Trigger` component is clicked, the outer pop-up layer is hidden `bug`.

## 2.23.0-beta.1

2021-09-26

### 🆕 Feature

- `Trigger` supports to get defaultProps from `ConfigProvider`

## 2.22.0

2021-09-10

### 🆕 Feature

- The `Trigger` component supports the `mouseLeaveToClose` property to set whether to hide the pop-up window when the mouse moves out of the trigger node and the pop-up layer.

## 2.20.1

2021-08-06

### 🐛 Bugfix

- Fix the bug that when the `Trigger` component directly wraps a disabled `Trigger` component, the pop-up layer itself is not displayed.

## 2.19.3

2021-07-23

### 🐛 Bugfix

- Fix the bug that the `Trigger` component does not update its position when the size of the mounted container changes.

## 2.19.0

2021-07-16

### 🐛 Bugfix

- Fixed the problem that the ref of the outermost label of the pop-up layer content of the `Trigger` component could not be obtained.

## 2.18.2

2021-07-09

### 🐛 Bugfix

- Fix the bug that the pop-up layer is not positioned correctly when the `Trigger` component sets `alignPoint` and mounts the container to scroll the scrollbar.

## 2.18.1

2021-07-04

### 🐛 Bugfix

- Fix the bug that the `Trigger` component `unmountOnExit` does not take effect.

## 2.17.0

2021-06-18

### 🐛 Bugfix

- Fix the bug that the arrow element does not point to the trigger node when the `Trigger` component sets `position=bottom` and automatically adjusts the position.
- Fixed a bug where the offset set by `popupAlign` did not take effect when `popupContainer` was set for the `Trigger` component.

## 2.15.2

2021-05-14

### 🐛 Bugfix

- Fixed the bug that the `props.style.width` property did not take effect after the `autoAlignPopupWidth` property was set in the `Trigger` component.



## 2.14.1

2021-04-16

### 🐛 Bugfix

- Fix the bug that the pop-up box that pops up immediately when the `Trigger` component is nested, and the animation causes the pop-up box to be positioned incorrectly.

## 2.10.1

2021-03-05

### 🐛 Bugfix

- Fix the problem that the position of the arrow element is incorrect after the automatic adjustment of the position of the `Trigger` component.

## 2.9.0 🔥

2021-02-05

### 🆕 Feature

- `Trigger` component supports direct nesting.

## 2.7.0

2021-01-15

### 🆕 Feature

- The `popupAlign` property of the `Trigger` component supports multiple directions at the same time.

