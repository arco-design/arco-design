## 2.33.1

2022-05-20

### 🐛 BugFix

- When the `title` of `Anchor.Link` is empty, the clickable area `<a/>` under it is not displayed([#878](https://github.com/arco-design/arco-design/pull/878))

## 2.33.0

2022-05-13

### 🐛 BugFix

- Fixed the bug that the `Anchor` component clicked on the anchor element when the content height was not enough.([#859](https://github.com/arco-design/arco-design/pull/859))

## 2.28.1

2022-01-14

### 🐛 BugFix

- Fix the bug that the scroll position of the clicked anchor element is wrong when the `Anchor` component is set with a `scrollContainer`.([#446](https://github.com/arco-design/arco-design/pull/446))

## 2.25.1

2021-11-26

### 🐛 BugFix

- Fix the bug that the scroll container is not passed to the `Affix` component when the `Anchor` component is set to `affix`.([#235](https://github.com/arco-design/arco-design/pull/235))

## 2.22.0

2021-09-10

### 🆕 Feature

- The `Anchor` component adds a new attribute `targetOffset` to support setting the offset of the scrolling baseline in the container.

## 2.17.0

2021-06-18

### 🐛 Bugfix

- Fix the bug that the scroll position is not updated when clicking the link when the `animation` and `hash` of the `Anchor` component are both `false`.

## 2.14.2

2021-04-23

### 🐛 Bugfix

- Fix a bug that may cause an error when `Anchor` switches page routing because the dom node does not exist.

