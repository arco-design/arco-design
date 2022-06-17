---
order: 1
title: 
  zh-CN: 由treeData直接生成
  en-US: From TreeData
---


```js
import { useState } from 'react';
import { Tree } from '@arco-design/web-react';
const TreeNode = Tree.Node;
const TreeData = [
  {
    title: 'Trunk 0-0',
    key: '0-0',
    children: [
      {
        title: 'Branch 0-0-2',
        key: '0-0-2',
        selectable: false,
        children: [
          {
            title: 'Leaf',
            key: '0-0-2-1',
            children: [
              {
                title: 'Leafsss 0-0-2',
                key: '0-0-2-1-0',
                children: [
                  {
                    title: 'Leaf',
                    key: '0-0-2-1-0-0',
                  },
                ],
              },
            ],
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
            title: 'Leaf',
            key: '0-1-1-0',
          },
        ],
      },
    ],
  },
];

function App() {
  const [treeData, setTreeData] = useState(TreeData);
  return (
    <div>
      <Tree defaultSelectedKeys={['0-0-1']} treeData={treeData}></Tree>
    </div>
  );
}

export default App;
```
