---
order: 4
title:
  zh-CN: 可交互
  en-US: Interactive
---

## zh-CN

提供复制、编辑文本等功能。

## en-US

Provide functions such as copying and editing text.

```js
import { useState } from 'react';
import { Typography, Divider } from '@arco-design/web-react';

function App() {
  const [str, setStr] = useState('Click the icon to edit this text.');
  return (
    <Typography>
      <Typography.Paragraph copyable>Click the icon to copy this text.</Typography.Paragraph>
      <Typography.Paragraph
        editable={{
          onChange: setStr,
        }}
      >
        {str}
      </Typography.Paragraph>
    </Typography>
  );
}

export default App;
```

