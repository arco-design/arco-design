---
order: 0
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

头像的基础使用。如果头像是文字的话，会自动调节字体大小，来适应头像框。如果图片加载失败会自动获取图片的`alt`属性作为头像。

## en-US

Basic usage. If the avatar content is text, the font size will be automatically adjusted to fit the content in the avatar. If the img fails to load, the `alt` property of the img is automatically taken as the avatar.

```js
import { Avatar, Typography, Space } from '@arco-design/web-react';
import { IconUser } from '@arco-design/web-react/icon';

const { Text } = Typography;

ReactDOM.render(
  <Space size="large">
    <Avatar>A</Avatar>
    <Avatar style={{ backgroundColor: '#3370ff' }}>
      <IconUser />
    </Avatar>
    <Avatar style={{ backgroundColor: '#14a9f8' }}>Arco</Avatar>
    <Avatar style={{ backgroundColor: '#00d0b6' }}>Design</Avatar>
    <Avatar>
      <img alt="avatar" src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" />
    </Avatar>
    <Avatar>
      <img alt="Avatar" src="//p1-arco.byteimg.com/404.webp" />
    </Avatar>
  </Space>,
  CONTAINER
);
```
