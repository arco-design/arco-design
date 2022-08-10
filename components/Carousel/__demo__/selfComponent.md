---
order: 6
title:
  zh-CN: 自定义子元素
  en-US: Self component
---

## zh-CN

因为动画是通过 CSS 实现，所以当使用`自定义组件`作为`Carousel`的子元素时，自定义组件需要支持`style`和`className`两个属性。

## en-US

Given that the animation is implemented through CSS, if `custom component` is used as a child element of `Carousel`, the custom component needs to support `style` and `className`.

```js
import { Carousel } from '@arco-design/web-react';
const imageSrc = [
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp',
];

function ImgComponent(props) {
  const { src, style, className } = props;
  return (
    <div style={style} className={className}>
      <img
        src={src}
        style={{ width: '100%' }}
      />
    </div>
  );
}

function App() {
  return (
    <div>
      <Carousel style={{ width: 600, height: 240 }}>
        {imageSrc.map((src, index) => (
          <ImgComponent key={index} src={src} />
        ))}
      </Carousel>
    </div>
  );
}

export default App;
```
