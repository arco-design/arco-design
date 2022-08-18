---
order: 6
title:
  zh-CN: 展示总数
  en-US: Show Total
---

## zh-CN

您可以通过设置 `showTotal` 来显示数据总数。

## en-US

Set `showTotal` to show the total number of data.

```js
import { Pagination } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <Pagination
        showTotal
        total={50}
        style={{
          marginBottom: 20,
        }}
      />
      <Pagination
        showTotal={(total, range) => <span>{`${range[0]} - ${range[1]} of ${total} items`}</span>}
        total={200}
      />
    </div>
  );
};

export default App;
```
