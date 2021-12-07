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

