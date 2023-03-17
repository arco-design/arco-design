import React, { useState } from 'react';
import { Tabs, Typography, Radio } from '@self';

const TabPane = Tabs.TabPane;
let count = 5;

const style: any = {
  textAlign: 'center',
  marginTop: 20,
};

function DemoTabs() {
  const [type, setType] = useState('line');
  const [position, setPosition] = useState('top');
  return (
    <div>
      <span style={{ marginRight: 20 }}>Size:</span>
      <Radio.Group
        type="button"
        name="position"
        value={position}
        onChange={setPosition}
        style={{ marginBottom: 40 }}
        options={['left', 'top', 'bottom', 'right']}
      ></Radio.Group>
      <br />
      <span style={{ marginRight: 20 }}>Type:</span>
      <Radio.Group name="type" value={type} onChange={setType} style={{ marginBottom: 40 }}>
        <Radio value="line">line</Radio>
        <Radio value="card">card</Radio>
        <Radio value="card-gutter">card-gutter</Radio>
        <Radio value="text">text</Radio>
        <Radio value="rounded">rounded</Radio>
        <Radio value="capsule">capsule</Radio>
      </Radio.Group>

      <Tabs tabPosition={position as any} type={type as any}>
        <TabPane key="1" title="Tab 1">
          <Typography.Paragraph style={style}>Content of Tab Panel 1</Typography.Paragraph>
        </TabPane>
        <TabPane key="2" title="Tab 2" disabled>
          <Typography.Paragraph style={style}>Content of Tab Panel 2</Typography.Paragraph>
        </TabPane>
        <TabPane key="3" title="Tab 3">
          <Typography.Paragraph style={style}>Content of Tab Panel 3</Typography.Paragraph>
        </TabPane>
        <TabPane key="4" title="Tab 4">
          <Typography.Paragraph style={style}>Content of Tab Panel 4</Typography.Paragraph>
        </TabPane>
      </Tabs>
    </div>
  );
}

export const Demo = () => <DemoTabs />;

export default {
  title: 'Tabs',
};
