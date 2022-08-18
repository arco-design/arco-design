---
order: 3
title: 
  zh-CN: 受控模式
  en-US: Control
---

## zh-CN

通过 `popupVisible` 和 `onVisibleChange` 控制下拉框的展开和收起。
具体 onVisibleChange 的触发时机可查看[Trigger](/react/components/trigger#受控用法)组件文档

## en-US

Use `popupVisible` and `onVisibleChange` to control the expansion and collapse of the drop-down box.
The specific trigger timing of onVisibleChange can be found in the [Trigger](/react/components/trigger#controlled-usage) component document

```js
import React from 'react';
import { Tooltip, Button, Switch, Typography } from '@arco-design/web-react';

const { Text } = Typography;

function App() {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <Text style={{ marginRight: 10, }} >
        {visible ? 'Hide' : 'Show'} Tooltip
      </Text>
      <Switch
        onChange={() => {
          setVisible(!visible);
        }}
      ></Switch>
      <br />
      <br />
      <Tooltip position="bottom" content="Mouse over to display tooltip" popupVisible={visible}>
        <Button>Be Controled</Button>
      </Tooltip>
    </div>
  );
}

export default App;
```
