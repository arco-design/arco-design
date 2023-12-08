## 2.57.0

2023-12-08

### 🆕 Feature

- Support `pt-br` locale([#2429](https://github.com/arco-design/arco-design/pull/2429))

## 2.53.0

2023-09-08

### 🐛 BugFix

- Fixed the problem of console error reporting in boundary scenarios of internal component `VirtualList`([#2216](https://github.com/arco-design/arco-design/pull/2216))

## 2.48.2

2023-05-26

### 💎 Enhancement

- When `Select` / `Cascader` / `TreeSelect` internal `<input />` node is hidden, remove its `value` attribute to avoid redundant text in the user’s copy operation([#1993](https://github.com/arco-design/arco-design/pull/1993))

## 2.48.0

2023-05-12

### 💎 Enhancement

- Optimize `ResizeObserver` monitoring logic to avoid `ResizeObserver loop limit exceeded` error reporting in some scenarios([#1962](https://github.com/arco-design/arco-design/pull/1962))

### 🆕 Feature

- Add Turkish language([#1942](https://github.com/arco-design/arco-design/pull/1942))

## 2.45.0

2023-02-17

### 🆕 Feature

- `Input`, `Select`, `DatePicker`, `TimePicker`, `Cascader`, `TreeSelect`, `AutoComplete` support setting `warning` status through `status` property([#1786](https://github.com/arco-design/arco-design/pull/1786))

## 2.43.1

2022-12-30

### 💎 Enhancement

- Optimize the virtual list scroll position offset problem when the list item has a `margin` value set.([#1690](https://github.com/arco-design/arco-design/pull/1690))
- Remove `defaultProps` usage of inner function components to avoid console warning in React 18 strict mode.([#1687](https://github.com/arco-design/arco-design/pull/1687))

### 🐛 BugFix

- Fix the bug that defaultValue does not take effect in React 18 strict mode for some components.([#1689](https://github.com/arco-design/arco-design/pull/1689))

## 2.41.2

2022-11-11

### 🆎 TypeScript

- Adjust the TS definition of `Modal` `Drawer` `Popconfirm` parameters `okText` and `cancelText` properties to `ReactNode`.([#1558](https://github.com/arco-design/arco-design/pull/1558))

## 2.41.1

2022-11-04

### 🐛 BugFix

- Update `IconLarkColor` icon([#1541](https://github.com/arco-design/arco-design/pull/1541))

## 2.39.3

2022-09-02

### 💎 Enhancement

- Optimized `Modal`, `Notification`, `Message` components to render nodes via `createRoot` in React 18.([#1367](https://github.com/arco-design/arco-design/pull/1367))

## 2.39.2

2022-08-26

### 🐛 BugFix

- Fix server-side rendering error due to auto-generated DOM `id`.([#1334](https://github.com/arco-design/arco-design/pull/1334))
- Fixed the problem that the `Select` component was repeatedly introduced when the `Cascader` / `TreeSelect` style was introduced by on-demand loading([#1327](https://github.com/arco-design/arco-design/pull/1327))

## 2.39.1

2022-08-19

### 💎 Enhancement

- Export prop `version`.([#1303](https://github.com/arco-design/arco-design/pull/1303))

## 2.35.0

2022-06-10

### 🐛 BugFix

- Adjust `Popconfirm`, `Popover`, `Tooltip` component animation pop-up effect to avoid page jitter caused by overshoot effect in border scenes.([#986](https://github.com/arco-design/arco-design/pull/986))

## 2.34.0

2022-05-27

### 🆕 Feature

- Added Arabic.([#932](https://github.com/arco-design/arco-design/pull/932))
- Added Portuguese.([#924](https://github.com/arco-design/arco-design/pull/924))
- Added Russian.([#922](https://github.com/arco-design/arco-design/pull/922))

## 2.33.0

2022-05-13

### 🆕 Feature

- Internationalization support set Vietnamese.([#824](https://github.com/arco-design/arco-design/pull/824))

## 2.29.0

2022-02-11

### 🆕 Feature

- Upgrade `b-validate` version to support `Form` passing `ReactNode` in `validator`([#518](https://github.com/arco-design/arco-design/pull/518))

## 2.28.0

2022-01-07

### 🆕 Feature

- Support to modify css variable prefix through `arco-vars-prefix` less variable([#403](https://github.com/arco-design/arco-design/pull/403))

## 2.23.0

2021-09-27

### 💎 Optimization

- Update lodash method import from lodash.x to lodash/x

## 2.22.0

2021-09-10

### 🆕 Feature

- VirtualList added `scrollOptions` property to specify the default behavior when scrolling.

### 🆎 TypeScript

- All component ts definitions move to interface.ts, and each component entry file export ts interface.

## 2.20.0

2021-07-30

### 🆎 TypeScript

- The `Select/Cascader/TreeSelect` component adds the TS definition of `onClick`.



## 2.17.3

2021-06-24

### 💅 Style

- Fix the problem that the upper and lower spaces of the picture are not set when the photo wall of the upload component is folded.

## 2.16.0

2021-05-28

### 🆕 Feature

- Traditional Chinese (Hong Kong, China) and Traditional Chinese (Taiwan, China) are added for internationalization.

## 2.15.3

2021-05-21

### 💎 Optimization

- Reduce the redrawing of sub-nodes when the virtual list is scrolled to prevent stuck.

## 2.15.1

2021-05-06

### 💎 Optimization

- Font use the cdn path to prevent loader or path errors in building.



## 2.15.0

2021-04-30

### 💎 Optimization

- The css font file is changed from base64 to a font file, which solves the problem that the imported css file is too large when loading repeatedly on demand.



## 2.14.2

2021-04-23

### 🐛 Bugfix

- Fix the problem that the es6 syntax included in the icon may cause packaging errors.
- Fix the bug that `AutoComplete inputProps.suffix` does not take effect.



## 2.14.1

2021-04-16

### 🐛 Bugfix

- Fix the bug of `less@4` packaging error.
- Fix the development environment console warning caused by multi-color icons.



## 2.14.0

2021-04-09

### 🆕 Feature

- Refactored the icon packaging script and logic, the global configuration of the icon no longer uses global variables, and switched to context, paving the way for the subsequent richer global configuration.
- Added Indonesian language support for internationalization.
- Added Thai language support for internationalization.

## 2.13.0

2021-03-26

### 🐛 Bugfix

- Fixed the bug that the pop-up component did not update its position when the parent node mounted on the pop-up layer was resized.

## 2.11.0

2021-03-12

### 🆕 Feature

- `VirtualList` supports passing in percentage height, and it is no longer necessary to forcibly specify the window height.

## 2.10.1

2021-03-05

### 🐛 Bugfix

- Fixed the problem that the order of loading styles under the micro front end caused the internal icon style of the component to be overwritten by the global style.

## 2.10.0 🏮

2020-02-26

### 💅 Style

- Fix the style problem that the right-aligned header text has a 2px right margin, which results in not strictly aligned with the numbers on the table body.

## 2.9.1

2021-02-20

### 💅 Style

- Fix the problem that the icon button with floating background color is not centered in the vertical direction.



## 2.9.0 🔥

2021-02-05

### 🆕 Feature

- Expose the interface of all components.

## 2.8.1

2021-01-28

### 💅 Style

- After the 2.7 version update, the icon style conflicts with the previous version.

## 2.8.0

2021-01-22

### 🆕 Feature

- Added attributes `affixStyle` and `affixClassname` to set styles for fixed elements.
- Compatible with `less@4.0`.



### 💅 Style

- Update some face icons, the path is transparent, to avoid the problem of indistinguishable in some scenes.

## 2.7.2

2021-01-19

### 💅 Style

- Fix the issue that Spin component will affect the font style of wrapped elements.



## 2.7.0

2021-01-15

