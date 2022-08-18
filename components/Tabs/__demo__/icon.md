---
order: 1
title:
  zh-CN: 带图标的页签
  en-US: Icon
---

## zh-CN

通过自定义的 title, 可以给页签加 icon。

## en-US

You can add an icon to the tab through a custom title.

```js
import { Tabs, Typography } from '@arco-design/web-react';
import { IconCalendar, IconClockCircle, IconUser } from '@arco-design/web-react/icon';
const TabPane = Tabs.TabPane;
const style = {
  textAlign: 'center',
  marginTop: 20,
};

const App = () => {
  return (
    <Tabs defaultActiveTab="1">
      <TabPane
        key="1"
        title={
          <span>
            <IconCalendar style={{ marginRight: 6 }} />
            Tab 1
          </span>
        }
      >
        <Typography.Paragraph style={style}>Content of Tab Panel 1</Typography.Paragraph>
      </TabPane>
      <TabPane
        key="2"
        title={
          <span>
            <IconClockCircle style={{ marginRight: 6 }} />
            Tab 2
          </span>
        }
        disabled
      >
        <Typography.Paragraph style={style}>Content of Tab Panel 2</Typography.Paragraph>
      </TabPane>
      <TabPane
        key="3"
        title={
          <span>
            <IconUser style={{ marginRight: 6 }} />
            Tab 3
          </span>
        }
      >
        <Typography.Paragraph style={style}>Content of Tab Panel 3</Typography.Paragraph>
      </TabPane>
    </Tabs>
  );
};

export default App;
```
