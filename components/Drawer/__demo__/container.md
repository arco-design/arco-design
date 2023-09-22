---
order: 6
title:
  zh-CN: 挂载节点
  en-US: Popup Container
---

## zh-CN

可以通过 `getPopupContainer` 指定抽屉挂载的父级节点。

## en-US

Use `getPopupContainer` to specify the parent node where the drawer should mount to.

```js
import { useState, useRef } from 'react';
import { Drawer, Button } from '@arco-design/web-react';
const wrapperStyle = {
  width: '100%',
  height: 300,
  backgroundColor: 'var(--color-fill-2)',
  position: 'relative',
  overflow: 'hidden',
  lineHeight: '300px',
  textAlign: 'center',
};

function App() {
  const [visible, setVisible] = useState(false);
  const refWrapper = useRef(null);
  return (
    <div ref={refWrapper} style={wrapperStyle}>
      <Button type="primary" onClick={() => setVisible(true)}>
        Open
      </Button>
      <Drawer
        title="Basic"
        visible={visible}
        getPopupContainer={() => refWrapper && refWrapper.current}
        footer={null}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <div style={{ textAlign: 'left' }}>Here is an example text.</div>
      </Drawer>
    </div>
  );
}

export default App;
```
