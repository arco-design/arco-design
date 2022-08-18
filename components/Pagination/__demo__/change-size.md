---
order: 2
title:
  zh-CN: 改变每页展示条目
  en-US: Change pageSize
---

## zh-CN

可定义每页展示条目数量。

## en-US

The pageSize of Pagination can be changed.

```js
import { Pagination } from '@arco-design/web-react';

const App = () => {
  return <Pagination total={200} sizeCanChange />;
};

export default App;
```

