---
order: 2
title:
  zh-CN: 位置
  en-US: Position
---

## zh-CN

气泡确认框支持 12 个不同的方位。分别为：`上左`、 `上`、 `上右`、`下左`、 `下`、 `下右`、 `左上`、 `左`、 `左下`、 `右上`、 `右`、 `右下`。

## en-US

The Popconfirm supports 12 different directions. They are: `top left`, `top`, `top right`, `bottom left`, `bottom`, `bottom right`, `left top`, `left`, `left bottom`, `right top`, `right` , `bottom right`.

```js
import { Popconfirm, Button, Message } from '@arco-design/web-react';
const props = {
  title: 'Are you sure you want to delete? ',
  onOk: () => {
    Message.info({
      content: 'ok',
    });
  },
  onCancel: () => {
    Message.error({
      content: 'cancel',
    });
  },
};

const App = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: 400,
        height: 300,
      }}
    >
      <Popconfirm focusLock position="tl" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 20,
            left: 70,
          }}
        >
          TL
        </Button>
      </Popconfirm>
      <Popconfirm position="top" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 20,
            left: 180,
          }}
        >
          Top
        </Button>
      </Popconfirm>
      <Popconfirm position="tr" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 20,
            left: 290,
          }}
        >
          TR
        </Button>
      </Popconfirm>
      <Popconfirm position="lt" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 60,
            left: 10,
          }}
        >
          LT
        </Button>
      </Popconfirm>
      <Popconfirm position="left" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 120,
            left: 10,
          }}
        >
          Left
        </Button>
      </Popconfirm>
      <Popconfirm position="lb" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 180,
            left: 10,
          }}
        >
          LB
        </Button>
      </Popconfirm>
      <Popconfirm position="rt" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 60,
            left: 350,
          }}
        >
          RT
        </Button>
      </Popconfirm>
      <Popconfirm position="right" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 120,
            left: 350,
          }}
        >
          Right
        </Button>
      </Popconfirm>
      <Popconfirm position="rb" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 180,
            left: 350,
          }}
        >
          RB
        </Button>
      </Popconfirm>
      <Popconfirm position="bl" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 226,
            left: 70,
          }}
        >
          BL
        </Button>
      </Popconfirm>
      <Popconfirm position="bottom" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 226,
            left: 180,
          }}
        >
          Bottom
        </Button>
      </Popconfirm>
      <Popconfirm position="br" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 226,
            left: 290,
          }}
        >
          BR
        </Button>
      </Popconfirm>
    </div>
  );
};

export default App;
```
