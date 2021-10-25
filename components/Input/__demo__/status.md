---
order: 1
title:
  zh-CN: 输入框状态
  en-US: Status
---

## zh-CN

不同的输入框状态

## en-US

Different Input status.

```js
import { Input, Space } from '@arco-design/web-react';

ReactDOM.render(
  <Space wrap>
    <Input
      style={{ width: 350 }}
      error
      placeholder="error status"
    />
    <Input style={{ width: 350 }} disabled placeholder="disabled input" />
  </Space>,
  CONTAINER
);
```
