---
order: 3
title:
  zh-CN: 不显示图标
  en-US: Without Icon
---

## zh-CN

通过设置 `showIcon={false}` 可以隐藏图标。

## en-US

Hide icon by setting `showIcon={false}`.

```js
import { Log, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Log content="Info log without icon" type="info" showIcon={false} />
      <Log content="Success log without icon" type="success" showIcon={false} />
      <Log content="Warning log without icon" type="warning" showIcon={false} />
      <Log content="Error log without icon" type="error" showIcon={false} />
    </Space>
  );
};

export default App;
```
