## 2.39.1

2022-08-19

### 🐛 BugFix

- Fix the bug that setting `md = 0` in the `Grid.Col` would cause it to not display on larger window sizes.([#1307](https://github.com/arco-design/arco-design/pull/1307))

## 2.28.2

2022-01-21

### 💎 Optimization

- `Grid` supports setting `span` to 0.([#480](https://github.com/arco-design/arco-design/pull/480))

## 2.26.0

2021-12-03

### 🆕 Feature

- The `Grid.Col` component adds the `flex` property.([#268](https://github.com/arco-design/arco-design/pull/268))

## 2.25.1

2021-11-26

### 💎 Optimization

- `Grid.Row` uses context to pass `gutter` to `Grid.Col` to avoid incorrectly receiving parameters when customizing `Grid.Col`.([#224](https://github.com/arco-design/arco-design/pull/224))

## 2.20.0

2021-07-30

### 🆕 Feature

- The `Grid.Col` component adds the `push` and `pull` attributes to set the horizontal offset of the grid.

## 2.19.0

2021-07-16

### 🆕 Feature

- `Grid.Row` component and `Grid.Col` component support all native html attributes.



## 2.9.0 🔥

2021-02-05

### 🐛 Bugfix

- Fixed a bug where `Grid.Row` directly passed a string as `children` and reported an error.

