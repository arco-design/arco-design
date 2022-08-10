---
order: 3
title:
  zh-CN: 切换方向
  en-US: Vertical
---

## zh-CN

默认情况下，`direction` 为 `horizontal`。通过设置 `direction` 为 `vertical` 来使用垂直方向切换。

## en-US

The default value for `direction` is `horizontal`. Use the vertical direction switch by setting `direction` to `vertical`.

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
      showArrow="never"
      direction="vertical"
      indicatorPosition="right"
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
