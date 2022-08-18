---
order: 7
title:
  zh-CN: 显示关闭按钮
  en-US: Closable
---

## zh-CN

设置 `closable` 来显示关闭按钮。

## en-US

Set `closable` to show the close button.

```js
import { Message, Button } from '@arco-design/web-react';

const App = () => {
  return (
    <Button
      onClick={() => {
        Message.info({
          content: 'This is a message!',
          closable: true,
          duration: 10000,
        });
      }}
      type="primary"
    >
      Open Message
    </Button>
  );
};

export default App;
```
