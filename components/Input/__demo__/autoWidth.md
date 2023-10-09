---
order: 12
title:
  zh-CN: 宽度自适应
  en-US: Auto Width
---

## zh-CN

通过 `autoWidth` 属性可以设置 `Input` 的宽度跟随文字自适应

## en-US

Through the `autoWidth` attribute, you can set the width of `Input` to adapt to the text.

```js
import { Input, Divider, Space,Typography, Popover } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <Divider>
        <Typography.Text code>{JSON.stringify({minWidth: 0, maxWidth: 500})}</Typography.Text>
      </Divider>

      <Input
        placeholder="Please Enter"
        autoWidth={{ maxWidth: 500}}
      />

      <Divider>
        <Typography.Text code>{JSON.stringify({minWidth: 300, maxWidth: 500})}</Typography.Text>
      </Divider>

      <Input autoWidth={{minWidth: 300, maxWidth: 500}}/>
      <br/><br/>
      <Input
        prefix="Prefix"
        autoWidth={{minWidth: 300, maxWidth: 500}}
      />
      <br/><br/>
      <Input
        addBefore="Before"
        prefix="Prefix"
        autoWidth={{minWidth: 300, maxWidth: 500}}
      />
      </div>
  );
};

export default App;
```
