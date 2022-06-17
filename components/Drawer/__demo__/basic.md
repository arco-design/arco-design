---
order: 0
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

基础抽屉，点击触发按钮抽屉从右侧滑出，点击遮罩区关闭。

## en-US

Basic usage of Drawer. Click the trigger button to slide out the drawer from the right, click the mask area to close.

```js
import { useState } from 'react';
import { Drawer, Button } from '@arco-design/web-react';

function App() {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          setVisible(true);
        }}
        type="primary"
      >
        Open Drawer
      </Button>
      <Drawer
        width={332}
        title={<span>Basic Information </span>}
        visible={visible}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <div>Here is an example text.</div>

        <div>Here is an example text.</div>
      </Drawer>
    </div>
  );
}

export default App;
```
