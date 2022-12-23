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
import { DatePicker, Space } from '@arco-design/web-react';
import { IconInfoCircle } from '@arco-design/web-react/icon';

const App = () => {
  return (
    <Space>
      <DatePicker style={{ width: 200 }} prefix={<IconInfoCircle />}/>
      <DatePicker.RangePicker style={{ width: 350 }} prefix={<IconInfoCircle />}/>
    </Space>
  );
};

export default App;
```
