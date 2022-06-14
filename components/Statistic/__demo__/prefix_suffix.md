---
order: 1
title:
  zh-CN: 前缀后缀/自定义样式
  en-US: Custom Style
---

## zh-CN

这个示例展示了添加前缀后缀，并且可以自定义数值显示的样式。

## en-US

This example shows the addition of prefix and suffix, and the style of displaying values can be customized.

```js
import { Statistic } from '@arco-design/web-react';
import { IconArrowRise, IconArrowFall } from '@arco-design/web-react/icon';

const App = () => {
  return (
    <div>
      <Statistic
        title="New Users"
        value={192393}
        suffix={<IconArrowRise style={{ color: '#ee4d38' }} />}
        style={{ marginRight: 60, marginBottom: 20 }}
      />
      <Statistic
        title="Active Users"
        value={934230}
        suffix={<IconArrowFall style={{ color: '#0fbf60' }} />}
        style={{ marginRight: 60, marginBottom: 20 }}
      />
      <Statistic
        title="User Growth Rate"
        value={50.32}
        precision={2}
        prefix={<IconArrowRise style={{ color: '#ee4d38' }} />}
        suffix="%"
        styleValue={{ color: '#ee4d38' }}
        style={{ marginRight: 60, marginBottom: 20 }}
      />
    </div>
  );
};

export default App;
```
