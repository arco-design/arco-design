---
changelog: true
---

## 2.44.0

2023-01-13

### 🆕 Feature

- `Form` supports to get the verification information of the specified field through `useFormState`, verification status([#1723](https://github.com/arco-design/arco-design/pull/1723))
- `TimePicker` support set `triggerElement=null` to use panel only.([#1721](https://github.com/arco-design/arco-design/pull/1721))
- `InputTag` adds the `tokenSeparators` property to support automatic word segmentation.([#1720](https://github.com/arco-design/arco-design/pull/1720))
- `Popconfirm` supports `content` property([#1714](https://github.com/arco-design/arco-design/pull/1714))
- Menu property `ellipsis` support `{ text: ReactNode }` to customize the overflow submenu title.([#1700](https://github.com/arco-design/arco-design/pull/1700))

### 🐛 BugFix

- Fix the bug that the `Notification` component occasionally updates the timer after the delay.([#1716](https://github.com/arco-design/arco-design/pull/1716))

### 💅 Style

- Fix `Table` component summary row style error when `fixed=top`.([#1719](https://github.com/arco-design/arco-design/pull/1719))

## 2.43.2

2023-01-06

### 💎 Enhancement

- Optimize the empty string display of `Select` component option value.([#1703](https://github.com/arco-design/arco-design/pull/1703))

### 🐛 BugFix

- Fix the bug that nesting `Popover` components inside `ImagePreviewGroup` causes an error.([#1706](https://github.com/arco-design/arco-design/pull/1706))

## 2.43.1

2022-12-30

### 💎 Enhancement

- Optimize the virtual list scroll position offset problem when the list item has a `margin` value set.([#1690](https://github.com/arco-design/arco-design/pull/1690))
- Remove `defaultProps` usage of inner function components to avoid console warning in React 18 strict mode.([#1687](https://github.com/arco-design/arco-design/pull/1687))

### 🐛 BugFix

- Fix the bug that defaultValue does not take effect in React 18 strict mode for some components.([#1689](https://github.com/arco-design/arco-design/pull/1689))
- Fix the page crash issue when the `InputNumber` passes a decimal with a precision greater than 100 (e.g. 1e-200).([#1688](https://github.com/arco-design/arco-design/pull/1688))
- Optimize the `Anchor` component. When the height of the anchor element is large, the scroll target container may have a bug that activates `Anchor.Link` calculation inaccurately.([#1676](https://github.com/arco-design/arco-design/pull/1676))
- Fix SSR warning for `InputNumber` component due to `useLayoutEffect`.([#1672](https://github.com/arco-design/arco-design/pull/1672))

## 2.43.0

2022-12-23

### 💎 Enhancement

- Optimize the problem that the position of the popup layer flickers when the trigger node style of the `Trigger` component changes to `display: none`.([#1652](https://github.com/arco-design/arco-design/pull/1652))
- Optimize the flickering problem caused by the size change of the popup layer of the `Trigger` component and the location is not updated in time.([#1652](https://github.com/arco-design/arco-design/pull/1652))

### 🆕 Feature

- `DatePicker` supports setting prefix by `prefix`.([#1668](https://github.com/arco-design/arco-design/pull/1668))
- `TimePicker` supports setting prefix by `prefix`.([#1668](https://github.com/arco-design/arco-design/pull/1668))
- Message adds `transitionTimeout` attribute to improve custom animation configuration.([#1667](https://github.com/arco-design/arco-design/pull/1667))
- `Form.Item` supports setting tooltip via `tooltip` property.([#1665](https://github.com/arco-design/arco-design/pull/1665))
- The `Checkbox` component adds an `icon` prop to customize the checked icon.([#1656](https://github.com/arco-design/arco-design/pull/1656))

### 🐛 BugFix

- Fix the bug that mp3 files cannot be uploaded normally when the `Upload` component is set to `accept=audio/mp3`.([#1669](https://github.com/arco-design/arco-design/pull/1669))
- Fix the bug that the `Collapse` component reported an error in React 18 strict mode.([#1666](https://github.com/arco-design/arco-design/pull/1666))

## 2.42.2

2022-12-09

### 💎 Enhancement

- `Select` allows to show dropdown when `allowCreate` is enabled and no option data is present.([#1640](https://github.com/arco-design/arco-design/pull/1640))
- Optimize the situation where the `Form.List` component is completely re-rendered when the form item data is updated through the Form API, causing the page to freeze.([#1638](https://github.com/arco-design/arco-design/pull/1638))

### 🐛 BugFix

- Fix the bug that empty data may appear in the search result panel when the `Cascader` component searches remotely.([#1639](https://github.com/arco-design/arco-design/pull/1639))
- Fix `DatePicker` week selector compatibility with moment.js.([#1631](https://github.com/arco-design/arco-design/pull/1631))

### 💅 Style

- Fix `Switch` component switching animation jitter issue.([#1641](https://github.com/arco-design/arco-design/pull/1641))

## 2.42.1

2022-12-02

### 🐛 BugFix

- Fix the bug that the popup layer is not displayed when `modal.confirm` returned by `Modal.useModal` is called in `useCallback`.([#1628](https://github.com/arco-design/arco-design/pull/1628))
- Fix the bug that the icon is lost when the title of the popup layer created by `Modal.useModal` is updated by the `update` method([#1628](https://github.com/arco-design/arco-design/pull/1628))
- Fix the bug that updating the content of the popup layer through `update` in Promise does not take effect when onOK is set to Promise for the popup layer created by `Modal.useModal`.([#1628](https://github.com/arco-design/arco-design/pull/1628))
- Fix the bug that `defaultPageSize` does not take effect in `sizeOptions` mode of `Pagination` component.([#1627](https://github.com/arco-design/arco-design/pull/1627))

## 2.42.0

2022-11-25

### 🆕 Feature

- `Upload` supports turning off drag upload by setting `drag=false`([#1613](https://github.com/arco-design/arco-design/pull/1613))
- `Transfer` adds `virtualListProps` property to support virtual scrolling of the list.([#1610](https://github.com/arco-design/arco-design/pull/1610))
- `Drawer` component supports `zIndex` property([#1604](https://github.com/arco-design/arco-design/pull/1604))
- `InputNumber` adds `strictMode` to support large numbers and high precision decimals.([#1603](https://github.com/arco-design/arco-design/pull/1603))

### 🐛 BugFix

- Fix the bug that the width of `addButton` of the `Tabs` component causes inaccurate calculation of scrolling timing([#1614](https://github.com/arco-design/arco-design/pull/1614))
- Fixed a bug where the popup layer could not be displayed when `Checkbox.Group` was used as a child of `Trigger`.([#1612](https://github.com/arco-design/arco-design/pull/1612))
- Fix the bug of reporting an error when the data of the `Table` component is `number[]` or `string[]`.([#1611](https://github.com/arco-design/arco-design/pull/1611))
- Fixed the bug that the config passed in when creating the popup layer was lost when the `Modal` component updated the popup content through the `update` method.([#1609](https://github.com/arco-design/arco-design/pull/1609))
- Fixed a bug where the `.arco-modal-title` node was still rendered when `title={null}` & `icon={null}` were set when the `Modal` component created a popup layer through a static method.([#1609](https://github.com/arco-design/arco-design/pull/1609))
- Fix the bug that the `containerScrollToClose` property of the `Trigger` component does not take effect when the page scrolling container is document.documentElement.([#1606](https://github.com/arco-design/arco-design/pull/1606))
- Fixed a bug that when the `Table` component enabled virtual scrolling, dynamically changing the `scroll` would cause the fixed column highlight to lose its style.([#1600](https://github.com/arco-design/arco-design/pull/1600))
- Fix the problem that when `showSearch = true` in Firefox browser, Select needs to be clicked twice to pop up the drop-down box.([#1569](https://github.com/arco-design/arco-design/pull/1569))

## 2.41.3

2022-11-18

### 🐛 BugFix

- Fix `DatePicker.Range` component when the panel is open, the panel date is incorrect bug when switching `mode`.([#1580](https://github.com/arco-design/arco-design/pull/1580))
- Fixed a bug that the `Upload` component incorrectly filters files with uppercase suffixes.([#1572](https://github.com/arco-design/arco-design/pull/1572))

### 💅 Style

- Fix the bug that `Steps` does not display connecting lines when the label position is `vertical`([#1581](https://github.com/arco-design/arco-design/pull/1581))

## 2.41.2

2022-11-11

### 💎 Enhancement

- Reduced unexpected rendering times of `Table` component `column.render`.([#1562](https://github.com/arco-design/arco-design/pull/1562))
- Optimize the problem that the `InputNumber` with `formatter` automatically move back to the end of the text when the user is typing.([#1559](https://github.com/arco-design/arco-design/pull/1559))
- Optimize the jitter problem that may occur when the virtual list is scrolled to the bottom.

### 🐛 BugFix

- Fixed the bug that `Layout.Sider` would flicker for the first rendering when `collapsed` is enabled by default([#1564](https://github.com/arco-design/arco-design/pull/1564))
- Fixed a bug where the `Steps` component had the wrong style when it was nested([#1563](https://github.com/arco-design/arco-design/pull/1563))

### 🆎 TypeScript

- Adjust the TS definition of `Modal` `Drawer` `Popconfirm` parameters `okText` and `cancelText` properties to `ReactNode`.([#1558](https://github.com/arco-design/arco-design/pull/1558))

## 2.41.1

2022-11-04

### 💎 Enhancement

- Update `IconLarkColor` icon([#1541](https://github.com/arco-design/arco-design/pull/1541))
- Optimize the jitter problem that may occur when the horizontal mode of the `Menu` component is automatically collapsed.([#1543](https://github.com/arco-design/arco-design/pull/1543))

### 🐛 BugFix

- Fixed a bug where `Tooltip`, `Popover`, `Input` styles were not introduced when `Typography` component loads styles on demand.([#1541](https://github.com/arco-design/arco-design/pull/1541))
- Fixed `Select` component showing `placeholder` as `value` bug when `value = ''`.([#1536](https://github.com/arco-design/arco-design/pull/1536))

### 💅 Style

- Fixed `Select` vertical alignment problem when used in `Input.Group`.([#1534](https://github.com/arco-design/arco-design/pull/1534))

## 2.41.0

2022-10-28
### 🚨 Important attention

- **In order to fix the problem that the width of `Select` does not automatically change with the content when `width: auto`, the new DOM node in the inner layer directly wraps `.arco-select-view-value` and `input` in radio mode Label**

### 💎 Enhancement

- Reduce the number of times the `TreeSelect` component re-renders when `retainInputValueWhileSelect` is enabled([#1517](https://github.com/arco-design/arco-design/pull/1517))
- Show `zoom-in` mouse type when `Image` component is hovered([#1477](https://github.com/arco-design/arco-design/pull/1477))

### 🆕 Feature

- The `Collapse` component adds a `triggerRegion` property to customize the collapse trigger region.([#1520](https://github.com/arco-design/arco-design/pull/1520))
- The `InputNumber` component `formatter` adds a parameter to mark the user-typing state.([#1516](https://github.com/arco-design/arco-design/pull/1516))
- Add Malay.([#1465](https://github.com/arco-design/arco-design/pull/1465))
- The `Select` component supports setting the front tag through the `addBefore` property([#1464](https://github.com/arco-design/arco-design/pull/1464))
- The `TreeSelect` component supports setting the front tag through the `addBefore` property([#1464](https://github.com/arco-design/arco-design/pull/1464))
- The `Cascader` component supports setting the front tag through the `addBefore` property([#1464](https://github.com/arco-design/arco-design/pull/1464))
- The `Upload` component supports enabling built-in image preview functionality via the `imagePreview` property.([#1459](https://github.com/arco-design/arco-design/pull/1459))
- `Upload` component supports `onDragLeave` and `onDragOver` event callbacks([#1459](https://github.com/arco-design/arco-design/pull/1459))
- The `colon` property of the `Form` component supports passing a `ReactNode`.([#1455](https://github.com/arco-design/arco-design/pull/1455))

### 🐛 BugFix

- Fix `Transfer` disabled items can still be draggable when `draggable` is enabled.([#1493](https://github.com/arco-design/arco-design/pull/1493))
- Fix the bug that the width of `Select` does not automatically change with the content when `width: auto` is set. (In the single-selection mode, the new DOM node in the inner layer directly wraps the `.arco-select-view-value` and `input` tags)([#1490](https://github.com/arco-design/arco-design/pull/1490))
- Fix the bug that is wrong in the horizontal scrolling direction under the `RTL` view.([#1487](https://github.com/arco-design/arco-design/pull/1487))
- Optimized the problem that the `title` property of the `Cascader` component option displays `[object object]`.([#1468](https://github.com/arco-design/arco-design/pull/1468))
- Fixed the bug that the parent node cannot be selected after the child node is selected when the `Cascader` component is set to `changeOnSelect` & `mode=multiple`([#1468](https://github.com/arco-design/arco-design/pull/1468))
- Fix the bug that the starting range of Slider is out of order due to the update of the parent component([#1467](https://github.com/arco-design/arco-design/pull/1467))
- Fixed the bug that the same value could not be entered again after `TreeSelect` was controlled to empty `inputValue`([#1463](https://github.com/arco-design/arco-design/pull/1463))
- Fixed a bug where the `shouldUpdate` property of the `Form.Item` component did not take effect when resetting the form item.([#1462](https://github.com/arco-design/arco-design/pull/1462))
- Fixed the bug that `defaultCollapsed` of `Layout.Sider` component did not take effect.([#1458](https://github.com/arco-design/arco-design/pull/1458))
- Fixed the bug that when the `InputTag` component has enabled `dragToSort`, the tag will be rendered twice when the disabled state is toggled.([#1457](https://github.com/arco-design/arco-design/pull/1457))

### 💅 Style

- Fix the bug that the border style of text buttons is wrong under `Button.Group`([#1515](https://github.com/arco-design/arco-design/pull/1515))
- Fix `Tabs` component's `extra` element's style issue that is covered when the width is large.([#1494](https://github.com/arco-design/arco-design/pull/1494))
- Fixed `Table` component's style issue of collapsed column height when `scroll.x` is too small.([#1492](https://github.com/arco-design/arco-design/pull/1492))
- Fixed a bug where the new icon color value of the `Tabs` component in dark mode was incorrect.([#1454](https://github.com/arco-design/arco-design/pull/1454))
- Fixed `Tabs` component in `type=line` & `tabPosition=bottom`, the style issue of the wrong split line position.([#1248](https://github.com/arco-design/arco-design/pull/1248))

## 2.40.2

2022-09-30

### 🐛 BugFix

- Fix the bug of console warning when `Modal` component is uninstalled under React 18([#1440](https://github.com/arco-design/arco-design/pull/1440))
- Fixed the issue that when the `Popconfirm` component enables `focusLock`, the performance of the DOM level inside the Footer is inconsistent with the default, causing the button margin style to fail.([#1437](https://github.com/arco-design/arco-design/pull/1437))

### 💅 Style

- Remove the `overflow: hidden` attribute of the extra content rendering area of the `PageHeader` component to avoid the problem of custom rendering content being covered([#1436](https://github.com/arco-design/arco-design/pull/1436))
- Fixed the issue that when the `Table` component expands a row and nested a sub table, the cell transparent problem occurs when the subtable opens fixed column.([#1433](https://github.com/arco-design/arco-design/pull/1433))

## 2.40.1

2022-09-23

### 🐛 BugFix

- Fix the bug that when Table is turned off `checkStrictly`, passing in non-existing `selectedKeys` will  report an error([#1420](https://github.com/arco-design/arco-design/pull/1420))
- Fix the bug that the `holderRef` of `useModal` may not exist([#1418](https://github.com/arco-design/arco-design/pull/1418))

### 💅 Style

- After opening `preview` of the Image component, the hover style changes to `zoom-out`([#1419](https://github.com/arco-design/arco-design/pull/1419))

## 2.40.0

2022-09-16

### 💎 Enhancement

- Optimize the built-in validation information template of the `Form` component([#1398](https://github.com/arco-design/arco-design/pull/1398))
- Optimize the problem that the DOM node of `Space` is remounted when the specified `key` value has not changed.([#1393](https://github.com/arco-design/arco-design/pull/1393))

### 🆕 Feature

- `Message` component supports `useMessage` usage for reading `context`([#1401](https://github.com/arco-design/arco-design/pull/1401))
- `Notification` component supports `useNotification` usage for reading `context`([#1401](https://github.com/arco-design/arco-design/pull/1401))
- `Form.Item` supports the `dependencies` property([#1397](https://github.com/arco-design/arco-design/pull/1397))
- `Grid` responsive breakpoints support `xxxl` (width > 2000px).([#1396](https://github.com/arco-design/arco-design/pull/1396))
- The `showSearch / showFooter / searchPlaceholder / pagination / listStyle` properties of `Transfer` support passing in different property values for source/target lists via arrays.([#1389](https://github.com/arco-design/arco-design/pull/1389))
- `Breadcrumb` adds `href`, `onClick` and `tagName` properties.([#1363](https://github.com/arco-design/arco-design/pull/1363))
- The `Select` component supports listening to the `onKeyDown` callback.([#1360](https://github.com/arco-design/arco-design/pull/1360))
- The `TreeSelect` component supports listening to the `onKeyDown` callback.([#1360](https://github.com/arco-design/arco-design/pull/1360))
- The `Cascader` component supports listening to the `onKeyDown` callback.([#1360](https://github.com/arco-design/arco-design/pull/1360))

### 🐛 BugFix

- Fix the bug that the return value of `Form.useWatch` is not updated in time when `field` changes([#1400](https://github.com/arco-design/arco-design/pull/1400))
- Fixed the bug that `Message` could not be displayed properly in pages with `body { display: 'flex' }` set.([#1373](https://github.com/arco-design/arco-design/pull/1373))

### 💅 Style

- Fixed the issue that could cause the page to scroll under the `Layout` light theme.([#1391](https://github.com/arco-design/arco-design/pull/1391))
- Fix the bug that the corresponding dom node still renders when `Statistic` does not pass `prefix` / `suffix`([#1388](https://github.com/arco-design/arco-design/pull/1388))
- Fix disabled `TabPane` header area hover style in `Tabs` with `capsule` type in dark mode.([#1368](https://github.com/arco-design/arco-design/pull/1368))

### 🆎 TypeScript

- Improve typescript definition of the `placement` property of `Drawer`.([#1377](https://github.com/arco-design/arco-design/pull/1377))

## 2.39.3

2022-09-02

### 💎 Enhancement

- Optimized `Modal`, `Notification`, `Message` components to render nodes via `createRoot` in React 18.([#1367](https://github.com/arco-design/arco-design/pull/1367))

### 🐛 BugFix

- Fixed a bug where the `Typography` component would jitter in the folding calculation([#1366](https://github.com/arco-design/arco-design/pull/1366))
- Fixed the jitter of the drop-down list when the `Cascader` component set `expandTrigger` to `hover`.([#1365](https://github.com/arco-design/arco-design/pull/1365))
- Fix the bug that the callback is not triggered occasionally after `Steps.Step` is passed to the `onClick` event([#1364](https://github.com/arco-design/arco-design/pull/1364))
- Fixed a bug where the `Drawer` component was forced to lock the focus inside an `iframe`, causing the parent page to fail to get the focus.([#1359](https://github.com/arco-design/arco-design/pull/1359))
- Fixed a bug where the `Modal` component was forced to lock the focus inside an `iframe`, causing the parent page to fail to get the focus.([#1359](https://github.com/arco-design/arco-design/pull/1359))
- Fixed a bug where the `Popconfirm` component was forced to lock the focus inside an `iframe`, causing the parent page to fail to get the focus.([#1359](https://github.com/arco-design/arco-design/pull/1359))
- Fixed `DatePicker` component error in `de-DE` language.([#1358](https://github.com/arco-design/arco-design/pull/1358))
- Fixed the bug that `placeholder` was not displayed as expected when `InputTag` was set to `disabled`.([#1357](https://github.com/arco-design/arco-design/pull/1357))
- Fixed the bug that when the `Cascader` component has disabled child nodes, when the parent node in the half-selected state is selected, the selected state cannot be switched.([#1354](https://github.com/arco-design/arco-design/pull/1354))

### 💅 Style

- Optimize the style of inline `<a/>` in `Menu` component.([#1362](https://github.com/arco-design/arco-design/pull/1362))
- Optimize the style of `<a/>` embedded in `Menu` in the dropdown menu of the `Dropdown` component.([#1362](https://github.com/arco-design/arco-design/pull/1362))

## 2.39.2

2022-08-26

### 💎 Enhancement

- Optimized the behavior of auto-folding when horizontal `Menu` width changes to avoid occasional line breaks.([#1331](https://github.com/arco-design/arco-design/pull/1331))
- Make sure that the keyboard shortcuts are still available when the `Select` component uses `dropdownRender` to customize the dropdown box content and gets the page focus.([#1328](https://github.com/arco-design/arco-design/pull/1328))

### 🐛 BugFix

- Fix the problem that after the `Table` component updates `data`, the `selectedRows` is not updated in time when the selectedRows is selected next time.([#1341](https://github.com/arco-design/arco-design/pull/1341))
- Fix the bug that the `DatePicker.RangePicker` component dynamically modifies `disabled`, and the disabled date is not updated in time.([#1336](https://github.com/arco-design/arco-design/pull/1336))
- Fix server-side rendering error due to auto-generated DOM `id`.([#1334](https://github.com/arco-design/arco-design/pull/1334))
- Fixed a bug where the initial `pageSize` of the `Pagination` component was inconsistent with the selected `sizeOptions`.([#1333](https://github.com/arco-design/arco-design/pull/1333))
- Fixed a bug where the selected node was not scrolled to the viewport correctly when the `Cascader` component opened the virtual list.([#1329](https://github.com/arco-design/arco-design/pull/1329))
- Fixed the problem that the `Select` component was repeatedly introduced when the `Cascader` / `TreeSelect` style was introduced by on-demand loading([#1327](https://github.com/arco-design/arco-design/pull/1327))

### 💅 Style

- When the `placeholder` of the `InputTag` component is too long, it will be displayed with `...` at the end.([#1339](https://github.com/arco-design/arco-design/pull/1339))
- Fix the bug that the display position of the built-in collapse button of the `Menu` component is wrong([#1332](https://github.com/arco-design/arco-design/pull/1332))

## 2.39.1

2022-08-19

### 💎 Enhancement

- Optimize cascader edge case handling([#1304](https://github.com/arco-design/arco-design/pull/1304))
- Export prop `version`.([#1303](https://github.com/arco-design/arco-design/pull/1303))

### 🐛 BugFix

- Fix the bug that setting `md = 0` in the `Grid.Col` would cause it to not display on larger window sizes.([#1307](https://github.com/arco-design/arco-design/pull/1307))
- Fix the bug that the method `update` returned by `useModal` is `undefined` when creating a modal instance.([#1300](https://github.com/arco-design/arco-design/pull/1300))
- Fixed the bug that the `panelRender` of the `DatePicker.RangePicker` component did not work.([#1293](https://github.com/arco-design/arco-design/pull/1293))

### 💅 Style

- Unify the style of the right arrow in `Select` multi-select and single-select modes.([#1302](https://github.com/arco-design/arco-design/pull/1302))

## 2.39.0

2022-08-12

### 🚨 Important attention

- **In order to fix the bug that the `Tag` component exceeds the omission and the close icon is blocked, a new layer of DOM structure is added inside, and `children` will be placed under `.arco-tag-content`**

### 💎 Enhancement

- `Pagination` supports switching page numbers via keyboard events([#1276](https://github.com/arco-design/arco-design/pull/1276))
- `Collapse` supports switching the current panel selection via keyboard events([#1276](https://github.com/arco-design/arco-design/pull/1276))
- `The `Tag` component supports closing tags via keyboard events([#1276](https://github.com/arco-design/arco-design/pull/1276))

### 🆕 Feature

- `Image.Preview` adds the `imgAttributes` parameter to transparently transmit the properties to the `img` tag in the preview modal([#1274](https://github.com/arco-design/arco-design/pull/1274))
- The `Cascader` component supports controlling the display of drop-down panels through the `showSearch.panelMode` property([#1267](https://github.com/arco-design/arco-design/pull/1267))
- The `Cascader` component supports customizing the rendering of search terms via the `showSearch.renderOption` property([#1267](https://github.com/arco-design/arco-design/pull/1267))
- `TreeSelect` add properties `inputValue` and `onInputValueChange`.([#1151](https://github.com/arco-design/arco-design/pull/1151))

### 🐛 BugFix

- Fixed the bug that the width of the `extra` node of Tabs caused an error in the calculation of the head scrolling threshold.([#1275](https://github.com/arco-design/arco-design/pull/1275))
- Fix the problem that the `DatePicker.RangePicker` component is wrong to judge whether it is out of range in a critical situation.([#1273](https://github.com/arco-design/arco-design/pull/1273))
- Fixed `Table` component not rendering correctly when data format is `[['1']], ['2']]`.([#1270](https://github.com/arco-design/arco-design/pull/1270))
- Fix the bug that the ellipsis is not displayed after the `Tag` component text content exceeds.([#1268](https://github.com/arco-design/arco-design/pull/1268))
- Fixed the issue that when virtual scrolling is enabled, when options with the same value exist in the search panel of the `Cascader` component, the options are rendered incorrectly.([#1266](https://github.com/arco-design/arco-design/pull/1266))

## 2.38.1

2022-08-05

### 🐛 BugFix

- Fix the bug of inconsistent week display between `DatePicker.WeekPicker` input box and panel.([#1238](https://github.com/arco-design/arco-design/pull/1238))
- Fixed the bug that the `Image` component passed the native property `onLoad`, `onError` was not triggered([#1236](https://github.com/arco-design/arco-design/pull/1236))
- fix `accept=*` does not work in `Upload`([#1233](https://github.com/arco-design/arco-design/pull/1233))
- Fix the bug that form value won't update when the parameter of `setFieldsValue` is empty array or empty object.([#1186](https://github.com/arco-design/arco-design/pull/1186))

## 2.38.0

2022-07-29

### 🆕 Feature

- Component `TimePicker` add `triggerElement` prop to support custom trigger element.([#1199](https://github.com/arco-design/arco-design/pull/1199))

### 🐛 BugFix

- Fix the position jitter when the `Mentions` dropdown popup appears.([#1222](https://github.com/arco-design/arco-design/pull/1222))
- Fix `Image.Preview`'s `onVisibleChange` not triggering when preview is opened.([#1219](https://github.com/arco-design/arco-design/pull/1219))
- Fix the bug that the `onChange` callback of the paginator does not trigger after `Table` is passed to `pagination` alone([#1217](https://github.com/arco-design/arco-design/pull/1217))
- Fixed a bug where the `Trigger` component could not display the popup in React 18 strict mode.([#1215](https://github.com/arco-design/arco-design/pull/1215))
- Fixed the bug that `Carousel` would slide to the first page when clicking in the middle of indicators.([#1210](https://github.com/arco-design/arco-design/pull/1210))
- Fixed the bug that child elements of `Carousel` could not fill up the height of the component.([#1210](https://github.com/arco-design/arco-design/pull/1210))
- Fixed a bug where the label of the selected item was not displayed properly when the `TreeSelect` component enabled multiple checkbox selection and remote search in controlled mode.([#1207](https://github.com/arco-design/arco-design/pull/1207))
- Fixed a bug where clicking the close button of an `Alert` component accidentally triggered the `submit` event of an external `form`.([#1205](https://github.com/arco-design/arco-design/pull/1205))
- Fix `DatePicker.RangePicker` can't change mode from month to year.([#1188](https://github.com/arco-design/arco-design/pull/1188))
- Fixed flickering "no data" placeholder when `allowCreate` in `Select`.([#1184](https://github.com/arco-design/arco-design/pull/1184))

## 2.37.2

2022-07-22

### 🐛 BugFix

- Fixed an issue where the `onInputValueChange` callback might not be triggered in the `inputValue` controlled mode of the `Select` component.([#1178](https://github.com/arco-design/arco-design/pull/1178))
- Fix the bug that the `onChange` callback parameter of the `Table` component is not updated in time([#1155](https://github.com/arco-design/arco-design/pull/1155))

## 2.37.1

2022-07-14

### 🐛 BugFix

- Fixed the bug that when the `InputNumber` component is `readOnly=true`, clicking the up and down keys can still change the value.([#1141](https://github.com/arco-design/arco-design/pull/1141))
- Fix the problem of `Typography` text omission under different text styles such as `underline`([#1137](https://github.com/arco-design/arco-design/pull/1137))
- Fixed the bug that `disabled` didn't work for the second button of `Dropdown.Button`.([#1136](https://github.com/arco-design/arco-design/pull/1136))

## 2.37.0

2022-07-08

### 🆕 Feature

- Support for RTL mode. (`Table`, `Resize`, `Slider` components are still being developed)
- The `Select` component supports customizing the `maxTag` content display through the `maxTagCount` property of the object type([#1112](https://github.com/arco-design/arco-design/pull/1112))
- The `Cascader` component supports customizing the `maxTag` content display through the `maxTagCount` property of the object type([#1112](https://github.com/arco-design/arco-design/pull/1112))
- The `TreeSelect` component supports customizing the `maxTag` content display through the `maxTagCount` property of the object type([#1112](https://github.com/arco-design/arco-design/pull/1112))
- The `InputTag` component allows formatting of values entered by the user via the `validate` property.([#1110](https://github.com/arco-design/arco-design/pull/1110))
- `Cascader` supports the default highlighting of the first option after searching by setting the `defaultActiveFirstOption` property.([#1096](https://github.com/arco-design/arco-design/pull/1096))
- The `Upload` component supports listening to the `onDrop` event([#1071](https://github.com/arco-design/arco-design/pull/1071))
- `Form.useWatch` supports watching multiple field values.([#1034](https://github.com/arco-design/arco-design/pull/1034))

### 🐛 BugFix

- Fixed `Form.useWatch` when monitoring a form control with an initial value but not mounted, the return value has a change of `initial value => undefined`, causing the component to update.([#1034](https://github.com/arco-design/arco-design/pull/1034))
- Fix the bug that ellipsis does not take effect when `Table` component set `column.sorter` and `column.ellipsis` at the same time.([#1108](https://github.com/arco-design/arco-design/pull/1108))
- Fix the style issue that the left border of `Table` component disappears when there is no data.([#1106](https://github.com/arco-design/arco-design/pull/1106))
- Fix the bug of error when `Table` component data is null.([#1104](https://github.com/arco-design/arco-design/pull/1104))
- Fixed bug where the `onChange` method of the `Form.Item` component injected into a custom form control would be redeclared every time it renders.([#1102](https://github.com/arco-design/arco-design/pull/1102))
- fix `Upload` can upload file type not in accept([#1097](https://github.com/arco-design/arco-design/pull/1097))

### 💅 Style

- The `Typography` default style adds `white-space: 'normal'` to remove the parent element's effect on ellipsis.([#1109](https://github.com/arco-design/arco-design/pull/1109))
- Fixed an issue where the drag flag of the first item in the list might be obscured by the container when `Transfer` is draggable.([#1103](https://github.com/arco-design/arco-design/pull/1103))

## 2.36.1

2022-07-01

### 🐛 BugFix

- Fixed the bug that when the `Drawer` was set to `visible=true` during the hiding process, clicking again on the masked drawer could not be hidden.([#1079](https://github.com/arco-design/arco-design/pull/1079))
- Fix the problem that the order of form items is adjusted under `Form.List`, and the verification status may be displayed in disorder.([#1077](https://github.com/arco-design/arco-design/pull/1077))
- Fixed `Calendar` component `defaultValue` and selected date not being highlighted.([#1073](https://github.com/arco-design/arco-design/pull/1073))
- Fix console React Warning (not recognize prop on a DOM element) caused by `Input` component.([#1070](https://github.com/arco-design/arco-design/pull/1070))

## 2.36.0

2022-06-24

### 🚨 Important attention

- **This version has refactored and optimized the `Typography` component beyond omission. In order to avoid the change of the dom structure by default, the default value of `ellipsis.cssEllipsis` has been changed to `false`. For specific reasons [About exceeding omission](https://arco.design/react/en-US/components/typography#about-exceeding-omission)**

### 💎 Enhancement

- Optimized the display of the `Transfer` component in `simple` mode for the current number of options in the list.([#1045](https://github.com/arco-design/arco-design/pull/1045))
- The `Menu` component supports switching operations using the Tab key.([#1038](https://github.com/arco-design/arco-design/pull/1038))
- The `Typography` component is beyond ellipsis optimization, and `cssEllipsis` supports multi-line elision scenarios to meet performance optimization in the case of large amounts of data.([#1039](https://github.com/arco-design/arco-design/pull/1039))

### 🆕 Feature

- `Statistic` component adds `renderFormat` parameter to support custom rendering.([#1044](https://github.com/arco-design/arco-design/pull/1044))

### 🐛 BugFix

- Fixed the bug that the data and record outputted by the `Table` component contained internal data.([#1047](https://github.com/arco-design/arco-design/pull/1047))
- Fixed a bug where the validation state of other form items was lost when the `Form.List` component was removed from the form item.([#1046](https://github.com/arco-design/arco-design/pull/1046))
- Fixed a bug where the `form.clearFields()` method did not clear the validation state.([#1046](https://github.com/arco-design/arco-design/pull/1046))
- Fixed a bug where `InputNumber` was affected by the global configuration of `Input`.([#1042](https://github.com/arco-design/arco-design/pull/1042))
- Fixed a bug where the selection range of the `DatePicker` component was invalid in rare cases.([#1041](https://github.com/arco-design/arco-design/pull/1041))
- fix `dragToSort` not works on `Cascader`([#1029](https://github.com/arco-design/arco-design/pull/1029))
- fix `dragToSort` not works on `TreeSelect`([#1029](https://github.com/arco-design/arco-design/pull/1029))

### 💅 Style

- Completely hides the popup menu when the `Dropdown` menu item has no children.([#1043](https://github.com/arco-design/arco-design/pull/1043))
- Fixed ellipsis in `Pagination` not vertically centered in some cases.([#1040](https://github.com/arco-design/arco-design/pull/1040))
- Fixed the issue that the arrow direction on the right side of `Menu.SubMenu` did not change when it was expanded.([#1022](https://github.com/arco-design/arco-design/pull/1022))

## 2.35.1

2022-06-17

### 💎 Enhancement

- The `Select` component uses the Dom Attribute to mark options that the user is creating and has already created.([#1011](https://github.com/arco-design/arco-design/pull/1011))

### 🐛 BugFix

- Fixed arrow style of `Tooltip` in dark mode([#995](https://github.com/arco-design/arco-design/pull/995))
- Fix the bug that `Table` component will change the original data when tree data.([#990](https://github.com/arco-design/arco-design/pull/990))

## 2.35.0

2022-06-10

### 💎 Enhancement

- The default value of the `dayStartOfWeek` of the `DatePicker` component is determined by the locale set, no longer default to `0`.([#982](https://github.com/arco-design/arco-design/pull/982))

### 🆕 Feature

- `ResizeBox.Split` added `horizontal-reverse` and `vertical-reverse` two arrangements.([#984](https://github.com/arco-design/arco-design/pull/984))
- `Cascader` supports opening virtual lists via `virtualListProps`([#972](https://github.com/arco-design/arco-design/pull/972))
- `Cascader` supports custom class name for dropdown menu by setting `dropdownMenuClassname`([#972](https://github.com/arco-design/arco-design/pull/972))
- `Cascader` supports setting the style of each column of the dropdown menu through `dropdownMenuColumnStyle`([#972](https://github.com/arco-design/arco-design/pull/972))
- The `Table` component supports fixed columns when `virtualized` is enabled.([#971](https://github.com/arco-design/arco-design/pull/971))

### 🐛 BugFix

- Fixed the bug that the length of `Input.TextArea` component may exceed `maxLength` when inputting Chinese.([#988](https://github.com/arco-design/arco-design/pull/988))
- Adjust `Popconfirm`, `Popover`, `Tooltip` component animation pop-up effect to avoid page jitter caused by overshoot effect in border scenes.([#986](https://github.com/arco-design/arco-design/pull/986))
- Fixed the bug of `value` controlled invalidation when the `Cascader` component set the echo mode to `parent`.([#983](https://github.com/arco-design/arco-design/pull/983))
- Fixed a bug where the `simple` property passed in when the `Modal` component created a popup via `useModal` did not take effect.([#980](https://github.com/arco-design/arco-design/pull/980))
- Fixed a bug where `showJumper=false` did not work for `Pagination` component in `simple` mode.([#979](https://github.com/arco-design/arco-design/pull/979))
- Fixed a bug where `Form.useWatch` returned a non-latest value when adding/deleting rows in `Form.List`.([#955](https://github.com/arco-design/arco-design/pull/955))
- Fixed the bug that the callback parameter was wrong when the `Select` component set `LabelInValue`.([#953](https://github.com/arco-design/arco-design/pull/953))
- Add CSS units support for width property([#951](https://github.com/arco-design/arco-design/pull/951))

### 💅 Style

- Fixed `Menu` component submenu title bar icons not vertically centered.([#985](https://github.com/arco-design/arco-design/pull/985))

## 2.34.0

2022-05-27

### 💎 Enhancement

- Reduce the number of computations for `Typography` on first render([#935](https://github.com/arco-design/arco-design/pull/935))

### 🆕 Feature

- `Layout` adds `resizeBoxProps` property to receive all parameters of `resizeBox`([#937](https://github.com/arco-design/arco-design/pull/937))
- Added Arabic.([#932](https://github.com/arco-design/arco-design/pull/932))
- The `Cascader` component supports controlling the input box value through the `InputValue` property([#931](https://github.com/arco-design/arco-design/pull/931))
- The `Upload` component supports rendering images via the `showUploadList.imageRender` property.([#925](https://github.com/arco-design/arco-design/pull/925))
- The `Upload` component supports rendering upload progress nodes via the `showUploadList.progressRender` property.([#925](https://github.com/arco-design/arco-design/pull/925))
- The `Upload` component supports `children` passed in the function type to render the node content that triggers the upload.([#925](https://github.com/arco-design/arco-design/pull/925))
- The default gray background has been added to the picture display area in the photo wall mode of the `Upload` component.([#925](https://github.com/arco-design/arco-design/pull/925))
- Added Portuguese.([#924](https://github.com/arco-design/arco-design/pull/924))
- Added Russian.([#922](https://github.com/arco-design/arco-design/pull/922))
- Added `panelRender` parameter to the `DatePicker` component.([#914](https://github.com/arco-design/arco-design/pull/914))
- The `Trigger` component supports the popup layer to be closed when the container is scrolled by setting the `containerScrollToClose` property.([#913](https://github.com/arco-design/arco-design/pull/913))

### 🐛 BugFix

- Fix `ResizeBox.SplitGroup` responsive error bug([#934](https://github.com/arco-design/arco-design/pull/934))
- Fix the bug that the `warning` state of the form control is not cleared when the `Form` component sets the `warning` to `null` through `setFields`.([#930](https://github.com/arco-design/arco-design/pull/930))
- Fixed an issue where the content of the label on the right side of the timeline was rendered incorrectly when the `Timeline` component was in `mode=alternate`.([#929](https://github.com/arco-design/arco-design/pull/929))
- Fixed the bug that the third parameter `keyPath` of `onMenuItemClick` in `Dropdown.Menu` was missing.([#921](https://github.com/arco-design/arco-design/pull/921))
- Fix the bug that the `onItemSelectAll` method does not work when `Transfer` customizes the list.([#903](https://github.com/arco-design/arco-design/pull/903))

### 💅 Style

- Adjust the position of the popup layer when the submenu of `Menu` pops up from the left.([#923](https://github.com/arco-design/arco-design/pull/923))

### 🆎 TypeScript

- Improve the TS definition of `children` for `Radio` component([#928](https://github.com/arco-design/arco-design/pull/928))

## 2.33.1

2022-05-20

### 🚨 Important attention

- **Modifications to the return value of `getFieldValue` should not affect the original data inside `Form`.([#869](https://github.com/arco-design/arco-design/pull/869))(Please do not use the return value of `form.getFieldValue` as a dependency of `useEffect`, its return value will be deeply cloned, and the reference address will change**

### 🐛 BugFix

- Fixed a bug that `Split.Group` of `ResizeBox` could not adapt to certain scenes([#892](https://github.com/arco-design/arco-design/pull/892))
- Fixed the bug that the `Expand/Collapse` button of the `Typography` component was displayed at the wrong time([#890](https://github.com/arco-design/arco-design/pull/890))
- Fixed the bug that the icon of SubMenu title was not displayed when Menu is collapsed.([#889](https://github.com/arco-design/arco-design/pull/889))
- Fixed a bug that the prefix of the prompt icon did not change after `Message` was set to `prefixCls`.([#887](https://github.com/arco-design/arco-design/pull/887))
- Fixed a bug that the prefix of the prompt icon did not change after `Notification` was set to `prefixCls`.([#887](https://github.com/arco-design/arco-design/pull/887))
- Fixed `Image.PreviewGroup ` component's `onChange` event not firing when `current` is controlled([#880](https://github.com/arco-design/arco-design/pull/880))
- When the `title` of `Anchor.Link` is empty, the clickable area `<a/>` under it is not displayed([#878](https://github.com/arco-design/arco-design/pull/878))
- Fixed the bug that the table header cells also have border-radius when the `Table` component header is grouped.([#872](https://github.com/arco-design/arco-design/pull/872))
- Modifications to the return value of `getFieldValue` should not affect the original data inside the `Form`([#869](https://github.com/arco-design/arco-design/pull/869))

### 🆎 TypeScript

- Complete `children` property type in `FormItemProps`, compatible with React 18([#874](https://github.com/arco-design/arco-design/pull/874))

## 2.33.0

2022-05-13

### 💎 Enhancement

- The `InputNumber` component always displays numbers in non-scientific notation.([#865](https://github.com/arco-design/arco-design/pull/865))

### 🆕 Feature

- The `Typography` component omits the scene to support expanding controlled.([#867](https://github.com/arco-design/arco-design/pull/867))
- The `Form` component supports `Form.useWatch`.([#864](https://github.com/arco-design/arco-design/pull/864))
- The `Form` component supports `Form.useFormContext`.([#864](https://github.com/arco-design/arco-design/pull/864))
- The `componentConfig` of the `ConfigProvider` component supports configuring `Timeline.Item`.([#862](https://github.com/arco-design/arco-design/pull/862))
- `Table` Add `rowSelection.checkStrictly` to support parent-child selection associations.([#849](https://github.com/arco-design/arco-design/pull/849))
- Internationalization support set Vietnamese.([#824](https://github.com/arco-design/arco-design/pull/824))
- The `Tabs` component of type `rounded` supports different sizes.([#817](https://github.com/arco-design/arco-design/pull/817))

### 🐛 BugFix

- Fix the bug of folding error when `Typography` component uses inline elements such as `code`.([#866](https://github.com/arco-design/arco-design/pull/866))
- Fixed the bug that the `Anchor` component clicked on the anchor element when the content height was not enough.([#859](https://github.com/arco-design/arco-design/pull/859))
- Adjust the order of parameters in the upload request of the `Upload` component (the `file` field is added last to `FormData`).([#857](https://github.com/arco-design/arco-design/pull/857))
- Fixed the bug that input box in the menu of `Dropdown` can not be focused.([#856](https://github.com/arco-design/arco-design/pull/856))
- Fixed the bug that `List` component `onReachBottom` could not be triggered occasionally.([#854](https://github.com/arco-design/arco-design/pull/854))

## 2.32.2

2022-04-29

### 🐛 BugFix

- Fixed a bug where the `Switch` component could not trigger the display of the `Popconfirm` popup layer.([#829](https://github.com/arco-design/arco-design/pull/829))
- Fix the bug that the outer `ConfigProvider` of the `Table` component cannot take effect after setting `pagination`([#827](https://github.com/arco-design/arco-design/pull/827))
- Fix the bug that the `Form` component has controlled invalidation of form items in React 18 strict mode.([#823](https://github.com/arco-design/arco-design/pull/823))
- Fix the bug that the `Tooltip` is invalid when the `Typography` component is omitted from a single line([#822](https://github.com/arco-design/arco-design/pull/822))
- Fixed the bug that the expanded SubMenu was collapsed when the `collapse` property of the `Menu` component was changed.([#820](https://github.com/arco-design/arco-design/pull/820))
- Fixed the bug of critical calculation error in the appear/disappear of the scroll button of the `Tabs` .([#819](https://github.com/arco-design/arco-design/pull/819))
- Fixed a bug where the `DatePicker` component passed a `showTime` object that did not contain a `defaultValue`, causing the time panel to report an error.([#811](https://github.com/arco-design/arco-design/pull/811))
- Fixed an issue where the matched option text was not highlighted when the `Select` component searched.([#808](https://github.com/arco-design/arco-design/pull/808))

## 2.32.1

2022-04-22

### 💎 Enhancement

- Optimize the cursor position when `focus` is called outside the `Input.Textarea` component.([#800](https://github.com/arco-design/arco-design/pull/800))
- `InputNumber` uses `Math.round` instead of `Number.prototype.toFixed` to calculate the number after the decimal point, to avoid the critical situation that may occur when the final number is 5.([#796](https://github.com/arco-design/arco-design/pull/796))

### 🐛 BugFix

- Fixed `Mentions` component `notFoundContent` not taking effect.([#801](https://github.com/arco-design/arco-design/pull/801))
- Fixed a bug where the `Notification` component only rendered some notifications when multiple reminder boxes popped up concurrently.([#797](https://github.com/arco-design/arco-design/pull/797))

### 🆎 TypeScript

- Modify the `TS` of the `Table` component `rowKey` to be `React.Key \| ((record: T) => React.Key)`. ([#799](https://github.com/arco-design/arco-design/pull/799))

## 2.32.0

2022-04-15

### 🚨 Important attention

- Fix the bug that `onChange` is not called when the form control wrapped by `Form.Item` is returned by the function type `children`.([#760](https://github.com/arco-design/arco-design/pull/760))(Note: When fixing this issue, the issue that child components will be rendered circularly in special scenarios was introduced, which has been fixed in `2.37.0`)

### 🆕 Feature

- The `Form` component supports setting the validation message template through the `validateMessages` property([#773](https://github.com/arco-design/arco-design/pull/773))
- The `Trigger` component supports the `updateOnScroll` property to update the position of the popover when the container is scrolled.([#770](https://github.com/arco-design/arco-design/pull/770))
- The `List` component's `scrollIntoView` method allows specifying the specific behavior of list scrolling.([#768](https://github.com/arco-design/arco-design/pull/768))
- The `List` component `virtualListProps` allows specifying virtual list item height to improve scrolling.([#768](https://github.com/arco-design/arco-design/pull/768))
- The `Pagination` component adds a `bufferSize` prop, which supports setting the display area when the page number is collapsed.([#767](https://github.com/arco-design/arco-design/pull/767))
- The `showInput` of the `Slider` component supports passing in `InputNumberProps`([#762](https://github.com/arco-design/arco-design/pull/762))

### 🐛 BugFix

- `Typography` component multi-line omit folding supports different styles of text。([#776](https://github.com/arco-design/arco-design/pull/776))
- Fix the bug of folding error after `Typography` sets `white-space`([#772](https://github.com/arco-design/arco-design/pull/772))
- Fix the `onSelect` event not triggered when the `TimePicker` input is correct.([#769](https://github.com/arco-design/arco-design/pull/769))
- Fixed the bug where `utcOffset` and `timezone` of `DatePicker.RangePicker` component did not work.([#765](https://github.com/arco-design/arco-design/pull/765))
- Fixed a bug where the selected option echoed the wrong value in the search panel when `checkedstrategy=parenet` in the `Cascader` component.([#763](https://github.com/arco-design/arco-design/pull/763))
- Fixed the bug that `onMouseEnter` and `onMouseLeave` of `Select.Option` not works.([#729](https://github.com/arco-design/arco-design/pull/729))
- Optimize 'Modal' closing all popover when closing with ESC([#629](https://github.com/arco-design/arco-design/pull/629))

### 🆎 TypeScript

- Adjusted the `children` property type definition of `Checkbox`.([#753](https://github.com/arco-design/arco-design/pull/753))

## 2.31.3

2022-04-11

### 🐛 BugFix

- Fixed ts type of `disabledDate` for `DatePicker` component.([#750](https://github.com/arco-design/arco-design/pull/750))
- Fixed the bug that the `DatePicker.RangePicker` component would report an error when selecting the time directly.([#749](https://github.com/arco-design/arco-design/pull/749))

## 2.31.2

2022-04-01

### 🐛 BugFix

- Fixed a bug where the options panel was not updated when the mouse moved from a path node to a leaf node in `expandTrigger=hover` of the `Cascader` component.([#727](https://github.com/arco-design/arco-design/pull/727))
- Fix the bug that resizeObserver will report an error when the children of Affix is invalid.([#726](https://github.com/arco-design/arco-design/pull/726))

## 2.31.1

2022-03-28

### 💅 Style

- Fix the problem that the checkbox column width is abnormal when the `Table` component enable `virtualized`.([#696](https://github.com/arco-design/arco-design/pull/696))

## 2.31.0

2022-03-25

### 🆕 Feature

- The `Cascader` component supports setting the echo mode of data when multiple selections are set through the `checkedStrategy` property([#692](https://github.com/arco-design/arco-design/pull/692))
- `Select` component's `triggerElement` property allows passing in a function to customize the component trigger node.([#686](https://github.com/arco-design/arco-design/pull/686))
- `TreeSelect` component's `triggerElement` property allows passing in a function to customize the component trigger node.([#686](https://github.com/arco-design/arco-design/pull/686))
- `AutoComplete` component's `triggerElement` property allows passing in a function to customize the component trigger node.([#686](https://github.com/arco-design/arco-design/pull/686))
- `Typography`'s `copyable` and `editable` expose the `event` parameter corresponding to the click callback.([#684](https://github.com/arco-design/arco-design/pull/684))
- The `Table` component supports sorting tree data.([#678](https://github.com/arco-design/arco-design/pull/678))

### 🐛 BugFix

- Fixed the bug that the `index` parameter of the `render` method under the grid layout of the `List` component was incorrect.([#688](https://github.com/arco-design/arco-design/pull/688))
- Fixed the `disabledDate` of the `DatePicker` component being incorrect at the border of the quick selection panel.([#687](https://github.com/arco-design/arco-design/pull/687))
- Fix the bug of calculation error when the step size of `Slider` is set to decimal([#655](https://github.com/arco-design/arco-design/pull/655))
- Fix the bug of `Slider` clicking on the non-sliding axis area console to report an error([#655](https://github.com/arco-design/arco-design/pull/655))

### 💅 Style

- Fixed the bug that the clear button of `Input` could not be hidden in certain scenarios([#685](https://github.com/arco-design/arco-design/pull/685))
- `Slider` always displays the first and last endpoints in the scene of adding labels by passing in `marks`([#683](https://github.com/arco-design/arco-design/pull/683))

### 🆎 TypeScript

- Modify the TS definition of the `onOk` parameter of the `Popconfirm` component to support returning `Promise<void>`([#689](https://github.com/arco-design/arco-design/pull/689))

## 2.30.2

2022-03-18

### 🐛 BugFix

- Fixed `InputTag` display cleat button when set `allowClear` and `readOnly` together.([#651](https://github.com/arco-design/arco-design/pull/651))
- Fix the bug that `column.align` does not take effect when `virtualized` is enabled in `Table` component.([#650](https://github.com/arco-design/arco-design/pull/650))
- Fixed the issue that the `separator` parameter of the `DatePicker` component did not take effect.([#647](https://github.com/arco-design/arco-design/pull/647))
- Fix a bug where `Form.provider` causes console warning.([#646](https://github.com/arco-design/arco-design/pull/646))
- Fixed display of clear button when `Input` set `allowClear` and `readOnly` at same time.([#640](https://github.com/arco-design/arco-design/pull/640))

### 💅 Style

- Fix `Table` component set `expandProps.width` is not work when less than 40.([#656](https://github.com/arco-design/arco-design/pull/656))

## 2.30.1

2022-03-11

### 💎 Performance

- The `DatePicker` component no longer jumps the panel when picking a date.([#627](https://github.com/arco-design/arco-design/pull/627))
- When the `Transfer` component clears all, it only operates on the filtered items.([#621](https://github.com/arco-design/arco-design/pull/621))

### 🐛 BugFix

- Fix the bug that the Tag animation fails when `Select` is multiple mode.([#630](https://github.com/arco-design/arco-design/pull/630))
- Fix the bug that the options of `Select` with `maxTagCount` are not unchecked in the correct order when press `Backspace`.([#630](https://github.com/arco-design/arco-design/pull/630))
- Fix the bug that the `scrollIntoView` method did not work for elements rendered on the first screen when `List` is a virtual list.([#628](https://github.com/arco-design/arco-design/pull/628))
- Fix the problem that the label text corresponding to the default value of the component is lost when the Cascader component is directly input text for remote search.([#632](https://github.com/arco-design/arco-design/pull/632))

## 2.30.0

2022-03-04

### 💎 Optimization

- When the `Transfer` component selects/unselects all, it only operates on the filtered items.([#613](https://github.com/arco-design/arco-design/pull/613))

### 🆕 Feature

- `Tree` component's `allowDrop` callback parameter supports `dragNode`([#614](https://github.com/arco-design/arco-design/pull/614))
- The `Form` component supports multiple form data management through the `Form.Provider` component.([#607](https://github.com/arco-design/arco-design/pull/607))
- The `DatePicker` component supports `utcOffset` and `timezone` to set the UTC time and timezone.([#604](https://github.com/arco-design/arco-design/pull/604))
- The `TimePicker` component supports `utcOffset` and `timezone` to set the UTC time and timezone.([#604](https://github.com/arco-design/arco-design/pull/604))
- `Slider` supports setting width and step size by interval segment([#600](https://github.com/arco-design/arco-design/pull/600))
- Image component Added `index` parameter, which indicates the index during preview, which can be specified in complex multi-image preview scenarios to ensure consistent preview order([#588](https://github.com/arco-design/arco-design/pull/588))
- `Image.Preview` component Added `scales` parameter to support custom image preview zoom percentage([#588](https://github.com/arco-design/arco-design/pull/588))

### 🐛 BugFix

- `placeholder` attributes take effect when `Table` data is an empty string or null([#609](https://github.com/arco-design/arco-design/pull/609))
- Fixed the problem that the input box of the `TreeSelect` component in the extension drop-down menu could not be focused.([#608](https://github.com/arco-design/arco-design/pull/608))
- Fixed the bug that the second parameter of `onChange` was not passed the information of the currently selected node when the `Cascader` component was single-selected for the first time.([#599](https://github.com/arco-design/arco-design/pull/599))
- Fix the style issue that the width of the month block becomes larger when the year mode of the `Calendar` component is selected([#560](https://github.com/arco-design/arco-design/pull/560))

## 2.29.2

2022-02-25

### 🐛 BugFix

- Fixed the bug that the `clear-icon` style of `InputTag` did not take effect([#589](https://github.com/arco-design/arco-design/pull/589))
- Fixed a bug where the checked state of the `Cascader` component was occasionally inconsistent with the incoming `value` when it was controlled.([#587](https://github.com/arco-design/arco-design/pull/587))
- Fixed a bug where the same text could not be pasted again after the `Input` component pasted text and cleared it.([#584](https://github.com/arco-design/arco-design/pull/584))
- `Tooltip` content value is false does not display the popup([#579](https://github.com/arco-design/arco-design/pull/579))
- Fixed the bug that the `form` parameter passed to the `Form.useForm` method did not take effect.([#577](https://github.com/arco-design/arco-design/pull/577))
- Fix the bug in `InputNumber` where decimal point is handled incorrectly([#568](https://github.com/arco-design/arco-design/pull/568))
- Fix the bug that the `onStart` input parameter was wrong when the `Typography` component was editing the state([#555](https://github.com/arco-design/arco-design/pull/555))

## 2.29.1

2022-02-18

### 💎 Optimization

- Reduce the impact of the mirror `dom` on automated tests after `Typography` folding calculation([#554](https://github.com/arco-design/arco-design/pull/554))

### 🐛 BugFix

- `InputNumber` Omit the unnecessary `allowClear`([#549](https://github.com/arco-design/arco-design/pull/549))
- Fixed the issue that the selected state rendering error occurs when the `Cascader` component is multi-selected.([#544](https://github.com/arco-design/arco-design/pull/544))
- Fixed `Image.Preview` component `onload` not triggering when loading images from cache([#539](https://github.com/arco-design/arco-design/pull/539))

## 2.29.0

2022-02-11

### 🚨 Important attention

- **Optimized the rendering position of the tip text of the `Upload` component of the photo wall type. The Dom level has changed, please pay attention to the style override.**

### 💎 Optimization

- Optimized the problem of stuck operation when selecting multiple selections under the big data of the `Cascader` component.([#523](https://github.com/arco-design/arco-design/pull/523))

### 🆕 Feature

- Added node information parameter to `onChange` function of `TreeSelect`([#526](https://github.com/arco-design/arco-design/pull/526))
- Upgrade `b-validate` version to support `Form` passing `ReactNode` in `validator`([#518](https://github.com/arco-design/arco-design/pull/518))
- The `Checkbox` component supports custom node content by passing `children` of function type.([#513](https://github.com/arco-design/arco-design/pull/513))
- The `Radio` component supports custom node content by passing `children` of function type.([#513](https://github.com/arco-design/arco-design/pull/513))
- Improve `Checkbox` component's TS type definition to inherit native `label` label attribute([#513](https://github.com/arco-design/arco-design/pull/513))
- The `Tree` component supports setting the component behavior when a node is clicked through the `actionOnClick` property([#511](https://github.com/arco-design/arco-design/pull/511))
- `Form.Item` supports hiding form items via the `hidden` property([#509](https://github.com/arco-design/arco-design/pull/509))
- Support for clearing field values via the `clearFields` method([#509](https://github.com/arco-design/arco-design/pull/509))
- `Popconfirm` component `onOk`, `onCancel` callback methods expose `event` parameter([#501](https://github.com/arco-design/arco-design/pull/501))
- The `Spin` component supports as block-level element display([#493](https://github.com/arco-design/arco-design/pull/493))

### 🐛 BugFix

- Fix `Statistic` component `precision=0` does not take effect([#531](https://github.com/arco-design/arco-design/pull/531))
- Fix the bug of `Cascader` component `showSearch.retainInputValueWhileSelect` not taking effect([#524](https://github.com/arco-design/arco-design/pull/524))
- Fixed the bug that the `Input` component would trigger `onChange` twice in a row when entering Chinese in Firefox.([#522](https://github.com/arco-design/arco-design/pull/522))
- Fix the bug that `Table` component `onDropdownVisibleChange` does not trigger when the OK button is clicked.([#521](https://github.com/arco-design/arco-design/pull/521))
- Fixed `Upload` component triggering `onClick` twice([#519](https://github.com/arco-design/arco-design/pull/519))

### 🆎 TypeScript

- fix type definition of Timeline, where mode lacks "top" and "bottom" as possible values([#488](https://github.com/arco-design/arco-design/pull/488))

## 2.28.2

2022-01-21

### 💎 Optimization

- `InputTag` prevents form submission on `Enter` pressed.([#482](https://github.com/arco-design/arco-design/pull/482))
- `Grid` supports setting `span` to 0.([#480](https://github.com/arco-design/arco-design/pull/480))
- Optimize the `Table` component `expandedRowRender` to cause the problem of freezing.([#473](https://github.com/arco-design/arco-design/pull/473))
- Optimized `Table` performance problem when selecting all data is larger than 10000 after enabling `virtualized`.([#472](https://github.com/arco-design/arco-design/pull/472))

### 🐛 BugFix

- Fixed the bug that `Table` component `size` did not work on `Pagination`.([#475](https://github.com/arco-design/arco-design/pull/475))
- Fix the incorrectly style when `Button` content is empty.([#471](https://github.com/arco-design/arco-design/pull/471))
- Fix the type of the `webkitdirectory` attribute of the `Upload` component.([#470](https://github.com/arco-design/arco-design/pull/470))
- `Select` fixes an issue where automatic word segmentation introduced new options when `allowCreate` was `false`.([#466](https://github.com/arco-design/arco-design/pull/466))
- Fixed the edge click of the remove button not working in the Upload component upload list([#457](https://github.com/arco-design/arco-design/pull/457))
- Fixed the bug of console waring caused by passing the `color` property of `string` type to `CssTransition` in the `Badge` component([#455](https://github.com/arco-design/arco-design/pull/455))

## 2.28.1

2022-01-14

### 🚨 Important attention

- **Fixed a bug where the second parameter of the `renderFormat` method returned a non-object type when `labelInValue` was set in the `Select` component. It may have an impact on scenarios where the parameter is used directly as the return value of the function. **

### 💎 Optimization

- `Select` optimizes the rendering behavior of `labelInValue` when the initial value is specified as an object.([#448](https://github.com/arco-design/arco-design/pull/448))
- Disable browser autocomplete for `Select`.([#439](https://github.com/arco-design/arco-design/pull/439))
- `Dropdown` supplements the class name of `arco-dropdown` for dropdown box nodes.([#437](https://github.com/arco-design/arco-design/pull/437))
- `Select.Option` allows no child nodes to be passed in.([#419](https://github.com/arco-design/arco-design/pull/419))

### 🐛 BugFix

- Fixed a bug where the `disabledDate` of the `DatePicker` component was inaccurate in the parent panel.([#447](https://github.com/arco-design/arco-design/pull/447))
- Fix the bug that the scroll position of the clicked anchor element is wrong when the `Anchor` component is set with a `scrollContainer`.([#446](https://github.com/arco-design/arco-design/pull/446))
- Fix the bug that the preview order of Image.PreviewGroup is wrong after the src of the child node is updated.([#445](https://github.com/arco-design/arco-design/pull/445))
- Fixed the bug where the `scrollToFirstError` property of the `Form` component did not work on form items with `noStyle` set.([#444](https://github.com/arco-design/arco-design/pull/444))
- Fixed the bug that the `Typography` component was folded incorrectly in the browser zoom scene.([#441](https://github.com/arco-design/arco-design/pull/441))
- Fix the bug that the Tabs component scrolled incorrectly in the sub-element `autofocus` scene([#440](https://github.com/arco-design/arco-design/pull/440))
- Fixed a style issue where the form item jittered when the validation failed when the `Form` component had a `mini` size.([#438](https://github.com/arco-design/arco-design/pull/438))
- Fixed a `bug` in the `Input` component where clicking the clear icon edge area did not clear the text.([#438](https://github.com/arco-design/arco-design/pull/438))
- Fixed the problem that the size of `searchButton` was not adjusted under different sizes of `Input.Search`.([#438](https://github.com/arco-design/arco-design/pull/438))
- Pagination should not be displayed if the table has no data.([#435](https://github.com/arco-design/arco-design/pull/435))

### 💅 Style

- Fixed the style issue of the `Table` component when the size is `mini` when there is only one data.([#449](https://github.com/arco-design/arco-design/pull/449))
- Fix the problem that the button color is wrong when `InputNumber` is clicked([#443](https://github.com/arco-design/arco-design/pull/443))

## 2.28.0

2022-01-07

### 🆕 Feature

- The limit parameter of the `Upload` component supports specifying that the upload node is disabled after the limit number is exceeded([#416](https://github.com/arco-design/arco-design/pull/416))
- Support setting French, Italian, German, Spanish([#413](https://github.com/arco-design/arco-design/pull/413))
- Support to modify css variable prefix through `arco-vars-prefix` less variable([#403](https://github.com/arco-design/arco-design/pull/403))
- `Transfer` supports passing `InputProps` to `showSearch`.([#401](https://github.com/arco-design/arco-design/pull/401))
- The `Form` component supports the global setting of the triggering timing of the verification rule through the `validateTrigger` property([#400](https://github.com/arco-design/arco-design/pull/400))

### 🐛 BugFix

- Fixed `Button` component icon not fully vertically centered at `mini` size.([#411](https://github.com/arco-design/arco-design/pull/411))
- Fix the bug that some global configuration were lost in the preview mode of the `Image` component([#410](https://github.com/arco-design/arco-design/pull/410))
- Fix the bug that Carousel's first page switch animation is abnormal when `currentIndex` is set to non-zero.([#409](https://github.com/arco-design/arco-design/pull/409))
- Fix the bug that the `onChange` is not triggered when the `Input` component enters Chinese and selects the auto-completion option directly.([#407](https://github.com/arco-design/arco-design/pull/407))
- Fix the bug that the width of `Menu` in `Dropdown` cannot be set by `style`.([#399](https://github.com/arco-design/arco-design/pull/399))
- Fix the bug that the className is incorrect when the `Table` component updates the `column.className` asynchronously.([#398](https://github.com/arco-design/arco-design/pull/398))

### 💅 Style

- Fix `Divider` component text wrapping style error([#402](https://github.com/arco-design/arco-design/pull/402))

## 2.27.2

2021-12-31

### 💎 Optimization

- Optimize the style implementation of the `Divider` component with text([#379](https://github.com/arco-design/arco-design/pull/379))

### 🐛 BugFix

- Fix the bug that the filter of the `Table` component cannot be reset when the `filteredValue` is set to `undefined` in the controlled mode.([#382](https://github.com/arco-design/arco-design/pull/382))
- Fix the problem that the DOM rendering order of the Mark node of `Slider` may be inconsistent with the UI.([#380](https://github.com/arco-design/arco-design/pull/380))
- Fix the problem that the icon color style of the `Tag` component of the `pinkpurple` color is incorrect.([#378](https://github.com/arco-design/arco-design/pull/378))
- `Select` fixes the bug that disabled options can be selected by user input when `allowCreate = true`.([#373](https://github.com/arco-design/arco-design/pull/373))

## 2.27.1

2021-12-24

### 💎 Optimization

- `Menu.SubMenu` also supports `selectable` property in non-popup mode.([#355](https://github.com/arco-design/arco-design/pull/355))

### 🐛 BugFix

- Fix the bug that the next time the onChange callback is incorrect when the `TimePicker` component is set to `undefined` under the control mode.([#361](https://github.com/arco-design/arco-design/pull/361))
- Fix the bug that the text in the input box is not cleared after blur when the `popupVisible` of the `Select` is `false`.([#359](https://github.com/arco-design/arco-design/pull/359))
- Fix the bug that only 100 files will be uploaded when the upload component is dragged to upload a folder.([#357](https://github.com/arco-design/arco-design/pull/357))
- fix when `Modal` component the visible is true, the locale does not work([#339](https://github.com/arco-design/arco-design/pull/339))

## 2.27.0

2021-12-17

### 🆕 Feature

- `Table` add prop `expandProps.strictTreeData`.([#334](https://github.com/arco-design/arco-design/pull/334))
- `Tree` supports `halfChecked` property([#331](https://github.com/arco-design/arco-design/pull/331))
- The `event` parameter has been added to the `onExpand` callback parameter of the Typography` component.([#328](https://github.com/arco-design/arco-design/pull/328))
- `ResizeBox` adds `SplitGroup` sub-component, supports splitting multiple panels and quick folding function([#327](https://github.com/arco-design/arco-design/pull/327))
- `InputTag` adds `dragToSort` property to support sorting the entered value by dragging.([#325](https://github.com/arco-design/arco-design/pull/325))
- `Select` adds `dragToSort` property to support sorting the entered value by dragging.([#325](https://github.com/arco-design/arco-design/pull/325))

### 🐛 BugFix

- Fix the bug that `column.cellStyle` of the `Table` component works abnormally.([#332](https://github.com/arco-design/arco-design/pull/332))
- Fix the bug that the current page calculation error occurs when the amount of data in `Table` changes.([#329](https://github.com/arco-design/arco-design/pull/329))

### 💅 Style

- Fix the style problem of the margin when the upload file list is empty in the `Upload` component([#336](https://github.com/arco-design/arco-design/pull/336))
- Fix the problem that there is no validated style when `InputTag` is used in `Form.Item` with `validateStatus`.([#330](https://github.com/arco-design/arco-design/pull/330))

### 🆎 TypeScript

- `InputNumber` allows all `InputHTMLAttributes` to be passed through properties.([#326](https://github.com/arco-design/arco-design/pull/326))

## 2.26.2

2021-12-10

### 💎 Optimization

- `DatePicker.RangePicker` component selected interactive optimization.([#312](https://github.com/arco-design/arco-design/pull/312))

### 🐛 BugFix

- Fix the bug that the `DatePicker` component does not trigger `onVisibleChange` in the controlled mode.([#314](https://github.com/arco-design/arco-design/pull/314))
- Fix the bug that `loadMore` is triggered by selecting the parent node when `Cascader` is multiple-selected and the `changeOnSelect` is true.([#309](https://github.com/arco-design/arco-design/pull/309))
- Fix the bug that the request cannot be terminated when the `CustomRequest` setting of the `Upload` component is an asynchronous function.([#306](https://github.com/arco-design/arco-design/pull/306))
- Fix the bug that the `onAfterChange` parameter of the `Slider` component is not updated.([#305](https://github.com/arco-design/arco-design/pull/305))
- Fix the bug that the calculation result of `Typography` is incorrectly when ellipsised in the international scene([#301](https://github.com/arco-design/arco-design/pull/301))
- Fix the bug that the copy result is wrong when `Typography` wraps multiple dynamic strings and `copyable`([#301](https://github.com/arco-design/arco-design/pull/301))

### 💅 Style

- Fix the problem that table cell will break line when `Table` component is tree data and `column.render` returns `div`.([#302](https://github.com/arco-design/arco-design/pull/302))

## 2.26.1

2021-12-07

### 🐛 BugFix

- Fix the bug that when the trigger mode of the `Trigger` component is `contextMenu`, the pop-up layer is not hidden when the trigger node is clicked.([#284](https://github.com/arco-design/arco-design/pull/284))
- Fix the bug that the `prefix` node loses the style of `font-size` when the `Select` component is multi-selected.([#284](https://github.com/arco-design/arco-design/pull/284))
- Fix the bug that the `warning` style of the `Form` component is shown when the teaching experience is passed.([#282](https://github.com/arco-design/arco-design/pull/282))
- Fix the bug that the upload folder does not take effect when dragging and dropping the upload component.([#275](https://github.com/arco-design/arco-design/pull/275))

## 2.26.0

2021-12-03

### 💎 Optimization

- Optimize the logic used by the `Trigger` component to calculate the size and position of child nodes to avoid double-counting([#258](https://github.com/arco-design/arco-design/pull/258))

### 🆕 Feature

- The `Grid.Col` component adds the `flex` property.([#268](https://github.com/arco-design/arco-design/pull/268))
- `Tag` supports `bordered` property.([#264](https://github.com/arco-design/arco-design/pull/264))
- The `Drawer` component supports the `okButtonProps` and `cancelButtonProps` properties.([#260](https://github.com/arco-design/arco-design/pull/260))
- `Select` adds the `clearIcon` property to customize the clear button icon.([#256](https://github.com/arco-design/arco-design/pull/256))

### 🐛 BugFix

- `List` fixes the issue that `scrollLoading` fails when using virtual lists.([#270](https://github.com/arco-design/arco-design/pull/270))
- Fix the bug that the `Typography` component does not take effect after setting `showTooltip`.([#266](https://github.com/arco-design/arco-design/pull/266))
- `List` fixes the bug that `onListScroll` and `onReachBottom` cannot be triggered when using virtual scrolling.([#259](https://github.com/arco-design/arco-design/pull/259))
- `Select` fixes the bug that the parameter of the `renderFormat` callback does not return an object when the `labelInValue` is `true`.([#257](https://github.com/arco-design/arco-design/pull/257))
- Fix the bug that when the `Upload` component uploads a folder, the second parameter of `beforeUpload` does not get all the files uploaded this time.([#252](https://github.com/arco-design/arco-design/pull/252))

### 💅 Style

- Fix the problem that the title and icon of the `Steps` component are not aligned in the vertical mode([#267](https://github.com/arco-design/arco-design/pull/267))
- Fix the problem that the color change of Icon in the selected menu item of the `Menu` component has no transition effect.([#263](https://github.com/arco-design/arco-design/pull/263))
- Fix the style problem that the checkbox column of the `Table` component is not aligned when the table header is fixed.([#261](https://github.com/arco-design/arco-design/pull/261))

## 2.25.1

2021-11-26

### 💎 Optimization

- The `DatePicker.RangePicker` component `showTime.defaultValue` supports passing in `number[], string[], Date[]` to avoid errors caused by inconsistent dayjs instances.([#226](https://github.com/arco-design/arco-design/pull/226))
- `Grid.Row` uses context to pass `gutter` to `Grid.Col` to avoid incorrectly receiving parameters when customizing `Grid.Col`.([#224](https://github.com/arco-design/arco-design/pull/224))
- `AutoComplete`'s property `onPressEnter` adds the `activeOption` parameter to distinguish whether there is an active option in the drop-down list when the Enter key is pressed.([#223](https://github.com/arco-design/arco-design/pull/223))

### 🐛 BugFix

- Fix the bug that the scroll container is not passed to the `Affix` component when the `Anchor` component is set to `affix`.([#235](https://github.com/arco-design/arco-design/pull/235))
- Fix the problem that the value of the `cascader` component in the controlled mode is not changed, and the selected state of the option is still changed.([#234](https://github.com/arco-design/arco-design/pull/234))
- Fix the bug that the upload node still shows the highlighted style when the `Upload` component is dragged out.([#234](https://github.com/arco-design/arco-design/pull/234))
- Fix the bug that the `Tree` component can no longer be collapsed when there is no child node after expansion.([#230](https://github.com/arco-design/arco-design/pull/230))
- Fix the warning of `Tabs` component pass `scrollPosition` to dom.([#225](https://github.com/arco-design/arco-design/pull/225))
- Fix the style problem that the spacing between avatars is not set when the `size` property is not set for the avatar group.([#220](https://github.com/arco-design/arco-design/pull/220))
- Fix the problem that the head height of the `Tabs` component of the `card` type is incorrect.([#220](https://github.com/arco-design/arco-design/pull/220))

## 2.25.0

2021-11-19

### 🆕 Feature

- The `Ellipsis` of `Typography` supports the `cssEllipsis` property. In simple scenarios, css is used by default.([#191](https://github.com/arco-design/arco-design/pull/191))
- `Form` support to set the `validateTrigger` property in `rules` to specify that the rule will be executed when a specific event is triggered.([#190](https://github.com/arco-design/arco-design/pull/190))
- `Form` support setting the `validateLevel` property in `rules` to specify that only the `warning` status is displayed when the rule validation fails, and the form submission is not blocked.([#190](https://github.com/arco-design/arco-design/pull/190))
- The `Form` component `rule.message` supports the use of `ReactNode`.([#185](https://github.com/arco-design/arco-design/pull/185))
- `InputTag` adds `saveOnBlur` property to support automatically saving what the user is typing when blur it.([#183](https://github.com/arco-design/arco-design/pull/183))
- `Carousel` adds `icons` property to support custom arrow icons.([#181](https://github.com/arco-design/arco-design/pull/181))
- When `Dropdown` is used with `Menu`, user can control whether the menu will be hidden after clicking by the return value of `onClickMenuItem` .([#180](https://github.com/arco-design/arco-design/pull/180))
- add property `onPaneResize` to `ResizeBox.Split`([#169](https://github.com/arco-design/arco-design/pull/169))
- `Trigger` add `escToClose` to set whether to allow close the popup by pressing `ESC`, default value is `false`.([#167](https://github.com/arco-design/arco-design/pull/167))
- `Trigger` add `escToClose`, default value is `false`.([#167](https://github.com/arco-design/arco-design/pull/167))
- `Popconfirm` allow close confirmation box by pressing `ESC`.([#167](https://github.com/arco-design/arco-design/pull/167))

### 🐛 BugFix

- Fix the bug that the ratio of the panels changes when the `ResizeBox.Split` component switches the `direction`.([#188](https://github.com/arco-design/arco-design/pull/188))
- `Progress` gix the bug that the'trailColor 'attribute does not take effect on the circular progress bar and the step progress bar.([#175](https://github.com/arco-design/arco-design/pull/175))
- Fix the bug that the steps of the `Progress` component are displayed incorrectly.([#170](https://github.com/arco-design/arco-design/pull/170))

### 💅 Style

- The padding + border of the `Button` component is 16px.([#186](https://github.com/arco-design/arco-design/pull/186))
- Fix the style problem that the header of the `Table` component is misplaced when the scroll bar is always displayed after the `virtualized` is turned on.([#182](https://github.com/arco-design/arco-design/pull/182))
- The `Image` component sets the maximum size of the error state to the size of the parent element.([#161](https://github.com/arco-design/arco-design/pull/161))

## 2.24.1

2021-11-12

### 🐛 BugFix

- Fixed a bug where the 'Trigger' component incorrectly triggered the pop-up mouse event before the animation ended.([#149](https://github.com/arco-design/arco-design/pull/149))
- `Select` fixes the problem that users cannot cover the height of the pop-up window in the CSS file.([#148](https://github.com/arco-design/arco-design/pull/148))
- `Select` Fix the problem of abnormal positioning of virtual list in single mode.([#148](https://github.com/arco-design/arco-design/pull/148))
- `Menu.SubMenu` component fixes the bug that the inner `SubMenu` property is overridden by the parent `SubMenu` when used in nesting.([#145](https://github.com/arco-design/arco-design/pull/145))
- `Typography` folding calculation optimization, fix display error in extreme cases of single-line folding.([#152](https://github.com/arco-design/arco-design/pull/152))

### 💅 Style

- Fix the problem that the `Descriptions` component is misplaced when `tableLayout=fixed` and non-inline layout.([#153](https://github.com/arco-design/arco-design/pull/153))
- Hide the text behind the menu item icon when the `Menu` component is collapsed to avoid display `...`.([#151](https://github.com/arco-design/arco-design/pull/151))
- `Tooltip` component add a border in dark mode to avoid overlapping with the background color in the popup box.([#150](https://github.com/arco-design/arco-design/pull/150))
- Fix the style problem that the cell align ='right' will overlap when the `Table` component has filter in the column.([#140](https://github.com/arco-design/arco-design/pull/140))

## 2.24.0

2021-11-05

### 💎 Optimization

- If the value of the `DatePicker` component is `string` and it's dayjs value parsed as Invalid Date, will fallback format to "YYYY-MM-DD"([#113](https://github.com/arco-design/arco-design/pull/113))

### 🆕 Feature

- Component `Image.Preview` support pressing `ESC` to close([#121](https://github.com/arco-design/arco-design/pull/121))
- `Menu` adds property `ellipsis` to forbid the automatic folding of menu items([#115](https://github.com/arco-design/arco-design/pull/115))
- add trailColor to change the rest of progress bar([#107](https://github.com/arco-design/arco-design/pull/107))

### 🐛 BugFix

- Fix the bug that the `Avatar` component still show all avatars when set `maxCount = 0`.([#89](https://github.com/arco-design/arco-design/pull/89))
- fix: When the `Pagination` component is under control of both `pageSize` and `current`, the calculation result of `pageSize` will overwrite `props.current`, causing the control of `current` to fail([#119](https://github.com/arco-design/arco-design/pull/119))
- Adjust the TS definition of the `Form` component as `FormHTMLAttributes`([#118](https://github.com/arco-design/arco-design/pull/118))
- Fix the `bug` that the `Form.List` component creates form items through the `add()` method, and the default value passed in does not take effect when the form item has an `initialValue`.([#118](https://github.com/arco-design/arco-design/pull/118))
- Fix the bug that `InputNumber` showed an error status when passing in `value` that is inconsistent with `precision`.([#116](https://github.com/arco-design/arco-design/pull/116))
- When the `tooltipProps` passed by `Menu` contains `triggerProps`, the original class name `menu-item-tooltip` will be overwrite([#99](https://github.com/arco-design/arco-design/pull/99))
- Fix the bug that `Menu` caused an error because of reading an property of `null`([#115](https://github.com/arco-design/arco-design/pull/115))
- fix the problem that the style of the trigger-arrow does not work under the black theme of the menu component([#84](https://github.com/arco-design/arco-design/pull/84))

### 💅 Style

- Fix the problem that the border line of the header is broken when `border={{ border: true, headerCell: true }}` when the `Table` component is grouped columns in the header.([#120](https://github.com/arco-design/arco-design/pull/120))

## 2.23.5

2021-10-29

### 🐛 BugFix

- Fix the bug that the search node of the `TreeSelect` component is not displayed correctly.([#74](https://github.com/arco-design/arco-design/pull/74))
- Trigger's popup can not get correct width when first render([#69](https://github.com/arco-design/arco-design/pull/69))
- Fix the problem that the pop-up layer of the `Popver` component has a very small width of the parent node, and the arrow element is incorrectly positioned.([#69](https://github.com/arco-design/arco-design/pull/69))
- Fix the bug of using unupdated variables for calculation when the `Typography` component is in the collapsed state.([#57](https://github.com/arco-design/arco-design/pull/57))
- Fix `Select` virtual list abnormal positioning that may be caused by setting custom height of `Select.Option` .([#55](https://github.com/arco-design/arco-design/pull/55))
- Fix the InputTag component default validate function always returns false([#43](https://github.com/arco-design/arco-design/pull/43))

## 2.23.4

2021-10-26

### 🐛 BugFix

- Set the `type` of the expand button of the `Table` component to `button` to avoid clicking to trigger Form submit.([#23](https://github.com/arco-design/arco-design/pull/23))
- Fix the problem that the popup layer will respond to keyboard events and pop up when the `Cascader` component is disabled.([#21](https://github.com/arco-design/arco-design/pull/21))

## 2.23.2

2021-10-22

### 🐛 BugFix

- Fix the error report caused by the lack of initial value when the `Select` component `labelInValue` and multiple selections are made.
- Fix the issue of unique key warning when using tree data in `Table` component.

## 2.23.1

2021-10-15

### 💎 Optimization

- Optimize the pop-up layer of the `Trigger` component to update the position only according to the resize of the trigger node when the state is displayed.

### 🐛 BugFix

- Fix the bug that the `DatePicker` component `disabledDate` does not take effect in the shortcut panel.
- Fix the bug that the `defaultCurrent`, `defaultPageSize`, and `sizeCanChange` in the `pagination` property of the `List` component not works.
- Fix the bug that the input box width is abnormal when inputting continuous spaces in the `InputTag` component.
- Fix the bug that the `Select` component fails to expand when clicking the drop-down box of the text area in some browsers.
- Fix the jitter that may be caused by data update when the `Select` component uses virtual scrolling.
- Fix the bug that when the `Select` component `mode` is `multiple` and `labelInValue` is `true`, the error is reported when `value` is passed into the object array.
- Fix the bug that the `Typography` component will be parsed into an array when multiple dynamic strings are wrapped.
- Fix the bug that the `Typography` component will throw an error in the `editing` state after setting `ellipsis`.
- Fixed the bug that the `Button` component can still trigger the `onClick` event in the `loading` state.
- Fix the bug that the last level node is covered when the `Tree` component is enabled for virtual scrolling and dragging is allowed.
- Fix the bug that other nodes cannot be dropped on the current node after `Tree.Node` is set to `draggable=false`.
- Fix the bug that the `rowSelection.renderCell` of the `Table` component does not take effect in single selection.
- Fix that when the nested pop-up layer in the pop-up layer of the `Trigger` component is clicked, the outer pop-up layer is hidden `bug`.

## 2.23.0

2021-09-27

### 💎 Optimization

- Update lodash method import from lodash.x to lodash/x
- The `Modal` component `onOk` will automatically handle loading when it returns a Promise.
- Optimize the calculation timing in the case of `Typography` ellipsised.
- The sorting and filtering columns of the `Table` component can work without `dataIndex`.

### 🆕 Feature

- `ConfigProvider` component adds the parameter `componentConfig`, which can configure the default configuration of all components globally.
- Specify how to handle the value when the child node triggers the `onChange` event.
- The `Form` component supports conversion of the field values ​​passed to the control through the `formatter` property.
- `Table` component add parameter `placeholder`. When the cell content is empty, a placeholder will be displayed with a lower priority than `column.placeholder`.
- The `Input` component `maxLength` supports the `errorOnly` mode. When exceeding `maxLength`, user input will not be restricted, but error status will be displayed
- `DatePicker.RangePicker` add property `clearRangeOnReselect`.
- The `DatePicker.RangePicker` component `onSelect` adds a third parameter `extra`.

### 🐛 BugFix

- Fixed bug where 'add' method does not take effect when setting initial values for `Form. List`
- Fix the bug that the panel is not updated in the first time when the `DatePicker.RangePicker` component updates mode.
- Fix the bug that `DatePicker.WeekPicker` does not initialize the local timezone and the start of the week.
- Fix the problem that the `height` setting of the `Image` component is invalid
- Fix the problem that the external elements of the drawer cannot be operated when the `mask={false}` is set in the `Drawer` component
- Fixed the bug that the `disabled` attribute of `Dropdown` could not work on child nodes
- Fix the bug that the `Tooltip` component `showArrow` does not take effect.
- Fix the bug that the `Popover` component `showArrow` does not take effect.
- Fix the bug of `Typography` component truncating English characters, causing text overflow.

### 💅 Style

- Fix the problem of the wrong style of the `Tabs` component in the `vertical capsule`

### 🆎 TypeScript

- The `Statistic` component `value` supports string, number, and date types.
- Fix the problem that the `Upload` component loses the export of `RequestOptions` and `UploadRequestReturn` type definitions

## 2.22.0

2021-09-10

### 🛠 Chore

- The `treeSelect.tsx` under the `TreeSelect` component folder has been renamed to `tree-select.tsx`. Please note that it is referenced by the file path. In addition, we do not recommend to use it directly through the file path.If you pass the path, Because we cannot guarantee that the file name in the component will never change, try to only use the `index.tsx` entry file.

### 💎 Optimization

- Optimizing the recently selected option of the `Cascader` component is displayed at the end of the input box.
- After the drop-down list appears, `TreeSelect` will automatically scroll to the first selected node
- When the `add` method of `Form.List` receives the event object as a parameter, it will prompt in the console.

### 🆕 Feature

- `Form.List` supports setting the initial value through the `initialValue` property.
- The `Select` component `ref` references the new `activeOptionValue` property to mount the value of the current hovered option.
- `Tooltip` supports setting the background color of the popup layer through the `color` property.
- `Table` component add prop `rowSelection.onSelect`.
- `Table` component add prop `column.placeholder`.
- The fourth parameter of the `onChange` callback of the `Table` component adds the return of `currentData`.
- The `Anchor` component adds a new attribute `targetOffset` to support setting the offset of the scrolling baseline in the container.
- The `Space` component adds the `split` attribute to set the separator of adjacent elements
- The `Trigger` component supports the `mouseLeaveToClose` property to set whether to hide the pop-up window when the mouse moves out of the trigger node and the pop-up layer.
- VirtualList added `scrollOptions` property to specify the default behavior when scrolling.

### 🐛 BugFix

- Fix the bug that hover will report an error when the dayjs object passed in when using shortcuts in the `DatePicker` component is inconsistent with the internal version.
- Fix the bug of rendering errors when `Form.Item` passes in children as an empty string.
- The `Select` component fixes the bug that the `ref` reference is not updated.
- Fix the bug that events on the outer dom cannot be triggered when the `DatePicker` component uses `dateRender`.
- Fix the bug that when the `DatePicker.RangePicker` component only uses the panel and has a default value, the first click to select requires one more point.
- Fix the problem that the status of the `Table` component is not updated in time when the reset button is clicked when the filter is controlled.
- Fix text display width calculation error of `Typography` in `flex` mode
- Fix the bug that the `Typography` component `ellipsis` cannot be re-rendered when the `ellipsis` is under control
- Fix the bug that the call of `Typography` component `ellipsis` cannot be triggered when passing `onExpand`
- Fix the bug that the status of `ellipsis` cannot be automatically updated according to the taste when `resize` of the `Typography` window
- Fix the bug that the `Cascader` component cannot click to expand the next level option when the option `disableCheckbox=true` is set.

### 🆎 TypeScript

- All component ts definitions move to interface.ts, and each component entry file export ts interface.
- `DatePicker.RangePicker` component `onOk` type correction.
- The `Dropdown` component fixes the problem that `droplist` is required.

## 2.21.2

2021-08-30

### 🐛 BugFix

- Fix the problem that when the table header is fixed by the `Table` component, the dynamic modification of the `columns` under some boundary conditions will cause the table head and table body to scroll out of sync.

## 2.21.1

2021-08-27

### 💎 Optimization

- Optimize the critical performance of the horizontal menu adaptive width hidden menu items
- Add the corresponding `title` attribute to the DOM only when the value to be rendered is a string

### 🐛 BugFix

- Fix bug that asynchronous setting of `value` does not take effect when the `DatePicker` component has a value.
- Fix the bug that `onChange` can't be fired when to add or remove an item in `Form.List`.
- Fix bug when update `Table` component's `columns.fixed`, does not update events. and fix bug that the scrolling events cannot be correctly linked when the custom header is set as a function component.

### 💅 Style

- Fix icon `image-close`.

## 2.21.0

2021-08-20

### 💎 Optimization

- Optimize the `Select` component `allowCreate` to make the text input by the user the first item in the option list.

### 🆕 Feature

- The `TimePicker.RangePicker` component adds the `order` parameter to set whether to automatically sort.
- The `simple` property supports passing in the object `{ retainSelectedItems: true }` to retain the selected items in the left panel.
- `Modal` add `useModal` function.
- `Modal` supports `closeIcon` prop.
- `TimePicker` add `showNowBtn`.
- `DatePicker` new interaction, add the highlight display of the next range, and put the operation of switching to time panel on the button

### 🐛 Bugfix

- Fix the bug that the Cascader component still select the option that disableCheckbox prop is true
- Fix the bug that when the `Select` component sets `labelInValue` and `allowClear`, clearing the options causes an error in the `onChange` callback.

### 💅 Style

- Fix the bottom border of the header is not displayed when the `Table` is set to `border&#x3D;{{ wrapper: true }}`.

### 🆎 TypeScript

- Optimize `Form.setFieldsValue` ts definition

## 2.21.0-beta.0

2021-08-13

### 🆕 Function upgrade

- The `Menu` component supports keyboard shortcut operations.
- When the `Cascader` component supports multiple selections, the checkboxes of the options are individually disabled through the `disableCheckbox` property.
- The `Form` component supports the `onSubmitFailed` property, which is called when the validation fails when submitting the form.
- Added the `miniRender` property to the `Carousel` component, which supports rendering the minimum number of child nodes that meet the animation requirements.

### 🐛 Bugfix

- Fix the bug that the node corresponding to the initial value of `Cascader` is not displayed as selected when it is dynamically loaded.
- Fix the bug that the callback parameter of the `Icons` property of the `Tree` component is not the latest node state.
- Fix the bug that the week number of the `WeekPicker` component is not displayed correctly.
- Fix the bug that the visual performance of the `Table` component is sorted under control.

### 💎 Optimization

- `InputNumber` Extend the waiting time for automatic increase or decrease by long pressing the button of the mouse to avoid misoperation.

### 💅 Style

- Optimize the pop-up menu to be dark when the `Menu` component has a dark theme;
- Fixed an issue where the mouse hovering interface may jitter when the `InputTag` component is allowed to be cleared.

### 🆎 TypeScript

- Correction of `pickerValue` type of `DatePicker.RangePicker`.

## 2.20.2

2021-08-09

### 🐛 Bugfix

- Fix the bug that the `onChange` callback of the `Affix` component is triggered frequently.

## 2.20.1

2021-08-06

### 🐛 Bugfix

- Fix the bug that the content of the `Affix` component is not updated in the `fixed` state or the position of the modified parameter is not updated.
- Fix the bug that the `Form` component does not receive the native `dom` property.
- Fix the bug that the `Form.Item` component does not receive the native `dom` property.
- Fix the bug that the panel is not automatically collapsed when the leaf node is selected in the single selection of the `Cascader` component.
- Fix the bug that empty elements are not centered when `Cascader` sets `options={[]}` and customizes the panel width.
- Fix the bug that the `Image.PreviewGroup` component is not updated after the `srcList` is changed.
- Fix the bug that `checkedStrategy="parent"` does not take effect when `fieldNames` is set in the `Tree` component.
- Fixed the bug that when the `Tree` component is out of control with `checkedKeys` and `checkedStrategy` is set to `parent` or `child`, the callback parameter of `onCheck` is still all `key` selected.
- Fix the bug that when the `Trigger` component directly wraps a disabled `Trigger` component, the pop-up layer itself is not displayed.
- Fix the bug that the `Tabs` component `renderTabTitle` was incorrectly passed to the `div`, causing the console to report an error.
- Fixed a bug where the drop-down icon `Select` on the right was not expanded when the `Select` component set the `trigger` to `focus`.
- Fix the bug that the `TreeSelect` component setting `showSearch={retainInputValueWhileSelect: false}` does not take effect.
- Fix the bug that the `Typography` component does not support the native `dom` attribute.
- Fix the bug that the `Typography` component sometimes jitters when it is rendered for the first time.
- Fix the bug that the `onChange` callback parameters of the `TimePicker.RangePicker` component are not automatically sorted.

### 💅 Style

-Fix the issue that the style of the `DatePicker` component today will also appear on the gray date.

### 🆎 TypeScript

-Modify the `ellipsis.showTooltip.props` of the `Typography` component to be optional.

## 2.20.0

2021-07-30

### 🆕 Function upgrade

- Added the `listRef` property to the `List` component to get the component reference with API method, and added the `scrollIntoView` method to the reference.
- Added the `column` parameter to the `grid` property of the `List` component to allow quick definition of the number of lists displayed in each row under the grid.
- The `icons` parameter is added to the `DatePicker` component to support custom icons.
- The `Grid.Col` component adds the `push` and `pull` attributes to set the horizontal offset of the grid.
- The `reverse` parameter is added to the `Slider` component to set the reverse display.
- The `Statistic` component adds a new `loading` property to set the loading status.
- Added `onSearch` property to `Cascader` component for remote search.
- The `Upload` component supports the display of error messages from the `response` field of the uploaded file when the upload fails.
- The `DatePicker` component adds the `hideNotInViewDates` property to hide the gray date.
- The `dayStartOfWeek` property of the `DatePicker` component supports setting from Monday to Sunday.
- The `TimePicker` component supports scrolling and automatic adsorption.
- Added `onClear` and `onClick` callbacks to the `InputTag` component.

### 🐛 Bugfix

- Fixed the bug that the Loading status was also displayed when the `Popconfirm` component clicked the confirmation button `onOk` callback did not return a Promise.
- Fix the bug that other input boxes on the page cannot be focused when the `popupVisible` of the `TreeSelect` component is `true`.
- Fix the bug that `preserveSelectedRowKeys` of `Table` component does not take effect when `pagination` is `false`.
- Fix the bug that the return value of `onExpandedRowsChange` of `Table` component uses internal uncontrolled `keys` when `expandedRowKeys` is controlled.
- Fix the bug that the `defaultFilters` of the `Table` component is not reflected in the `filterDropdown`.
- Fixed the bug that the popup layer did not disappear when the `content` property of the `Tooltip` component changed from a true value to a false value.

### 💅 Style

- The `List` component fixes the style problem that the element content may overflow.

### 🆎 TypeScript

- Modify the TS definition of the `title` property of the `Alert` component.
- Optimize the TS definition of `scrollIntoViewOptions` of `scrollToFirstError` property of `Form` component.
- The `Select/Cascader/TreeSelect` component adds the TS definition of `onClick`.

## 2.19.3

2021-07-23

### 💎 Optimization

- Add new icon `IconPalette`.
- When `Select` sets `labelInValue` and passes in the initial value of the object form, the text of the select box will first display the label passed in by the user.

### 🐛 Bugfix

- Fixed the bug that the `onChange` would not be triggered after the `TimePicker` component turned on `disableConfirm`.
- Fix the bug that the input of the `DatePicker.RangePicker` component has a problem after setting `showTime`.
- Fixed the bug that the popup layer did not pop up when the `InputNumber` and `InputTag` components were used as children of `Popover`.
- Fix the problem that the `Dropdown` component will report an error when accepting strings/numbers as children.
- Fix the bug that the `tokenSeparators` of the `Select` component set to Chinese characters does not take effect on the Windows system.
- Fix the bug that the keyboard selection option may be invalid when there are groups and searches for `Select`.
- Fix the bug that the `directory` attribute of the `Upload` component is set to the div tag which causes the console to warn.
- Fix the problem that the display width of individual pictures is 0 when uploading multiple pictures in a special scene when the `Upload` component is set to `listType="picture-card"`.
- Fix the bug that the `Trigger` component does not update its position when the size of the mounted container changes.
- Fixed a bug where the `Menu` component `theme` in the `Dropdown` component was set to `dark` not to take effect.

### 💅 Style

- The editable cell style of the `Table` component is optimized, and the problem of wrong rows when combined with tree data is fixed.
- Fix the problem that the icon in the title may jitter when the `Modal` component is opened.

## 2.19.1

2021-07-18

### 🐛 Bugfix

- Fix the bug that caused the page to report an error when the `children` of the `Menu` component passed a false value.
- Fix the bug that the copy function of `Typography` component does not work in Android webview.

## 2.19.0

2021-07-16

### 🆕 Function upgrade

- Added `showSorterTooltip` to the `Table` component, and fixed the style problem of the sort arrow being covered by the background color.
- The `Table` component adds `expandProps.expandRowByClick`, which supports click row expansion.
- The `onChange` parameter of the `Table` component adds a fourth parameter `extra`, and the current trigger action can be obtained through `extra.action`.
- Added `rowSelection.renderCell` to the `Table` component, which supports custom checkboxes.
- The `Table` component adds `rowSelection.preserveSelectedRowKeys`, which supports retaining the `key` value in `selectedRowKeys` after the data item is deleted.
- The `Menu` component `onClickMenuItem` and `onClickSubMenu` callbacks support the `keyPath` parameter.
- The `Menu` component `Menu.SubMenu` adds the `triggerProps` property to customize the pop-up behavior.
- The `Form` component `scrollIntoFirstError` supports passing in `scrollIntoViewOptions`.
- Added the `onItemRemove` callback to the `Transfer` component `CustomListProps`.
- The custom head rendering function `titleTexts` of the `Transfer` component adds the `checkbox` parameter.
- The `Tabs` component supports scrolling through the wheel and touchpad.
- `Grid.Row` component and `Grid.Col` component support all native html attributes.

### 💎 Optimization

- Optimize the problem that the text of pop-up components such as `Tooltip` may jitter after opening.
- Optimize the problem that the pop-up layer of the horizontal menu of the `Menu` component cannot be clicked when the mouse moves slowly.
- Optimize the keyboard accessibility of the `Form` form, click the label label to focus on the form item.
- The `Select` component adds a native HTML `title` attribute to display text when the mouse is hovered.

### 🐛 Bugfix

- Fixed the problem that the ref of the outermost label of the pop-up layer content of the `Trigger` component could not be obtained.
- Fix the problem that the `move` method of the `Form.List` component moves the form items in the wrong position.
- Fix the bug that the parameters of the `footer` of the `Modal` component are not consistent with the `propTypes`.
- Fix the problem that `setFieldsValue` does not take effect when the `Form` component form linkage cooperates with nested fields and sets the initial value of the form item.
- Fix the bug that the copy function of `Typography` component does not work in Android webview.
- Fixed the issue that the `Drawer` component would jitter the first time it opened when the content contained focusable elements.

## 2.18.2

2021-07-09

### 🐛 Bugfix

- Fixed the bug that the input of empty string in the `InputNumber` component `value` was incorrectly parsed as 0.
- Fix the bug that the local search result of the `TreeSelect` component is incorrect.
- Fix the bug that the pop-up layer is not positioned correctly when the `Trigger` component sets `alignPoint` and mounts the container to scroll the scrollbar.
- Fix the bug that `children` is not rendered when `Tooltip` passes `children` to `0`.
- Fix the bug that clicking the clear button of `TimePicker` will change the display state of the pop-up layer.
- Fixed the bug that the `Tree` component did not scroll to the correct position when calling the `scrollIntoView` method when some nodes were collapsed.
- Fix the bug that the position of the element is not updated when the height of the element is changed when the `Affix` component is in the `fixed` state.
- Fix the bug that the position of the element is not updated when the height of the element is changed when the `Affix` component is in the `fixed` state.
- When the `Table` component dynamically changes `columns`, there are multiple first column bugs when judging whether the tree data is the first column.

### 💅 Style

- Fix the problem that the scrollbar disappears with less data when there is a scrollbar in the table body of the `Table` component, and the style problem of the head scrollbar still exists.

### 🆎 TypeScript

- Fix the bug that the parameter definition of the `add` method of the `Form.List` component.

## 2.18.1

2021-07-04

### 🐛 Bugfix

- Fix the bug that the `Trigger` component `unmountOnExit` does not take effect.
- Fix the bug that the fixed column logic is not processed when the `Table` component dynamically sets `columns`.
- Fix the problem that the style of the `Table` component is not correct when the virtual scrolling is turned on and `scroll.x` is set.

## 2.18.0

2021-07-02

### ⚠️ Important attention

- All components and subcomponents `displayName` are completed, and some unclear semantics have been modified (**If you have any operations with displayName, please pay attention**), as follows:
  - `Input.Group`: Group -> InputGroup
  - `Form.Item`: Item -> FormItem
  - `Menu.Item`: Item -> MenuItem
  - `Timeline.Item`: Item -> TimelineItem
  - `Tree.Node`: Node -> TreeNode
- Fix the problem that the passed-in `props.className` property is not set to the outermost label when `allowClear` is set in the `Input` component.
  - When you set both `allowClear` and `props.className`, the className will be incorrectly applied to the inner input tag. **Sorry this change may cause breaking changes, please pay attention**.

### 🆕 Function upgrade

- The `Transfer` component `titleTexts` allows to pass in functions to customize the rendering of the title bar.
- The `Tabs` component adds the `renderTabTitle` property to support customizing the header content of each Tab.

### 🐛 Bugfix

- Fix the bug that may cause the content of the input box to become undefined when the `InputNumber` component enters alphabetic characters.
- Fix the bug that the component may report errors when the `Tree` component modifies both `treeData` and `expandedKeys` at the same time.
- Fixed the bug that the `Tree` component did not scroll to the correct position when calling the `scrollIntoView` method when some nodes were collapsed.
- Fixed a bug where empty data displayed problematic after enabling virtual scrolling in the `Table` component.
- Fix a bug that caused an error after the `Table` component `rowSelection` was switched to `undefined`.
- Fix the bug that the `Table` component does not filter the values ​​that do not exist in `selectedRowKeys` after `data` is changed.
- Fix the bug that the `onChange` is not triggered when the `Image.PreviewGroup` component clicks on the image to open it.
- When `Form.List` is nested with `Form.List`, the order of `FormItem` is adjusted by `move` method, and the UI display is not updated according to `value`.

### 💅 Style

- Fix the problem that the close icon of the `Message` component is not vertically centered.

### 💎 Optimization

- The `InputNumber` component `value` tries to convert it to a number when it passes in a string.
- Adjust the time when the `InputNumber` component corrects the incoming illegal `value` to ensure that it is corrected after the user has operated it.

## 2.17.3

2021-06-24

### 🐛 Bugfix

- Fix the issue that `Input.Search` does not trigger `onPressEnter`.
- Fix the bug that the pop-up cannot be displayed when the pre-operation column of the `Table` component is wrapped with `Tooltip`.
- Fix the bug that the `column.width` of the `Table` component is not valid for `string`.

### 💅 Style

- Fix the problem that the upper and lower spaces of the picture are not set when the photo wall of the upload component is folded.
- Fix the issue that the style passed in by `styleValue` of the `Statistic` component is not applied to the integer part.
- Fix the problem that the state color of the vertical connection line of the `Steps` component is overwritten.

### 🆎 TypeScript

- `Table` component `column.children` type modification, fix the problem that the nested type cannot be deduced when the table header is grouped.
- `Table` component `column.filters` type correction, fix the problem that the type cannot be deduced.

## 2.17.2

2021-06-22

### 🐛 Bugfix

- Fix the bug that the last triggered option is not added to the option list when the `Select` component triggers automatic word segmentation.

## 2.17.1

2021-06-20

### 🐛 Bugfix

- Fix the bug that the `DatePicker` component may report an error when judging the date change.
- Fixed the problem that virtual scrolling of the `Table` component does not work when X-axis scrolling is set at the same time.

## 2.17.0

2021-06-18

### 🆕 Function upgrade

- The `Select` component `tokenSeparators` supports passing in `\n` and `\t`.
- Added `readOnly` property to `InputNumber` component.
- The new function summary column of the `Table` component.
- `Table` component custom pre-operation column `components.body.operations` node supports the incoming function, which will receive the `record` parameter.
- Added the `level` parameter to the `dropdownColumnRender` of the `Cascader` component.

### 🐛 Bugfix

- Fix the bug that the arrow element does not point to the trigger node when the `Trigger` component sets `position=bottom` and automatically adjusts the position.
- Fixed a bug where the offset set by `popupAlign` did not take effect when `popupContainer` was set for the `Trigger` component.
- Fix the bug that the scroll position is not updated when clicking the link when the `animation` and `hash` of the `Anchor` component are both `false`.
- Fix the bug that `value` to `undefined` does not take effect when `InputNumber` is under control.
- Fix the bug that when the expand button is clicked in the `Table` component, it will bubble to `onRow.onClick`.
- Fix the bug of the `Table` component that sorting and filtering do not take effect when setting `pagination=false`
- Fix the bug that the `onCancel` method will be triggered twice when the `mask` is continuously clicked on the `Modal` component.
- Fix the error when selecting a value that does not exist in the data that exists in the `rowSelection.selectedRowKeys` of the `Table` component.

### 💅 Style

- Fix the bug that text is not displayed in `Safari` when `InputNumber` is disabled.
- Fix the wrong connection position of the `Steps` component when `size=small` and `direction=vertical`
- Fix the wrong connection position of the `Steps` component when `size=small` and `type=dot`

### 💎 Optimization

- When the `Select` component is multi-selected, the width of the input box is increased by 4 px, which is convenient for selecting text with the mouse.
- When the `Carousel` component actively calls the page turning API, it is allowed to reset the auto-play timing.
- The `InputNumber` component passes in an illegal initial value when `max` or `min` is set. The initial value is retained during the first rendering and will be corrected after user operations.
- `DatePicker` group price interaction optimization, and fix the problem that when reselecting time in `showTime`, the selected value will be overwritten with the default value.

## 2.16.2

2021-06-06

### 🐛 Bugfix

- Fix the bug that the `Tree` component reports an error when there is no corresponding node in the passed `checkedKeys`.

## 2.16.1

2021-06-04

### 🐛 Bugfix

- Fix the bug that when the `DatePicker` component `showTime`, select a value and hover the shortcut selection and then leave, the value will be restored to the initial value.
- Fix the bug that all child nodes cannot be recursively selected when the `Tree` component is selected by default.
- Fix the bug that when the `Tree` component sets the `fieldNames` property, expand and collapse the error.
- Fix the bug that the priority of the `icons` property of the `Tree.Node` component is lower than the `icons` property of the `Tree`.
- Fix the bug that the switching animation is not displayed when the `currentIndex` property is directly modified outside the `Carousel` component.
- Fix the bug that the element obtained by `getPopupContainer` is wrong when the `Image.Preview` component is opened by default.
- Fix the HTML attribute warning of the `Menu` component development environment console.

### 💅 Style

- When the `Carousel` component `animation` is `slide`, the hidden picture changes from `display: none` to `visibility: hidden`.

### 💎 Optimization

- Optimize the problem of repeated selection of the date in the `DatePicker.RangePicker` component.

### 🆎 TypeScript

- Fix the problem that the `Form` component type is deduced to `any`.

## 2.16.0

2021-05-28

### 🆕 Function upgrade

- Traditional Chinese (Hong Kong, China) and Traditional Chinese (Taiwan, China) are added for internationalization.
- The `wrapStyle` property is added to the `Modal` component.
- Added the `wrapper` property to the `Menu.Item` component to support custom outer HTML tags.
- `Dropdown` added `disabled` attribute to disable popup.
- `Tabs` supports custom delete/add buttons.
- `Image.Preview` supports custom mount points.
- The `Upload` component supports returning a file object in the `beforeUpload` method for processing files.
- The `Progress` supports warning status.
- The `Table` supports `expandProps.rowExpandable` property to control whether the row should be expanded.

### 🐛 Bugfix

- Fix the issue that `useLayoutEffect` reports warning when `Menu` component is rendered on the server side.
- Fix the problem that the bold style of the title text of the `Modal` component is invalid.
- Fix the problem that the zoom animation of the `Modal` component behaves abnormally.
- Fix the problem that the `Input` style fails to compile in less 4.x.
- Fix the problem that the custom `switcherIcon` icon of the `Tree` component does not take effect on the leaf nodes.
- Fix the problem that the verification state of the verified control is reset when the `Form.List` component executes the `add` method.
- Fix the problem that the outer layer of the `Badge` component `Tooltip` is not displayed

### 🆎 TypeScript

- Export the `FormInstance` definition of the `Form` component.

### 💎 Optimization

- The `Tree` component is refactored to optimize the stuttering phenomenon of node selection and expansion and collapse under big data.
- `DatePicker` optimization upgrade:
  - Support fast time jump, click on the panel header to select the year and month arbitrarily.
  - The date picker with time interactively returns to 1.0, and at the same time optimizes the disabled logic and performance.
  - After the range selector disables a single time, the date selection and time selection of the corresponding panel will be automatically disabled on the panel.
  - The left and right panels of the range selector are linked to avoid unexpected panel display.

## 2.15.3

2021-05-21

### 🐛 Bugfix

- Add `peerDependencies` to package.json of `Icon` directory to prevent webpack5 from building warnings.
- Add `string` type to `scroll` in `propTypes` of `Table` component to avoid warning.
- Fix the bug that the time is incorrect after clicking the button at the moment after opening `showTime` in `DatePicker`.
- Fix the bug that the `Select` parent component directly sets the `inputValue` error and triggers the `onSearch` callback bug.
- Fixed a bug that reported errors in `Form` when `Select` set `labelInValue`.
- Fix the bug that the `Table` component clears the selected item but does not trigger the `rowSelection.onChange` callback when turning the page.
- `IconSync` icon adjustment.
- Fix the bug that the `Input` tag rendered in the `footer` of the `Cascader` component cannot be focused.

### 💎 Optimization

- Reduce the redrawing of sub-nodes when the virtual list is scrolled to prevent stuck.
- Optimize the `Modal` closing interaction. When the mouse is pressed in the content area and moved to the `mask` area, it will not be closed.
- `Form` prevents the `onSubmit` event from bubbling.

### 💅 Style

- The default size of the `Avatar` component is configured via css, which is convenient for the use of the style configuration platform.

### 🆎 TypeScript

- Improve the `option` parameter type in the `onChange/onSelect` of the `AutoComplete` component.

## 2.15.2

2021-05-14

### 🐛 Bugfix

- Fix the bug that the content of the `Carousel` component overlaps when its scroll item is semi-transparent.
- Fix the bug that the `Popconfirm` component `onOk` will not close loading after returning the `promise` to `reject`.
- Fix the bug that the arrow icon of the input box changes to the search icon after the `Select` multi-select focus.
- Fix the bug that the search button on the right is not disabled when `Input.Search` is disabled.
- Fixed the bug that the `props.style.width` property did not take effect after the `autoAlignPopupWidth` property was set in the `Trigger` component.

### 💅 Style

- When there is an icon in the `Button` component, space will be added regardless of whether it is an arco icon or not.
- Add a default font size to the content area of the `Modal` component.

## 2.15.1

2021-05-06

**Note: This release fixes the possible hidden dangers of `2.15.0`, if you want to upgrade `2.15.0`, please upgrade to `2.15.1` directly.**
**`2.15.0` may cause less font errors when building.**

### 💎 Optimization

- Font use the cdn path to prevent loader or path errors in building.

### 💅 Style

- Fix bug the `size` property setting of the `Table` component does not take effect.

## 2.15.0

2021-04-30

### 🆕 Function upgrade

- Added `dropdownRender` and `dropdownColumnRender` properties to the `Cascader` component to support custom drop-down box rendering.
- The `Collapse.Item` component adds the `contentStyle` property to support quick configuration of the content area style.
- The `rowSelection.pureKeys` parameter is added to the `Table` component to optimize the big data selection experience.
- Added the `event` parameter to the `onClickMenuItem` callback of the `Menu` component.
- `Select`, `TreeSelect`, `Cascader` components:
  - Added `animation` property to support label animation when multiple selection is turned off;
  - Added the `index` and `values` parameters to the `renderTag` attribute to adapt to more complex custom tag rendering methods;
  - The minimum value allowed by the `maxTagCount` property is changed from 1 to 0.
- Added the `icons` property to the `Tabs` component to support the configuration of icons for delete buttons and newly added buttons.
- `Space` component `size` supports numbers to be passed into groups to configure the surround spacing.

### 🐛 Bugfix

- Fix the bug that the Excel file type is judged abnormally when uploading files by dragging and dropping files by the `Upload` component.
- Fixed the bug that the `Cascader` component mistakenly cleared the value of the corresponding option that was passed in from outside.
- Fix the bug that the `onSelect` callback of the `DatePicker` component is sorted before the selection is complete.
- Fix the bug that the setting of `showSearch=false` does not take effect when the `Select`, `TreeSelect`, and `Cascader` components are multi-selected.
- Fixed the bug that when `DatePicker.RangePicker` was disabled halfway, clicking the confirm button still needed to choose another time.
- Fix the bug that the `pagination.defaultPageSize` of the `Table` component does not take effect.
- Fix the bug of Dom Warning when passing custom parameters in `onCell` of `Table` component.
- Fix the bug that the `Image` component is unavailable under Server Side Render.

### 💅 Style

- Fix the problem that the width of the selected box is incorrect after the `Table` component turns on virtual scrolling and the box is selected.
- Fixed the problem that when `DatePicker` and `TimePicker` components are disabled and have default values, the default values ​​are not displayed in Safari browser.

### 💎 Optimization

- The `Tabel` component optimizes the selection logic and solves the possible problems of unsynchronized keys and rows.
- The css font file is changed from base64 to a font file, which solves the problem that the imported css file is too large when loading repeatedly on demand.

### 🆎 TypeScript

- Added the TS definition of the `Tabs` component `renderTabHeader` callback `DefaultTabHeader` parameter.
- Correct the definition of `expandedRowKeys` of `Table` component.

## 2.14.2

2021-04-23

### 💎 Optimization

- The `Image` component adds multi-language support.
- Calculate the scrollbar width to avoid jitter when displaying `Modal` and `Drawer` components.

### 🐛 Bugfix

- Fix the bug that the controlled mode is abnormal when `Select` directly sets `value` to `undefined`.
- Fix the problem that the es6 syntax included in the icon may cause packaging errors.
- Fix the bug that the `pageSize` and `current` are changed at the same time when the `Pagination` component is in the controlled mode. The value of `current` is incorrect.
- Fix a bug that may cause an error when `Anchor` switches page routing because the dom node does not exist.
- Fix the bug that `dropdownMenuStyle.maxHeight` of `Select` component does not take effect.
- Fixed a bug that caused the input box to lose focus when clicking the checkbox in front of the option in the `Select` multi-select mode.
- Fix the bug that when the `Carousel` component has only two pictures, click the left arrow and the pictures scroll in the wrong direction.
- Fix the bug that the `pagination.onChange` property of the `List` component triggered twice in a single page turning.
- Fixed the bug that the `Button` component would be parsed into an array when wrapping dynamic strings.
- Fix the bug that `AutoComplete inputProps.suffix` does not take effect.

### 💅 Style

- Fix the style problem that the text is not centered when the long button of the `Button` component is matched with `href`.
- Fix the style problem that the custom `border-radius` of the header of the `Table` component is too large and the internal elements will exceed the style.

## 2.14.1

2021-04-16

### 🐛 Bugfix

- Fix the bug that the copy function of `Typography` component does not work on the Android system browser.
- Fix the bug that when setting the precision of the `InputNumber` component, it occasionally refocuses after inputting but cannot be edited.
- Fix the bug that the `onChange` of `TreeSelect` cannot access the latest external variables.
- Fix the bug that the content pasted after the word segmentation is triggered is not cleared when the `tokenSeparators` of the `Select` component is set to line break.
- Fix the bug of `less@4` packaging error.
- Fix the bug that the display is incorrect when the component switches the panel after entering the value after opening the `showTime` of the `DatePicker.RangePicker` component.
- Fix the bug that the pop-up box that pops up immediately when the `Trigger` component is nested, and the animation causes the pop-up box to be positioned incorrectly.
- Fix the development environment console warning caused by multi-color icons.

### 💅 Style

- The `box-sizing` of the `Modal` component has been adjusted to `border-box`.
- Increase the priority of the input box in `Pagination` to avoid being affected by the global input box component.
- Fix the problem that the icon does not display when the `Tag` component wraps the div.

### 💎 Optimization

- The `Table` component automatically scrolls to the top of the table when turning pages.

### 🆎 TypeScript

- Allow `Timeline.Item` to accept native DOM attributes.
- Fix the problem of missing `children` in the TS definition of `Image.PreviewGroup`.

## 2.14.0

2021-04-09

### 🆕 Function upgrade

- Refactored the icon packaging script and logic, the global configuration of the icon no longer uses global variables, and switched to context, paving the way for the subsequent richer global configuration.
- Added Indonesian language support for internationalization.
- Added Thai language support for internationalization.
- `Image` component supports multi-image preview.
- The `Select` component ref exposes the `getOptionInfoList` interface to obtain all the Option information that needs to be rendered.
- `Select` adds `defaultPopupVisible` property to control whether the drop-down box pops up by default.
- Added the parameter `size` to the `onMoving` of the `ResizeBox.Split` component to obtain the split size.
- `Slider` component supports drag and drop of range scale.
- The `Carousel` component `autoPlay` supports passing in objects to control the playback interval and whether to tentatively play automatically when the mouse is hovering.
- Optimize the rendering logic of `Form.List` so that the entire Form.List will not be rendered when the child components change.

### 🐛 Bugfix

- Fix the bug that the state of the parent component accessed by the `Upload` component is not the latest value when calling `customRequest`.
- Fix the bug that the `Select` components `dropdownMenuStyle` and `dropdownMenuClassName` do not take effect when there is no option.
- Fix the bug that the priority of `initialValue` of `Form.Item` is lower than the priority of `initialValues` on `Form`.
- Fix the bug that the style of `headerPadding` of the `Tabs` component does not take effect.
- Fix the bug that the `onClick` callback passed by the child node of `Carousel` is invalid.
- Fix the bug that the total number of columns is calculated incorrectly when the data is empty after setting the `operations` in the `Table` component.
- `Modal` component specifies zindex according to its own style.

### 💅 Style

- Fix the problem that the menu item text of the `Menu` component in the `SubMenu` is not displayed as an ellipsis when the text length is too long.

### 🆎 TypeScript

- The TS definition of `Select` component children is rolled back as `ReactNode`.

## 2.13.3

2021-04-06

### 🐛 Bugfix

- Fix the bug of `Cascader` that when the user click the clear icon, and then enter something to search options, the component crash.

## 2.13.2

2021-04-01

### 🐛 Bugfix

- Fix the bug that the update of the parent component of the `Select` component may cause the currently active option to be restored to the default.
- Fix the bug that the background color of the selected item in the input box changes when clicking outside the browser window when the `Select` component is multi-selected and focused.
- Fixed the issue of flickering styles during and after the dragging of the `Upload` component when dragging.
- Fix the bug that the console warning appears when uploading the `Upload` component.
- Fix the bug that the global overflow will not be updated when the `Modal` component is unmount.
- Optimize the display of the gradient color of the `Progress` component.
- Fix the bug that the drop-down box of the `Select` component cannot be closed occasionally.
- Fix the bug that when the `Transfer` component is combined with a paging table, the table will return to the first page every time an item is selected.
- Fixed the bug that the `onValuesChange` was not triggered when the `resetFieldsValue` method was called when the initial value of the `Form` component was not set.

### 💅 Style

- Adjust the left and right padding styles of `Input` components of different sizes.
- Fix the problem that the height of the input box becomes 100% of the height of the parent element when the height of the parent element is set for the `Input` component and `allowClear` is set.

### 🆎 TypeScript

- Correct the ts definition of `formatText` of `Progress`.

## 2.13.1

2021-03-28

### 🐛 Bugfix

- Fix the problem that the `Select` component report an error when a false value is passed to `children`.

## 2.13.0

2021-03-26

### 🆕 Upgrade

- The `focusLock` and `autoFocus` parameters are added to the `Drawer` component.
- `ConfigProvider` supports setting global `focusLock` and `autoFocus`, which are applied to `Modal` and `Drawer` components.
- The `Select` component adds the `allowCreate` property, which allows new entries to be created by input in the single-select mode.
- `Select` supports mixing custom DOM nodes in `Options`.
- The `Select` components `onInputValueChange` and `onSearch` provide the `reason` parameter to inform the specific reason why the external inputValue is trying to change.

### 🐛 Bugfix

- Fix the bug that the padding setting of `ResizeBox` is invalid.
- Fix the bug that the content in the input box cannot be selected by the mouse when the `Input` component uses `addBefore`.
- Fixed the bug that the pop-up component did not update its position when the parent node mounted on the pop-up layer was resized.
- When `Select` component `notFoundContent` passes `null`, the drop-down box should not be displayed when there is no data.
- `IconLink` icon correction.

### 💅 Style

- Fix the problem that the hover style is displayed when the `Tree` component is dragged.
- Fix the style problem that the checkbox column is not centered when the virtual scrolling is enabled for the `Table` component.
- Fix the style problem of the lower position of the `Link` component icon.
- Set the icon size under the `Link` component to default to `12px`.

### 🆎 TypeScript

- `List.Item` supports passing in native HTML tag attributes.

## 2.12.0

2021-03-19

### 🆕 Function upgrade

- Added the `disableConfirm` property to the `TimePicker` component to support directly confirming the time when clicking.
- The `footer` property of the `Modal` component supports passing in custom rendering functions.

### 🐛 Bugfix

- Fixed the problem that setting the `value` directly without opening the panel when the `TimePicker` component is in the controlled mode does not take effect.
- Fix the problem that the boolean value of `Breadcrumb` package is reported incorrectly.
- Fix the problem of circular references in the internal files of the `Avatar` component.
- Fix the problem that the content of `Tooltip` in the prefix and suffix of the `Input` component cannot be copied.
- Fix the problem that the priority of `initialValue` of the `Form` component is higher than the value set by `Form.setFieldsValue` before the creation of the control when the control is created, causing the control to always display the initial value.
- Fix the problem that the console will report an error when `Tooltip` passes `children` as a number
- The Chinese format in the `Calendar` component has been moved to the locale file.

### 💅 Style

- Lower the value of the `z-index` attribute used in the `Avatar` component.
- Fix the connection style problem when the `size` of the `Steps` component is `small`.
- Fix the problem that the selected content of `Select` is not centered in the front and back tags of the `Input` component.

## 2.11.1

2021-03-15

### 🐛 Bugfix

- Fix the problem that the `icon` attribute passed in by the `Result` component is mapped to the `div` tag, causing the console warning.
- Fix the problem that the width percentage setting of the `Modal` component is invalid.

### 🆎 TypeScript

- Fix the TS type error of the `option` parameter in the `filterOption` callback function of the `Select` component
- Improve the parameter type of the `render` function of the `List` component to be automatically inferred based on the `dataSource`.

### 💅 Style

- Adjust the style level (`font-size`, `color`) of the imported custom icon when `status=null` is set in the `Result` component.

## 2.11.0

2021-03-12

### 🆕 Function upgrade

- The `Upload` component supports folder upload.
- The `Alert` component supports `action` custom action items.
- `Modal` component supports `Modal.destroyAll` to close all confirmation dialogs.
- The `Tree` and `TreeSelect` components support the `fieldnames` attribute to specify the field names corresponding to the `treeData`.
- The `Tree` component supports `scrollIntoView` to pass the `key` of the node to scroll to the specified field.
- `Transfer` component `showFooter` supports passing in `ReactNode` custom node.
- The `Table` component supports `renderPagination` to customize the pagination section.
- `Select.Option` and `Select.OptGroup` support passing native HTML attributes.
- `Select` `Cascader` `TreeSelect` component supports `prefix` property to set prefix.
- `Popover` and `Popconfirm` components support the `disabled` parameter.
- `Steps.Step` added parameters `style` and `className`.
- `VirtualList` supports passing in percentage height, and it is no longer necessary to forcibly specify the window height.

### 🐛 Bugfix

- Fix the bug that the key of `Transfer.Item` may be duplicated.
- Fix the bug that the `Tooltip` component `content` will be disabled when `0`.
- Fix the bug that the `Select` component uses the carriage return to select the option in React 17 will trigger the form submission event.
- Fix the bug that the new message appears at the bottom when the `Message` and `Notifaction` components are set to `maxCount`.
- Fixed a bug that caused console error when `Form.Item` was updated during uninstallation.
- Fix the bug that suffix`does not take effect when`value``is passed as a string in the`Statistic` component.

### 💅 Style

- Icons `IconLock` and `IconUnlock` are redrawn to solve the problem of indistinct distinction.
- Fix the problem of the style of connecting lines displayed in the `Tree` component.
- The `Modal` component separates the scrollbar animation to prevent the scrollbar from flickering.

## 2.10.2

2021-03-09

### 🐛 Bugfix

- Fix the problem that the selected value is not displayed after selecting the `label` of the `Select` component `Option` as a rich text node.
- Fix the problem that the bubble still pops up when the `content` of the `Tooltip` component is empty.
- Fix the problem that the `bodyCellStyle` of the `Table` component would overwrite the fixed column style.

### 🆎 TypeScript

- Improve the type of the `option` parameter in the callback function of the `Select` component.

## 2.10.1

2021-03-05

### 🐛 Bugfix

- Fix the problem that the `Mentions` component `@` someone does not automatically add a separator afterwards.
- Fixed the problem that the order of loading styles under the micro front end caused the internal icon style of the component to be overwritten by the global style.
- Fix the problem that the console shows the warning that the element needs a unique key when `Select` uses `maxTagCount`.
- Fix the problem that the position of the arrow element is incorrect after the automatic adjustment of the position of the `Trigger` component.
- Fixed the issue that the `Pagination` component did not reset the current page after the `pageSize` was modified.

### 💅 Style

- Fix the problem that the height of the outer layer of the `div` is stretched out when the `value` of the `Select` component is an empty string and there is an extra height.

## 2.10.0 🏮

2020-02-26

### 🆕 Function upgrade

- `Drawer` supports clicking esc to hide the drawer.
- Added `inputProps` and `loading` properties to the `AutoComplete` component.
- The `Icon` package adds `sideEffect: false` to support tree shaking.
- The `resetFields` method of `Form` supports passing in a string to reset a single field.
- `ConfigProvider` supports `renderEmpty` to set empty elements in the component globally.
- The `Progress` component supports gradient colors.
- `Progress` supports step progress bar.

### 🐛 Bugfix

- Fix the jitter bug in the UI when the `Select` component mode is switched and the placeholder is changed.
- Fix the bug that `Dropdown` is directly nested in `Tooltip` and `Tooltip` is not displayed.
- Fix the bug that the pop-up window closes when clicking the scrollbar in `Modal`.

### 💅 Style

- Optimized the experience of the `Breadcrumb` component. Only when the element is a link, the background color will be displayed in hover.
- Fix the style problem that the text of the `Tag` component cannot be selected and copied.
- Fix the bug that the animation style of the `dot` type of the `Spin` component is incorrect.
- Fix the style problem of the pager margins when the `Table` component has only one page to hide the pager.
- Fix the style problem that the right-aligned header text has a 2px right margin, which results in not strictly aligned with the numbers on the table body.
- `Checkbox`, `Radio` support keyboard switching to display the corresponding hover style when the focus is acquired.

### 🆎 TypeScript

- `DatePicker.WeekPicker` adds `dayStartOfWeek` type.
- Optimize the ts definition of the `render` function of the `List` component.

## 2.9.1

2021-02-20

### 🐛 Bugfix

- Fix the bug that when the `value` of the `Select` component is under control, modifying the `value` directly after searching may cause the selected value displayed in the select box to be abnormal.
- Fix the bug that the options entered by the user were not removed normally when the `value` mode of the `tags` mode of the `Select` component is controlled.
- Fix the bug that the `onVisibleChange` callback is not triggered when the `Select` component clicks the option to hide the drop-down box.
- Fix the bug that the input text cannot be selected with the mouse in the multi-select mode of the `Select` component.
- Fix the bug that the delete button is obscured when the tag text is too long in the multi-select mode of the `Select` component.
- Fix the bug that the `triggerProps.popupVisible` of the `AutoComplete` component does not take effect.
- Fix the bug that the `onBlur` callback of the `AutoComplete` component is triggered before the drop-down box is hidden.
- Fix the bug that the rolling update of the `Tabs` component is abnormal.
- Fixed the bug that when the initial value of `visible` of `Drawer` component `visible` is `true` and `getPopupContainer` is set, `Drawer` is still fixed.
- Fix the bug that the default class name of label is missing when the `labelCol` property of `className` is set in the `Form` component.
- When the `Input.Search` component is disabled, clicking the search icon still triggers the `onSearch` callback bug.

### 💅 Style

- Fix the problem that the content area of the `Popover` component is not displayed in the center when there is no `title`.
- Fix the problem that the background color of the error state of the `DatePicker` and `Select` components is incorrect in dark mode.
- Fix the problem that the icon button with floating background color is not centered in the vertical direction.

## 2.9.0 🔥

2021-02-05

### 🆕 Function upgrade

- `DatePicker` component supports setting `triggerElement` custom trigger element.
- When the `DatePicker` component sets `triggerElement=null`, it will directly display the panel.
- `Trigger` component supports direct nesting.
- `List.Item` supports incoming HTML native attributes and supports built-in hover style.
- The `Tree` component supports the `icons` property transfer function.
- Added attributes `bodyStyle` and `headerStyle` to the `Drawer` component.
- Added `onPaste` callback to `Select` component.
- Added `getOptionInfoByValue` method in `Select` component ref.
- Expose the interface of all components.
- Optimize the calculation logic of the fixed column class name of the `Table` component to avoid the obvious problem of scrolling when the data volume is large.

### 🐛 Bugfix

- Fix the bug of the controlled failure of the `tooltipVisible` component of `Slider`.
- Fixed the bug that empty cells would still be rendered when the `Table` component `expandedRowRender` returns `null`.
- Fix the bug that the `DatePicker.RangePicker` component cannot be confirmed directly on the same day.
- Fix the bug that the node does not execute the expansion logic when the `Tree` dynamically loads the data promise.reject.
- Fixed a bug that caused the second parameter of `selectNodes` in `onSelect` to appear `undefined` when the `Tree` component collapsed nodes.
- Fixed the bug that the height of the `Tree` component dynamically changes when virtual scrolling is turned on, and the content of the corresponding extra height will not be automatically updated.
- Fixed a bug where `Grid.Row` directly passed a string as `children` and reported an error.
- Fix the problem that the `value` corresponding to the removed `option` is not filtered when `Checkbox.Group` is in `onChange`.
- Fix the bug that the error message displayed in the upper layer of the `Form.Item` is not destroyed when the `Form.Item` component is destroyed.
- Fix the bug that custom `filterOption` still takes effect when the `Select` component allows searching and the input text is empty.
- Fix the bug that the height jitter caused by adding or deleting options when the width of the multi-select box of the `Select` component is narrow.

### 💅 Style

- When the `Card` component is vertically oriented, the bottom border becomes transparent when the last tab is in hover state.

## 2.8.2

2021-01-29

### 🐛 Bugfix

- Fix `onVisibleChange` can not be triggered when the dropdown of `Cascader` is hidden.
- Fix pagination not working in `List`.

### 💅 Style

- Fix the disabled style of `Input` not working in Safari.
- Fix the `noDataElement` of `List` is not vertically centered.

## 2.8.1

2021-01-28

### 🐛 Bugfix

- Fix the bug that the `onChange` cannot be triggered by clicking the same value option again after the input of `AutoComplete` is changed.
- Set the scroll boundary of the `Menu` component `autoScrollIntoView` to avoid abnormal scrolling of the `body`.
- Fixed the bug that the `Input` component introduced full icons, which caused the on-demand loading to fail.

### 💅 Style

- After the 2.7 version update, the icon style conflicts with the previous version.
- Fix the problem of the bottom border style when the `Table` component has no data.

## 2.8.0

2021-01-22

### 🆕 Function upgrade

- The `format` parameter of the `DatePicker` component supports incoming functions to customize the display content.
- `Menu.SubMenu` added `popup` property to force the use of popup mode.
- Added attributes `affixStyle` and `affixClassname` to set styles for fixed elements.
- Compatible with `less@4.0`.

### 🐛 Bugfix

- Fixed an error when setting `icons.collapseActive` in `Menu` component `hasCollapseButton`.
- Fix the bug that the `index` in the `expandedRowRender` callback of the `Table` component starts from -1 instead of 0.
- Fix the bug that `onChange` does not trigger occasionally when clicking the today button in the controlled mode of the `DatePicker` component.

### 💅 Style

- Fix the issue that the split line style of the prefix and suffix of the `Input` component is lost.
- `Table` filter style update.
- Update some face icons, the path is transparent, to avoid the problem of indistinguishable in some scenes.
- Add `fill: none` to the `Icon` component class to avoid being overwritten when the lower version component libraries are mixed.

## 2.7.2

2021-01-19

### 🐛 Bugfix

- Fixed the pop-up window created by static method in `Modal`. If the `title` property is not passed in when calling the `update` method, the `icon` property passed in when the pop-up window is created will take effect repeatedly, causing multiple icons to appear bug.
- Fix the bug that the `TimePicker` component loads missing styles on demand.

### 💅 Style

- Fix the issue that Spin component will affect the font style of wrapped elements.

## 2.7.1

2021-01-18

### 🐛 Bugfix

- Fixed a bug where popup components such as `DropDown` that depend on `Trigger` components passed in multiple directions of `popupAlign`, causing positioning offset.
- The rounded corners of the `Table` component are set to the `header` to fix the scroll freeze problem caused by the chrome engine in some scenes.
- Fix the bug that the `onChange` callback of the `Table` component's `onChange` callback is before the `onSelectAll`, which causes the `onSelectAll` to be overridden under control.

### 💅 Style

- Fix the style problem that the loading icon of the `Table` component overlaps with the description text.
- The horizontal description of the `Steps` component limits the maximum width to `140px`.

## 2.7.0

2021-01-15

### 🔥Icon upgrade

- All icons are redrawn, and line width, endpoints, and corners can be adjusted by parameters.

### 🆕 Function upgrade

- The `width` and `height` properties are added to the `ResizeBox` component to support the control of the width and height.
- The `popupAlign` property of the `Trigger` component supports multiple directions at the same time.
- Added `allowDrop` property to `Tree` component.

### 🐛 Bugfix

- Fix the problem that the custom parameters in the `onCell` of the `Table` component cannot be accepted in the custom `Cell` component.
- Fix the problem that the `Menu` component `autoOpen` does not take effect for multiple nested `SubMenu`.
- Fix the problem that the latest state of the parent component cannot be obtained inside the `onReachBottom` of the `List` component.
- Fix the problem that when the `Dropdown` component is used in conjunction with the `Menu` component, the `onVisibleChange` is triggered before the `onClickMenuItem`.
- Fix the problem that `Tabs` scroll calculation error when `type` is `capsule`.
- Fix the problem of the scroll positioning error of the header of `Tabs`.

### 💅 Style

- Optimize the style of `Select` multi-select mode in `disabled` state.
- Fix the problem of blank space after the upload node is hidden when the `Upload` component exceeds the `limit` limit.
- Fix the problem that the `extra` prompt text of the `Form` component flashes when the verification information is hidden.
- Fix the problem that the content area of ​​the `Tab` component `line` type tab is nested inside the `card` type tab.
- Remove the bottom border when the `Table` component has no data.
- When `Form` is placed in `vertical`, the label adds 4px bottom space.

### 🆎 TypeScript

- Fix the TS definition of the `renderOption` method of the `Cascader` component, and export the component-related interfaces.
