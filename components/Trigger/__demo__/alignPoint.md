---
order: 4
title:
  zh-CN: 跟随鼠标显示弹出层
  en-US: algin mouse position
---

## zh-CN

设置 `alignPoint` 属性，可以使弹出层出现在鼠标位置。你可能想要`trigger=click`时候，在范围内点击时，弹出层一直展示，并根据鼠标位置更新弹出层位置，可以查看下一个示例。

## en-US

The popup will align mouse position. If you want to keep the pop-up layer displayed when you click in an area, and update the position of the pop-up layer align the mouse position, see the next [example](/react/en-US/components/trigger#update-position).

```js
import React from 'react';
import { Trigger, Button, Select, Grid, Skeleton, Typography } from '@arco-design/web-react';

function Popup() {
  return (
    <div
      className="demo-trigger-popup"
      style={{
        width: 300,
      }}
    >
      <Skeleton />
    </div>
  );
}

function App() {
  const [trigger, setTrigger] = React.useState(['click']);
  return (
    <div>
      <Grid.Row align="center" style={{ marginBottom: 20 }}>
        <Typography.Text>Trigger</Typography.Text>
        <Select
          value={trigger}
          style={{ width: 300, margin: '0 20px' }}
          options={['click', 'hover', 'contextMenu']}
          onChange={setTrigger}
          mode="multiple"
        ></Select>
      </Grid.Row>
      <Trigger
        popup={() => <Popup />}
        alignPoint
        position="bl"
        popupAlign={{
          bottom: 8,
          left: 8,
        }}
        trigger={trigger}
      >
        <div className="demo-trigger-manual">
          <Typography.Text>Click</Typography.Text>
        </div>
      </Trigger>
    </div>
  );
}

export default App;
```

```css
.demo-trigger-popup {
  padding: 10px;
  width: 300px;
  text-align: center;
  background-color: var(--color-bg-popup);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

.demo-trigger-manual {
  width: 100%;
  height: 400px;
  background-color: var(--color-fill-2);
  line-height: 400px;
  text-align: center;
  font-size: 20px;
}
```
