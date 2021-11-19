import React, { useState } from 'react';
import { Tabs, Typography, Space } from '@self';

const { TabPane } = Tabs;
let count = 20;

const style = { textAlign: 'center', marginTop: 20 };

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
    <Space direction="vertical" size={30}>
      <Tabs
        editable
        type="card-gutter"
        activeTab={activeTab}
        onAddTab={handleAddTab}
        onDeleteTab={handleDeleteTab}
        onChange={setActiveTab}
        type="capsule"
        offsetAlign={1000}
        style={{ width: '500px' }}
      >
        {tabs.map((x, i) => (
          <TabPane destroyOnHide key={x.key} title={x.title}>
            <Typography.Paragraph
              style={style}
            >{`Content of Tab Panel ${x.content}`}</Typography.Paragraph>
          </TabPane>
        ))}
      </Tabs>

      <Tabs
        editable
        type="card-gutter"
        activeTab={activeTab}
        onAddTab={handleAddTab}
        onDeleteTab={handleDeleteTab}
        onChange={setActiveTab}
        offsetAlign={1000}
        style={{ width: '500px' }}
      >
        {tabs.map((x, i) => (
          <TabPane destroyOnHide key={x.key} title={x.title}>
            <Typography.Paragraph
              style={style}
            >{`Content of Tab Panel ${x.content}`}</Typography.Paragraph>
          </TabPane>
        ))}
      </Tabs>

      <Tabs
        editable
        type="card-gutter"
        activeTab={activeTab}
        onAddTab={handleAddTab}
        onDeleteTab={handleDeleteTab}
        onChange={setActiveTab}
        tabPosition="left"
        offsetAlign={54}
        style={{ height: '300px' }}
      >
        {tabs.map((x, i) => (
          <TabPane destroyOnHide key={x.key} title={x.title}>
            <Typography.Paragraph
              style={style}
            >{`Content of Tab Panel ${x.content}`}</Typography.Paragraph>
          </TabPane>
        ))}
      </Tabs>
    </Space>
  );
}

export default App;
