---
order: 4
title:
  zh-CN: 加载状态
  en-US: Loading
---

## zh-CN

默认情况下，加载效果是不显示的，可通过设置 `loader=true` 显示默认加载效果。如果默认加载效果不符合需求。还可以通过 `loaderClassName` 自行设置加载样式。

## en-US

There is no loading effect by default. Default loading effect can be enabled with `loader=true`. If the default loading effect does not meet the requirements, you can also set the loading style through `loaderClassName`.

Loading

```js
import React from 'react';
import { Image, Button, Space } from '@arco-design/web-react';

function App() {
  const [timestamp, setTimestamp] = React.useState('');
  return (
    <div>
      <div>
        <Button
          type="primary"
          onClick={() => {
            setTimestamp(Date.now());
          }}
          style={{ marginBottom: 20 }}
        >
          reload
        </Button>
      </div>
      <Space size={20}>
        <Image
          width={200}
          height={200}
          src={`//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp?timestamp=${timestamp}`}
          loader={true}
          alt="lamp1"
        />
        <Image
          width={200}
          height={200}
          src={`//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp?timestamp=${timestamp}`}
          loaderClassName="image-demo-loader-animate"
          alt="lamp2"
          style={{ marginLeft: 67 }}
        />
      </Space>
    </div>
  );
}

export default App;
```

```css
.image-demo-loader-animate {
  background: linear-gradient(
    -60deg,
    var(--color-fill-2) 25%,
    var(--color-neutral-3) 40%,
    var(--color-fill-3) 55%
  );
  background-size: 400% 100%;
  animation: image-demo-loader-circle 1.5s cubic-bezier(0.34, 0.69, 0.1, 1) infinite;
}

@keyframes image-demo-loader-circle {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}
```
