---
order: 6
title:
  zh-CN: 自定义触发器
  en-US: Custom trigger
---

## zh-CN

可以自定义颜色选择器的触发元素，此时与颜色输入框相关的属性将会失效。

## en-US

You can customize the trigger element of the color picker, and the properties related to the color input box will be invalid.

```js
import { useState } from 'react';
import { Button, ColorPicker } from '@arco-design/web-react';

const App = () => {
  const [value, setValue] = useState('#165DFF');

  return (
    <div>
      <ColorPicker value={value} onChange={setValue}>
        <Button>Open Color Picker: {value}</Button>
      </ColorPicker>
    </div>
  );
};

export default App;
```
