---
order: 2
title:
  zh-CN: 四种尺寸
  en-US: Size
---

## zh-CN

设置 `size` 可以使用四种尺寸（`mini`, `small`, `default`, `large`）的数字输入框。高度分别对应`24px`、`28px`、`32px`、`36px`。

## en-US

Setting `size` can use four sizes (`mini`, `small`, `default`, `large`) number input box. The corresponding heights are `24px`, `28px`, `32px`, and `36px` respectively.

```js
import { useState } from 'react';
import { InputNumber, Radio } from '@arco-design/web-react';
const RadioGroup = Radio.Group;

function App() {
  const [size, setSize] = useState('default');
  return (
    <div>
      <RadioGroup
        type="button"
        name="size"
        value={size}
        onChange={(value) => setSize(value)}
        style={{ marginBottom: 20, borderRadius: 4 }}
      >
        <Radio value="mini">mini</Radio>
        <Radio value="small">small</Radio>
        <Radio value="default">default</Radio>
        <Radio value="large">large</Radio>
      </RadioGroup>
      <div>
        <InputNumber
          defaultValue={2}
          max={20}
          size={size}
          style={{ width: 160, margin: '10px 24px 10px 0' }}
        />
        <InputNumber
          mode="button"
          defaultValue={2}
          max={20}
          size={size}
          style={{ width: 160, margin: '10px 24px 10px 0' }}
        />
      </div>
    </div>
  );
}

export default App;
```
