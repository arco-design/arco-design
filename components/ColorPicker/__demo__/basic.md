---
order: 0
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

基本使用方法。

## en-US

Basic usage.

```js
import { ColorPicker } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <ColorPicker defaultValue={'#165DFF'} />
      <div style={{ marginTop: 10 }}/>
      <ColorPicker defaultValue={'#165DFF'} showText />
    </div>
  );
};

export default App;
```
