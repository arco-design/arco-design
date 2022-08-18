---
order: 2
title:
  zh-CN: 可关闭
  en-US: Closable
---

## zh-CN

指定 `closable = true`，可开启关闭按钮。

## en-US

Use `closable = true` to turn on the close button.

```js
import { Alert, Grid } from '@arco-design/web-react';
const { Row, Col } = Grid;

const App = () => {
  return (
    <div>
      <Row gutter={40}>
        <Col span={12}>
          <Alert
            closable
            style={{ marginBottom: 20 }}
            type="info"
            content="Here is an info text"
          />
          <Alert
            closable
            style={{ marginBottom: 20 }}
            type="warning"
            title="Warning"
            content="Here is a warning text"
          />
        </Col>
        <Col span={12}>
          <Alert
            closable
            style={{ marginBottom: 20 }}
            type="success"
            content="Here is a success text"
          />
          <Alert
            closable
            style={{ marginBottom: 20 }}
            type="error"
            title="Error"
            content="Here is an error text"
          />
        </Col>
      </Row>
    </div>
  );
};

export default App;
```
