---
order: 4
title: 
  zh-CN: 动态增减页签
  en-US: Dynamic Tab
---

## zh-CN

动态增减页签。仅在 `type=card | card-gutter`的时候生效。

## en-US

Dynamically add or subtract tabs. Only effective when `type=card | card-gutter`.

```js
import { useState } from 'react';
import { Tabs, Typography } from '@arco-design/web-react';
const TabPane = Tabs.TabPane;
let count = 5;
const style = {
  textAlign: 'center',
  marginTop: 20,
};
const initTabs = [...new Array(count)].map((x, i) => ({
  title: `Tab ${i + 1}`,
  key: `key${i + 1}`,
  content: `${i + 1}`,
}));

function App() {
  const [tabs, setTabs] = useState(initTabs);
  const [activeTab, setActiveTab] = useState('key2');

  const handleAddTab = () => {
    const newTab = {
      title: `New Tab${++count}`,
      key: `new key${count}`,
      content: `${count}`,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.key);
  };

  const handleDeleteTab = (key) => {
    const index = tabs.findIndex((x) => x.key === key);
    const newTabs = tabs.slice(0, index).concat(tabs.slice(index + 1));

    if (key === activeTab && index > -1 && newTabs.length) {
      setActiveTab(newTabs[index] ? newTabs[index].key : newTabs[index - 1].key);
    }

    if (index > -1) {
      setTabs(newTabs);
    }
  };

  return (
    <Tabs
      editable
      type="card-gutter"
      activeTab={activeTab}
      onAddTab={handleAddTab}
      onDeleteTab={handleDeleteTab}
      onChange={setActiveTab}
    >
      {tabs.map((x, i) => (
        <TabPane destroyOnHide key={x.key} title={x.title}>
          <Typography.Paragraph
            style={style}
          >{`Content of Tab Panel ${x.content}`}</Typography.Paragraph>
        </TabPane>
      ))}
    </Tabs>
  );
}

export default App;
```
