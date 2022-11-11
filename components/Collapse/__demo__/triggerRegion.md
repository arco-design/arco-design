---
order: 9
title:
  zh-CN: 指定折叠触发区域
  en-US: Specify Folding Trigger Area
---

## zh-CN

通过 `triggerRegion` 属性，设置面板可以触发折叠的区域。

## en-US

Through the `triggerRegion`, set the region that can trigger collapsing.

```js
import { Collapse, Divider } from '@arco-design/web-react';
const CollapseItem = Collapse.Item;

const App = () => {
  return (
    <Collapse
      style={{ maxWidth: 1180 }}
      defaultActiveKey={['1']}
      triggerRegion="header"
    >
      <CollapseItem header="Beijing Toutiao Technology Co., Ltd." name="1">
        Beijing Toutiao Technology Co., Ltd.
        <Divider style={{ margin: '8px 0' }}/>
        Beijing Toutiao Technology Co., Ltd.
        <Divider style={{ margin: '8px 0' }}/>
        Beijing Toutiao Technology Co., Ltd.
      </CollapseItem>
    </Collapse>
  );
};

export default App;
```
