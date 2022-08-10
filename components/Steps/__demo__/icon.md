---
order: 3
title: 
  zh-CN: 自定义图标
  en-US: Customize Icon
---

## zh-CN

指定`icon`可以自定义图标显示。

## en-US

Specify `icon` to customize the icon of the node.

```js
import { Steps } from '@arco-design/web-react';
import { IconHome, IconLoading, IconThumbUp } from '@arco-design/web-react/icon';
const Step = Steps.Step;

const App = () => {
  return (
    <Steps current={2}>
      <Step icon={<IconHome />} title="Succeeded" description="This is a description" />
      <Step icon={<IconLoading />} title="Processing" description="This is a description" />
      <Step icon={<IconThumbUp />} title="Pending" description="This is a description" />
    </Steps>
  );
};

export default App;
```
