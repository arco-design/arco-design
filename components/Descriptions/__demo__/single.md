---
order: 1
title:
  zh-CN: 单列样式
  en-US: Single column style
---

## zh-CN

单列的描述列表样式。

## en-US

Single column descriptions style.

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
    label: 'Address',
    value: 'Yingdu Building, Zhichun Road, Beijing',
  },
];

const App = () => {
  return (
    <div>
      <Descriptions
        column={1}
        title="User Info"
        data={data}
        style={{ marginBottom: 20 }}
        labelStyle={{ paddingRight: 36 }}
      />
      <Descriptions
        column={1}
        title="User Info"
        data={data}
        labelStyle={{ textAlign: 'right', paddingRight: 36 }}
      />
    </div>
  );
};

export default App;
```
