---
order: 7
title:
  zh-CN: 动画效果
  en-US: Animated
---

## zh-CN

`count` 改变时候存在动画效果。

## en-US

The count will be animated as it changes.


```tsx
import React from 'react';
import { Badge, Avatar, Button, Switch, Space } from '@arco-design/web-react';
import { IconPlus, IconMinus } from '@arco-design/web-react/icon';

function App() {
  const [count, setCount] = React.useState<number>(12);
  const [dot, setDot] = React.useState<boolean>(true);

  return (
    <Space direction="vertical" size="large">
      <Space size="large">
        <Badge dot={dot} count={dot ? count : 0}>
          <Avatar shape="square"> </Avatar>
        </Badge>
        <Switch checked={dot} onChange={setDot}></Switch>
      </Space>
      <Space size="large">
        <Badge count={count}>
          <Avatar shape="square"> </Avatar>
        </Badge>
        <Button.Group>
          <Button icon={<IconPlus />} onClick={() => setCount((c) => c + 1)}></Button>
          <Button icon={<IconMinus />} onClick={() => setCount((c) => Math.max(c - 1, 0))}></Button>
        </Button.Group>
      </Space>
    </Space>
  );
}

export default App;
```
