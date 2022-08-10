---
order: 10
title:
  zh-CN: 范围刻度可拖拽
  en-US: Range scale dragging
---

## zh-CN

通过设置 `range.draggableBar` 为 `true`, 让范围刻度可以拖拽。

## en-US

By setting `range.draggableBar` to `true`, the range scale can be dragged.

```js
import { Slider } from '@arco-design/web-react';

function App() {
  return (
    <Slider
      style={{ width: 200 }}
      max={10}
      range={{
        draggableBar: true,
      }}
      defaultValue={[3, 6]}
    />
  );
}

export default App;
```
