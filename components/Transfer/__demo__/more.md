---
order: 3
title:
  zh-CN: 高级用法
  en-US: Advanced
---

## zh-CN

穿梭框高级用法，可配置操作文案，可定制宽高。

## en-US

Advanced usage of shuttle frame, configurable operation copy, and customizable width and height.

```js
import { Transfer } from '@arco-design/web-react';

function App() {
  const dataSource = new Array(10).fill(null).map((_, index) => ({
    key: `${index + 1}`,
    value: `Option ${index + 1}`,
  }));
  return (
    <Transfer
      showFooter
      dataSource={dataSource}
      defaultTargetKeys={['1', '3', '4']}
      defaultSelectedKeys={['2', '6', '7']}
      titleTexts={['To-do list', 'Selected list']}
      operationTexts={['To right', 'To left']}
      listStyle={{
        width: 220,
        height: 316,
      }}
    />
  );
}

export default App;
```
