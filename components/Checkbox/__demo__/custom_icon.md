---
order: 5
title:
  zh-CN: 自定义 Icon
  en-US: Custom Icon
---

## zh-CN

通过 `icon` 属性自定义选中态图标。


## en-US

Customize the selected icon through the `icon` property.

```js
import { Checkbox } from '@arco-design/web-react';
import { IconAt } from '@arco-design/web-react/icon';

const App = () => {
  return (
    <div>
      <Checkbox icon={<IconAt />}>Checkbox</Checkbox>
    </div>
  );
};

export default App;
```
