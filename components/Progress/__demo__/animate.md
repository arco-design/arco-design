---
order: 4
title:
  zh-CN: 动画效果
  en-US: Animation
---

## zh-CN
设置 `animation` 为 `true` 时，将会显示动画效果，仅当 `type = line` 时生效

## en-US

Display animation effects. Only work when `type` is `'line'`.

```js
import { Progress } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <Progress percent={80} animation width={300} />
      <br />
      <br />
      <Progress percent={80} status="success" animation width={300} />
    </div>
  );
};

export default App;
```
