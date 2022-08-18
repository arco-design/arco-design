---
order: 12
title:
  zh-CN: 扩展下拉菜单
  en-US: Customize Dropdown
---

## zh-CN

使用 `dropdownRender` 对下拉菜单进行自由扩展。

## en-US

Use `dropdownRender` to freely expand the drop-down menu.

```js
import { useState } from 'react';
import { TreeSelect, Divider, Input, Button } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';

const defaultTreeData = [
  {
    key: 'node1',
    title: 'Trunk',
    disabled: true,
    children: [
      {
        key: 'node2',
        title: 'Leaf',
      },
    ],
  },
  {
    key: 'node3',
    title: 'Trunk2',
    children: [
      {
        key: 'node4',
        title: 'Leaf',
      },
      {
        key: 'node5',
        title: 'Leaf',
      },
    ],
  },
];

function App() {
  const [treeData, setTreeData] = useState(defaultTreeData);
  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    setTreeData([
      ...treeData,
      {
        key: inputValue,
        title: inputValue,
      },
    ]);
  };

  return (
    <TreeSelect
      placeholder="Please select ..."
      treeData={treeData}
      style={{ width: 300 }}
      allowClear
      dropdownMenuStyle={{
        maxHeight: 250,
        display: 'flex',
        flexDirection: 'column',
      }}
      dropdownRender={(menu) => (
        <>
          <div style={{ flex: 1, overflow: 'auto' }}>{menu}</div>
          <div>
            <Divider style={{ margin: 0 }} />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 12px',
              }}
            >
              <Input
                size="small"
                style={{ marginRight: 18 }}
                value={inputValue}
                onChange={(value) => setInputValue(value)}
              />
              <Button
                style={{ fontSize: 14, padding: '0 6px' }}
                type="text"
                size="mini"
                onClick={addItem}
              >
                <IconPlus />
                Add item
              </Button>
            </div>
          </div>
        </>
      )}
    ></TreeSelect>
  );
}

export default App;
```
