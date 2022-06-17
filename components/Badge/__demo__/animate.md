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


```js
import React from 'react';
import { Badge, Avatar, Grid, Button, Switch } from '@arco-design/web-react';
import { IconUser, IconPlus, IconMinus } from '@arco-design/web-react/icon';

function App() {
  const [count, setCount] = React.useState(12);
  const [dot, setDot] = React.useState(true);
  return (
    <div>
      <Grid.Row
        align="center"
        style={{ marginBottom: 20 }}
      >
        <Badge
          dot={dot}
          count={dot ? count : 0}
          style={{ marginRight: 50 }}
        >
          <Avatar shape="square"> </Avatar>
        </Badge>
        <Switch checked={dot} onChange={setDot}></Switch>
      </Grid.Row>
      <Grid.Row align="center">
        <Badge
          count={count}
          style={{ marginRight: 50 }}
        >
          <Avatar shape="square"> </Avatar>
        </Badge>
        <Button.Group>
          <Button icon={<IconPlus />} onClick={() => setCount((c) => c + 1)}></Button>
          <Button icon={<IconMinus />} onClick={() => setCount((c) => Math.max(c - 1, 0))}></Button>
        </Button.Group>
      </Grid.Row>
    </div>
  );
}

export default App;
```
