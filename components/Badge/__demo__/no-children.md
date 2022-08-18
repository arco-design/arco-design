---
order: 1
title:
  zh-CN: 独立使用
  en-US: Standalone
---

## zh-CN

`children` 为空时，将会独立展示徽标。
## en-US

Used in standalone when children is empty.

```js
import { Badge, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space size={40}>
      <Badge count={2} />
      <Badge
        count={2}
        dotStyle={{ background: '#E5E6EB', color: '#86909C' }}
      />
      <Badge count={16} />
      <Badge maxCount={99} count={1000} />
    </Space>
  );
};

export default App;
```
