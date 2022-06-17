---
order: 3
title: 
  zh-CN: 附加
  en-US: Extra Content
---

## zh-CN

通过 `extra` 可以在页签的右侧添加额外内容。

## en-US

You can add extra content on the right side of the tabs through `extra`.

```js
import { Tabs, Button, Typography } from '@arco-design/web-react';
const TabPane = Tabs.TabPane;
const style = {
  textAlign: 'center',
  marginTop: 20,
};

const App = () => {
  return (
    <Tabs
      defaultActiveTab="1"
      extra={
        <Button size="small" type="secondary">
          Action
        </Button>
      }
    >
      <TabPane key="1" title="Tab 1">
        <Typography.Paragraph style={style}>Content of Tab Panel 1</Typography.Paragraph>
      </TabPane>
      <TabPane key="2" title="Tab 2" disabled>
        <Typography.Paragraph style={style}>Content of Tab Panel 2</Typography.Paragraph>
      </TabPane>
      <TabPane key="3" title="Tab 3">
        <Typography.Paragraph style={style}>Content of Tab Panel 3</Typography.Paragraph>
      </TabPane>
    </Tabs>
  );
};

export default App;
```
