---
order: 4
title:
  zh-CN: 自定义文案
  en-US: Customize text
---

## zh-CN

自定义开关打开（关闭）时需要显示的文字或者图标。

## en-US

Customize the text or icon to be displayed when the switch is turned on (off).

```js
import { Switch, Space } from '@arco-design/web-react';
import { IconCheck, IconClose } from '@arco-design/web-react/icon';

const App = () => {
  return (
    <Space size="large">
      <Switch checkedText="ON" uncheckedText="OFF" />
      <Switch checkedText="1" uncheckedText="0" type="round" defaultChecked />
      <Switch checkedText={<IconCheck />} uncheckedText={<IconClose />} defaultChecked />
    </Space>
  );
};

export default App;
```
