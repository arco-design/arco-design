---
order: 2
title:
  zh-CN: 标签文本对齐
  en-US: Label text alignment
---

## zh-CN

标签文本可以设置左对齐右对齐，也可以设置垂直的排列方式。

## en-US

The label text can either be left-aligned, right-aligned, or vertical-aligned.

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
        colon=" :"
        title="User Info"
        data={data}
        labelStyle={{ textAlign: 'right' }}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="User Info" data={data} layout="inline-vertical" />
    </div>
  );
};

export default App;
```
