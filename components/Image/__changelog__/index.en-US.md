## 2.66.15

2026-05-08

### 🐛 BugFix

- Fix the issue where the click event of the close button in the `Image.Preview` popup bubbles up, causing the parent element's click event to be triggered mistakenly.([#3178](https://github.com/arco-design/arco-design/pull/3178))

## 2.61.0

2024-03-15

### 🆕 Feature

- `Image`  supports `resetTranslate`property([#2593](https://github.com/arco-design/arco-design/pull/2593))

### 🐛 BugFix

- Fix the problem that the image is always in the loading state when the `Image` component image link triggers the memory cache.([#2587](https://github.com/arco-design/arco-design/pull/2587))

## 2.60.2

2024-03-01

### 🐛 BugFix

- Fix the problem of `loading` status display of `Image` component([#2550](https://github.com/arco-design/arco-design/pull/2550))

## 2.58.3

2024-01-11

### 💎 Enhancement

- Optimize that when the `Image` component is in `lazyload`, elements outside the viewport do not display placeholder loading to avoid page reflow.([#2492](https://github.com/arco-design/arco-design/pull/2492))

### 🐛 BugFix

- Fixed the bug causing white screen due to loop rendering in `Image` component boundary scene.([#2489](https://github.com/arco-design/arco-design/pull/2489))

## 2.58.0

2023-12-29

### 🆕 Feature

- The `Image.Preview` component adds the `imageRender` attribute to allow custom image rendering, and the `imgAttributes` attribute customizes src content.([#2458](https://github.com/arco-design/arco-design/pull/2458))
- The `Image.PreviewGroup` component adds the `renderImages` attribute for loading images in advance([#2458](https://github.com/arco-design/arco-design/pull/2458))

## 2.55.0

2023-10-27

### 💎 Enhancement

- `Image.PreviewGroup` component adds shortcut key support for arrow keys([#2320](https://github.com/arco-design/arco-design/pull/2320))

## 2.53.1

2023-09-15

### 💎 Enhancement

- Avoid image dragging that is triggered incorrectly when the right mouse button is pressed.([#2234](https://github.com/arco-design/arco-design/pull/2234))
- Optimize the problem of cracked image in the first rendering of Image in SSR and `lazyload` is enabled.([#2234](https://github.com/arco-design/arco-design/pull/2234))

## 2.53.0

2023-09-08

### 🆕 Feature

- `Image.Preview` add a new `extra` property, which is used to specify extra nodes in the preview area.([#2224](https://github.com/arco-design/arco-design/pull/2224))

### 🐛 BugFix

- Fixed the bug that the first rendering of `Image` would display the load-failed icon.([#2223](https://github.com/arco-design/arco-design/pull/2223))

## 2.52.1

2023-08-25

### 💎 Enhancement

- Avoid 404 error in the browser console when `src` is not passed to `Image`.([#2187](https://github.com/arco-design/arco-design/pull/2187))

### 🐛 BugFix

- Fix the problem that the loading status of `Image` is not displayed when `loader = true`.([#2173](https://github.com/arco-design/arco-design/pull/2173) [@bestlyg](https://github.com/bestlyg))

## 2.52.0

2023-08-18

### 🐛 BugFix

- Fix `Image` error caused by `previewProps.actions` usage.([#2137](https://github.com/arco-design/arco-design/pull/2137))

## 2.48.1

2023-05-19

### 🐛 BugFix

- Fix the bug that the component UI is not actually updated after the `Image.previewProps` field is updated.([#1976](https://github.com/arco-design/arco-design/pull/1976))

## 2.47.0

2023-04-14

### 🆕 Feature

- `Image` component adds `lazyload` attribute to support lazy loading([#1850](https://github.com/arco-design/arco-design/pull/1850))

## 2.45.2

2023-03-10

### 💎 Enhancement

- Optimize `Image` to zoom in and out with the mouse wheel when previewing images.([#1829](https://github.com/arco-design/arco-design/pull/1829))

## 2.43.2

2023-01-06

### 🐛 BugFix

- Fix the bug that nesting `Popover` components inside `ImagePreviewGroup` causes an error.([#1706](https://github.com/arco-design/arco-design/pull/1706))

## 2.41.0

2022-10-28

### 💎 Enhancement

- Show `zoom-in` mouse type when `Image` component is hovered([#1477](https://github.com/arco-design/arco-design/pull/1477))

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

