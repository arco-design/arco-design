---
order: 8
title:
  zh-CN: 简单模式
  en-US: Simple Mode
---

## zh-CN

指定 `simple` 来开启简单模式，点击选项即可移动。额外配置 `simple = { retainSelectedItems: true }`，将选中的条目保留在左侧。

## en-US

Specify `simple` to turn on simple mode, click the option to move. Additional configuration `simple = { retainSelectedItems: true }` to keep selected items on the left.

```js
import React, { useState, useMemo } from 'react';
import { Transfer, Switch, Typography } from '@arco-design/web-react';

function App() {
  const [retainSelectedItems, setRetainSelectedItems] = useState(false);

  const dataSource = useMemo(() => {
    return new Array(8).fill(null).map((_, index) => ({
      key: `${index + 1}`,
      value: `Option ${index + 1}`,
    }));
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Switch
          style={{ marginRight: 8 }}
          size="small"
          checked={retainSelectedItems}
          onChange={setRetainSelectedItems}
        />
        <Typography.Text code>
          {`simple = { retainSelectedItems: ${retainSelectedItems} }`}
        </Typography.Text>
      </div>
      <Transfer
        simple={{ retainSelectedItems }}
        dataSource={dataSource}
        defaultTargetKeys={['1', '2', '3']}
        titleTexts={['To-do list', 'Selected list']}
      />
    </div>
  );
}

export default App;
```
