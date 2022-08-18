---
order: 4
title: 
  zh-CN: 按钮状态
  en-US: Status
---

## zh-CN

按钮状态分为 警告，危险，成功 三种，可以与按钮类型同时生效，优先级高于按钮类型。

## en-US

Buttons can be in `warning`, `danger`, and `success` status. Status can co-exist with `type` but with higher priority.

```js
import { Button, Switch } from '@arco-design/web-react';

const App = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 100px)',
        gridRowGap: 24,
        gridColumnGap: 24,
      }}
    >
      <Button type="primary" status="warning">
        Warning
      </Button>
      <Button status="warning">Warning</Button>
      <Button type="outline" status="warning">
        Warning
      </Button>
      <Button type="text" status="warning">
        Warning
      </Button>

      <Button type="primary" status="danger">
        Danger
      </Button>
      <Button status="danger">Danger</Button>
      <Button type="outline" status="danger">
        Danger
      </Button>
      <Button type="text" status="danger">
        Danger
      </Button>

      <Button type="primary" status="success">
        Success
      </Button>
      <Button status="success">Success</Button>
      <Button type="outline" status="success">
        Success
      </Button>
      <Button type="text" status="success">
        Success
      </Button>
    </div>
  );
};

export default App;
```
