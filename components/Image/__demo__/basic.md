---
order: 0
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

需要查看图片的时候，简单的设置 `src` 属性，就能获得一个有预览图片功能的组件。

## en-US

When you need to view a picture, simply set the `src` property to get a component with picture preview function.

```js
import { Image } from '@arco-design/web-react';

function App() {
  return (
    <Image
      width={200}
      src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
      alt="lamp"
    />
  );
}

export default App;
```
