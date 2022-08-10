---
order: 3
title:
  zh-CN: 交互按钮
  en-US: Trigger icon
---

## zh-CN

可以通过 `triggerIcon` `triggerType` 来定制交互按钮，类型有 `mask (遮罩)` 和 `button (按钮)` 两种，通过 `onClick` 参数来添加回调。

## en-US

Customize the interactive button through `triggerIcon` and `triggerType`. Two types are available: `mask` and `button`. Callbacks can be added through the `onClick` parameter.

```js
import { Avatar, Message, Space } from '@arco-design/web-react';
import { IconUser, IconCamera, IconEdit, IconClose } from '@arco-design/web-react/icon';

const App = () => {
  return (
    <Space size="large">
      <Avatar
        triggerIcon={<IconCamera />}
        triggerIconStyle={{
          color: '#3491FA',
        }}
        onClick={() => Message.info('Upload...')}
        autoFixFontSize={false}
        style={{
          backgroundColor: '#168CFF',
        }}
      >
        A
      </Avatar>
      <Avatar
        triggerIcon={<IconEdit />}
        onClick={() => Message.info('Upload...')}
        style={{ backgroundColor: '#14C9C9' }}
      >
        <IconUser />
      </Avatar>
      <Avatar
        shape="square"
        triggerIcon={<IconEdit />}
        onClick={() => Message.info('Upload...')}
        style={{ backgroundColor: '#FFC72E' }}
      >
        <IconUser />
      </Avatar>
      <Avatar triggerIcon={<IconCamera />} triggerType="mask">
        <img
          alt="avatar"
          src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
        />
      </Avatar>
    </Space>
  );
};

export default App;
```
