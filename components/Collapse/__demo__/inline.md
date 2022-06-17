---
order: 2
title:
  zh-CN: 嵌套面板
  en-US: Nested Panels
---

## zh-CN

嵌套面板。

## en-US

Nested panels.

```js
import { Collapse } from '@arco-design/web-react';
const CollapseItem = Collapse.Item;

const App = () => {
  return (
    <Collapse
      defaultActiveKey={['1', '2']}
      style={{ maxWidth: 1180 }}
    >
      <CollapseItem header="Beijing Toutiao Technology Co., Ltd." name="1">
        <Collapse defaultActiveKey={'1.1'}>
          <CollapseItem header="Beijing Toutiao Technology Co., Ltd." name="1.1">
            Beijing Toutiao Technology Co., Ltd.
          </CollapseItem>
          <CollapseItem header="Beijing Toutiao Technology Co., Ltd." name="1.2">
            Beijing Toutiao Technology Co., Ltd.
          </CollapseItem>
        </Collapse>
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
