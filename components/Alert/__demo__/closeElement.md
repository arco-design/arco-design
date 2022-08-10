---
order: 3
title:
  zh-CN: 自定义关闭元素
  en-US: Custom close element
---

## zh-CN

指定 `closeElement`，自定义关闭元素。`closeElement` 可以接收 `onClick`，并且自带 `close` 参数，调用 `close()` 可以关闭。

## en-US

Use `closeElement` to customize the close element. `closeElement` can receive `onClick`, has its own `close` parameter, and can be closed by calling `close()`.

```js
import { Alert, Grid } from '@arco-design/web-react';
import { IconCheck } from '@arco-design/web-react/icon';
const { Row, Col } = Grid;

const App = () => {
  return (
    <Row gutter={40}>
      <Col span={12}>
        <Alert
          closable
          style={{ marginBottom: 20 }}
          type="success"
          content="Here is a success text"
          closeElement={<IconCheck />}
        />
      </Col>
      <Col span={12}>
        <Alert
          closable
          style={{ marginBottom: 20 }}
          type="success"
          content="Here is a success text"
          closeElement="Close"
        />
      </Col>
    </Row>
  );
};

export default App;
```
