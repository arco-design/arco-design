---
order: 6
title:
  zh-CN: 自定义弹出框宽度
  en-US: Custom Popup Width
---

## zh-CN

这个例子展示了弹出框可以根据内容自动调节宽度，最小宽度为输入框的宽度。
`triggerProps.autoAlignPopupWidth` 参数为弹出框宽度跟输入框保持一致。
`triggerProps.autoAlignPopupMinWidth` 参数为弹出框最小宽度跟输入框保持一致。
可以自由组合。

## en-US

This example shows that the pop-up box can automatically adjust the width according to the content, and the minimum width is the width of the input box.
The `triggerProps.autoAlignPopupWidth` property is to keep the width of popup box consistent with the input box.
The `triggerProps.autoAlignPopupMinWidth` property is to keep the minimum width of the popup box consistent with the input box.
They can be freely combined.

```js
import { Select, Space } from '@arco-design/web-react';
const Option = Select.Option;

const App = () => {
  return (
    <Space size="large">
      <Select
        placeholder="Please select"
        style={{ width: 154 }}
        triggerProps={{
          autoAlignPopupWidth: false,
          position: 'bl',
        }}
      >
        <Option value="1">Beijing</Option>
        <Option disabled value="2">
          Shanghai
        </Option>
        <Option value="3">Guangzhou</Option>
        <Option value="4">Shenzhen</Option>
      </Select>
      <Select
        placeholder="Please select"
        style={{ width: 154 }}
        triggerProps={{
          autoAlignPopupWidth: false,
          autoAlignPopupMinWidth: true,
          position: 'bl',
        }}
      >
        <Option value="1">Beijing Beijing Beijing Beijing Beijing</Option>
        <Option disabled value="2">
          Shanghai
        </Option>
        <Option value="3">Guangzhou</Option>
        <Option value="4">Shenzhen</Option>
      </Select>
    </Space>
  );
};

export default App;
```
