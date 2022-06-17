---
order: 8
title:
  zh-CN: 文本域
  en-US: Textarea
---

## zh-CN

可以用于多行输入。

## en-US

A textarea input example.

```js
import { Input, Space } from '@arco-design/web-react';
const TextArea = Input.TextArea;

const App = () => {
  return (
    <Space wrap>
      <TextArea placeholder="Please enter ..." style={{ minHeight: 64, width: 350 }} />
      <TextArea defaultValue="Disabled" style={{ minHeight: 64, width: 350 }} disabled />
    </Space>
  );
};

export default App;
```
