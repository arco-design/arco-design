---
order: 11
title: 
  zh-CN: 定制节点图标
  en-US: Node Icon
---

## zh-CN

只需为 `TreeNode` 指定 `icon` 属性的值即可为任意节点指定任意图标。

## en-US

The property `icon` of `TreeNode` can specify an icon for the node.

```js
import { Tree } from '@arco-design/web-react';
import { IconStar } from '@arco-design/web-react/icon';
const TreeNode = Tree.Node;

function App() {
  return (
    <Tree>
      <TreeNode icon={<IconStar />} key="node1" title="Trunk">
        <TreeNode icon={<IconStar />} key="node2" title="Leaf" />
      </TreeNode>
      <TreeNode icon={<IconStar />} key="node3" title="Trunk">
        <TreeNode icon={<IconStar />} key="node4" title="Leaf" />
        <TreeNode icon={<IconStar />} key="node5" title="Leaf" />
      </TreeNode>
    </Tree>
  );
}

export default App;
```
