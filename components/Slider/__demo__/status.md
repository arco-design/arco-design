---
order: 1
title:
  zh-CN: 基础状态
  en-US: State
---

## zh-CN

默认态、禁用态。

## en-US

Default state and disabled state.

```js
import { Slider } from '@arco-design/web-react';

function App() {
  return (
    <div>
      <Slider defaultValue={30} style={{ width: 200 }} />
      <Slider defaultValue={30} disabled={true} style={{ width: 200, marginLeft: 74 }} />
    </div>
  );
}

export default App;
```
