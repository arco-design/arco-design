---
order: 1
title:
  zh-CN: 可关闭标签
  en-US: Close
---

## zh-CN

可设置 `closable` 属性控制标签是否可关闭，可关闭标签可通过 `onClose` 事件执行一些关闭后操作。也可通过 `visible` 属性控制标签的显示隐藏。

## en-US

The `closable` attribute can be set to control whether the label can be closed, and the closed label can perform some post-closing operations through the `onClose` event. You can also control the display and hide of the label through the `visible` property.

```js
import { useState } from 'react';
import { Tag, Button, Switch, Typography } from '@arco-design/web-react';
import { IconStar } from '@arco-design/web-react/icon';

function App() {
  const [visible, setVisible] = useState(true);

  function onClose() {
    setVisible(!visible);
  }

  return (
    <div>
      <Tag
        closable
        visible={visible}
        onClose={onClose}
        style={{ margin: '0 24px', }}
      >
        Tag
      </Tag>
      <Tag icon={<IconStar />} closable visible={visible} onClose={onClose}>
        Tag
      </Tag>
      <div
        style={{ marginTop: 24, }}
      >
        <Switch
          style={{ margin: '0 8px', }}
          size="small"
          checked={visible}
          onChange={onClose}
        />
        <Typography.Text>Toggle</Typography.Text>
      </div>
    </div>
  );
}

export default App;
```
