---
order: 1
title:
  zh-CN: 栅格偏移
  en-US: Offset of Col
---

## zh-CN

指定 `offset` 可以对栅格进行平移操作。

## en-US

Specify `offset` to justify the padding of Col.

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
        <Col span={8}>col - 8</Col>
        <Col span={8} offset={8}>
          col - 8 | offset - 8
        </Col>
      </Row>
      <Row
        className="grid-demo"
        style={{ marginBottom: 16, backgroundColor: 'var(--color-fill-2)' }}
      >
        <Col span={6} offset={8}>
          col - 6 | offset - 8
        </Col>
        <Col span={6} offset={4}>
          col - 6 | offset - 4
        </Col>
      </Row>
      <Row className="grid-demo" style={{ backgroundColor: 'var(--color-fill-2)' }}>
        <Col span={12} offset={8}>
          col - 12 | offset - 8
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
