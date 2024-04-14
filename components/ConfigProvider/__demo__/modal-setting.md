---
order: 7
title:
  zh-CN: 局部修改 Modal 配置
  en-US: local settings Modal config
---

## zh-CN

通过 `ConfigProvider` 设置的 `prefixCls` 和 `rtl` 默认会作用在所有的 `Modal` 函数方法上，如果希望局部设置不影响全局配置，可以关闭 `effectGlobalModal`。

**此功能在2.61.0支持**

## en-US

`prefixCls` and `rtl` set through `ConfigProvider` will act on all `Modal` function methods by default. If you want local settings not to affect the global configuration, you can turn off `effectGlobalModal`.

**This is supported in 2.61.0**

```js
import React, { useState } from 'react';
import { Button, Space, ConfigProvider, Modal, Typography,Tabs } from '@arco-design/web-react';

function App() {
  const confirm = () => {
    Modal.confirm({
      title: 'Confirm deletion',
      content: 'Are you sure you want to delete the 3 selected items? Once you press the delete button, the items will be deleted immediately. You can’t undo this action.',
      okButtonProps: {
        status: 'danger',
      },
      onOk: () => {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch((e) => {
          Message.error({
            content: 'Error occurs!',
          });
          throw e;
        });
      },
    });
  };

  return (
    <Space direction="vertical" size={20}>
      <ConfigProvider rtl effectGlobalNotice={false} effectGlobalModal={false}>
        <Typography.Title heading={6}>局部 RTL 视图</Typography.Title>
        <Tabs defaultActiveTab='1' style={{ marginBottom: 20 }}>
          <Tabs.TabPane key='1' title='Tab 1' />
          <Tabs.TabPane key='2' title='Tab 2' />
          <Tabs.TabPane key='3' title='Tab 3' />
        </Tabs>
        <Space>
          <Button type='primary' onClick={confirm}>
            Confirm
          </Button>
        </Space>
      </ConfigProvider>
    </Space>
  );
}

export default App;
```

```css
.demo-holder-wrapper .arco-message-wrapper {
  left: 0;
}
```
