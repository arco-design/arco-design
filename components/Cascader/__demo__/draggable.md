---
order: 18
title:
  zh-CN: 拖拽排序
  en-US: Draggable
---

## zh-CN

多选时，指定 `dragToSort` 属性以允许对已输入的值进行拖拽排序。

## en-US

In multiple mode, specify the `dragToSort` property to allow sort the entered values by dragging.

```js
import { Cascader } from '@arco-design/web-react';
const options = [
  {
    id: 'beijing',
    name: 'Beijing',
    child: [
      {
        id: 'Beijing',
        name: 'Beijing',
        child: [
          {
            id: 'chaoyang',
            name: 'Chaoyang',
            child: [
              {
                id: 'datunli',
                name: 'Datunli',
              },
            ],
          },
          {
            id: 'dongcheng',
            name: 'Dongcheng',
          },
          {
            id: 'xicheng',
            name: 'Xicheng',
          },
          {
            id: 'haidian',
            name: 'Haidian',
          },
          {
            id: 'fengtai',
            name: 'fengtai',
          },
          {
            id: 'shijingshan',
            name: 'Shijingshan',
          },
          {
            id: 'mentougou',
            name: 'Mentougou',
          },
          {
            id: 'fangshan',
            name: 'Fangshan',
          },
          {
            id: 'tongzhou',
            name: 'Tongzhou',
          },
          {
            id: 'shunyi',
            name: 'Shunyi',
          },
        ],
      },
    ],
  },
  {
    id: 'shanghai',
    name: 'Shanghai',
    child: [
      {
        id: 'shanghaishi',
        name: 'Shanghai',
        child: [
          {
            id: 'huangpu',
            name: 'Huangpu',
          },
        ],
      },
    ],
  },
];

const App = () => {
  return (
    <Cascader
        mode='multiple'
        placeholder='Please select ...'
        style={{ width: 600 }}
        onChange={(x, y) => {
          console.log(x, y);
        }}
        dragToSort
        options={options}
        defaultValue={[['beijing', 'Beijing', 'chaoyang', 'datunli']]}
        showSearch
        allowClear
        fieldNames={{
          children: 'child',
          label: 'name',
          value: 'id',
        }}
      />
  );
};

export default App;
```
