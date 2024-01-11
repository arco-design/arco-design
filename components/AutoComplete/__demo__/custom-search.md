---
order: 7
title:
  zh-CN: 自定义过滤规则
  en-US: Custom Filter Rules
---

## zh-CN

如果你依赖用户输入来动态更新选项，请通过 `filterOption` 属性来覆盖默认的选项过滤规则，或者将其设为 `false` 来关闭默认过滤规则。

## en-US

If you rely on user input to dynamically update options, override the default option filtering rules via the `filterOption` attribute, or set it to `false` to turn off the default filtering rules.

```js
import { useState } from 'react';
import { AutoComplete } from '@arco-design/web-react';

function App() {
  const [data, setData] = useState([]);

  const handleSearch = (inputValue) => {
    // or fetch options from server
    setData(inputValue ? new Array(5).fill(null).map(() => Math.random().toFixed(10).slice(2)) : []);
  };

  return (
    <AutoComplete
      placeholder="Please Enter"
      onSearch={handleSearch}
      data={data}
      filterOption={false}
      style={{ width: 154, marginRight: 20 }}
    />
  );
}

export default App;
```
