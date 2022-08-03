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
import { Slider, Space } from '@arco-design/web-react';

function App() {
  return (
    <Space size={60}>
      <Slider defaultValue={30} style={{ width: 200 }} />
      <Slider defaultValue={30} disabled={true} style={{ width: 200 }} />
    </Space>
  );
}

export default App;
```
