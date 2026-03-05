---
order: 1
title:
  zh-CN: 不同类型
  en-US: Types
---

## zh-CN

日志组件支持 `default`、`info`、`success`、`warning`、`error` 五种类型。

## en-US

Log component supports five types: `default`, `info`, `success`, `warning`, and `error`.

```js
import { Log, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Log content="Default log message" type="default" />
      <Log content="Info log message" type="info" />
      <Log content="Success log message" type="success" />
      <Log content="Warning log message" type="warning" />
      <Log content="Error log message" type="error" />
    </Space>
  );
};

export default App;
```
