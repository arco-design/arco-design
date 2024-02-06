---
order: 4
title:
  zh-CN: 颜色格式
  en-US: Color forma
---

## zh-CN

通过 `format` 设置颜色值的格式，支持 `hex` 和 `rgb`。

## en-US

Set the format of the color value through `format`, supporting `hex` and `rgb`.

```js
import { ColorPicker, Radio } from '@arco-design/web-react';
import { useState } from 'react';

const RadioGroup = Radio.Group;

const App = () => {
  const [format, setFormat] = useState('hex')

  return (
    <div>
      <RadioGroup
        type="button"
        mode="fill"
        name="size"
        value={format}
        onChange={setFormat}
        style={{ marginBottom: 24 }}
      >
        {['hex', 'rgb'].map((x) => {
          return (
            <Radio key={x} value={x}>
              {x}
            </Radio>
          );
        })}
      </RadioGroup>
      <div style={{ marginTop: 10 }}/>
      <ColorPicker defaultValue={'#165DFF'} showText format={format} />
    </div>
  );
};

export default App;
```
