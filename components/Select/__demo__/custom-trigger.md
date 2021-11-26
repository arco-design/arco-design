---
order: 13
title:
  zh-CN: 自定义触发节点
  en-US: Custom Trigger
---

## zh-CN

设置 `triggerElement` 可以自定义触发下拉框的节点。

## en-US

Set `triggerElement` to customize the node that triggers the drop-down box.

```js
import { useState } from 'react';
import { Select, Typography, Link } from '@arco-design/web-react';

const Option = Select.Option;

const DemoSelect = () => {
  const [text, setText] = useState('None');

  return (
    <div>
      <Select
        mode="multiple"
        onChange={(_, option) => {
          const array = option.map((item) => item.children);
          setText(array.join('，') || 'None');
        }}
        triggerElement={
          <Typography.Paragraph style={{ width: 345 }}>
            Favorite Cities：<Link>{text}</Link>
          </Typography.Paragraph>
        }
      >
        <Option value="1">Beijing</Option>
        <Option disabled value="2">
          Shanghai
        </Option>
        <Option value="3">Shenzhen</Option>
        <Option value="4">Wuhan</Option>
      </Select>
    </div>
  );
};

ReactDOM.render(<DemoSelect />, CONTAINER);
```
