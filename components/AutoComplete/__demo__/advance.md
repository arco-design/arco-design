---
order: 4
title:
  zh-CN: 复杂用法
  en-US: Advance
---

## zh-CN

这个示例展示了：`1. 添加Tooltip`, `2. 自定义显示`, `3. 对值进行操控`。

## en-US

This example shows: `1. Add Tooltip`, `2. Custom display`, `3. Manipulate values`.

```js
import { useState } from 'react';
import { AutoComplete, Tooltip } from '@arco-design/web-react';

function App() {
  const [value, setValue] = useState('Beijing');
  return (
    <Tooltip trigger="focus" content="只有当选中或者输入Beijing的时候才改变值，不然重置为空">
      <AutoComplete
        placeholder="请输入..."
        data={[
          {
            name: '北京',
            value: 'Beijing',
            other: 'other custom data',
          },
        ]}
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
        onBlur={() => {
          setValue((value) => (value === 'Beijing' ? value : ''));
        }}
        style={{ width: 154 }}
      />
    </Tooltip>
  );
}

export default App;
```
