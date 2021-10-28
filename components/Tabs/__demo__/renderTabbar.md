---
order: 8
title: 
  zh-CN: 自定义选项卡头部
  en-US: Customize Header
---

## zh-CN

使用 `react-stickynode` 实现选项卡头部吸顶效果。

## en-US

Cooperate with `react-stickynode` to achieve the effect of header sticky.

```js
import { Tabs, Typography } from '@arco-design/web-react';
import Sticky from 'react-stickynode';

const TabPane = Tabs.TabPane;

const style = { textAlign: 'center', marginTop: 20 };


ReactDOM.render(
  <Tabs className="bottomBoundary" defaultActiveTab="3" renderTabHeader={(props, DefaultTabHeader) => {
    return <Sticky innerZ={3} top="#navbar" bottomBoundary=".bottomBoundary" >
          <DefaultTabHeader {...props} />
      </Sticky>
    }}>
    <TabPane key="1" title="Tab 1" style={{height: 300}}>
      <Typography.Paragraph style={style}>Content of Tab Panel  1</Typography.Paragraph>
    </TabPane>
    <TabPane key="2" title="Tab 2">
      <Typography.Paragraph style={style}>Content of Tab Panel  2</Typography.Paragraph>
    </TabPane>
    <TabPane key="3" title="Tab 3">
      <Typography.Paragraph style={style}>Content of Tab Panel  3</Typography.Paragraph>
    </TabPane>
  </Tabs>,
  CONTAINER
);
```
