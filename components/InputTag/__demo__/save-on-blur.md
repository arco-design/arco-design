---
order: 4
title:
  zh-CN: 失焦时保存
  en-US: Save on blur
---

## zh-CN

设置 `saveOnBlur` 在失焦时自动将正在输入的文本保存为标签。

## en-US

Set `saveOnBlur` to automatically save the text being entered as a label when it loses focus.

```js
import { InputTag } from '@arco-design/web-react';

const App = () => {
  return <InputTag saveOnBlur placeholder="Input and blur directly" style={{ maxWidth: 350 }} />;
};

export default App;
```
