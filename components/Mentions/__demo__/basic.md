---
order: 0
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

用于在输入中提及某人或某事，常用于发布、聊天或评论功能。

## en-US

Used to mention someone or something, often used for posting, chatting or commenting.

```js
import { Mentions } from '@arco-design/web-react';

const App = () => {
  return (
    <Mentions
      style={{ width: 154 }}
      defaultValue="@Bytedance"
      options={['Bytedance', 'Bytedesign', 'Bytenumner']}
    />
  );
};

export default App;
```
