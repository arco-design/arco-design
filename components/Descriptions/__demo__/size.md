---
order: 4
title:
  zh-CN: 不同尺寸
  en-US: Size
---

## zh-CN

展示不同尺寸下的描述列表。

## en-US

Descriptions in different sizes.

```js
import { useState } from 'react';
import { Descriptions, Radio } from '@arco-design/web-react';
const RadioGroup = Radio.Group;
const data = [
  {
    label: 'Name',
    value: 'Socrates',
  },
  {
    label: 'Mobile',
    value: '123-1234-1234',
  },
  {
    label: 'Residence',
    value: 'Beijing',
  },
  {
    label: 'Hometown',
    value: 'Beijing',
  },
  {
    label: 'Date of Birth',
    value: '2020-05-15',
    span: 2,
  },
  {
    label: 'Address',
    value: 'Yingdu Building, Zhichun Road, Beijing',
  },
];

function App() {
  const [size, setSize] = useState('default');
  return (
    <div>
      <RadioGroup
        value={size}
        options={['mini', 'small', 'medium', 'default', 'large']}
        onChange={(value) => setSize(value)}
        type="button"
        style={{ marginBottom: 20 }}
      />
      <Descriptions
        border
        title="User Info"
        data={data}
        size={size}
        style={{ marginBottom: 20 }}
      />
      <Descriptions
        column={1}
        title="User Info"
        data={data}
        size={size}
        labelStyle={{ paddingRight: 40 }}
      />
    </div>
  );
}

export default App;
```

