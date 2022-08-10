---
order: 0
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

两栏布局的多选穿梭框组件，将元素从一栏即时移到另一栏。

## en-US

A two-column multi-select component that moves elements from one column to another in real time.

```js
import { Transfer } from '@arco-design/web-react';

function App() {
  const dataSource = new Array(8).fill(null).map((_, index) => ({
    key: `${index + 1}`,
    value: `Option ${index + 1}`,
  }));
  return (
    <Transfer
      dataSource={dataSource}
      defaultTargetKeys={['1', '2', '3']}
      defaultSelectedKeys={['4', '6', '7']}
      titleTexts={['To-do list', 'Selected list']}
    />
  );
}

export default App;
```
