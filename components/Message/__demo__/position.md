---
order: 4
title:
  zh-CN: 全局提示的位置
  en-US: Position
---

## zh-CN

全局提示有 2 种不同的弹出位置，分别为顶部和底部。

## en-US

Message has 2 different positions.

```js
import { Message, Button, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space size="large">
      <Button
        onClick={() =>
          Message.info({
            content: 'This is a message!',
            showIcon: true,
            position: 'top',
          })
        }
        type="primary"
      >
        Top
      </Button>
      <Button
        onClick={() =>
          Message.info({
            content: 'This is a message!',
            showIcon: true,
            position: 'bottom',
          })
        }
        type="primary"
      >
        Bottom
      </Button>
    </Space>
  );
};

export default App;
```
