---
changelog: true
---

## 2.26.1

2021-12-07

### 🐛 BugFix

- Fix the bug that when the trigger mode of the `Trigger` component is `contextMenu`, the pop-up layer is not hidden when the trigger node is clicked.([#284](https://github.com/arco-design/arco-design/pull/284))
- Fix the bug that the `prefix` node loses the style of `font-size` when the `Select` component is multi-selected.([#284](https://github.com/arco-design/arco-design/pull/284))
- Fix the bug that the `warning` style of the `Form` component is shown when the teaching experience is passed.([#282](https://github.com/arco-design/arco-design/pull/282))
- Fix the bug that the upload folder does not take effect when dragging and dropping the upload component.([#275](https://github.com/arco-design/arco-design/pull/275))

## 2.26.0

2021-12-03

### 💎 Performance

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
- `Progress`  gix the bug that the'trailColor 'attribute does not take effect on the circular progress bar and the step progress bar.([#175](https://github.com/arco-design/arco-design/pull/175))
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
- Fix `Select` virtual list abnormal positioning that may be caused by setting custom height of  `Select.Option` .([#55](https://github.com/arco-design/arco-design/pull/55))
- Fix  the InputTag component default validate function  always returns false([#43](https://github.com/arco-design/arco-design/pull/43))

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
-  When the `add` method of `Form.List` receives the event object as a parameter, it will prompt in the console.

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
-  Fix the bug that the `Typography` component `ellipsis` cannot be re-rendered when the `ellipsis` is under control
-  Fix the bug that the call of `Typography` component `ellipsis` cannot be triggered when passing `onExpand`
-  Fix the bug that the status of `ellipsis` cannot be automatically updated according to the taste when `resize` of the `Typography` window
-  Fix the bug that the `Cascader` component cannot click to expand the next level option when the option `disableCheckbox=true` is set.

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
-  Fix the bug that `onChange` can't be fired when to add or remove an item in `Form.List`.
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

-  Optimize `Form.setFieldsValue` ts definition

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
- Fix the bug that suffix`does not take effect when`value`` is passed as a string in the `Statistic` component.

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
