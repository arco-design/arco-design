---
order: 4
title:
  zh-CN: 水平布局
  en-US: Horizontal layout
---

## zh-CN

通过 `justify` 来进行水平布局。

## en-US

Use `justify` to customize horizontal layout.

```js
import { Grid, Typography } from '@arco-design/web-react';
const Row = Grid.Row;
const Col = Grid.Col;
const rowStyle = {
  marginBottom: 40,
  background: 'var(--color-fill-2)',
};
const titleStyle = {
  fontSize: 12,
  color: '#141f33',
};

const App = () => {
  return (
    <div style={{ width: '100%' }}>
      <p style={titleStyle}>
        <Typography.Text>容器左排列</Typography.Text>
      </p>
      <Row className="grid-demo" justify="start" style={rowStyle}>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
      </Row>
      <p style={titleStyle}>
        <Typography.Text>容器居中排列</Typography.Text>
      </p>
      <Row className="grid-demo" justify="center" style={rowStyle}>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
      </Row>
      <p style={titleStyle}>
        <Typography.Text>容器右排列</Typography.Text>
      </p>
      <Row className="grid-demo" justify="end" style={rowStyle}>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
      </Row>
      <p style={titleStyle}>
        <Typography.Text>容器分散排列</Typography.Text>
      </p>
      <Row className="grid-demo" justify="space-around" style={rowStyle}>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
      </Row>
      <p style={titleStyle}>
        <Typography.Text>容器等距排列</Typography.Text>
      </p>
      <Row className="grid-demo" justify="space-between" style={rowStyle}>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
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
