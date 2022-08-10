---
order: 4
title:
  zh-CN: 分页
  en-US: Pagination
---

## zh-CN

数据量大时，指定 `pagination` 来使用分页。

## en-US

When the amount of data is large, specify `pagination` to display the data in pages.

```js
import { Transfer } from '@arco-design/web-react';

function App() {
  const dataSource = new Array(30).fill(null).map((_, index) => ({
    key: `${index + 1}`,
    value: `Option ${index + 1}`,
  }));
  return (
    <Transfer
      pagination
      dataSource={dataSource}
      defaultTargetKeys={['1', '3', '4']}
      defaultSelectedKeys={['2', '6', '7']}
      titleTexts={['To-do list', 'Selected list']}
    />
  );
}

export default App;
```
