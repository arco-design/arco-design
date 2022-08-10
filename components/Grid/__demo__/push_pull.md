---
order: 2
title:
  zh-CN: 栅格排序
  en-US: Push pull
---

## zh-CN

指定 `push` 或者 `pull` 可以对栅格进行排序。

## en-US

Specify `push` or `pull` to sort the grid.

```js
import { Grid } from '@arco-design/web-react';
const Row = Grid.Row;
const Col = Grid.Col;

const App = () => {
  return (
    <div style={{ width: '100%' }}>
      <Row
        className="grid-demo"
        style={{ marginBottom: 16, backgroundColor: 'var(--color-fill-2)' }}
      >
        <Col span={8} push={16}>
          col - 8 | push - 16
        </Col>
        <Col span={16} pull={8}>
          col - 16 | pull - 8
        </Col>
      </Row>
    </div>
  );
};

export default App;
```

```css:silent
.grid-demo .arco-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}

.grid-demo .arco-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}

.grid-demo .arco-col:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
```
