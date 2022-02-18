import React from 'react';
import dayjs from 'dayjs';
// import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ConfigProvider, DatePicker } from '@self';

// dayjs.extend(utc);
dayjs.extend(timezone);

// dayjs.tz.setDefault("America/New_York")
// dayjs.tz.setDefault("Europe/London")

// const { MonthPicker } = DatePicker;

function Demo() {
  // console.log(dayjs().toDate().getTimezoneOffset())
  const date1 = new Date('August 19, 1975 23:15:30 GMT+07:00');
  // console.log(dayjs.utc().utcOffset(2).format());
  // console.log(dayjs.utc().utcOffset(0).format());
  // console.log(dayjs("2014-06-01 12:00").tz("America/New_York").format())
  // const time = dayjs('2022-01-05').utcOffset(0, true).add(1, 'minute');
  // console.log(time, time.format())
  // console.log(dayjs.tz('2022-01-10', 'Europe/London').week())
  // console.log(dayjs.tz('2022-01-05').add(1, 'minute').format());
  // console.log(date1)
  return (
    <ConfigProvider utcOffset={1}>
      <DatePicker showTime onChange={(v, dv) => console.log(v, dv)} />
    </ConfigProvider>
  );
}

export default Demo;
