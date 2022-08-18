---
order: 4
title:
  zh-CN: 尺寸
  en-US: Size
---

## zh-CN

通过指定 `size` 字段，可以使用不同尺寸的分页器。

## en-US

Set `size` field to use different sizes.

```js
import { useState } from 'react';
import { Pagination, Radio } from '@arco-design/web-react';
const RadioGroup = Radio.Group;

function App() {
  const [size, setSize] = useState('default');
  return (
    <div>
      <RadioGroup
        value={size}
        options={['large', 'default', 'small', 'mini']}
        onChange={(value) => setSize(value)}
        type="button"
        style={{
          marginBottom: 20,
        }}
      />
      <Pagination size={size} total={50} showTotal showJumper sizeCanChange />
    </div>
  );
}

export default App;
```
