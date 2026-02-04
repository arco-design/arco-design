---
order: 2
title:
  zh-CN: 显示时间戳
  en-US: With Timestamp
---

## zh-CN

通过设置 `showTimestamp` 可以显示时间戳。

## en-US

Show timestamp by setting `showTimestamp`.

```js
import { Log, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Log content="Log with current timestamp" showTimestamp />
      <Log content="Log with custom timestamp" showTimestamp timestamp={new Date('2024-01-01 10:30:00')} type="info" />
      <Log content="Log with timestamp" showTimestamp timestamp="12:34:56" type="success" />
    </Space>
  );
};

export default App;
```
