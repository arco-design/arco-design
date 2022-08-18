---
order: 18
title:
  zh-CN: 自定义触发元素
  en-US: Customize trigger element
---

## zh-CN

自定义触发元素。

## en-US

Customize trigger element.

```js
import { useState } from 'react';
import { DatePicker, Button, Space } from '@arco-design/web-react';

function App() {
  const [value, setValue] = useState();
  const [rangeValue, setRangeValue] = useState();
  return (
    <Space>
      <DatePicker
        triggerElement={<Button>{value || '请选择日期'}</Button>}
        style={{ width: 268 }}
        value={value}
        onChange={(v) => setValue(v)}
      />
      <DatePicker.RangePicker
        triggerElement={
          <Button>{(rangeValue && rangeValue.join(' - ')) || '请选择日期范围'}</Button>
        }
        style={{ width: 268 }}
        value={rangeValue}
        onChange={(v) => setRangeValue(v)}
      />
    </Space>
  );
}

export default App;
```
