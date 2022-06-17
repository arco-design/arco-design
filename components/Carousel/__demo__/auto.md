---
order: 1
title:
  zh-CN: 自动切换
  en-US: Auto
---

## zh-CN

可以通过 `autoPlay` 设置是否自动切换。
可设置 `moveSpeed`, `timingFunc` 实现不同切换幻灯片效果。

## en-US

Set whether to switch automatically through `autoPlay`.
Set `moveSpeed`, `timingFunc` to achieve different switching slide effects.

```js
import { Carousel } from '@arco-design/web-react';
const imageSrc = [
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp',
];

const App = () => {
  return (
    <Carousel
      style={{ width: 600, height: 240 }}
      autoPlay={true}
      indicatorType="dot"
      showArrow="hover"
    >
      {imageSrc.map((src, index) => (
        <div key={index}>
          <img
            src={src}
            style={{ width: '100%' }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default App;
```
