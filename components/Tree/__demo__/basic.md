---
order: 0
title: 
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

为每个 `TreeNode` 节点赋予全局唯一的 `key`（必填项），`title` 为该节点显示的内容。

## en-US

Give each `TreeNode` node a globally unique `key` (required), and the `title` is the content to be displayed on the node.

```js
import { Tree } from '@arco-design/web-react';
const TreeNode = Tree.Node;

const App = () => {
  return (
    <Tree
      defaultExpandedKeys={['0-0-0']}
      defaultSelectedKeys={['0-0-0', '0-0-1']}
      onSelect={(value, info) => {
        console.log(value, info);
      }}
      onExpand={(keys, info) => {
        console.log(keys, info);
      }}
    >
      <TreeNode title="Trunk" key="0-0">
        <TreeNode title="Branch 0-0-0" key="0-0-0" disabled>
          <TreeNode title="Leaf" key="0-0-0-0" />
          <TreeNode title="Leaf" key="0-0-0-1" />
        </TreeNode>
        <TreeNode title="Branch 0-0-1" key="0-0-1">
          <TreeNode title="Leaf" key="0-0-1-0" />
        </TreeNode>
      </TreeNode>
    </Tree>
  );
};

export default App;
```
