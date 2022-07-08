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
import { InputTag, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <Space style={{marginBottom: 20}}>
        <InputTag
          allowClear
          placeholder="Input and press Enter"
          style={{ width: 350 }}
        />
        <InputTag allowClear placeholder="Disabled" disabled style={{ width: 350 }}/>
      </Space>
      <Space>
        <InputTag
          allowClear
          placeholder="Readonly"
          readOnly
          style={{ width: 350 }}
        />
        <InputTag allowClear placeholder="Error" error style={{ width: 350 }}/>
      </Space>
    </div>
  );
};

export default App;
```
