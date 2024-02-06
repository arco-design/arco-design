---
order: 3
title:
  zh-CN: 禁用
  en-US: Disabled
---

## zh-CN

设置 `disabled` 禁用选择器。

## en-US

Set `disabled` to disable the selector.

```js
import { ColorPicker, Radio } from '@arco-design/web-react';

const RadioGroup = Radio.Group;

const App = () => {
  return (
    <div>
      <ColorPicker defaultValue={'#165DFF'} disabled />
      <div style={{ marginTop: 10 }}/>
      <ColorPicker defaultValue={'#165DFF'} showText disabled />
    </div>
  ) ;
};

export default App;
```
