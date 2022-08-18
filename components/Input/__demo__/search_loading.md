---
order: 5
title:
  zh-CN: 搜索框 Loading
  en-US: Search Box with Loading
---

## zh-CN

通过 `loading` 属性可以设置搜索框在 `onSearch` 的时候展示 `loading`。

## en-US

Through the `loading` property, you can set the search box to display `loading` when `onSearch`.

```js
import { Input, Space } from '@arco-design/web-react';
const InputSearch = Input.Search;

const App = () => {
  return (
    <Space wrap>
      <InputSearch loading placeholder="Enter keyword to search" style={{ width: 350 }} />
      <InputSearch
        searchButton
        loading
        defaultValue="Search content"
        placeholder="Enter keyword to search"
        style={{ width: 350 }}
      />
      <InputSearch
        searchButton="Search"
        loading
        defaultValue="Search content"
        placeholder="Enter keyword to search"
        style={{ width: 350 }}
      />
    </Space>
  );
};

export default App;
```
