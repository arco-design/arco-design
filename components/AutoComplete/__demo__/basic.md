---
order: 0
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

根据当前输入展示输入建议（下拉选择）。

## en-US

Show input suggestions based on current input (drop-down selection).

```js
import { useState } from 'react';
import { AutoComplete } from '@arco-design/web-react';

function App() {
  const [data, setData] = useState([]);

  const handleSearch = (inputValue) => {
    setData(inputValue ? new Array(5).fill(null).map((_, index) => `${inputValue}_${index}`) : []);
  };

  return (
    <AutoComplete
      placeholder="Please Enter"
      onSearch={handleSearch}
      data={data}
      style={{ width: 154, marginRight: 20 }}
    />
  );
}

export default App;
```
