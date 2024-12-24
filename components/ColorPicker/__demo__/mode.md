---
order: 5
title:
  zh-CN: 渐变色
  en-US: Gradient color
---

## zh-CN

通过 `mode` 设置颜色为单一颜色或渐变色。

## en-US

Set the color mode to single color or gradient color through `mode`.

```js
import { Button, ColorPicker } from '@arco-design/web-react';
import { useState } from 'react';

const App = () => {
  const defaultValue = [
    {
      color: '#165DFFAA',
      percent: 0,
    },
    {
      color: '#00B42AFF',
      percent: 100,
    },
  ]
  const [value, setValue] = useState(defaultValue);
  return (
    <div>
      <ColorPicker value={value} onChange={setValue} mode={['single', 'gradient']} />
      {/** <ColorPicker defaultValue={defaultValue} mode="gradient" /> */}
    </div>
  );
};

export default App;
```
