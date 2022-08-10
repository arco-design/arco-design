---
order: 2
title:
  zh-CN: 禁用状态
  en-US: Disabled
---

## zh-CN

通过 `disabled` 设置 `Switch` 为禁用状态。

## en-US

Set `Switch` to be disabled by `disabled`.

```js
import { Switch, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space size="large">
      <Switch disabled />
      <Switch checked disabled />
      <Switch type="round" disabled />
      <Switch type="round" checked disabled />
      <Switch type="line" disabled />
      <Switch type="line" checked disabled />
    </Space>
  );
};

export default App;
```
