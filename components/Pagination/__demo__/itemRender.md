---
order: 10
title:
  zh-CN: 上一步和下一步
  en-US: Previous and next
---

## zh-CN

设置 `itemRender`，可以自由定制分页按钮。

## en-US

Set the `itemRender` to customize the pagination buttons.

```js
import { Pagination } from '@arco-design/web-react';

function itemRender(page, type, originElement) {
  if (type === 'prev') {
    return <a style={{ fontSize: 14, margin: '0 8px' }}>Prev</a>;
  }

  if (type === 'next') {
    return <a style={{ fontSize: 14, margin: '0 8px' }}>Next</a>;
  }

  return originElement;
}

const App = () => {
  return <Pagination itemRender={itemRender} total={200} />;
};

export default App;
```
