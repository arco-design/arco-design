---
order: 1
title:
  zh-CN: 手风琴模式
  en-US: Accordion
---

## zh-CN

手风琴模式。

## en-US

Render as Accordion.

```js
import { Collapse } from '@arco-design/web-react';
const CollapseItem = Collapse.Item;

const App = () => {
  return (
    <Collapse accordion style={{ maxWidth: 1180 }}>
      <CollapseItem header="Beijing Toutiao Technology Co., Ltd." name="1">
        Beijing Toutiao Technology Co., Ltd.
      </CollapseItem>
      <CollapseItem header="Beijing Toutiao Technology Co., Ltd." name="2">
        Beijing Toutiao Technology Co., Ltd.
      </CollapseItem>
      <CollapseItem header="Beijing Toutiao Technology Co., Ltd." name="3">
        Beijing Toutiao Technology Co., Ltd.
      </CollapseItem>
    </Collapse>
  );
};

export default App;
```
