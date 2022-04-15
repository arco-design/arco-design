---
order: 13
title:
  zh-CN: 自定义触发节点
  en-US: Custom Trigger
---

## zh-CN

设置 `triggerElement` 可以自定义触发下拉框的节点。当自定义了触发节点时，由于内部绑定的键盘处理事件失效，所以快捷键操作将不可用，需要通过组件引用的 `hotkeyHandler` 进行额外处理。

## en-US

Set `triggerElement` to customize the node that triggers the drop-down box. When the trigger element is customized, the shortcut key operation will not be available due to the invalidation of the internally bound keyboard processing functions, and additional processing needs to be performed through the `hotkeyHandler`.

```js
import { useState, useRef } from 'react';
import { Select, Typography, Link } from '@arco-design/web-react';

const Option = Select.Option;

const DemoSelect = () => {
  const refSelect = useRef(null);
  const [text, setText] = useState('None');

  return (
    <div>
      <Select
        ref={refSelect}
        mode="multiple"
        onChange={(_, option) => {
          const array = option.map((item) => item.children);
          setText(array.join('，') || 'None');
        }}
        triggerElement={
          <Typography.Paragraph
            style={{ width: 345 }}
            tabIndex={0}
            onKeyDown={(e) => {
              refSelect.current && refSelect.current.hotkeyHandler(e);
            }}
          >
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
