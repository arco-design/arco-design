---
order: 1
title:
  zh-CN: 不同类型
  en-US: Type
---

## zh-CN

全局提示有 5 种不同的类型，分别为：`info`, `success`, `warning`, `error`, `normal`。

## en-US

There are 5 different types of Message, `info`, `success`, `warning`, `error`, `normal`.

```js
import { Message, Button, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space size="large">
      <Button onClick={() => Message.info('This is an info message!')} type="primary">
        Info
      </Button>
      <Button
        onClick={() => Message.success('This is a success message!')}
        type="primary"
        status="success"
      >
        Success
      </Button>
      <Button
        onClick={() => Message.warning('This is a warning message!')}
        type="primary"
        status="warning"
      >
        Warning
      </Button>
      <Button
        onClick={() => Message.error('This is an error message!')}
        type="primary"
        status="danger"
      >
        Error
      </Button>
      <Button type="secondary" onClick={() => Message.normal('This is a message!')}>
        Normal
      </Button>
    </Space>
  );
};

export default App;
```
