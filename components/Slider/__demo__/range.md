---
order: 3
title:
  zh-CN: 范围选择
  en-US: Range
---

## zh-CN

设置 `range = true` 即可开启范围选择，此时 `value` 为数组。

## en-US

Set `range = true` to enable range selection, at this time `value` is an array.

```js
import { useState } from 'react';
import { Slider } from '@arco-design/web-react';

function App() {
  const [value, setValue] = useState([0, 50]);
  return (
    <div style={{ width: 200 }}>
      <Slider range value={value} onChange={setValue} />
    </div>
  );
}

export default App;
```
