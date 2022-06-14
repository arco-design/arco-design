---
order: 0
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

通过 `<IconXXX />` 的形式即可使用Icon。

**注意：**使用驼峰命名法，例如icon的名字叫`arrow-back`，那么对应的Icon名称为`IconArrowBack`。

## en-US

You can use Icon by `<IconXXX />`.

**Note:** Use camel case nomenclature. For example, the name of the icon is `arrow-back`, then the corresponding Icon name is `IconArrowBack`.

```js
import { Tooltip } from '@arco-design/web-react';
import { IconStar } from '@arco-design/web-react/icon';

const App = () => {

  return <div style={{ color: 'var(--color-text-1)' }}>
    <Tooltip content="This is IconStar">
      <IconStar style={{ fontSize: 24, marginRight: 20 }} />
    </Tooltip>
    <IconStar style={{ fontSize: 24, color: '#ffcd00' }} />
  </div>;
}

export default App;
```
