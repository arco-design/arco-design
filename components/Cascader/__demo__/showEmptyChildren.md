---
order: 14
title:
  zh-CN: 展示空数据
  en-US: Show empty list
---

## zh-CN

`showEmptyChildren=true`时，当`children`为`[]`也会展示下一级空菜单。

## en-US

If you want to display the next level menu when an option's children is `[]`, please specify `showEmptyChildren=true`.


```js
import React from 'react';
import { Cascader, Checkbox } from '@arco-design/web-react';

const options = [
  {
    value: 'shanghai',
    label: 'Shanghai',
    children: [
      {
        value: 'shanghaishi',
        label: 'Shanghai',
        children: [
          {
            value: 'huangpu',
            label: 'Huangpu',
            children: [],
          },
          {
            value: 'jingan',
            label: 'Jingan',
          },
        ],
      },
    ],
  },
  {
    value: 'beijing',
    label: 'Beijing',
    children: [
      {
        value: 'Beijing',
        label: 'Beijing',
        children: [],
      },
    ],
  },
];

function App() {
  const [checked, setChecked] = React.useState(false);
  const [value, setValue] = React.useState();
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Checkbox
          onChange={(v) => {
            setChecked(v);
            setValue();
          }}
        >
          showEmptyChildren
        </Checkbox>
      </div>
      <Cascader
        showSearch
        allowClear
        value={value}
        onChange={setValue}
        placeholder="Please select ..."
        showEmptyChildren={checked}
        style={{ width: 300 }}
        options={options}
      />
    </div>
  );
}

export default App;
```
