---
order: 0
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN
最基础的上传组件用法。

## en-US

The Basic usage.

```js
import { Upload } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <div>
        <Upload action="/" />
      </div>
      <div>
        <Upload
          action="/"
          disabled
          style={{ marginTop: 40, }}
        />
      </div>
    </div>
  );
};

export default App;
```
