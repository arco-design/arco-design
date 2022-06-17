---
order: 5
title:
  zh-CN: 更新位置
  en-US: Update position
---

```js
import React from 'react';
import { Trigger, Button, Input, Skeleton, Typography } from '@arco-design/web-react';

function App() {
  const [visible, setVisible] = React.useState(false);
  const triggerRef = React.useRef();
  return (
    <Trigger
      ref={triggerRef}
      alignPoint
      trigger="click"
      position="bl"
      popupVisible={visible}
      onClickOutside={() => {
        setVisible(false);
      }}
      popup={() => (
        <div className="demo-trigger-popup" style={{ width: 300 }}>
          <Skeleton />
        </div>
      )}
    >
      <div
        className="demo-trigger-manual"
        onClick={() => {
          if (visible) {
            triggerRef.current.update();
          } else {
            setVisible(true);
          }
        }}
      >
        <Typography.Text>Click</Typography.Text>
      </div>
    </Trigger>
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

.demo-trigger-manual {
  width: 100%;
  height: 400px;
  background-color: var(--color-fill-2);
  line-height: 400px;
  text-align: center;
  font-size: 20px;
}
```
