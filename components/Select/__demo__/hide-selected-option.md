---
order: 18
title:
  zh-CN: 隐藏已选择项
  en-US: Hide Selected Items
---

## zh-CN

在下拉列表中隐藏已选择的项。

## en-US

Hide selected items in the drop-down menu.

```js
import { useState } from 'react';
import { Select } from '@arco-design/web-react';
const Option = Select.Option;
const OPTIONS = new Array(10).fill(null).map((_, index) => `Option ${index + 1}`);

function App() {
  const [options, setOptions] = useState(OPTIONS);
  return (
    <>
      <Select
        placeholder="Please select"
        style={{ width: 345, marginRight: 20 }}
        mode="multiple"
        onChange={(value) => setOptions(OPTIONS.filter((option) => value.indexOf(option) === -1))}
      >
        {options.map((option, index) => (
          <Option wrapperClassName="select-demo-hide-option-checkbox" key={index} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </>
  );
}

export default App;
```

```css
.select-demo-hide-option-checkbox .arco-checkbox {
  display: none;
}
```
