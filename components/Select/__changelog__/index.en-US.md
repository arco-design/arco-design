## 2.58.2

2024-01-08

### 🐛 BugFix

- Fix the `effect` infinite loop that may occur in edge cases in `Select` after turning on `allowCreate`.([#2484](https://github.com/arco-design/arco-design/pull/2484))

## 2.58.1

2024-01-05

### 🐛 BugFix

- Fixed page error caused by updating the value to `undefined` when `allowCreate` is enabled `Select` single-mode.([#2473](https://github.com/arco-design/arco-design/pull/2473))

## 2.57.2

2023-12-22

### 🐛 BugFix

- Fixed the issue where the `creating` parameter of the `allowCreate.formatter` property of the `Select` is always `true` in single-select mode.([#2447](https://github.com/arco-design/arco-design/pull/2447))

## 2.54.0

2023-10-09

### 🆕 Feature

- The `Select` component supports setting width adaptation through the `autoWidth` property.([#2274](https://github.com/arco-design/arco-design/pull/2274))
- The `allowCreate` property of `Select` allows passing in a `formatter` to format user-created options.([#2259](https://github.com/arco-design/arco-design/pull/2259))

## 2.53.1

2023-09-15

### 🐛 BugFix

- Fixed the issue that `Select` needs to be clicked twice to display the drop-down box in Firefox.([#2233](https://github.com/arco-design/arco-design/pull/2233))

## 2.53.0

2023-09-08

### 🐛 BugFix

- Fix the bug that after the `Select` search text is changed, pressing Enter will uncheck the previously selected option.([#2217](https://github.com/arco-design/arco-design/pull/2217))

## 2.52.2

2023-09-01

### 🐛 BugFix

- Fix the issue that when the `Select` is used with `renderFormat` and `showSearch`, the drop-down box needs to be clicked twice to pop up.([#2190](https://github.com/arco-design/arco-design/pull/2190))

## 2.52.0

2023-08-18

### 🆕 Feature

- `Select` adds `onSelect` callback (only valid for multi-select mode).([#2157](https://github.com/arco-design/arco-design/pull/2157))
- `Select` adjusts `defaultActiveFirstOption` to also take effect for the selected option.([#2157](https://github.com/arco-design/arco-design/pull/2157))

### 🐛 BugFix

- Fix the problem that the drop-down box in the `<input>` area cannot be expanded when the multi-selection `Select` is set to `showSearch=false` in Chrome 116+.([#2156](https://github.com/arco-design/arco-design/pull/2156))

## 2.51.1

2023-08-04

### 🐛 BugFix

- Fix the issue that `Select` lost width after focusing if its width is `auto` and has a selected value.([#2122](https://github.com/arco-design/arco-design/pull/2122))

## 2.50.2

2023-07-21

### 💎 Enhancement

- `Select` still maintains its ability to open a virtual list when the option `label` is rich text but the width of the popup is set by `triggerProps.style`.([#2092](https://github.com/arco-design/arco-design/pull/2092))

## 2.50.0

2023-06-30

### 🐛 BugFix

- Fix `Select` component being affected by default properties set by `ConfigProvider.componentConfig.InputTag`.([#2064](https://github.com/arco-design/arco-design/pull/2064))

## 2.47.2

2023-05-06

### 🐛 BugFix

- Fix the error caused by inputing long text when `Select` is allowed to be created.([#1948](https://github.com/arco-design/arco-design/pull/1948))

## 2.47.1

2023-04-21

### 🐛 BugFix

- Fix the problem that the width of `Select` is slowly restored after the value is cleared in multi-selection mode.([#1935](https://github.com/arco-design/arco-design/pull/1935))

## 2.47.0

2023-04-14

### 🐛 BugFix

- Fix the bug that setting the trigger mode of `Select` popup window to `focus` does not take effect.([#1915](https://github.com/arco-design/arco-design/pull/1915))

## 2.46.3

2023-04-07

### 🐛 BugFix

- Fix the problem that `Select` will be focused when clicking the close button of `Tag` to delete the option in the multi-select mode.([#1894](https://github.com/arco-design/arco-design/pull/1894))

## 2.46.1

2023-03-24

### 🐛 BugFix

- Fix `Select` multi-selection mode, when the first option is selected, the drop-down box shakes.([#1863](https://github.com/arco-design/arco-design/pull/1863))

## 2.46.0

2023-03-17

### 🆕 Feature

- `Select` component `ref` add new `scrollIntoView` method to support scrolling the list to the specified option.([#1843](https://github.com/arco-design/arco-design/pull/1843))

## 2.45.2

2023-03-10

### 🐛 BugFix

- Fix the problem that when the `Select` component `dragToSort` and `maxTagCount` are used together, the drag sorting result is abnormal.([#1830](https://github.com/arco-design/arco-design/pull/1830))

## 2.45.1

2023-03-01

### 🐛 BugFix

- Fix the problem that the option is not displayed in the drop-down list when the content of the `Select` option is an empty string.([#1807](https://github.com/arco-design/arco-design/pull/1807))

## 2.45.0

2023-02-17

### 💎 Enhancement

- Optimize the issue that `Select` user-created option not updated if the search result returns an option with the same `option.value`([#1788](https://github.com/arco-design/arco-design/pull/1788))

## 2.44.1

2023-02-03

### 💎 Enhancement

- Optimize `Select` drop-down box jittering due to out-of-focus after searching/creating options.([#1747](https://github.com/arco-design/arco-design/pull/1747))

## 2.43.2

2023-01-06

### 💎 Enhancement

- Optimize the empty string display of `Select` component option value.([#1703](https://github.com/arco-design/arco-design/pull/1703))

## 2.42.2

2022-12-09

### 💎 Enhancement

- `Select` allows to show dropdown when `allowCreate` is enabled and no option data is present.([#1640](https://github.com/arco-design/arco-design/pull/1640))

## 2.42.0

2022-11-25

### 🐛 BugFix

- Fix the problem that when `showSearch = true` in Firefox browser, Select needs to be clicked twice to pop up the drop-down box.([#1569](https://github.com/arco-design/arco-design/pull/1569))

## 2.41.1

2022-11-04

### 🐛 BugFix

- Fixed `Select` component showing `placeholder` as `value` bug when `value = ''`.([#1536](https://github.com/arco-design/arco-design/pull/1536))

### 💅 Style

- Fixed `Select` vertical alignment problem when used in `Input.Group`.([#1534](https://github.com/arco-design/arco-design/pull/1534))

## 2.41.0

2022-10-28

### 🆕 Feature

- The `Select` component supports setting the front tag through the `addBefore` property([#1464](https://github.com/arco-design/arco-design/pull/1464))

### 🐛 BugFix

- Fix the bug that the width of `Select` does not automatically change with the content when `width: auto` is set. (In the single-selection mode, the new DOM node in the inner layer directly wraps the `.arco-select-view-value` and `input` tags)([#1490](https://github.com/arco-design/arco-design/pull/1490))

## 2.40.0

2022-09-16

### 🆕 Feature

- The `Select` component supports listening to the `onKeyDown` callback.([#1360](https://github.com/arco-design/arco-design/pull/1360))

## 2.39.2

2022-08-26

### 💎 Enhancement

- Make sure that the keyboard shortcuts are still available when the `Select` component uses `dropdownRender` to customize the dropdown box content and gets the page focus.([#1328](https://github.com/arco-design/arco-design/pull/1328))

## 2.39.1

2022-08-19

### 💅 Style

- Unify the style of the right arrow in `Select` multi-select and single-select modes.([#1302](https://github.com/arco-design/arco-design/pull/1302))

## 2.38.0

2022-07-29

### 🐛 BugFix

- Fixed  flickering "no data" placeholder when `allowCreate` in Select.([#1184](https://github.com/arco-design/arco-design/pull/1184))

## 2.37.2

2022-07-22

### 🐛 BugFix

- Fixed an issue where the `onInputValueChange` callback might not be triggered in the `inputValue` controlled mode of the `Select` component.([#1178](https://github.com/arco-design/arco-design/pull/1178))

## 2.37.0

2022-07-08

### 🆕 Feature

- The `Select` component supports customizing the `maxTag` content display through the `maxTagCount` property of the object type([#1112](https://github.com/arco-design/arco-design/pull/1112))

## 2.35.1

2022-06-17

### 💎 Enhancement

- The `Select` component uses the Dom Attribute to mark options that the user is creating and has already created.([#1011](https://github.com/arco-design/arco-design/pull/1011))

## 2.35.0

2022-06-10

### 🐛 BugFix

- Fixed the bug that the callback parameter was wrong when the `Select` component set `LabelInValue`.([#953](https://github.com/arco-design/arco-design/pull/953))

## 2.32.2

2022-04-29

### 🐛 BugFix

- Fixed an issue where the matched option text was not highlighted when the `Select` component searched.([#808](https://github.com/arco-design/arco-design/pull/808))

## 2.32.0

2022-04-15

### 🐛 BugFix

- Fixed the bug that `onMouseEnter` and `onMouseLeave` of `Select.Option` not works.([#729](https://github.com/arco-design/arco-design/pull/729))

## 2.31.0

2022-03-25

### 🆕 Feature

- `Select` component's `triggerElement` property allows passing in a function to customize the component trigger node.([#686](https://github.com/arco-design/arco-design/pull/686))

## 2.30.1

2022-03-11

### 🐛 BugFix

- Fix the bug that the Tag animation fails when `Select` is multiple mode.([#630](https://github.com/arco-design/arco-design/pull/630))
- Fix the bug that the options of `Select` with `maxTagCount` are not unchecked in the correct order when press `Backspace`.([#630](https://github.com/arco-design/arco-design/pull/630))

## 2.28.2

2022-01-21

### 🐛 BugFix

- `Select` fixes an issue where automatic word segmentation introduced new options when `allowCreate` was `false`.([#466](https://github.com/arco-design/arco-design/pull/466))

## 2.28.1

2022-01-14

### 💎 Optimization

- `Select` optimizes the rendering behavior of `labelInValue` when the initial value is specified as an object.([#448](https://github.com/arco-design/arco-design/pull/448))
- Disable browser autocomplete for `Select`.([#439](https://github.com/arco-design/arco-design/pull/439))
- `Select.Option` allows no child nodes to be passed in.([#419](https://github.com/arco-design/arco-design/pull/419))

## 2.27.2

2021-12-31

### 🐛 BugFix

- `Select` fixes the bug that disabled options can be selected by user input when `allowCreate = true`.([#373](https://github.com/arco-design/arco-design/pull/373))

## 2.27.1

2021-12-24

### 🐛 BugFix

- Fix the bug that the text in the input box is not cleared after blur when the `popupVisible` of the `Select` is `false`.([#359](https://github.com/arco-design/arco-design/pull/359))

## 2.27.0

2021-12-17

### 🆕 Feature

- `Select` adds `dragToSort` property to support sorting the entered value by dragging.([#325](https://github.com/arco-design/arco-design/pull/325))

## 2.26.1

2021-12-07

### 🐛 BugFix

- Fix the bug that the `prefix` node loses the style of `font-size` when the `Select` component is multi-selected.([#284](https://github.com/arco-design/arco-design/pull/284))

## 2.26.0

2021-12-03

### 🆕 Feature

- `Select` adds the `clearIcon` property to customize the clear button icon.([#256](https://github.com/arco-design/arco-design/pull/256))

### 🐛 BugFix

- `Select` fixes the bug that the parameter of the `renderFormat` callback does not return an object when the `labelInValue` is `true`.([#257](https://github.com/arco-design/arco-design/pull/257))

## 2.24.1

2021-11-12

### 🐛 BugFix

- `Select` fixes the problem that users cannot cover the height of the pop-up window in the CSS file.([#148](https://github.com/arco-design/arco-design/pull/148))
- `Select` Fix the problem of abnormal positioning of virtual list in single mode.([#148](https://github.com/arco-design/arco-design/pull/148))

## 2.23.5

2021-10-29

### 🐛 BugFix

- Fix `Select` virtual list abnormal positioning that may be caused by setting custom height of  `Select.Option` .([#55](https://github.com/arco-design/arco-design/pull/55))

## 2.23.2

2021-10-22

### 🐛 BugFix

- Fix the error report caused by the lack of initial value when the `Select` component `labelInValue` and multiple selections are made.

## 2.23.1

2021-10-15

### 🐛 BugFix

- Fix the bug that the `Select` component fails to expand when clicking the drop-down box of the text area in some browsers.
- Fix the jitter that may be caused by data update when the `Select` component uses virtual scrolling.
- Fix the bug that when the `Select` component `mode` is `multiple` and `labelInValue` is `true`, the error is reported when `value` is passed into the object array.

## 2.22.0

2021-09-10

### 🆕 Feature

- The `Select` component `ref` references the new `activeOptionValue` property to mount the value of the current hovered option.

### 🐛 BugFix

- The `Select` component fixes the bug that the `ref` reference is not updated.

## 2.21.1

2021-08-27

### 💎 Optimization

- Add the corresponding `title` attribute to the DOM only when the value to be rendered is a string

## 2.21.0

2021-08-20

### 💎 Optimization

- Optimize the `Select` component `allowCreate` to make the text input by the user the first item in the option list.

### 🐛 Bugfix

- Fix the bug that when the `Select` component sets `labelInValue` and `allowClear`, clearing the options causes an error in the `onChange` callback.

## 2.20.1

2021-08-06

### 🐛 Bugfix

- Fixed a bug where the drop-down icon `Select` on the right was not expanded when the `Select` component set the `trigger` to `focus`.

## 2.19.3

2021-07-23

### 💎 Optimization

- When `Select` sets `labelInValue` and passes in the initial value of the object form, the text of the select box will first display the label passed in by the user.



### 🐛 Bugfix

- Fix the bug that the `tokenSeparators` of the `Select` component set to Chinese characters does not take effect on the Windows system.
- Fix the bug that the keyboard selection option may be invalid when there are groups and searches for `Select`.

## 2.19.0

2021-07-16

### 💎 Optimization

- The `Select` component adds a native HTML `title` attribute to display text when the mouse is hovered.



## 2.17.2

2021-06-22

### 🐛 Bugfix

- Fix the bug that the last triggered option is not added to the option list when the `Select` component triggers automatic word segmentation.



## 2.17.0

2021-06-18

### 💎 Optimization

- When the `Select` component is multi-selected, the width of the input box is increased by 4 px, which is convenient for selecting text with the mouse.

### 🆕 Feature

- The `Select` component `tokenSeparators` supports passing in `\n` and `\t`.

## 2.15.3

2021-05-21

### 🐛 Bugfix

- Fix the bug that the `Select` parent component directly sets the `inputValue` error and triggers the `onSearch` callback bug.

## 2.15.2

2021-05-14

### 🐛 Bugfix

- Fix the bug that the arrow icon of the input box changes to the search icon after the `Select` multi-select focus.

## 2.15.0

2021-04-30

### 🆕 Feature

- Added `animation` property to support label animation when multiple selection is turned off;
- Added the `index` and `values` parameters to the `renderTag` attribute to adapt to more complex custom tag rendering methods;
- The minimum value allowed by the `maxTagCount` property is changed from 1 to 0.

### 🐛 Bugfix

- Fix the bug that the setting of `showSearch=false` does not take effect when the `Select`, `TreeSelect`, and `Cascader` components are multi-selected.

## 2.14.2

2021-04-23

### 🐛 Bugfix

- Fix the bug that the controlled mode is abnormal when `Select` directly sets `value` to `undefined`.
- Fix the bug that `dropdownMenuStyle.maxHeight` of `Select` component does not take effect.
- Fixed a bug that caused the input box to lose focus when clicking the checkbox in front of the option in the `Select` multi-select mode.

## 2.14.1

2021-04-16

### 🐛 Bugfix

- Fix the bug that the content pasted after the word segmentation is triggered is not cleared when the `tokenSeparators` of the `Select` component is set to line break.

## 2.14.0

2021-04-09

### 🆕 Feature

- The `Select` component ref exposes the `getOptionInfoList` interface to obtain all the Option information that needs to be rendered.
- `Select` adds `defaultPopupVisible` property to control whether the drop-down box pops up by default.

### 🐛 Bugfix

- Fix the bug that the `Select` components `dropdownMenuStyle` and `dropdownMenuClassName` do not take effect when there is no option.

### 🆎 TypeScript

- The TS definition of `Select` component children is rolled back as `ReactNode`.



## 2.13.2

2021-04-01

### 🐛 Bugfix

- Fix the bug that the update of the parent component of the `Select` component may cause the currently active option to be restored to the default.
- Fix the bug that the background color of the selected item in the input box changes when clicking outside the browser window when the `Select` component is multi-selected and focused.
- Fix the bug that the drop-down box of the `Select` component cannot be closed occasionally.

## 2.13.1

2021-03-28

### 🐛 Bugfix

- Fix the problem that the `Select` component report an error when a false value is passed to `children`.



## 2.13.0

2021-03-26

### 🐛 Bugfix

- When `Select` component `notFoundContent` passes `null`, the drop-down box should not be displayed when there is no data.

## 2.12.0

2021-03-19

### 💅 Style

- Fix the problem that the selected content of `Select` is not centered in the front and back tags of the `Input` component.



## 2.11.1

2021-03-15

### 🆎 TypeScript

- Fix the TS type error of the `option` parameter in the `filterOption` callback function of the `Select` component

## 2.11.0

2021-03-12

### 🆕 Feature

- `Select.Option` and `Select.OptGroup` support passing native HTML attributes.
- `Select` `Cascader` `TreeSelect` component supports `prefix` property to set prefix.

### 🐛 Bugfix

- Fix the bug that the `Select` component uses the carriage return to select the option in React 17 will trigger the form submission event.

## 2.10.2

2021-03-09

### 🐛 Bugfix

- Fix the problem that the selected value is not displayed after selecting the `label` of the `Select` component `Option` as a rich text node.

### 🆎 TypeScript

- Improve the type of the `option` parameter in the callback function of the `Select` component.



## 2.10.1

2021-03-05

### 🐛 Bugfix

- Fix the problem that the console shows the warning that the element needs a unique key when `Select` uses `maxTagCount`.

### 💅 Style

- Fix the problem that the height of the outer layer of the `div` is stretched out when the `value` of the `Select` component is an empty string and there is an extra height.



## 2.10.0 🏮

2020-02-26

### 🐛 Bugfix

- Fix the jitter bug in the UI when the `Select` component mode is switched and the placeholder is changed.

## 2.9.1

2021-02-20

### 🐛 Bugfix

- Fix the bug that when the `value` of the `Select` component is under control, modifying the `value` directly after searching may cause the selected value displayed in the select box to be abnormal.
- Fix the bug that the options entered by the user were not removed normally when the `value` mode of the `tags` mode of the `Select` component is controlled.
- Fix the bug that the `onVisibleChange` callback is not triggered when the `Select` component clicks the option to hide the drop-down box.
- Fix the bug that the input text cannot be selected with the mouse in the multi-select mode of the `Select` component.
- Fix the bug that the delete button is obscured when the tag text is too long in the multi-select mode of the `Select` component.

## 2.9.0 🔥

2021-02-05

### 🆕 Feature

- Added `onPaste` callback to `Select` component.
- Added `getOptionInfoByValue` method in `Select` component ref.

### 🐛 Bugfix

- Fix the bug that custom `filterOption` still takes effect when the `Select` component allows searching and the input text is empty.
- Fix the bug that the height jitter caused by adding or deleting options when the width of the multi-select box of the `Select` component is narrow.



## 2.7.0

2021-01-15

### 💅 Style

- Optimize the style of `Select` multi-select mode in `disabled` state.

