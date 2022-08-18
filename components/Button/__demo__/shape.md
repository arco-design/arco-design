---
order: 2
title: 
  zh-CN: 按钮形状
  en-US: Shape
---

## zh-CN

Button 有多种形状，`square` - 长方形 **(默认)**, `circle` - 圆形, `round` - 全圆角。

## en-US

Button has many shapes, `square`-rectangle **(default)**, `circle`-round, `round`-full rounded corners.

```js
import { Button, Space } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';

const App = () => {
  return (
    <Space size="large">
      <Button type="primary" icon={<IconPlus />} />
      <Button shape="circle" type="primary" icon={<IconPlus />} />
      <Button shape="round" type="primary">
        Primary
      </Button>
      <Button type="primary">Primary</Button>
    </Space>
  );
};

export default App;
```
