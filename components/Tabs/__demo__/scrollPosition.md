---
order: 12
title:
  zh-CN: 滚动偏移位置
  en-US: The active tab's scroll  position
---

## zh-CN

支持设置 `scrollPosition` 来改变选中的选项卡的滚动位置

## en-US

Support scrolling operation via scroll wheel or touch pad.

```js
import { useState } from 'react';
import { Tabs, Radio, Space } from '@arco-design/web-react';
const TabPane = Tabs.TabPane;
const paneStyle = {
  width: '100%',
  height: 50,
  padding: '24px 0',
  color: '#939aa3',
};
const tabs = [...new Array(30)].map((x, i) => ({
  title: `标签${i + 1}`,
  key: `key${i + 1}`,
  content: `标签${i + 1}内容`,
}));

function App() {
  const [direction, setDirection] = useState('horizontal');
  const [position, setPosition] = useState('auto');
  return (
    <div>
      <Space direction="vertical" style={{ marginBottom: 40 }}>
        <Radio.Group
          type="button"
          name="direction"
          value={direction}
          onChange={setDirection}
          options={['horizontal', 'vertical']}
        ></Radio.Group>
        <Radio.Group
          type="button"
          name="direction"
          value={position}
          onChange={setPosition}
          options={['auto', 'start', 'end', 'center']}
        ></Radio.Group>
      </Space>

      <Tabs
        defaultActiveTab="key1"
        direction={direction}
        style={{ height: 200 }}
        scrollPosition={position}
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

export default App;
```
