---
order: 4
title:
  zh-CN: 全选
  en-US: Check all
---

## zh-CN

通过 `indeterminate` 属性可以实现半选效果。

## en-US

The indeterminate effect can be achieved with `indeterminate=true`

```js
import { useState } from 'react';
import { Checkbox } from '@arco-design/web-react';
const CheckboxGroup = Checkbox.Group;
const options = ['Option 1', 'Option 2', 'Option 3'];

function App() {
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [value, setValue] = useState([0, 1]);

  function onChangeAll(checked) {
    if (checked) {
      setIndeterminate(false);
      setCheckAll(true);
      setValue([0, 1, 2]);
    } else {
      setIndeterminate(false);
      setCheckAll(false);
      setValue([]);
    }
  }

  function onChange(checkList) {
    setIndeterminate(!!(checkList.length && checkList.length !== options.length));
    setCheckAll(!!(checkList.length === options.length));
    setValue(checkList);
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Checkbox onChange={onChangeAll} checked={checkAll} indeterminate={indeterminate}>
          {checkAll ? 'unCheck All' : 'Check All'}
        </Checkbox>
      </div>
      <CheckboxGroup
        value={value}
        options={options.map((x, i) => ({
          label: x,
          value: i,
        }))}
        onChange={onChange}
      />
    </div>
  );
}

export default App;
```
