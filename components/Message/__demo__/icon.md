---
order: 2
title:
  zh-CN: 自定义图标
  en-US: Customize icon
---

## zh-CN

设置 `icon` 来自定义图标。

## en-US

Set `icon` to customize the icon.

```js
import { Message, Button, Icon, Space } from '@arco-design/web-react';
import { IconFaceSmileFill } from '@arco-design/web-react/icon';
const IconFont = Icon.addFromIconFontCn({
  src: '//at.alicdn.com/t/font_180975_26f1p759rvn.js',
});

const App = () => {
  return (
    <Space size="large">
      <Button
        onClick={() =>
          Message.info({
            icon: <IconFont type="icon-info" />,
            content: 'This is an info message!',
          })
        }
        type="primary"
      >
        Info (Light)
      </Button>
      <Button
        onClick={() =>
          Message.success({
            icon: <IconFont type="icon-success" />,
            content: 'This is a primary message!',
          })
        }
        type="primary"
        status="success"
      >
        Success (Light)
      </Button>
      <Button
        onClick={() =>
          Message.warning({
            icon: <IconFont type="icon-warning" />,
            content: 'This is a warning message!',
          })
        }
        type="primary"
        status="warning"
      >
        Warning (Light)
      </Button>
      <Button
        onClick={() =>
          Message.error({
            icon: <IconFont type="icon-error" />,
            content: 'This is an error message!',
          })
        }
        type="primary"
        status="danger"
      >
        Error (Light)
      </Button>
      <Button
        onClick={() =>
          Message.info({
            icon: <IconFaceSmileFill />,
            content: 'This is a message!',
          })
        }
        type="secondary"
      >
        Smile
      </Button>
    </Space>
  );
};

export default App;
```
