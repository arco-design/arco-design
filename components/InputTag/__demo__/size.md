---
order: 1
title:
  zh-CN: 不同尺寸
  en-US: Different sizes
---

## zh-CN

通过设置 `size` 来指定大小。

## en-US

Use `size` to specify the size of InputTag

```js
import { InputTag, Radio } from '@arco-design/web-react';
import { useState } from 'react';
const RadioGroup = Radio.Group;

function App() {
  const [size, setSize] = useState('default');
  return (
    <div>
      <RadioGroup
        style={{ marginBottom: 20, borderRadius: 4 }}
        type="button"
        name="size"
        value={size}
        onChange={(value) => setSize(value)}
      >
        <Radio value="mini">mini</Radio>
        <Radio value="small">small</Radio>
        <Radio value="default">default</Radio>
        <Radio value="large">large</Radio>
      </RadioGroup>
      <br />
      <InputTag
        allowClear
        size={size}
        defaultValue={['Beijing', 'Shanghai']}
        placeholder="Please input"
        style={{ maxWidth: 350, marginRight: 20 }}
      />
    </div>
  );
}

export default App;
```
