---
order: 7
title:
  zh-CN: 操作项
  en-US: Action
---

## zh-CN

通过 `action` 可以自定义右上角操作项。

## en-US

Customize the action items through `action`.

```js
import { Alert, Button, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <Alert
        content="Here is an example text"
        action={
          <Button size="mini" type="primary">
            Detail
          </Button>
        }
        closable
      />
      <Alert
        title="Example"
        content="Here is an example text"
        action={
          <Button size="mini" type="primary">
            Detail
          </Button>
        }
        closable
        style={{ marginTop: 10 }}
      />
      <Alert
        title="Example"
        content="Here is an example text"
        action={
          <Space direction="vertical">
            <Button size="mini" type="primary">
              Detail
            </Button>
            <Button size="mini" type="primary" status="danger">
              Close
            </Button>
          </Space>
        }
        style={{ marginTop: 10 }}
      />
    </div>
  );
};

export default App;
```
