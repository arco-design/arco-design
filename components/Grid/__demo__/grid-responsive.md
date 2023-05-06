---
order: 11
title:
  zh-CN: 响应式的 Grid 布局
  en-US: Responsive Grid Layout
---

## zh-CN

Grid 组件的响应式配置格式为 `{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6, xxxl: 7 }`。

## en-US

The responsive configuration format of the Grid component is `{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6, xxxl: 7 }`.

```js
import { useState } from 'react';
import { Grid, Switch, Typography } from '@arco-design/web-react';

const { GridItem } = Grid;

const App = () => {
  return (
    <div style={{ width: '100%' }}>
        <Grid cols={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }} colGap={12} rowGap={16} className="grid-responsive-demo">
            <GridItem className="demo-item">item</GridItem>
            <GridItem className="demo-item">item</GridItem>
            <GridItem className="demo-item">item</GridItem>
            <GridItem className="demo-item">item</GridItem>
            <GridItem className="demo-item">item</GridItem>
            <GridItem className="demo-item">item</GridItem>
            <GridItem className="demo-item" span={{ xl: 4, xxl: 6 }} suffix>
                suffix
            </GridItem>
        </Grid>
    </div>
  );
};

export default App;
```

```css
.grid-responsive-demo .demo-item,
.grid-responsive-demo .demo-suffix {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}
.grid-responsive-demo .demo-item:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-responsive-demo .demo-item:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
```
