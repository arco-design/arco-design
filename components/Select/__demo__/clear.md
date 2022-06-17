---
order: 1
title:
  zh-CN: 允许清除
  en-US: Allow Clear
---

## zh-CN

支持清除按钮。

## en-US

With built-in clear button.

```js
import { Select } from '@arco-design/web-react';
const Option = Select.Option;
const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Disabled'];

const App = () => {
  return (
    <Select placeholder="Please select" style={{ width: 154 }} allowClear>
      {options.map((option, index) => (
        <Option key={option} disabled={index === 3} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

export default App;
```
