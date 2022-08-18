---
order: 11
title:
  zh-CN: 设置范围
  en-US: Optional Range
---

## zh-CN

通过 `min` 和 `max` 设置可选范围。

## en-US

Set the optional range with `min` and `max`.

```js
import { useState } from 'react';
import { Slider, InputNumber, Space } from '@arco-design/web-react';

function App() {
  const [value, setValue] = useState(30);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  return (
    <Space size={16}>
      <InputNumber
        value={min}
        onChange={(val) => setMin(val)}
        style={{ width: 78 }}
      />
      <Slider
        value={value}
        min={min}
        max={max}
        onChange={(val) => setValue(val)}
        style={{ width: 200 }}
      />
      <InputNumber
        value={max}
        onChange={(val) => setMax(val)}
        style={{ width: 78 }}
      />
    </Space>
  );
}

export default App;
```
