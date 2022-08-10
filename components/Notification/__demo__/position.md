---
order: 7
title:
  zh-CN: 通知提醒位置
  en-US: Position
---

## zh-CN

通知提醒框有 4 种不同的弹出位置，分别为：`左上角`, `右上角 (默认)`, `左下角`, `右下角`。

## en-US

Notification has 4 different positions, `Top Left`, `Top Right (default)`, `Bottom Left`, `Bottom Right`.

```js
import { Notification, Button, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space size="large">
      <Button
        onClick={() =>
          Notification.success({
            title: 'Title',
            content: 'This is a Notification!',
            showIcon: true,
            position: 'topLeft',
          })
        }
        type="primary"
      >
        Top Left
      </Button>
      <Button
        onClick={() =>
          Notification.success({
            title: 'Title',
            content: 'This is a Notification!',
            showIcon: true,
            position: 'topRight',
          })
        }
        type="primary"
      >
        Top Right
      </Button>
      <Button
        onClick={() =>
          Notification.success({
            title: 'Title',
            content: 'This is a Notification!',
            showIcon: true,
            position: 'bottomLeft',
          })
        }
        type="primary"
      >
        Bottom Left
      </Button>
      <Button
        onClick={() =>
          Notification.success({
            title: 'Title',
            content: 'This is a Notification!',
            showIcon: true,
            position: 'bottomRight',
          })
        }
        type="primary"
      >
        Bottom Right
      </Button>
    </Space>
  );
};

export default App;
```
