---
order: 2
title:
  zh-CN: 竖直单选组
  en-US: Vertical Radio.Group
---

## zh-CN

设置 `direction="vertical"` 可以展示竖直的单选组。

## en-US

If direction is 'vertical', the vertical Radio.Group will be displayed.

```js
import { Radio } from '@arco-design/web-react';
const RadioGroup = Radio.Group;

const App = () => {
  return (
    <div>
      <RadioGroup direction="vertical" defaultValue="a">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
        <Radio value="c">C</Radio>
        <Radio disabled value="d">
          D
        </Radio>
      </RadioGroup>
    </div>
  );
};

export default App;
```
