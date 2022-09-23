## 2.40.1

2022-09-23

### 💅 Style

- After opening `preview` of the Image component, the hover style changes to `zoom-out`([#1419](https://github.com/arco-design/arco-design/pull/1419))

## 2.39.0

2022-08-12

### 🆕 Feature

- `Image.Preview` adds the `imgAttributes` parameter to transparently transmit the properties to the `img` tag in the preview modal([#1274](https://github.com/arco-design/arco-design/pull/1274))

## 2.38.1

2022-08-05

### 🐛 BugFix

- Fixed the bug that the `Image` component passed the native property `onLoad`, `onError` was not triggered([#1236](https://github.com/arco-design/arco-design/pull/1236))

## 2.38.0

2022-07-29

### 🐛 BugFix

- Fix `Image.Preview`'s `onVisibleChange` not triggering when preview is opened.([#1219](https://github.com/arco-design/arco-design/pull/1219))

## 2.33.1

2022-05-20

### 🐛 BugFix

- Fixed `Image.PreviewGroup ` component's `onChange` event not firing when `current` is controlled([#880](https://github.com/arco-design/arco-design/pull/880))

## 2.30.0

2022-03-04

### 🆕 Feature

- Image component Added `index` parameter, which indicates the index during preview, which can be specified in complex multi-image preview scenarios to ensure consistent preview order([#588](https://github.com/arco-design/arco-design/pull/588))
- `Image.Preview` component Added `scales` parameter to support custom image preview zoom percentage([#588](https://github.com/arco-design/arco-design/pull/588))

## 2.29.1

2022-02-18

### 🐛 BugFix

- Fixed `Image.Preview` component `onload` not triggering when loading images from cache([#539](https://github.com/arco-design/arco-design/pull/539))

## 2.28.1

2022-01-14

### 🐛 BugFix

- Fix the bug that the preview order of Image.PreviewGroup is wrong after the src of the child node is updated.([#445](https://github.com/arco-design/arco-design/pull/445))

## 2.28.0

2022-01-07

### 🐛 BugFix

- Fix the bug that some global configuration were lost in the preview mode of the `Image` component([#410](https://github.com/arco-design/arco-design/pull/410))

## 2.25.0

2021-11-19

### 💅 Style

- The `Image` component sets the maximum size of the error state to the size of the parent element.([#161](https://github.com/arco-design/arco-design/pull/161))

## 2.24.0

2021-11-05

### 🆕 Feature

- Component `Image.Preview` support pressing `ESC` to close([#121](https://github.com/arco-design/arco-design/pull/121))

## 2.23.0

2021-09-27

### 🐛 BugFix

- Fix the problem that the `height` setting of the `Image` component is invalid

## 2.20.1

2021-08-06

### 🐛 Bugfix

- Fix the bug that the `Image.PreviewGroup` component is not updated after the `srcList` is changed.

## 2.18.0

2021-07-02

### 🐛 Bugfix

- Fix the bug that the `onChange` is not triggered when the `Image.PreviewGroup` component clicks on the image to open it.

## 2.16.1

2021-06-04

### 🐛 Bugfix

- Fix the bug that the element obtained by `getPopupContainer` is wrong when the `Image.Preview` component is opened by default.

## 2.16.0

2021-05-28

### 🆕 Feature

- `Image.Preview` supports custom mount points.

## 2.15.0

2021-04-30

### 🐛 Bugfix

- Fix the bug that the `Image` component is unavailable under Server Side Render.



## 2.14.2

2021-04-23

### 💎 Optimization

- The `Image` component adds multi-language support.

## 2.14.1

2021-04-16

### 🆎 TypeScript

- Fix the problem of missing `children` in the TS definition of `Image.PreviewGroup`.



## 2.14.0

2021-04-09

### 🆕 Feature

- `Image` component supports multi-image preview.

