import React, { useState } from 'react';
import { Tabs, Typography, Button } from '@self';

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

function DemoTabs() {
  const [tabs, setTabs] = useState(initTabs);
  const [activeTab, setActiveTab] = useState('key2');
  const [bool, setBool] = useState(true);

  const handleAddTab = () => {
    const newTab = {
      title: `New Tab${++count}`,
      key: `new key${count}`,
      content: `${count}`,
    };
    setTabs([...tabs, newTab]);
    if (tabs.length >= 10) {
      setBool(false);
    }
    setActiveTab(newTab.key);
  };

  return (
    <Tabs
      editable={bool}
      addButton={<Button onClick={handleAddTab}>{tabs.length} +</Button>}
      showAddButton
      activeTab={activeTab}
      onChange={setActiveTab}
      extra={<Button>a</Button>}
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

export const Demo = () => <DemoTabs />;

export default {
  title: 'Tabs',
};
