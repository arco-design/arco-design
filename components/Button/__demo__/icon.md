---
order: 1
title: 
  zh-CN: 图标按钮
  en-US: Icon
---

## zh-CN

Button 可以嵌入图标，在只设置图标而没有 children 时，按钮的高宽相等。

## en-US

Icons can be used in buttons. When `icon` is set and there are no children, the height and width of the button are equal.

```js
import { Button, Space } from '@arco-design/web-react';
import { IconPlus, IconDelete } from '@arco-design/web-react/icon';

const App = () => {
  return (
    <Space size="large">
      <Button type="primary" icon={<IconPlus />} />
      <Button type="primary" icon={<IconDelete />}>
        Delete
      </Button>
    </Space>
  );
};

export default App;
```
