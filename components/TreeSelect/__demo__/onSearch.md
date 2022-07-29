---
order: 6
title:
  zh-CN: 远程搜索
  en-US: Remote search
---

## zh-CN

当传入 `onSearch` 为函数时，启用自定义搜索，可以从远程加载数据。

## en-US

Custom search can be enabled when the passed `onSearch` is a function, and data can be loaded remotely.

```js
import React from 'react';
import { TreeSelect, Spin } from '@arco-design/web-react';
import { IconCalendar } from '@arco-design/web-react/icon';

const TreeData = [
  {
    title: 'Trunk 0-0',
    key: '0-0',
    children: [
      {
        title: 'Branch 0-0-1',
        key: '0-0-1',
        children: [
          {
            title: 'Leaf 0-0-1-1',
            key: '0-0-1-1',
          },
          {
            title: 'Leaf 0-0-1-2',
            key: '0-0-1-2',
          },
        ],
      },
    ],
  },
  {
    title: 'Trunk 0-1',
    key: '0-1',
    children: [
      {
        title: 'Branch 0-1-1',
        key: '0-1-1',
        children: [
          {
            title: 'Leaf 0-1-1-0',
            key: '0-1-1-0',
          },
        ],
      },
      {
        title: 'Branch 0-1-2',
        key: '0-1-2',
        children: [
          {
            title: 'Leaf 0-1-2-0',
            key: '0-1-2-0',
          },
        ],
      },
    ],
  },
];

function searchData(inputValue) {
  const loop = (data) => {
    const result = [];
    data.forEach((item) => {
      if (item.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1) {
        result.push({ ...item });
      } else if (item.children) {
        const filterData = loop(item.children);

        if (filterData.length) {
          result.push({ ...item, children: filterData });
        }
      }
    });
    return result;
  };

  return loop(TreeData);
}

function App() {
  const [treeData, setTreeData] = React.useState(TreeData);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState([]);
  return (
    <TreeSelect
      treeCheckable
      value={value}
      onChange={setValue}
      showSearch={true}
      allowClear={true}
      notFoundContent={loading ? <Spin /> : undefined}
      placeholder="please select..."
      treeData={loading ? [] : treeData}
      onSearch={(inputValue) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setTreeData(searchData(inputValue));
        }, 200);
      }}
      style={{ width: 300 }}
    />
  );
}

export default App;
```
