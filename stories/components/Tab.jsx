import React, { useState } from 'react';
import { Tabs, Typography, Input } from '@self';
import { IconEdit } from '@self/icon';

const TabPane = Tabs.TabPane;

let count = 10;

const style = { textAlign: 'center', marginTop: 20 };

const initTabs = [...new Array(count)].map((x, i) => ({
  title: `Tab ${i + 1}`,
  key: `key${i + 1}`,
  content: `${i + 1}`,
}));

const TabTitle = (props) => {
  const { title } = props;
  const [editing, setEditing] = React.useState(true);
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', height: 40 }}>
      {editing ? (
        <Input
          autoFocus
          style={{ width: 200, margin: '10px' }}
          value={title}
          onBlur={() => setEditing(false)}
        />
      ) : (
        <div style={{ width: 200 }}>
          {title}
          <IconEdit style={{ marginLeft: 10 }} onClick={() => setEditing(true)} />
        </div>
      )}
    </div>
  );
};

function Demo() {
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
    <div style={{ width: '600px' }}>
      <Tabs
        editable
        type="card-gutter"
        activeTab={activeTab}
        onAddTab={handleAddTab}
        onDeleteTab={handleDeleteTab}
        onChange={setActiveTab}
      >
        {tabs.map((x, i) => (
          <TabPane destroyOnHide key={x.key} title={<TabTitle title={x.title} />}>
            <Typography.Paragraph
              style={style}
            >{`Content of Tab Panel ${x.content}`}</Typography.Paragraph>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default Demo;
