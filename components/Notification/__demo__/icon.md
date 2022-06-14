---
order: 5
title:
  zh-CN: 自定义图标
  en-US: Customize icon
---

## zh-CN

设置 `icon` 来自定义图标。

## en-US

Set `icon` to customize the icon.

```js
import { Notification, Button, Icon, Space } from '@arco-design/web-react';
import { IconFaceSmileFill } from '@arco-design/web-react/icon';
const IconFont = Icon.addFromIconFontCn({
  src: '//at.alicdn.com/t/font_180975_26f1p759rvn.js',
});

const App = () => {
  return (
    <Space size="large">
      <Button
        onClick={() =>
          Notification.info({
            icon: <IconFont type="icon-info" />,
            title: 'Upgrade',
            content: 'Ready to upgrade ArcoDesign 2.0',
          })
        }
        type="primary"
        style={{ marginBottom: 20 }}
      >
        Info (Light)
      </Button>
      <Button
        onClick={() =>
          Notification.success({
            icon: <IconFont type="icon-success" />,
            title: 'Success',
            content: 'ArcoDesign 2.0 upgrade completed!',
          })
        }
        type="primary"
        status="success"
        style={{ marginBottom: 24 }}
      >
        Success (Light)
      </Button>
      <Button
        onClick={() =>
          Notification.warning({
            icon: <IconFont type="icon-warning" />,
            title: 'Warning',
            content: 'Current version is at risk!',
          })
        }
        type="primary"
        status="warning"
        style={{ marginBottom: 24 }}
      >
        Warning (Light)
      </Button>
      <Button
        onClick={() =>
          Notification.error({
            icon: <IconFont type="icon-error" />,
            title: 'Error',
            content: 'Failed to upgrade ArcoDesign 2.0!',
          })
        }
        type="primary"
        status="danger"
        style={{ marginBottom: 24 }}
      >
        Error (Light)
      </Button>
      <Button
        onClick={() =>
          Notification.info({
            icon: <IconFaceSmileFill />,
            title: 'Upgrade',
            content: 'Ready to upgrade ArcoDesign 2.0!',
          })
        }
        type="secondary"
        style={{ marginBottom: 24 }}
      >
        Smile
      </Button>
    </Space>
  );
};

export default App;
```
