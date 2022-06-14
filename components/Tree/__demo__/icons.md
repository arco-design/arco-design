---
order: 13
title: 
  zh-CN: 定制组件图标
  en-US: Component Icons
---

## zh-CN

通过`icons` 属性即可设置组件 `loadingIcon`,`dragIcon`,`switcherIcon`。

## en-US

The components `loadingIcon`, `dragIcon`, and `switcherIcon` can be set through the `icons` property.

```js
import { Tree } from '@arco-design/web-react';
import { IconDown, IconDragArrow, IconDriveFile } from '@arco-design/web-react/icon';
const TreeNode = Tree.Node;

function App() {
  return (
    <Tree
      icons={{
        switcherIcon: <IconDown />,
        dragIcon: <IconDragArrow />,
      }}
      showLine
      draggable
    >
      <TreeNode key="node1" title="Trunk">
        <TreeNode key="node2" title="Leaf" />
      </TreeNode>
      <TreeNode key="node3" title="Trunk">
        <TreeNode
          key="node4"
          icons={{
            switcherIcon: <IconDriveFile />,
          }}
          title="Leaf"
        />
        <TreeNode
          key="node5"
          icons={{
            switcherIcon: <IconDriveFile />,
          }}
          title="Leaf"
        />
      </TreeNode>
    </Tree>
  );
}

export default App;
```
