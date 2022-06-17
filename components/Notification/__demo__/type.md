---
order: 1
title:
  zh-CN: 不同类型的通知
  en-US: Type
---

## zh-CN

通知提醒框有 5 种不同的类型，分别为：`info`, `success`, `warning`, `error`, `normal`。

## en-US

There are 5 different types of Notification: `info`, `success`, `warning`, `error`, `normal`.

```js
import { Notification, Button, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space size="large">
      <Button
        onClick={() =>
          Notification.info({
            title: 'Normal',
            content: 'This is an error Notification!',
          })
        }
        type="primary"
      >
        Info
      </Button>
      <Button
        onClick={() =>
          Notification.success({
            title: 'Success',
            content: 'This is a success Notification!',
          })
        }
        type="primary"
        status="success"
      >
        Success
      </Button>
      <Button
        onClick={() =>
          Notification.warning({
            title: 'Warning',
            content: 'This is a warning Notification!',
          })
        }
        type="primary"
        status="warning"
      >
        Warning
      </Button>
      <Button
        onClick={() =>
          Notification.error({
            title: 'Error',
            content: 'This is an error Notification!',
          })
        }
        type="primary"
        status="danger"
      >
        Error
      </Button>
      <Button
        onClick={() =>
          Notification.normal({
            title: 'Normal',
            content: 'This is an normal  Notification!',
          })
        }
        type="secondary"
      >
        Normal
      </Button>
    </Space>
  );
};

export default App;
```
