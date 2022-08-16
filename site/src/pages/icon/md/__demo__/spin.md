---
order: 1
title:
  zh-CN: 加载中
  en-US: Spin
---

## zh-CN

通过指定 `spin` 字段，可以将图标设置为旋转状态。

## en-US

By specifying the `spin` field, the icon can be set to the spinning state.

```js
import { IconSync } from '@arco-design/web-react/icon';

const App = () => {
  return <div style={{ color: 'var(--color-text-1)' }}>
    <IconSync spin style={{ fontSize: 40 }} />
  </div>;
}

export default App;
```
