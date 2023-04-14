---
order: 10
title:
  zh-CN: Grid 布局
  en-US: Grid Layout
---

## zh-CN

基于 CSS 的 Grid 布局实现的布局组件，支持折叠，并且可以设置后缀节点，后缀节点会显示在一行的结尾。

## en-US

A layout component implemented by CSS-based Grid layout, supports folding, and can set suffix nodes, which will always be displayed at the end of a line.

```js
import { useState } from 'react';
import { Grid, Switch, Typography } from '@arco-design/web-react';

const { GridItem } = Grid;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div style={{ width: '100%' }}>
        <div style={{ marginBottom: '20px' }}>
            <Typography.Text>折叠：</Typography.Text>
            <Switch checked={collapsed} onChange={setCollapsed}  />
        </div>
        <Grid collapsed={collapsed} cols={3} colGap={12} rowGap={16} className="grid-demo-grid">
            <GridItem className="demo-item">item</GridItem>
            <GridItem className="demo-item">item</GridItem>
            <GridItem className="demo-item">item</GridItem>
            <GridItem className="demo-item" offset={1}>item | offset - 1</GridItem>
            <GridItem className="demo-item">item</GridItem>
            <GridItem className="demo-item" span={3}>item | span - 3</GridItem>
            <GridItem className="demo-item">item</GridItem>
            <GridItem className="demo-item">item</GridItem>
            <GridItem className="demo-item" suffix>{
              ({ overflow }) => `suffix | overflow: ${!!overflow}`
            }</GridItem>
        </Grid>
    </div>
  );
};

export default App;
```

```css
.grid-demo-grid .demo-item,
.grid-demo-grid .demo-suffix {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}

.grid-demo-grid .demo-item:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}

.grid-demo-grid .demo-item:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
```
