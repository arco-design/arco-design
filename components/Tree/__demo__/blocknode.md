---
order: 2
title: 
  zh-CN: 节点占一行
  en-US: BlockNode
---

## zh-CN

节点占据一整行。
## en-US

The treeNode occupy the remaining horizontal space.

```js
import { Tree } from '@arco-design/web-react';
const TreeNode = Tree.Node;

const App = () => {
  return (
    <Tree blockNode>
      <TreeNode title="Trunk 0-0" key="0-0">
        <TreeNode title="Branch 0-0-0" key="0-0-0" disabled>
          <TreeNode title="Leaf 0-0-0-0" key="0-0-0-0" />
          <TreeNode title="Leaf 0-0-0-1" key="0-0-0-1" />
        </TreeNode>
        <TreeNode title="Branch 0-0-1" key="0-0-1">
          <TreeNode title="Leaf 0-0-1-0" key="0-0-1-0" />
        </TreeNode>
      </TreeNode>
    </Tree>
  );
};

export default App;
```
