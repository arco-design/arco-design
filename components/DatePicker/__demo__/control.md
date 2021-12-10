---
order: 16
title:
  zh-CN: 受控模式
  en-US: Under Control
---

## zh-CN

`value` 和 `onChange` 应该一起使用。

## en-US

`value` and `onChange` should be used together,

```js
import { useState, useEffect } from 'react';
import { DatePicker, Space } from '@arco-design/web-react';

function Demo() {
  const [value, setValue] = useState();
  const [valueRange, setValueRange] = useState();

  useEffect(() => {
    setValue(Date.now());
    setValueRange([Date.now(), Date.now()]);
  }, []);

  return (
    <Space>
      <DatePicker
        showTime
        value={value}
        onChange={(v) => setValue(v)}
        style={{ width: 200 }}
      />
      <DatePicker.RangePicker
        showTime
        value={valueRange}
        onChange={(v) => setValueRange(v)}
        style={{ width: 380 }}
      />
    </Space>
  );
}

ReactDOM.render(<Demo />, CONTAINER);
```
