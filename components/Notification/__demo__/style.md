---
order: 6
title:
  zh-CN: 自定义样式
  en-US: Customize style
---

## zh-CN

可以设置 `style` 和 `className` 来定制样式。

## en-US

You can set `style` and `className` to customize the style.

```js
import { Notification, Button } from '@arco-design/web-react';

const App = () => {
  return (
    <Button
      onClick={() =>
        Notification.info({
          style: { width: 500 },
          title: 'Notification',
          content:
            'This is a notification! This is a notification! This is a notification! This is a notification! ',
        })
      }
      type="primary"
    >
      Open Notification
    </Button>
  );
};

export default App;
```
