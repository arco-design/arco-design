---
order: 5
title:
  zh-CN: 搜索框
  en-US: Search Box
---

## zh-CN

带有搜索按钮的输入框，用于内容检索。

## en-US

Input box with search button for content retrieval.

```js
import { Input, Space } from '@arco-design/web-react';
const InputSearch = Input.Search;

const App = () => {
  return (
    <Space wrap>
      <InputSearch allowClear placeholder="Enter keyword to search" style={{ width: 350 }} />
      <InputSearch
        searchButton
        defaultValue="Search content"
        placeholder="Enter keyword to search"
        style={{ width: 350 }}
      />
      <InputSearch
        searchButton="Search"
        defaultValue="Search content"
        placeholder="Enter keyword to search"
        style={{ width: 350 }}
      />
    </Space>
  );
};

export default App;
```
