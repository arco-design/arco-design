---
order: 3
title:
  zh-CN: 多个触发方式
  en-US: multiple trigger
---

## zh-CN

通过`trigger`传入数组，可以设置多个触发方式。

## en-US

the `trigger` property can be an array.

```js
import { Trigger, Button, Input, Skeleton, Typography, Space } from '@arco-design/web-react';

function Popup() {
  return (
    <div className="demo-trigger-popup" style={{ width: 300 }}>
      <Skeleton />
    </div>
  );
}

function App() {
  return (
    <Space size={40}>
      <Trigger
        popup={() => <Popup />}
        trigger={['click', 'hover']}
        clickToClose={false}
        classNames="zoomInTop"
      >
        <Button>Click/Hover Me</Button>
      </Trigger>
      <Trigger
        popup={() => (
          <Typography.Paragraph className="demo-trigger-popup">
            This popup will be hidden when Input triggers the blur or click. If you don't want to
            hide it when blur, you can set blurToHide=false. If you don't want to hide when you
            click, you can set clickToClose=false.
          </Typography.Paragraph>
        )}
        trigger={['hover', 'click', 'focus']}
      >
        <Input style={{ width: 200 }} placeholder="Click/Hover/Focus Me" />
      </Trigger>
      <Trigger popup={() => <Popup />} trigger={['hover', 'focus']} blurToHide={false}>
        <Input style={{ width: 200 }} placeholder="Hover/Focus Me" />
      </Trigger>
    </Space>
  );
}

export default App;
```

```css:silent
.demo-trigger-popup {
  padding: 10px;
  width: 300px;
  text-align: center;
  background-color: var(--color-bg-popup);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}
```
