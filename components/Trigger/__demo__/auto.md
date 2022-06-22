---
order: 2
title: 自动调整位置
skip: true
---

自动调整弹出层位置。

```js
import React from 'react';
import { Button, Popconfirm, Message, ResizeBox } from '@arco-design/web-react';

const props = {
  getPopupContainer: () => document.querySelector('.popup-container'),
  title: '确认编辑该选项吗？',
  onOk: () => {
    Message.info({
      content: '你点击了确认',
    });
  },
  onCancel: () => {
    Message.error({
      content: '你点击了取消',
    });
  },
};

class App extends React.Component {
  render() {
    return (
      <div
        className="popup-container"
        directions={['right', 'bottom']}
        style={{
          width: 300,
          height: 300,
          overflow: 'auto',
        }}
      >
        <div
          style={{
            width: 450,
            height: 300,
            position: 'relative',
          }}
        >
          <Popconfirm position="bottom" {...props} getPopupContainer={(node) => node.parentElement}>
            <Button style={{ margin: '0 200px' }}>popover</Button>
          </Popconfirm>
        </div>
      </div>
    );
  }
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
