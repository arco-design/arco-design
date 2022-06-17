---
order: 1
title:
  zh-CN: 大小和形状
  en-US: Size
---

## zh-CN

通过设置 `size` 字段，可以调节头像的大小，默认大小为 `40px`。设置 `shape` 字段，可以设置头像是圆形 (circle) 还是正方形 (square)。

## en-US

Use `size` to set the size of the avatar, which defaults to `40px`. Two `shape`s are available for the avatar: `circle` and `square`.

```js
import { Avatar, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space size="large" direction="vertical">
      <Space size="large">
        <Avatar size={64}>Arco</Avatar>
        <Avatar size={40}>Arco</Avatar>
        <Avatar size={32}>Arco</Avatar>
        <Avatar size={24}>Arco</Avatar>
      </Space>
      <Space size="large">
        <Avatar size={64} shape="square">
          Arco
        </Avatar>
        <Avatar size={40} shape="square">
          Arco
        </Avatar>
        <Avatar size={32} shape="square">
          Arco
        </Avatar>
        <Avatar size={24} shape="square">
          Arco
        </Avatar>
      </Space>
    </Space>
  );
};

export default App;
```
