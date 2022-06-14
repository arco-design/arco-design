---
order: 6
title:
  zh-CN: 任意长度的评分
  en-US: Customize Count
---

## zh-CN

通过指定 `count` 来打造任意长度的评分组件。

## en-US

Create a score component of any total count by specifying `count`.

```js
import { Rate } from '@arco-design/web-react';

const App = () => {
  return <Rate count={10} allowHalf />;
};

export default App;
```
