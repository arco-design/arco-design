import React, { useState } from 'react';
import { Tabs } from '@self';

const TabPane = Tabs.TabPane;

let count = 5;

const paneStyle = {
  width: '100%',
  height: 50,
  padding: '24px 0',
  color: '#939aa3',
};

const initTabs = [...new Array(20)].map((x, i) => ({
  title: `标签${i + 1}`,
  key: `key${i + 1}`,
  content: `标签${i + 1}内容`,
}));

function Demo() {
  const [tabs, setTabs] = useState(initTabs);
  const [activeTab, setActiveTab] = useState('key2');

  const handleAddTab = () => {
    const newTab = {
      title: `新标签${++count}`,
      key: `new key${count}`,
      content: `新标签${count}内容`,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.key);
  };

  const handleDeleteTab = (key) => {
    const index = tabs.findIndex((x) => x.key === key);

    if (index > -1) {
      const newTabs = tabs.map((item, i) => {
        if (i == index - 1) {
          return {
            ...item,
            title: `${item.title}yyy`,
          };
        }
        return item;
      });
      setTabs(newTabs.slice(0, index).concat(newTabs.slice(index + 1)));
    }
  };

  return (
    <div>
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
            <div style={paneStyle}>{`这里是${x.content}`}</div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default Demo;
