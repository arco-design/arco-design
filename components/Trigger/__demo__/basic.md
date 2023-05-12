---
order: 0
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

这个例子展示了触发器的最基础的使用。`Trigger` 组件默认是没有弹出框的样式的。以下示例均为官网添加的样式。

## en-US

The basic usage. The popup layer has no style by default.

```js
import { Trigger, Button, Tooltip, Input, Skeleton, Typography,Space } from '@arco-design/web-react';

function Element(props) {
  return (
    <Typography.Text {...props} style={{ marginRight: 20 }}>
      Hover me
    </Typography.Text>
  );
}

function Popup() {
  return (
    <div className="demo-trigger-popup" style={{ width: 300 }}>
      <Tooltip content="123" defaultPopupVisible>
        <span>123123</span>
      </Tooltip>
      <Skeleton />
    </div>
  );
}

function App() {
  return (
    <Space style={{ width: 1000, overflow: 'auto' }} size={40}>
      <Trigger
        popup={() => <Popup />}
        mouseEnterDelay={400}
        mouseLeaveDelay={400}
        position="bottom"
      >
        <Element />
      </Trigger>
      <Trigger  popup={() => <Popup />} trigger="click" position="bottom" classNames="zoomInTop">
        <Button>Click me</Button>
      </Trigger>
      <Trigger popup={() => <Popup />} trigger="focus" position="top" classNames="zoomInBottom">
        <Input style={{ width: 200 }} placeholder="Focus on me" />
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
