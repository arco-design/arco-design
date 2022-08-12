import React, { useState } from 'react';
import { Tabs, Typography, Input, Button } from '@self';
import { IconEdit } from '@self/icon';

const TabPane = Tabs.TabPane;

let count = 10;

const initTabs = [...new Array(count)].map((x, i) => ({
  title: `Tab ${i + 1}`,
  key: `key${i + 1}`,
  content: `${i + 1}`,
}));

const TabTitle = (props: { title: string }) => {
  const { title } = props;
  const [editing, setEditing] = React.useState(true);
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', height: 40 }}>
      {editing ? (
        <Input
          autoFocus
          style={{ width: 30, margin: '10px' }}
          value={title}
          onBlur={() => setEditing(false)}
        />
      ) : (
        <div style={{ width: 30 }}>
          {title}
          <IconEdit style={{ marginLeft: 10 }} onClick={() => setEditing(true)} />
        </div>
      )}
    </div>
  );
};

function DemoTabs() {
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

  const handleDeleteTab = (key: string) => {
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
    <div>
      <Tabs
        editable
        type="card-gutter"
        activeTab={activeTab}
        onAddTab={handleAddTab}
        onDeleteTab={handleDeleteTab}
        onChange={setActiveTab}
        extra={<Button>我是一个超级超级超级长的Button</Button>}
      >
        {tabs.map((x, i) => (
          <TabPane destroyOnHide key={x.key} title={<TabTitle title={x.title} />}>
            <Typography.Paragraph
              style={{ textAlign: 'center', marginTop: 20 }}
            >{`Content of Tab Panel ${x.content}`}</Typography.Paragraph>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export const Demo = () => <DemoTabs />;

export default {
  title: 'Tabs',
};
