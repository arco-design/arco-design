---
order: 6
title:
  zh-CN: 加载中
  en-US: Loading
---

## zh-CN

开关处于加载中状态，不可点击。

## en-US

The `Switch` is in the loading state and cannot be clicked.

```js
import { Switch, Divider, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space size="large" direction="vertical">
      <Space size="large">
        <Switch loading defaultChecked />
        <Switch loading />
        <Switch loading type="round" defaultChecked />
        <Switch loading type="round" />
        <Switch loading type="line" defaultChecked />
        <Switch loading type="line" />
      </Space>
      <Space size="large">
        <Switch loading size="small" defaultChecked />
        <Switch loading size="small" />
        <Switch loading size="small" type="round" defaultChecked />
        <Switch loading size="small" type="round" />
        <Switch loading size="small" type="line" defaultChecked />
        <Switch loading size="small" type="line" />
      </Space>
    </Space>
  );
};

export default App;
```
