---
order: 4
title:
  zh-CN: 自定义操作按钮
  en-US: Custom action buttons
---

## zh-CN

通过指定 `btn` 字段，可以添加操作按钮。

## en-US

You can add operation buttons by specifying the `btn` field.

```js
import { Notification, Button } from '@arco-design/web-react';

function updateNotification() {
  const id = `${Date.now()}`;
  Notification.info({
    id,
    title: 'Notification',
    content: 'This is a notification!',
    duration: 0,
    btn: (
      <span>
        <Button
          type="secondary"
          size="small"
          onClick={() => Notification.remove(id)}
          style={{ margin: '0 12px' }}
        >
          Cancel
        </Button>
        <Button type="primary" size="small" onClick={() => Notification.remove(id)}>
          Ok
        </Button>
      </span>
    ),
  });
}

const App = () => {
  return (
    <Button onClick={updateNotification} type="primary">
      Open Notification
    </Button>
  );
};

export default App;
```
