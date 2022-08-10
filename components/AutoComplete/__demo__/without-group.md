---
order: 6
title:
  zh-CN: 查询模式 不确定类目
  en-US: Without group
---

## zh-CN

根据查询结果补全输入内容（不确定类目）。

## en-US

Complete the input according to the query result (without group).

```js
import { useState } from 'react';
import { AutoComplete, Input } from '@arco-design/web-react';
const { Option } = AutoComplete;

function App() {
  const [data, setData] = useState([]);

  const handleSearch = (inputValue) => {
    if (inputValue) {
      setData(
        new Array(3).fill(null).map((_, index) => {
          const value = `${inputValue}-${index + 1}`;
          return (
            <Option key={index} value={value}>
              <span>{value}</span>
              <span
                style={{
                  float: 'right',
                }}
              >{`${~~(Math.random() * 1000)} results`}</span>
            </Option>
          );
        })
      );
    } else {
      setData([]);
    }
  };

  return (
    <div>
      <AutoComplete
        style={{ width: 320 }}
        data={data}
        placeholder="Please Enter"
        triggerElement={<Input.Search />}
        onSearch={handleSearch}
      />
    </div>
  );
}

export default App;
```
