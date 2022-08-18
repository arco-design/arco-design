---
order: 1
title: 
  zh-CN: 垂直间距
  en-US: Vertical
---

## zh-CN

可以设置垂直方向排列的间距。

## en-US

You can set the spacing in the vertical direction.

```js
import { Space, Button } from '@arco-design/web-react';

const App = () => {
  return (
    <Space direction="vertical">
      <Button type="primary">Item1</Button>
      <Button type="primary">Item2</Button>
      <Button type="primary">Item3</Button>
    </Space>
  );
};

export default App;
```
