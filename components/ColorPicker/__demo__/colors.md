---
order: 5
title:
  zh-CN: 预设颜色和历史颜色
  en-US: Preset & History
---

## zh-CN

可以通过 `showPreset` 和 `showHistory` 开启预设颜色和历史颜色区域。历史颜色需要用户自行控制展示内容。

## en-US

The preset color and history color areas can be opened through `showPreset` and `showHistory`. Historical colors require users to control the display content themselves.

```js
import { useState } from 'react';
import { ColorPicker } from '@arco-design/web-react';

const App = () => {
  const [color, setColor] = useState('#165DFF')
  const [history, setHistory] = useState([]);

  const addHistory = (visible) => {
    if (!visible) {
      const newHistory = [...history.slice(-10), color];
      setHistory(newHistory)
    }
  }

  return (
    <div>
      <div>Preset: </div>
      <ColorPicker defaultValue={'#165DFF'} showPreset showText />
      <div style={{ marginTop: 10 }} />
      <div>History & Preset: </div>
      <ColorPicker value={color} historyColors={history} showPreset showHistory showText onChange={setColor}
                   onVisibleChange={addHistory} />
    </div>
  );
};

export default App;
```
