---
order: 9
title:
  zh-CN: 自定义提示
  en-US: Customize Tooltip
---

## zh-CN

使用 `formatterTooltip` 可以格式化 Tooltip 的内容。

## en-US

Use `formatterTooltip` to format the content of Tooltip.

```js
import { Slider } from '@arco-design/web-react';

function App() {
  function formatTooltip(val) {
    return <span>{val}%</span>;
  }

  return (
    <div style={{ width: 200 }}>
      <Slider defaultValue={20} formatTooltip={formatTooltip} />
    </div>
  );
}

export default App;
```
