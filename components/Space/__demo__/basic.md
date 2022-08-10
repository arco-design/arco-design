---
order: 0
title: 
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

间距组件的基本用法。

## en-US

Basic usage of spacing components.

```js
import { Space, Button, Switch, Typography, Tag } from '@arco-design/web-react';

const App = () => {
  return (
    <Space>
      <Typography.Text>Space:</Typography.Text>
      <Tag color="arcoblue">Tag</Tag>
      <Button type="primary">Item1</Button>
      <Button type="primary">Item2</Button>
      <Switch defaultChecked />
    </Space>
  );
};

export default App;
```
