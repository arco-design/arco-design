---
order: 3
title:
  zh-CN: 不同尺寸的开关
  en-US: Size
---

## zh-CN

通过指定 `size` 可以得到不同尺寸的开关。

## en-US

You can get switches of different sizes by specifying `size`.

```js
import { Switch, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space size="large">
      <Switch />
      <Switch size="small" />
      <Switch type="round" />
      <Switch size="small" type="round" />
      <Switch type="line" />
      <Switch size="small" type="line" />
    </Space>
  );
};

export default App;
```
