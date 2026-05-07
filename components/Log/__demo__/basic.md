---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

日志组件的基本用法。

## en-US

Basic usage of Log component.

```js
import { Log, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Log content="This is a default log message" />
      <Log content="This is another log message" type="default" />
    </Space>
  );
};

export default App;
```
