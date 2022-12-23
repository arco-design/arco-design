---
order: 5
title:
  zh-CN: 自定义Icon
  en-US: Custom Icon
---

## zh-CN

可以自定义Icon。


## en-US

CustomIcon.

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