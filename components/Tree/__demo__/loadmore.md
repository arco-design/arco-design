---
order: 6
title:
  zh-CN: 动态加载
  en-US: Dynamic Loading
---

## zh-CN

动态加载节点。

## en-US

Load nodes dynamically.

```js
import { Tree } from '@arco-design/web-react';

const TreeNode = Tree.Node;


const defaultTreeData = [
  {
    title: 'Trunk 0-0',
    key: '0-0'
  },
  {
    title: 'Trunk 0-1',
    key: '0-1',
    children: [
      {
        title: 'Branch 0-1-1',
        key: '0-1-1'
      }
    ],
  },
];

function Demo() {
  const [treeData, setTreeData] = React.useState(defaultTreeData);

  const loadMore = (treeNode) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        treeNode.props.dataRef.children = [
          { title: `leaf`, key: `${treeNode.props._key}-1`, isLeaf: true },
        ];
        setTreeData([...treeData]);
        resolve();
      }, 1000);
    });
  };

  return (
    <Tree defaultSelectedKeys={['node1']} loadMore={loadMore} treeData={treeData}>

    </Tree>
  );
}

ReactDOM.render(<Demo />, CONTAINER);
```
