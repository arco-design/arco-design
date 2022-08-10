---
order: 3
title:
  zh-CN: 更新延迟
  en-US: Update duration
---

## zh-CN

通过指定参数 `id`，可以更新已经存在的通知提醒框。

## en-US

Specifying `id` to update the existing notification's duration.

```js
import { Notification, Button } from '@arco-design/web-react';

function updateNotification() {
  Notification.warning({
    id: 'need_update_duration',
    title: 'Ready to update',
    content: 'Will update after 2 seconds...',
    duration: 3000,
  });
  setTimeout(() => {
    Notification.success({
      id: 'need_update_duration',
      title: 'Success',
      content: 'Will close after 3 seconds!',
      duration: 3000,
    });
  }, 2000);
}

const App = () => {
  return (
    <Button onClick={updateNotification} type="primary">
      Update Notification
    </Button>
  );
};

export default App;
```
