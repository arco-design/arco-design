---
order: 1
title:
  zh-CN: 自定义位置
  en-US: Customize popup position
---

## zh-CN

自定义位置，点击触发按钮抽屉从相应的位置滑出。

## en-US

Use `placement` to customize the position where the drawer will slide out from.

```js
import { useState } from 'react';
import { Drawer, Trigger, Skeleton, Button, Radio } from '@arco-design/web-react';
import { IconExclamationCircleFill } from '@arco-design/web-react/icon';
const RadioGroup = Radio.Group;

function App() {
  const [visible, setVisible] = useState();
  const [placement, setPlacement] = useState('right');
  return (
    <div>
      <RadioGroup name="placement" defaultValue={placement} onChange={setPlacement}>
        <Radio value="top">Top</Radio>
        <Radio value="bottom">Bottom</Radio>
        <Radio value="left">Left</Radio>
        <Radio value="right">Right</Radio>
      </RadioGroup>
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
        width={332}
        height={332}
        title={<span>Basic Information </span>}
        visible={visible}
        placement={placement}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <div>Here is an example text. </div>
        <div>Here is an example text.</div>
      </Drawer>
    </div>
  );
}

export default App;
```
