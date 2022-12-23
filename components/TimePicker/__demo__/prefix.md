---
order: 1
title:
  zh-CN: 带有前缀
  en-US: Prefix
---

## zh-CN

通过 `prefix` 属性设置前缀

## en-US

Set the prefix via the `prefix` property


```js
import { TimePicker, Space } from '@arco-design/web-react';
import { IconInfoCircle } from '@arco-design/web-react/icon';

const App = () => {
  return (
    <Space>
      <TimePicker prefix={<IconInfoCircle/>} style={{ width: 200, }} />
      <TimePicker.RangePicker prefix={<IconInfoCircle/>} style={{ width: 250, }} />
    </Space>
  );
};

export default App;
```
