---
order: 2
title:
  zh-CN: 自定义节点
  en-US: Custom node
---

## zh-CN

可以通过 `title` 属性和 `footer` 属性定制节点内容。当设置为 `null` 时，将不会渲染对应的dom节点。

## en-US

The content can be customized through `title` and `footer`. When set to `null`, the corresponding dom node won't be rendered.

```js
import { useState } from 'react';
import { Drawer, Button, Checkbox } from '@arco-design/web-react';

function App() {
  const [visible, setVisible] = useState(false);
  const [hasHeader, setHeader] = useState(true);
  const [hasFooter, setFooter] = useState(true);
  const [hasClose, setClose] = useState(true);
  return (
    <div>
      <Checkbox
        onChange={(value) => {
          setHeader(!value);
        }}
        style={{ marginRight: 20 }}
      >
        Hide title
      </Checkbox>
      <Checkbox
        onChange={(value) => {
          setFooter(!value);
        }}
        style={{ marginRight: 20 }}
      >
        Hide footer
      </Checkbox>
      <Checkbox
        onChange={(value) => {
          setClose(!value);
        }}
      >
        Hide close icon
      </Checkbox>
      <br />
      <Button
        onClick={() => {
          setVisible(true);
        }}
        type="primary"
        style={{ marginTop: 20 }}
      >
        Open Drawer
      </Button>
      <Drawer
        width={320}
        title={hasHeader ? 'Basic Information' : null}
        footer={hasFooter ? <span>footer</span> : null}
        closable={hasClose}
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
