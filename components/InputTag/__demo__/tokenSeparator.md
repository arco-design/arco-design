---
order: 7
title:
  zh-CN: 自动分词
  en-US: Token Separator
---

## zh-CN

设置 `tokenSeparators` 可以使用自动分词功能。尝试复制下方文本到输入框里。

## en-US

Set `tokenSeparators` to use automatic word segmentation. Try copying text below into the input box.

```js
import { InputTag, Typography } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <Typography.Paragraph copyable>
        Beijing,Shenzhen|Nanjing/Xi'an
      </Typography.Paragraph>
      <InputTag
        allowClear
        tokenSeparators={[',', '|', '/']}
        placeholder="Paste text here"
        style={{ width: 350 }}
      />
    </div>
  );
};

export default App;
```
