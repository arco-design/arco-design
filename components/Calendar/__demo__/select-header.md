---
order: 1
title:
  zh-CN: 下拉选择的头部
  en-US: Dropdown
---

## zh-CN

除了默认的头部切换外，也支持下拉选择的头部，更快速的定位。

## en-US

In addition to the default head switch, it also supports dropdown selection of heads for faster positioning.

```js
import { Calendar } from '@arco-design/web-react';

const App = () => {
  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <Calendar defaultValue="2020-04-01" headerType="select" />
    </div>
  );
};

export default App;
```
