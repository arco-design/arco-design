---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

基本用法

## en-US

Basic usage

```js
import { InputTag } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <InputTag
          allowClear
          placeholder="Input and press Enter"
          style={{ maxWidth: 350, marginRight: 20 }}
        />
        <InputTag allowClear placeholder="Disabled" disabled style={{ maxWidth: 350 }} />
      </div>
      <div>
        <InputTag
          allowClear
          placeholder="Readonly"
          readOnly
          style={{ maxWidth: 350, marginRight: 20 }}
        />
        <InputTag allowClear placeholder="Error" error style={{ maxWidth: 350 }} />
      </div>
    </div>
  );
};

export default App;
```
