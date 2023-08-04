## 2.51.1

2023-08-04

### 🐛 BugFix

- Optimize `Carousel` double-click the text at the bottom of the arrow to avoid being selected([#2119](https://github.com/arco-design/arco-design/pull/2119) [@notbucai](https://github.com/notbucai))

## 2.50.0

2023-06-30

### 🐛 BugFix

- Fix the problem that the page switch is abnormal when the `trigger` of the `Carousel` is set to `hover`.([#2063](https://github.com/arco-design/arco-design/pull/2063))

## 2.38.0

2022-07-29

### 🐛 BugFix

- Fixed the bug that `Carousel` would slide to the first page when clicking in the middle of indicators.([#1210](https://github.com/arco-design/arco-design/pull/1210))
- Fixed the bug that child elements of `Carousel` could not fill up the height of the component.([#1210](https://github.com/arco-design/arco-design/pull/1210))

## 2.28.0

2022-01-07

### 🐛 BugFix

- Fix the bug that Carousel's first page switch animation is abnormal when `currentIndex` is set to non-zero.([#409](https://github.com/arco-design/arco-design/pull/409))

## 2.25.0

2021-11-19

### 🆕 Feature

- `Carousel` adds `icons` property to support custom arrow icons.([#181](https://github.com/arco-design/arco-design/pull/181))

## 2.21.0

2021-08-20

### 🆕 Feature

- Added the `miniRender` property to the `Carousel` component, which supports rendering the minimum number of child nodes that meet the animation requirements.

## 2.17.0

2021-06-18

### 💎 Optimization

- When the `Carousel` component actively calls the page turning API, it is allowed to reset the auto-play timing.

## 2.16.1

2021-06-04

### 🐛 Bugfix

- Fix the bug that the switching animation is not displayed when the `currentIndex` property is directly modified outside the `Carousel` component.

### 💅 Style

- When the `Carousel` component `animation` is `slide`, the hidden picture changes from `display: none` to `visibility: hidden`.



## 2.15.2

2021-05-14

### 🐛 Bugfix

- Fix the bug that the content of the `Carousel` component overlaps when its scroll item is semi-transparent.

## 2.14.2

2021-04-23

### 🐛 Bugfix

- Fix the bug that when the `Carousel` component has only two pictures, click the left arrow and the pictures scroll in the wrong direction.

## 2.14.0

2021-04-09

### 🆕 Feature

- The `Carousel` component `autoPlay` supports passing in objects to control the playback interval and whether to tentatively play automatically when the mouse is hovering.

### 🐛 Bugfix

- Fix the bug that the `onClick` callback passed by the child node of `Carousel` is invalid.

