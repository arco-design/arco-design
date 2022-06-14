---
order: 8
title:
  zh-CN: 限制上传数量
  en-US: Limit
---

## zh-CN

通过`limit`限制上传的最大数量。超出后上传按钮会隐藏.

## en-US

Limit the maximum number of uploaded files.

```js
import { Upload, Message } from '@arco-design/web-react';

function App() {
  return (
    <Upload
      action="/"
      limit={3}
      multiple
      onExceedLimit={() => {
        Message.warning('超过上传数量限制！最多上传3个');
      }}
    />
  );
}

export default App;
```
