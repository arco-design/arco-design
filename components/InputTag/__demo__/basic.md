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
      <Space style={{marginBottom: 20}}>
        <InputTag
          allowClear
          placeholder="Readonly"
          readOnly
          style={{ width: 350 }}
        />
        <InputTag allowClear placeholder="Error" status="error" style={{ width: 350 }}/>
      </Space>
      <InputTag allowClear placeholder="Warning" status="warning" style={{ width: 350 }}/>
    </div>
  );
};

export default App;
```
