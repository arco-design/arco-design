---
order: 3
title:
  zh-CN: 多行文本
  en-US: multiple line content
---

## zh-CN

基本用法

## en-US

Basic usage.

```js
import { Watermark } from '@arco-design/web-react';

const App = () => {
  return <Watermark
  content={["Arco Design", "ByteDance"]}
  >
   <div style={{height: 300}}></div>
  </Watermark>
};

export default App;
```
