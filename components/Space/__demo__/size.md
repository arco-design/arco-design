---
order: 2
title:
  zh-CN: 尺寸
  en-US: Size
---

## zh-CN

内置 4 个尺寸，`mini - 4px` `small - 8px (默认)` `medium - 16px` `large - 24px`，也支持传数字来自定义尺寸。

## en-US

Built-in 4 sizes, `mini-4px` `small-8px (default)` `medium-16px` `large-24px`, and also support to pass numbers to customize the size.

```js
import { useState } from 'react';
import { Space, Button, Radio } from '@arco-design/web-react';

function App() {
  const [size, setSize] = useState('small');
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Radio.Group
          options={['mini', 'small', 'medium', 'large']}
          value={size}
          onChange={(value) => setSize(value)}
          type="button"
        />
      </div>
      <Space size={size}>
        <Button type="primary">Item1</Button>
        <Button type="primary">Item2</Button>
        <Button type="primary">Item3</Button>
      </Space>
    </div>
  );
}

export default App;
```
