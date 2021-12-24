## 2.27.1

2021-12-24

### 💎 Performance

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

