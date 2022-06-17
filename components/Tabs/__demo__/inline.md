---
order: 6
title: 
  zh-CN: 嵌套使用
  en-US: Nested
---

## zh-CN

组件可以嵌套使用。

## en-US

Components can be nested.

```js
import { Tabs, Typography } from '@arco-design/web-react';
const TabPane = Tabs.TabPane;
const style = {
  textAlign: 'center',
  marginTop: 20,
};

const App = () => {
  return (
    <Tabs tabPosition="left">
      <TabPane key="tab1" title="Tab 1">
        <div>
          <Tabs>
            <TabPane key="tab1" title="Tab 1">
              <Typography.Paragraph style={style}>Content of Tab Panel 1</Typography.Paragraph>
            </TabPane>
            <TabPane key="tab2" title="Tab 2">
              <Typography.Paragraph style={style}>Content of Tab Panel 2</Typography.Paragraph>
            </TabPane>
            <TabPane key="tab3" title="Tab 3">
              <Typography.Paragraph style={style}>Content of Tab Panel 3</Typography.Paragraph>
            </TabPane>
          </Tabs>
        </div>
      </TabPane>
      <TabPane key="tab2" title="Tab 2">
        <Typography.Paragraph>Content of Tab Panel 2</Typography.Paragraph>
      </TabPane>
      <TabPane key="tab3" title="Tab 3">
        <Typography.Paragraph>Content of Tab Panel 3</Typography.Paragraph>
      </TabPane>
    </Tabs>
  );
};

export default App;
```
