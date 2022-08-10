---
order: 5
title:
  zh-CN: 简洁
  en-US: Simple
---

## zh-CN

在空间有限的场景下，可以将 `simple` 设置为 `true`，使用较为简单的文本分页方式。

## en-US

When page space is limited, you can set `simple` to `true`.

```js
import { Pagination } from '@arco-design/web-react';

const App = () => {
  return <Pagination simple total={50} size="small" />;
};

export default App;
```
