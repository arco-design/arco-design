---
order: 10
title:
  zh-CN: 支持更多内容配置
  en-US: With actions
---

## zh-CN

`actions` 字段接收一个 `ReactNode` 数组，用于展示底部按钮组。

## en-US

The `actions` field receives an array of `ReactNode`, which will be displayed at the bottom as button group.

```js
import { Card, Avatar, Typography, Space } from '@arco-design/web-react';
import { IconThumbUp, IconShareInternal, IconMore } from '@arco-design/web-react/icon';
const { Meta } = Card;

const App = () => {
  return (
    <Card
      className="card-with-icon-hover"
      style={{ width: 360 }}
      cover={
        <div style={{ height: 204, overflow: 'hidden' }}>
          <img
            style={{ width: '100%', transform: 'translateY(-20px)' }}
            alt="dessert"
            src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"
          />
        </div>
      }
      actions={[
        <span className="icon-hover">
          <IconThumbUp />
        </span>,
        <span className="icon-hover">
          <IconShareInternal />
        </span>,
        <span className="icon-hover">
          <IconMore />
        </span>,
      ]}
    >
      <Meta
        avatar={
          <Space>
            <Avatar size={24}>A</Avatar>
            <Typography.Text>Username</Typography.Text>
          </Space>
        }
        title="Card Title"
        description="This is the description"
      />
    </Card>
  );
};

export default App;
```

```css:silent
.card-with-icon-hover .icon-hover {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: all 0.1s;
}

.card-with-icon-hover .icon-hover:hover {
  background-color: rgb(var(--gray-2));
}
```
