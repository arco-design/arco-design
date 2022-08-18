---
order: 6
title:
  zh-CN: 响应式排列
  en-US: Responsive
---

## zh-CN

支持响应式排列。

## en-US

Support responsive layout.

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

const App = () => {
  return (
    <Descriptions
      title="Responsive"
      data={data}
      border
      column={{
        xs: 1,
        sm: 2,
        md: 2,
        lg: 2,
        xl: 3,
        xxl: 4,
      }}
    />
  );
};

export default App;
```


