---
order: 3
title:
  zh-CN: 区块间隔
  en-US: Interval of Grid
---

## zh-CN

通过在 `Row` 上指定 `gutter` 可以增加栅格的区域间隔。

## en-US

By specifying `gutter` on `Row`, the area interval of the grid can be changed.

```js
import { Grid, Divider } from '@arco-design/web-react';
const Row = Grid.Row;
const Col = Grid.Col;

const App = () => {
  return (
    <div style={{ width: '100%' }}>
      <Divider orientation="left">Horizontal</Divider>
      <Row className="grid-gutter-demo" gutter={24}>
        <Col span={12}>
          <div>col - 12</div>
        </Col>
        <Col span={12}>
          <div>col - 12</div>
        </Col>
      </Row>
      <Divider orientation="left">Responsive</Divider>
      <Row className="grid-gutter-demo" gutter={{ md: 8, lg: 24, xl: 32 }}>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
      </Row>
      <Divider orientation="left">Horizontal and Vertical</Divider>
      <Row className="grid-gutter-demo" gutter={[24, 12]}>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
      </Row>
    </div>
  );
};

export default App;
```

```css
.grid-gutter-demo .arco-col {
  height: 48px;
  color: var(--color-white);
}

.grid-gutter-demo .arco-col > div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.grid-gutter-demo .arco-col:nth-child(2n + 1) > div {
  background-color: rgba(var(--arcoblue-6), 0.9);
}

.grid-gutter-demo .arco-col:nth-child(2n) > div {
  background-color: var(--color-primary-light-4);
}
```
