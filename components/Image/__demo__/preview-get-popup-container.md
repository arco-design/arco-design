---
order: 10
title:
  zh-CN: 挂载节点
  en-US: Popup container
---

## zh-CN

可以通过 `getPopupContainer` 指定预览挂载的父级节点。

## en-US

Use `getPopupContainer` to specify the parent node where the preview should mount to.

```js
import React from 'react';
import { Image } from '@arco-design/web-react';

const wrapperStyle = {
  width: '100%',
  height: 400,
  backgroundColor: 'var(--color-fill-2)',
  position: 'relative',
  overflow: 'hidden',
  lineHeight: '400px',
  textAlign: 'center',
};

function App() {
  const ref = React.useRef();
  return (
    <div style={wrapperStyle} ref={ref}>
      <Image
        width={200}
        previewProps={{
          getPopupContainer: () => ref.current,
          closable: false,
        }}
        src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
        alt="lamp"
      />
    </div>
  );
}

export default App;
```
