---
order: 2
title:
  zh-CN: 单向模式
  en-US: One Way
---

## zh-CN

指定 `oneWay` 使用单向模式的穿梭框。

## en-US

Specify `oneWay` to only allow one-way movement

```js
import { Transfer } from '@arco-design/web-react';

function App() {
  const dataSource = new Array(8).fill(null).map((_, index) => ({
    key: `${index + 1}`,
    value: `Option ${index + 1}`,
  }));
  return (
    <Transfer
      oneWay
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
