---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

基本用法

## en-US

Basic uasge.

```js
import { VerificationCode, Message } from '@arco-design/web-react';

const App = () => {
  return <VerificationCode
    style={{width: 300}}
    onChange={v => {
      console.log(v)
    }}
    onFinish={v => {
      Message.info('onFinish: ' + v)
    }}
  />;
};

export default App;
```
