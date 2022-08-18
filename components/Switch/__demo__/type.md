---
order: 1
title:
  zh-CN: 不同类型
  en-US: Type
---

## zh-CN

有三种类型的开关可供选择。

## en-US

There are three types of switches to choose from.

```js
import { Switch, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space size="large">
      <Switch />
      <Switch type="round" />
      <Switch type="line" />
    </Space>
  );
};

export default App;
```
