---
order: 1
title:
  zh-CN: 受控模式
  en-US: Controlled mode
---

## zh-CN

颜色选择器面板会在打开时同步输入框中的值。

## en-US

The color picker panel synchronizes the values in the input boxes when opened.

```js
import { Button, ColorPicker } from '@arco-design/web-react';
import { useState } from 'react';

const App = () => {
  const [value, setValue] = useState('#165DFF');

  return (
    <div>
      <div>
        <Button onClick={() => setValue('#165DFF')}>#165DFF</Button>
        <Button onClick={() => setValue('#165DFF88')}>#165DFF88</Button>
      </div>
      <div style={{ marginTop: 10 }}/>
      <ColorPicker value={value} onChange={(value)=>setValue(value)} showText />
    </div>
  );
};

export default App;
```
