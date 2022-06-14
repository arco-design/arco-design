---
order: 3
title:
  zh-CN: 不同排列模式
  en-US: Different layout
---

## zh-CN

有水平排列、垂直排列、行内水平排列、行内垂直排列四种排列模式。

## en-US

There are four arrangement modes: horizontal, vertical, inline horizontal, and inline vertical.

```js
import { Descriptions } from '@arco-design/web-react';
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
const data2 = [
  {
    label: 'Name',
    value: 'Socrates',
  },
  {
    label: 'Hometown',
    value: 'Beijing',
  },
  {
    label: 'Mobile',
    value: '123-1234-1234',
  },
  {
    label: 'Date of Birth',
    value: '2020-05-15',
  },
  {
    label: 'Residence',
    value: 'Beijing',
  },
  {
    label: 'Gender',
    value: 'Male',
  },
  {
    label: 'Ethnicity',
    value: 'Han',
  },
  {
    label: 'Address',
    value: 'Yingdu Building, Zhichun Road, Beijing',
  },
];

const App = () => {
  return (
    <div>
      <Descriptions
        title="Inline Horizontal"
        colon=":"
        data={data.slice(0, 5)}
        layout="inline-horizontal"
        style={{ marginBottom: 20 }}
      />
      <Descriptions
        title="Horizontal"
        data={data}
        layout="horizontal"
        border
        style={{ marginBottom: 20 }}
      />
      <Descriptions
        title="Vertical"
        data={data2}
        layout="vertical"
        border
        column={5}
        style={{ marginBottom: 20 }}
      />
      <Descriptions
        title="Inline Vertical"
        data={data2}
        layout="inline-vertical"
        border
        column={5}
      />
    </div>
  );
};

export default App;
```

