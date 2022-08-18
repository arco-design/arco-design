---
order: 8
title:
  zh-CN: 简单模式
  en-US: Simple Mode
---

## zh-CN

指定 `simple` 来开启简单模式，点击选项即可移动。

## en-US

Specify `simple` to turn on simple mode, click the option to move.

```js
import { Transfer } from '@arco-design/web-react';

function App() {
  const dataSource = new Array(8).fill(null).map((_, index) => ({
    key: `${index + 1}`,
    value: `Option ${index + 1}`,
  }));
  return (
    <Transfer
      simple
      dataSource={dataSource}
      defaultTargetKeys={['1', '2', '3']}
      titleTexts={['To-do list', 'Selected list']}
    />
  );
}

export default App;
```
