---
order: 12
title:
  zh-CN: 定制额外节点
  en-US: Extra Node
---

## zh-CN

为 `Tree` 设置 `renderExtra` 可以自定义树节点的展示。

## en-US

The `renderExtra` property of `Tree` can customize node content.

```js
import { useState } from 'react';
import { Tree, Checkbox } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';

const TreeNode = Tree.Node; // 从treedata 生成 treenode

const generatorTreeNodes = (treeData) => {
  return treeData.map((item) => {
    const { children, key, ...rest } = item;
    return (
      <Tree.Node key={key} {...rest} dataRef={item}>
        {children ? generatorTreeNodes(item.children) : null}
      </Tree.Node>
    );
  });
};

const TreeData = [
  {
    title: 'Trunk',
    key: '0-0',
    children: [
      {
        title: 'Leaf',
        key: '0-0-1',
      },
      {
        title: 'Branch',
        key: '0-0-2',
        children: [
          {
            title: 'Leaf',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    title: 'Trunk',
    key: '0-1',
    children: [
      {
        title: 'Branch',
        key: '0-1-1',
        children: [
          {
            title: 'Leaf',
            key: '0-1-1-1',
          },
          {
            title: 'Leaf',
            key: '0-1-1-2',
          },
        ],
      },
      {
        title: 'Leaf',
        key: '0-1-2',
      },
    ],
  },
];

function App() {
  const [treeData, setTreeData] = useState(TreeData);
  return (
    <div style={{ width: 500, padding: 2, overflow: 'auto' }}>
      <Tree
        blockNode
        checkable
        renderExtra={(node) => {
          return (
            <IconPlus
              style={{
                position: 'absolute',
                right: 8,
                fontSize: 12,
                top: 10,
                color: '#3370ff',
              }}
              onClick={() => {
                const dataChildren = node.dataRef.children || [];
                dataChildren.push({
                  title: 'new tree node',
                  key: node._key + '-' + (dataChildren.length + 1),
                });
                node.dataRef.children = dataChildren;
                setTreeData([...treeData]);
              }}
            />
          );
        }}
      >
        {generatorTreeNodes(treeData)}
      </Tree>
    </div>
  );
}

export default App;
```
