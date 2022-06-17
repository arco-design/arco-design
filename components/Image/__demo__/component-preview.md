---
order: 8
title:
  zh-CN: 单独使用预览组件
  en-US: Use Preview alone
---

## zh-CN

`Image.Preview` 可单独使用，需要配置 `src`，并控制 `visible`。

## en-US

`Image.Preview` can be used alone, you need to set `src` and control `visible`.

```js
import React from 'react';
import { Image, Button } from '@arco-design/web-react';

function App() {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Click me to preview image
      </Button>
      <Image.Preview
        src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
        visible={visible}
        onVisibleChange={setVisible}
      />
    </div>
  );
}

export default App;
```
