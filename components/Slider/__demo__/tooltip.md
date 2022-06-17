---
order: 8
title:
  zh-CN: 控制 tooltip 的展示
  en-US: Control Tooltip
---

```js
import { Slider } from '@arco-design/web-react';

function App() {
  return (
    <div>
      <Slider
        defaultValue={20}
        tooltipVisible={true}
        style={{ marginBottom: 80 }}
        onAfterChange={(value) => {
          console.log(value);
        }}
        style={{ width: 200, marginRight: 100 }}
      />
      <Slider
        range
        defaultValue={[0, 50]}
        tooltipVisible={true}
        onAfterChange={(value) => {
          console.log(value);
        }}
        style={{ width: 200 }}
      />
    </div>
  );
}

export default App;
```
