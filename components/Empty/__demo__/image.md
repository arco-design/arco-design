---
order: 2
title:
  zh-CN: 自定义图片
  en-US: Customize Image
---

## zh-CN

可以通过 `imgSrc` 参数传入图片 Url。

## en-US

You can pass in the image URL through the `imgSrc` parameter.

```js
import { Empty, Button } from '@arco-design/web-react';

const App = () => {
  return (
    <Empty
      imgSrc="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a0082b7754fbdb2d98a5c18d0b0edd25.png~tplv-uwbnlip3yd-webp.webp"
      description={<Button type="primary">Refresh</Button>}
    />
  );
};

export default App;
```
