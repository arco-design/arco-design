import React from 'react';
import { ConfigProvider, DatePicker, TimePicker, Typography } from '@self';
// import enUS from '@self/locale/en-US';
// import zhCN from '@self/locale/zh-CN';
// import zhTW from '@self/locale/zh-TW';
// import zhDE from '@self/locale/de-DE';
// import koKR from '@self/locale/ko-KR';
// import thTH from '@self/locale/th-TH';
import jaJP from '@self/locale/ja-JP';
// import { dayjs } from '@self/_util/dayjs';

function Demo() {
  return (
    <ConfigProvider locale={jaJP}>
      <Typography.Title>Asia/Shanghai</Typography.Title>
      <DatePicker timezone="Asia/Shanghai" showTime onChange={(v, dv) => console.log(v, dv)} />
      <br />
      <TimePicker timezone="Asia/Shanghai" onSelect={(v, dv) => console.log(v, dv)} style={{ marginTop: 20 }} />

      <Typography.Title>America/New_York</Typography.Title>
      <DatePicker timezone="America/New_York" showTime onChange={(v, dv) => console.log(v, dv)} />
      <br />
      <TimePicker timezone="America/New_York" onSelect={(v, dv) => console.log(v, dv)} style={{ marginTop: 20 }} />

      <Typography.Title>Europe/London</Typography.Title>
      <DatePicker timezone="Europe/London" showTime onChange={(v, dv) => console.log(v, dv)} />
      <br />
      <TimePicker.RangePicker
        timezone="Europe/London"
        // format="hh:mm:ss A"
        onSelect={(v, dv) => console.log(v, dv)} style={{ marginTop: 20 }}
        defaultValue={['09:24:53', '18:44:33']}
      />
      <br />
      <TimePicker
        timezone="Europe/London"
        // format="hh:mm:ss A"
        onSelect={(v, dv) => console.log(v, dv)} style={{ marginTop: 20 }}
      />
    </ConfigProvider>
  );
}

export default Demo;
