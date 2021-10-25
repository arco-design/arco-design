---
order: 0
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

最简单的例子。

## en-US

The simplest usage.

```js
import { Message, Button } from '@arco-design/web-react';

ReactDOM.render(
  <Button
    onClick={() => {
      Message.info('This is an info message!');
    }}
    type="primary"
  >
    Open Message
  </Button>,
  CONTAINER
);
```
