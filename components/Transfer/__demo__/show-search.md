---
order: 1
title:
  zh-CN: 带搜索框
  en-US: With Search Box
---

## zh-CN

指定 `showSearch` 来使用带搜索框的穿梭框，可以自定义搜索函数。

## en-US

Specify `showSearch` to use the Transfer with search box.

```js
import { Transfer } from '@arco-design/web-react';

function App() {
  const dataSource = new Array(8).fill(null).map((_, index) => ({
    key: `${index + 1}`,
    value: `Option ${index + 1}`,
  }));
  return (
    <Transfer
      showSearch
      dataSource={dataSource}
      searchPlaceholder="Please select"
      defaultTargetKeys={['1', '2', '3']}
      defaultSelectedKeys={['4', '6', '7']}
      titleTexts={['To-do list', 'Selected list']}
    />
  );
}

export default App;
```
