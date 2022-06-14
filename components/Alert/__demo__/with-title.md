---
order: 4
title:
  zh-CN: 含有标题
  en-US: With title
---

## zh-CN

通过设置 `title` 可以给添加标题，将 `content` 变为辅助性介绍文字。

## en-US

`content` is turned into auxiliary introduction text with presence of `title`.

```js
import { Alert, Grid } from '@arco-design/web-react';
const { Row, Col } = Grid;

const App = () => {
  return (
    <div>
      <Row gutter={40}>
        <Col span={12}>
          <Alert
            style={{ marginBottom: 20 }}
            type="info"
            title="Info"
            content="Here is an info text"
          />
          <Alert type="warning" title="Warning" content="Here is a warning text" />
        </Col>
        <Col span={12}>
          <Alert
            style={{ marginBottom: 20 }}
            type="success"
            title="Success"
            content="Here is a success text"
          />
          <Alert type="error" title="Error" content="Here is an error text" />
        </Col>
      </Row>
    </div>
  );
};

export default App;
```
