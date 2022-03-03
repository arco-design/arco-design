import React from 'react';
import { ConfigProvider, DatePicker, TimePicker, Typography } from '@self';
// import enUS from '@self/locale/en-US';
// import zhCN from '@self/locale/zh-CN';
// import zhTW from '@self/locale/zh-TW';
// import zhDE from '@self/locale/de-DE';
// import koKR from '@self/locale/ko-KR';
// import thTH from '@self/locale/th-TH';
import jaJP from '@self/locale/ja-JP';
import { dayjs } from '@self/_util/dayjs';

function Demo() {
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
          console.log(current)
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

export default Demo;
