---
order: 15
title:
  zh-CN: 搜索树
  en-US: Searchable
---

```js
import { useState, useEffect } from 'react';
import { Tree, Input } from '@arco-design/web-react';
const TreeNode = Tree.Node;
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
  const [treeData, setTreeData] = useState(TreeData);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    if (!inputValue) {
      setTreeData(TreeData);
    } else {
      const result = searchData(inputValue);
      setTreeData(result);
    }
  }, [inputValue]);
  return (
    <div>
      <Input.Search
        style={{
          marginBottom: 8,
          maxWidth: 240,
        }}
        onChange={setInputValue}
      />

      <Tree
        treeData={treeData}
        renderTitle={({ title }) => {
          if (inputValue) {
            const index = title.toLowerCase().indexOf(inputValue.toLowerCase());

            if (index === -1) {
              return title;
            }

            const prefix = title.substr(0, index);
            const suffix = title.substr(index + inputValue.length);
            return (
              <span>
                {prefix}
                <span style={{ color: 'var(--color-primary-light-4)' }}>
                  {title.substr(index, inputValue.length)}
                </span>
                {suffix}
              </span>
            );
          }

          return title;
        }}
      ></Tree>
    </div>
  );
}

export default App;
```
