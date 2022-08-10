---
order: 7
title:
  zh-CN: 其他属性的响应式
  en-US: Advanced responsive layout
---

## zh-CN

`span`, `offset`, `order`, `pull`, `push` 属性可以内嵌到 `xs`, `sm`, `md`, `lg`, `xl`, `xxl` 对象中使用。
比如 `xs={8}` 相当于 `xs={{ span: 8 }}`。

## en-US

The `span`, `offset`, `order`, , `pull`, `push` properties can be used in `xs`, `sm`, `md`, `lg`, `xl`, `xxl` objects.
For example, `xs={8}` is equivalent to `xs={{ span: 8 }}`.

```js
import { Grid } from '@arco-design/web-react';
const Row = Grid.Row;
const Col = Grid.Col;

const App = () => {
  return (
    <div style={{ width: '100%' }}>
      <Row className="grid-demo">
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          Col
        </Col>
        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          Col
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          Col
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
