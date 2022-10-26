---
order: 9
title:
  zh-CN: 样式定制
  en-US: Customize style
---

## zh-CN

可以通过样式定制得到不同的视觉风格。

## en-US

Customize style to get different visual styles.

```js
import { Pagination } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <Pagination
        total={200}
        style={{ marginBottom: 20 }}
        pageItemStyle={{ background: 'var(--color-bg-2)', marginRight: 2 }}
        activePageItemStyle={{ background: 'var(--color-fill-2)' }}
      />
      <Pagination
        total={200}
        pageItemStyle={{ background: 'var(--color-bg-2)' }}
        activePageItemStyle={{ background: 'var(--color-fill-2)' }}
      />
    </div>
  );
};

export default App;
```
