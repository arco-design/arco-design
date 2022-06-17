---
order: 3
title:
  zh-CN: 无效或只读
  en-US: Disabled & ReadOnly
---

## zh-CN

通过 `disabled` 设置是否禁用，通过 `readOnly` 属性设置是否只读。

## en-US

Set whether to be disabled via `disabled`, and set whether to be readonly via `readOnly` property.

```js
import { Mentions, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space size={40}>
      <Mentions
        style={{ width: 154 }}
        readOnly
        defaultValue="Bytedance"
        options={['Bytedance', 'Bytedesign', 'Bytenumner']}
      />
      <Mentions
        style={{ width: 154 }}
        disabled
        defaultValue="Bytedance"
        options={['Bytedance', 'Bytedesign', 'Bytenumner']}
      />
    </Space>
  );
};

export default App;
```
