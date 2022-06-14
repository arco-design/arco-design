---
order: 4
title:
  zh-CN: 多层抽屉
  en-US: Nested drawer
---

## zh-CN

在抽屉内打开新的抽屉。

## en-US

Nested drawer.

```js
import { useState } from 'react';
import { Drawer, Button } from '@arco-design/web-react';

function App() {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
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
        width={500}
        title={<span>First Drawer </span>}
        visible={visible}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Button
          onClick={() => {
            setVisible2(true);
          }}
          type="primary"
          style={{ marginTop: 20 }}
        >
          Open Drawer
        </Button>
      </Drawer>
      <Drawer
        width={332}
        title={<span>Second Drawer </span>}
        visible={visible2}
        onOk={() => {
          setVisible2(false);
        }}
        onCancel={() => {
          setVisible2(false);
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
