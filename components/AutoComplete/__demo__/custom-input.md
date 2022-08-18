---
order: 2
title:
  zh-CN: 自定义输入组件
  en-US: Custom input
---

## zh-CN

支持自定义输入组件。

## en-US

Support custom input components.

```js
import { useState } from 'react';
import { AutoComplete, Input } from '@arco-design/web-react';
const { TextArea } = Input;

function App() {
  const [data, setData] = useState([]);

  const handleSearch = (inputValue) => {
    setData(
      inputValue && inputValue.trim()
        ? new Array(5).fill(null).map((_, index) => `${inputValue}_${index}`)
        : []
    );
  };

  return (
    <AutoComplete
      style={{ width: 320, height: 80 }}
      data={data}
      triggerElement={<TextArea />}
      placeholder="Customize this with your words"
      onSearch={handleSearch}
    />
  );
}

export default App;
```
