---
order: 0
title: 
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

按钮分为 主要按钮、次要按钮、虚线按钮、线形按钮和文本按钮五种。

## en-US

There are `primary`, `secondary`, `dashed`, `outline` and `text` button types.

```js
import { Button, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space size="large">
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="outline">Outline</Button>
      <Button type="text">Text</Button>
    </Space>
  );
};

export default App;
```
