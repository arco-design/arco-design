---
order: 4
title:
  zh-CN: 卡片化
  en-US: Animation card
---

## zh-CN

当页面宽度方向空间空余，但高度方向空间多余时，可指定 `animation` 为 `card` 使用卡片化风格。

## en-US

When the space in the width direction of the page is vacant, but the space in the height direction is surplus, you can specify `animation` as `card` to use card style.

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
      indicatorPosition="outer"
      style={{ width: '100%', height: 240 }}
    >
      {imageSrc.map((src, index) => (
        <div
          key={index}
          style={{ width: '60%' }}
        >
          <img
            src={src}
            style={{ width: '100%' }}
          />
        </div>
      ))}
    </Carousel>
  );
}

export default App;
```
