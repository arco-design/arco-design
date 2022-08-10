---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

简单地成组展示多个只读字段，一般用于详情页的信息。

## en-US

Simply display multiple read-only fields in groups. Generally used for information on the details page.

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
  return <Descriptions colon=" :" layout="inline-horizontal" title="User Info" data={data} />;
};

export default App;
```
