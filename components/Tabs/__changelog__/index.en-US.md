## 2.54.0

2023-10-09

### 🆕 Feature

- `Tabs` supports custom underline size([#2278](https://github.com/arco-design/arco-design/pull/2278))

## 2.52.0

2023-08-18

### 💅 Style

- Fix the bug that the vertical tab style behaves abnormally in the rtl view of the `Tabs` component.([#2162](https://github.com/arco-design/arco-design/pull/2162))
- Fix the bug that the vertical tab height of `Tabs` is not consistent with the content area (this fix adjusts the layout method of tabs whose `tabPosition` is left / right to flex layout).([#2162](https://github.com/arco-design/arco-design/pull/2162))

## 2.50.2

2023-07-21

### 🐛 BugFix

- Fix the problem that the `Tabs` component will vibrate continuously under boundary conditions when the width changes dynamically.([#2093](https://github.com/arco-design/arco-design/pull/2093))

## 2.47.0

2023-04-14

### 🆕 Feature

- The `icons` attribute of the `Tabs` component supports customizing the scrolling operation icons in the tab header([#1917](https://github.com/arco-design/arco-design/pull/1917))

## 2.46.1

2023-03-24

### 💅 Style

- Fix the bug that the disabled text color does not take effect when the scroll icon of the `Tabs` component is disabled.([#1867](https://github.com/arco-design/arco-design/pull/1867))

## 2.46.0

2023-03-17

### 💅 Style

- Fix `Tabs` in `card` mode, the bug that `TabsHeader` border style is wrong([#1853](https://github.com/arco-design/arco-design/pull/1853))

## 2.42.0

2022-11-25

### 🐛 BugFix

- Fix the bug that the width of `addButton` of the `Tabs` component causes inaccurate calculation of scrolling timing([#1614](https://github.com/arco-design/arco-design/pull/1614))

## 2.41.0

2022-10-28

### 🐛 BugFix

- Fix the bug that is wrong in the horizontal scrolling direction under the `RTL` view.([#1487](https://github.com/arco-design/arco-design/pull/1487))

### 💅 Style

- Fix `Tabs` component's `extra` element's style issue that is covered when the width is large.([#1494](https://github.com/arco-design/arco-design/pull/1494))
- Fixed a bug where the new icon color value of the `Tabs` component in dark mode was incorrect.([#1454](https://github.com/arco-design/arco-design/pull/1454))
- Fixed `Tabs` component in `type=line` & `tabPosition=bottom`, the style issue of the wrong split line position.([#1248](https://github.com/arco-design/arco-design/pull/1248))

## 2.40.0

2022-09-16

### 💅 Style

- Fix disabled `TabPane` header area hover style in `Tabs` with `capsule` type in dark mode.([#1368](https://github.com/arco-design/arco-design/pull/1368))

## 2.39.0

2022-08-12

### 🐛 BugFix

- Fixed the bug that the width of the `extra` node of Tabs caused an error in the calculation of the head scrolling threshold.([#1275](https://github.com/arco-design/arco-design/pull/1275))

## 2.33.0

2022-05-13

### 🆕 Feature

- The `Tabs` component of type `rounded` supports different sizes.([#817](https://github.com/arco-design/arco-design/pull/817))

## 2.32.2

2022-04-29

### 🐛 BugFix

- Fixed the bug of critical calculation error in the appear/disappear of the scroll button of the `Tabs` .([#819](https://github.com/arco-design/arco-design/pull/819))

## 2.28.1

2022-01-14

### 🐛 BugFix

- Fix the bug that the Tabs component scrolled incorrectly in the sub-element `autofocus` scene([#440](https://github.com/arco-design/arco-design/pull/440))

## 2.25.1

2021-11-26

### 🐛 BugFix

- Fix the warning of `Tabs` component pass `scrollPosition` to dom.([#225](https://github.com/arco-design/arco-design/pull/225))
- Fix the problem that the head height of the `Tabs` component of the `card` type is incorrect.([#220](https://github.com/arco-design/arco-design/pull/220))

## 2.23.0

2021-09-27

### 💅 Style

- Fix the problem of the wrong style of the `Tabs` component in the `vertical capsule`

## 2.20.1

2021-08-06

### 🐛 Bugfix

- Fix the bug that the `Tabs` component `renderTabTitle` was incorrectly passed to the `div`, causing the console to report an error.

## 2.19.0

2021-07-16

### 🆕 Feature

- The `Tabs` component supports scrolling through the wheel and touchpad.

## 2.18.0

2021-07-02

### 🆕 Feature

- The `Tabs` component adds the `renderTabTitle` property to support customizing the header content of each Tab.



## 2.16.0

2021-05-28

### 🆕 Feature

- `Tabs` supports custom delete/add buttons.

## 2.15.0

2021-04-30

### 🆕 Feature

- Added the `icons` property to the `Tabs` component to support the configuration of icons for delete buttons and newly added buttons.

### 🆎 TypeScript

- Added the TS definition of the `Tabs` component `renderTabHeader` callback `DefaultTabHeader` parameter.

## 2.14.0

2021-04-09

### 🐛 Bugfix

- Fix the bug that the style of `headerPadding` of the `Tabs` component does not take effect.

## 2.9.1

2021-02-20

### 🐛 Bugfix

- Fix the bug that the rolling update of the `Tabs` component is abnormal.

## 2.7.0

2021-01-15

### 🐛 Bugfix

- Fix the problem that `Tabs` scroll calculation error when `type` is `capsule`.
- Fix the problem of the scroll positioning error of the header of `Tabs`.

### 💅 Style

- Fix the problem that the content area of the `Tab` component `line` type tab is nested inside the `card` type tab.


