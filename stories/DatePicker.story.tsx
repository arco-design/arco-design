/* eslint-disable no-console */
import React from 'react';
import { Button, ConfigProvider, DatePicker, Tag, TimePicker, Typography, Space } from '@self';
// import enUS from '@self/locale/en-US';
// import zhCN from '@self/locale/zh-CN';
// import zhTW from '@self/locale/zh-TW';
// import zhDE from '@self/locale/de-DE';
// import koKR from '@self/locale/ko-KR';
// import thTH from '@self/locale/th-TH';
// @ts-ignore
import jaJP from '@self/locale/ja-JP';
// @ts-ignore
import { dayjs } from '@self/_util/dayjs';

function DemoTimezone() {
  return (
    <ConfigProvider locale={jaJP}>
      <Typography.Title>Shortcuts</Typography.Title>
      <DatePicker
        utcOffset={0}
        style={{ width: 200, marginBottom: 24, marginRight: 24 }}
        shortcuts={[
          {
            text: '1 hour later',
            value: () => dayjs().add(1, 'hour'),
          },
        ]}
        showTime
      />
      <Typography.Title>disabledDate</Typography.Title>
      <DatePicker
        utcOffset={2}
        style={{ width: 200, marginBottom: 24, marginRight: 24 }}
        disabledDate={(current) => {
          console.log(current);
          return current.isBefore(dayjs());
        }}
        showTime
      />
      <Typography.Title>Asia/Shanghai</Typography.Title>
      <DatePicker timezone="Asia/Shanghai" showTime onChange={(v, dv) => console.log(v, dv)} />
      <br />
      <TimePicker
        timezone="Asia/Shanghai"
        onSelect={(v, dv) => console.log(v, dv)}
        style={{ marginTop: 20 }}
      />

      <Typography.Title>America/New_York</Typography.Title>
      <DatePicker timezone="America/New_York" showTime onChange={(v, dv) => console.log(v, dv)} />
      <br />
      <TimePicker
        timezone="America/New_York"
        onSelect={(v, dv) => console.log(v, dv)}
        style={{ marginTop: 20 }}
      />

      <Typography.Title>Europe/London</Typography.Title>
      <DatePicker
        utcOffset={0}
        showTime
        onSelect={(v, dv) => console.log('onSelect', v, dv)}
        onChange={(v, dv) => console.log('onChange', v, dv)}
      />
      <br />
      <DatePicker.RangePicker
        utcOffset={0}
        showTime
        onSelect={(v, dv) => console.log('onSelect', v, dv)}
        onChange={(v, dv) => console.log('onChange', v, dv)}
        style={{ marginTop: 20 }}
      />
      <br />
      <TimePicker.RangePicker
        utcOffset={0}
        // format="hh:mm:ss A"
        onSelect={(v, dv) => console.log('onSelect', v, dv)}
        onChange={(v, dv) => console.log('onChange', v, dv)}
        defaultValue={['09:24:53', '18:44:33']}
        style={{ marginTop: 20 }}
      />
      <br />
      <TimePicker
        // timezone="Europe/London"
        utcOffset={0}
        // format="hh:mm:ss A"
        defaultValue={new Date().getTime()}
        onSelect={(v, dv) => console.log('onSelect', v, dv.toDate())}
        onChange={(v, dv) => console.log('onChange', v, dv.toDate())}
        style={{ marginTop: 20 }}
      />
    </ConfigProvider>
  );
}

export const Timezone = () => <DemoTimezone />;

function DemoPanelRender() {
  return (
    <Space direction="vertical">
      <Space direction="vertical">
        <Typography.Title heading={4}>panelRender</Typography.Title>
        <DatePicker
          // shortcutsPlacementLeft
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

export const panelRender = () => <DemoPanelRender />;

export default {
  title: 'DatePicker',
};
