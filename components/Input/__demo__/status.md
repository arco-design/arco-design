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

const App = () => {
  return (
    <Space wrap>
      <Input style={{ width: 350 }} status="error" placeholder="error status" />
      <Input style={{ width: 350 }} status="warning" placeholder="warning status" />
      <Input style={{ width: 350 }} disabled placeholder="disabled input" />
    </Space>
  );
};

export default App;
```
