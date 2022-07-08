---
order: 1
title:
  zh-CN: 受控用法
  en-US: Controlled
---

## zh-CN

这个例子展示了如何完全控制弹出层的展示和隐藏。
可以通过 `defaultPopupVisible` 设置默认的展开状态。

## en-US

Control the visibility of the popup.

```js
import React from 'react';
import { Trigger, Button, Input, Skeleton,Space } from '@arco-design/web-react';

function Popup() {
  return (
    <div className="demo-trigger-popup" style={{ width: 300 }}>
      <Skeleton />
    </div>
  );
}

function App() {
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [visible3, setVisible3] = React.useState(false);
  return (
    <Space size={40}>
      <Trigger
        popupVisible={visible}
        popup={() => <Popup />}
        trigger="click"
        classNames="zoomInTop"
        onVisibleChange={(visible) => {
          setVisible(visible);
        }}
      >
        <Button >Click Me (controlled)</Button>
      </Trigger>
      <Trigger
        popupVisible={visible3}
        popup={() => <Popup />}
        trigger="click"
        classNames="zoomInTop" // Trigger 组件在弹出层显示时监听了`getDocument()` 返回元素的 mousedown 事件。如果触发 mousedown 的元素不存在于触发节点和弹出层，则触发 `props.onClickOutside` 回调函数
        onClickOutside={() => {
          setVisible3(false);
        }}
      >
        <Button
          onClick={() => {
            setVisible3(!visible3);
          }}
        >
          no onVisibleChange (controlled)
        </Button>
      </Trigger>
      <Trigger
        blurToHide={false}
        popupVisible={visible2}
        popup={() => <Popup />}
        trigger="focus"
        classNames="zoomInTop"
        onClickOutside={() => {
          setVisible2(false);
        }}
        onVisibleChange={(visible) => {
          setVisible2(visible);
        }}
      >
        <Input style={{ width: 200 }} placeholder="Focus Me (controlled)"></Input>
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
