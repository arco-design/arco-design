---
order: 11
title:
  zh-CN: 懒加载
  en-US: lazyload
---

## zh-CN

设置 `lazyload` 可以开启懒加载，当图片出现在视口才会进行加载。`lazyload` 属性基于 **[IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)** 实现

## en-US

Set `slazyload` to enable lazy loading, and the image will only be loaded when it appears in the viewport

The `lazyload` attribute is implemented based on **[IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)**

```js
import { Image, Space, Skeleton } from '@arco-design/web-react';
const imageSize = { width: 380, height: 150 };
const srcList = [
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/volcengine-solutions-medical.png~tplv-uwbnlip3yd-png.png',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/volcengine-solutions-automotive.png~tplv-uwbnlip3yd-png.png',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/volcengine-solutions-tourism.png~tplv-uwbnlip3yd-png.png',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/volcengine-solutions-finance.png~tplv-uwbnlip3yd-png.png',
 ];

function App() {
  return (
     <Space direction="vertical" size={50} className="image-demo-wrapper">
       {srcList.map((src, key) => (
        <Image
          key={key}
          {...imageSize}
          src={src}
          alt="lamp"
          lazyload={{ threshold: 0.5 }}
          loader={<Skeleton image={{ style: imageSize }} text={false} animation />}
        />
      ))}
    </Space>
  );
}

export default App;
```

```css
.image-demo-wrapper {
  padding: 100px 20px;
  width: 100%;
  height: 300px;
  box-sizing: border-box;
  background-color: var(--color-fill-1);
  overflow: auto;
  align-items: center;
}

```

