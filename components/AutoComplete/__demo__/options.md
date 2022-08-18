---
order: 1
title:
  zh-CN: 自定义选项
  en-US: Options
---

## zh-CN

可以传入 `AutoComplete.Option` 作为组件的 `children`，而非使用 `data`。

## en-US

Pass in `AutoComplete.Option` as the `children` of the component instead of using `data`.

```js
import { useState } from 'react';
import { AutoComplete } from '@arco-design/web-react';
const { Option } = AutoComplete;

function App() {
  const [options, setOptions] = useState([]);

  const handleSearch = (inputValue) => {
    setOptions(
      inputValue ? new Array(5).fill(null).map((_, index) => `${inputValue}_${index}`) : []
    );
  };

  return (
    <AutoComplete
      placeholder="Please Enter"
      style={{ width: 154 }}
      onSearch={handleSearch}
    >
      {options.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </AutoComplete>
  );
}

export default App;
```
