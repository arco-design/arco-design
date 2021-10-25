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

