## 2.44.0

2023-01-13

### 🆕 Feature

- Menu property `ellipsis` support `{ text: ReactNode }` to customize the overflow submenu title.([#1700](https://github.com/arco-design/arco-design/pull/1700))

## 2.41.1

2022-11-04

### 💎 Enhancement

- Optimize the jitter problem that may occur when the horizontal mode of the `Menu` component is automatically collapsed.([#1543](https://github.com/arco-design/arco-design/pull/1543))

## 2.39.3

2022-09-02

### 💅 Style

- Optimize the style of inline `<a/>` in `Menu` component.([#1362](https://github.com/arco-design/arco-design/pull/1362))

## 2.39.2

2022-08-26

### 💎 Enhancement

- Optimized the behavior of auto-folding when horizontal `Menu` width changes to avoid occasional line breaks.([#1331](https://github.com/arco-design/arco-design/pull/1331))

### 💅 Style

- Fix the bug that the display position of the built-in collapse button of the `Menu` component is wrong([#1332](https://github.com/arco-design/arco-design/pull/1332))

## 2.36.0

2022-06-24

### 💎 Enhancement

- The `Menu` component supports switching operations using the Tab key.([#1038](https://github.com/arco-design/arco-design/pull/1038))

### 💅 Style

- Fixed the issue that the arrow direction on the right side of `Menu.SubMenu` did not change when it was expanded.([#1022](https://github.com/arco-design/arco-design/pull/1022))

## 2.35.0

2022-06-10

### 💅 Style

- Fixed `Menu` component submenu title bar icons not vertically centered.([#985](https://github.com/arco-design/arco-design/pull/985))

## 2.34.0

2022-05-27

### 💅 Style

- Adjust the position of the popup layer when the submenu of `Menu` pops up from the left.([#923](https://github.com/arco-design/arco-design/pull/923))

## 2.33.1

2022-05-20

### 🐛 BugFix

- Fixed the bug that the icon of SubMenu title was not displayed when Menu is collapsed.([#889](https://github.com/arco-design/arco-design/pull/889))

## 2.32.2

2022-04-29

### 🐛 BugFix

- Fixed the bug that the expanded SubMenu was collapsed when the `collapse` property of the `Menu` component was changed.([#820](https://github.com/arco-design/arco-design/pull/820))

## 2.27.1

2021-12-24

### 💎 Optimization

- `Menu.SubMenu` also supports `selectable` property in non-popup mode.([#355](https://github.com/arco-design/arco-design/pull/355))

## 2.26.0

2021-12-03

### 💅 Style

- Fix the problem that the color change of Icon in the selected menu item of the `Menu` component has no transition effect.([#263](https://github.com/arco-design/arco-design/pull/263))

## 2.24.1

2021-11-12

### 🐛 BugFix

- `Menu.SubMenu` component fixes the bug that the inner `SubMenu` property is overridden by the parent `SubMenu` when used in nesting.([#145](https://github.com/arco-design/arco-design/pull/145))

### 💅 Style

- Hide the text behind the menu item icon when the `Menu` component is collapsed to avoid display `...`.([#151](https://github.com/arco-design/arco-design/pull/151))

## 2.24.0

2021-11-05

### 🆕 Feature

- `Menu` adds property `ellipsis` to forbid the automatic folding of menu items([#115](https://github.com/arco-design/arco-design/pull/115))

### 🐛 BugFix

- When the `tooltipProps` passed by `Menu` contains `triggerProps`, the original class name `menu-item-tooltip` will be overwrite([#99](https://github.com/arco-design/arco-design/pull/99))
- Fix the problem that the style of the trigger-arrow does not work under the black theme of the `Menu` component([#84](https://github.com/arco-design/arco-design/pull/84))
- Fix the bug that `Menu` caused an error because of reading an property of `null`([#115](https://github.com/arco-design/arco-design/pull/115))

## 2.21.1

2021-08-27

### 💎 Optimization

- Optimize the critical performance of the horizontal menu adaptive width hidden menu items

### 🆕 Feature

- The `Menu` component supports keyboard shortcut operations.

### 💅 Style

- Optimize the pop-up menu to be dark when the `Menu` component has a dark theme.

## 2.19.3

2021-07-23

### 🐛 Bugfix

- Fixed a bug where the `Menu` component `theme` in the `Dropdown` component was set to `dark` not to take effect.



## 2.19.1

2021-07-18

### 🐛 Bugfix

- Fix the bug that caused the page to report an error when the `children` of the `Menu` component passed a false value.

## 2.19.0

2021-07-16

### 💎 Optimization

- Optimize the problem that the pop-up layer of the horizontal menu of the `Menu` component cannot be clicked when the mouse moves slowly.

### 🆕 Feature

- The `Menu` component `onClickMenuItem` and `onClickSubMenu` callbacks support the `keyPath` parameter.
- The `Menu` component `Menu.SubMenu` adds the `triggerProps` property to customize the pop-up behavior.

## 2.16.1

2021-06-04

### 🐛 Bugfix

- Fix the HTML attribute warning of the `Menu` component development environment console.



## 2.16.0

2021-05-28

### 🆕 Feature

- Added the `wrapper` property to the `Menu.Item` component to support custom outer HTML tags.

### 🐛 Bugfix

- Fix the issue that `useLayoutEffect` reports warning when `Menu` component is rendered on the server side.

## 2.15.0

2021-04-30

### 🆕 Feature

- Added the `event` parameter to the `onClickMenuItem` callback of the `Menu` component.

## 2.14.0

2021-04-09

### 💅 Style

- Fix the problem that the menu item text of the `Menu` component in the `SubMenu` is not displayed as an ellipsis when the text length is too long.



## 2.8.1

2021-01-28

### 🐛 Bugfix

- Set the scroll boundary of the `Menu` component `autoScrollIntoView` to avoid abnormal scrolling of the `body`.

## 2.8.0

2021-01-22

### 🆕 Feature

- `Menu.SubMenu` added `popup` property to force the use of popup mode.

### 🐛 Bugfix

- Fixed an error when setting `icons.collapseActive` in `Menu` component `hasCollapseButton`.

## 2.7.0

2021-01-15

### 🐛 Bugfix

- Fix the problem that the `Menu` component `autoOpen` does not take effect for multiple nested `SubMenu`.

