import React from 'react';
import { Button, Tag, DatePicker, TimePicker, Space, Typography } from '@self';
import { dayjs } from '@self/_util/dayjs';

function Demo() {
  return (
    <Space direction="vertical">
      <Space direction="vertical">
        <Typography.Title heading={4}>panelRender</Typography.Title>
        <DatePicker
          // shortcutsPlacementLeft
          showTime
          shortcuts={[
            {
              text: 'yesterday',
              value: () => dayjs().subtract(1, 'day'),
            },
            {
              text: 'today',
              value: () => dayjs(),
            },
            {
              text: 'a week later',
              value: () => dayjs().add(1, 'week'),
            },
            {
              text: 'a month later',
              value: () => dayjs().add(1, 'month'),
            },
            {
              text: '2 months later',
              value: () => dayjs().add(2, 'month'),
            },
          ]}
          panelRender={(panelNode) => {
            return (
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    borderRight: '1px solid var(--color-neutral-3)',
                    padding: 10,
                    boxSizing: 'border-box',
                  }}
                >
                  <Button type="primary">Left</Button>
                </div>
                <div>
                  <Button style={{ margin: 10 }} type="primary">
                    Select custom time
                  </Button>
                  {panelNode}
                  <Tag color="arcoblue">This is a custom footer</Tag>
                </div>
                <div
                  style={{
                    borderLeft: '1px solid var(--color-neutral-3)',
                    padding: 10,
                    boxSizing: 'border-box',
                  }}
                >
                  <Button type="primary">Right</Button>
                </div>
              </div>
            );
          }}
        />
      </Space>
    </Space>
  );
}

export default Demo;
