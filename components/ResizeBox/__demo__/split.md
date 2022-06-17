---
order: 4
title:
  zh-CN: 面板分割
  en-US: Panel Split
---

## zh-CN

将一个面板分割成两个可以调整宽度或高度的两部分。用`direction`控制分割方向。

## en-US

Divide a panel into two parts with adjustable width or height. Use `direction` to control the direction of the split.

```js
import { useState } from 'react';
import { ResizeBox, Tag, Space, Radio } from '@arco-design/web-react';

function App() {
  const [direction, setDirection] = useState('horizontal');
  return (
    <Space direction="vertical" size={20}>
      <Radio.Group
        type="button"
        value={direction}
        onChange={setDirection}
        options={['horizontal', 'vertical', 'horizontal-reverse', 'vertical-reverse']}
      />
      <ResizeBox.Split
        direction={direction}
        style={{
          height: 300,
          width: 300,
          border: '1px solid var(--color-border)',
        }}
        max={0.8}
        min={0.2}
        panes={[
          <Tag key="first" color="arcoblue">
            Fist
          </Tag>,
          <Tag key="second" color="green">
            Second
          </Tag>,
        ]}
      />
    </Space>
  );
}

export default App;
```
