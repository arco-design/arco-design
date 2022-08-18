---
order: 2
title:
  zh-CN: 尺寸
  en-US: Size
---

## zh-CN

有四种尺寸可供选择。

## en-US

There are four sizes.

```js
import { useState } from 'react';
import { TimePicker, Radio } from '@arco-design/web-react';
const RadioGroup = Radio.Group;

function App() {
  const [size, setSize] = useState('default');
  return (
    <div>
      <RadioGroup
        value={size}
        options={['large', 'default', 'small', 'mini']}
        onChange={(value) => setSize(value)}
        type="button"
        style={{ marginBottom: 24, }}
      />
      <br />
      <TimePicker
        style={{ width: 194, }}
        size={size}
        placeholder="请选择时间"
      />
    </div>
  );
}

export default App;
```

