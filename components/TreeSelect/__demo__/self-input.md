---
order: 8
title:
  zh-CN: 自定义显示
  en-US: Customize Trigger
---

## zh-CN

设置 `triggerElement` 可以自定义显示。

## en-US

Set `triggerElement` to customize the display.

```js
import { useState } from 'react';
import { TreeSelect, Typography, Link } from '@arco-design/web-react';
const TreeNode = TreeSelect.Node;

const DemoTreeSelect = () => {
  const [text, setText] = useState('node1');
  return (
    <TreeSelect
      allowClear
      onChange={(value) => {
        setText(value.label);
      }}
      labelInValue
      triggerElement={
        <Typography.Paragraph style={{ width: '300px' }}>
          You selected: <Link>{text}</Link>
        </Typography.Paragraph>
      }
    >
      <TreeNode key="node1" title="Trunk">
        <TreeNode key="node2" title="Leaf" />
      </TreeNode>
      <TreeNode key="node3" title="Trunk2">
        <TreeNode key="node4" title="Leaf" />
        <TreeNode key="node5" title="Leaf">
          <TreeNode key="node6" title="Leaf" />
          <TreeNode key="node7" title="Leaf" />
        </TreeNode>
      </TreeNode>
    </TreeSelect>
  );
};

export default DemoTreeSelect;
```
