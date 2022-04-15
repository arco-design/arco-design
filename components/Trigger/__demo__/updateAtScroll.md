---
order: 8
title:
  zh-CN: 滚动容器
  en-US: updateOnScroll
---

## zh-CN

通过设置 `updateOnScroll` 监听容器的滚动。

## en-US

Listen for container scrolling by setting `updateOnScroll`.


```js
import { Trigger, Button, Input, Skeleton } from '@arco-design/web-react';

function Popup () {
  return  <Skeleton className="demo-trigger-popup" style={{width: 300}} />;
}

function Demo () {

  return <div style={{ background: 'var(--color-fill-2)', padding: 40, height: 100, overflow: 'auto' }}>

    <div style={{height: 200}}>
      <Trigger
        trigger="click"
        position="bottom"
        popup={() => <Popup/>}
        updateOnScroll
      >
        <Button type="primary" style={{marginTop: 80}}>Button</Button>
      </Trigger>
    </div>
  </div>
}

ReactDOM.render(<Demo />, CONTAINER);

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
