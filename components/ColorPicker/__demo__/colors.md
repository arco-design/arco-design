---
order: 5
title:
  zh-CN: 预设颜色和历史颜色
  en-US: Preset & History
---

## zh-CN

颜色选择器定义了四种尺寸（`mini`,`small`, `default`, `large`），分别为 24px，28px，32px，36px。

## en-US

ColorPicker defines four sizes (`mini`, `small`, `default`, `large`), which are 24px, 28px, 32px, and 36px.


```jsx
import { ColorPicker } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <ColorPicker showPreset showHistory />
      <div style={{ marginTop: 10 }}/>
      <ColorPicker showPreset showHistory />
    </div>
  );
};

export default App;
```
