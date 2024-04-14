---
order: 5
title:
  zh-CN: 纵向卡片
  en-US: Vertical card
---

## zh-CN

当使用纵向卡片卡片时，需要手动指定容器的宽高来撑起空间，容器高度可以指定为 `图片高度 * 1.5`。
在此模式下需要同时设定 `indicatorPosition="outer-right"`。

## en-US

When using vertical card cards, you need to manually specify the width and height of the container to support the space.The container height can be specified as `image height * 1.5`.
In this mode, `indicatorPosition="outer-right"` needs to be set at the same time.

```js
import { Carousel } from '@arco-design/web-react';

const imageSrc = [
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp',
];

function App() {
  return (
    <Carousel
      autoPlay
      animation="card"
      showArrow="never"
      indicatorPosition="outer-right"
      indicatorType="line"
      direction="vertical"
      style={{ height: 300, width: 600 }}
    >
      {imageSrc.map((src, index) => (
        <div
          key={index}
          style={{ height: 200 }}
        >
          <img
            src={src}
            style={{ height: '100%' }}
          />
        </div>
      ))}
    </Carousel>
  );
}

export default App;
```
