---
order: 3
title:
  zh-CN: 只读
  en-US: Read Only
---

## zh-CN

通过 `readonly` 指定 `Rate` 为只读。

## en-US

Specify `Rate` as read-only via `readonly`.

```js
import { Rate } from '@arco-design/web-react';

const App = () => {
  return <Rate readonly defaultValue={3.5} allowHalf />;
};

export default App;
```
