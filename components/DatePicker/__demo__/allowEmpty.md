---
order: 24
title:
  zh-CN: 允许空值的范围选择器
  en-US: RangePicker allowEmpty
---

## zh-CN

使用 `allowEmpty`和`referenceInterval` 可以使用允许空值的范围选择器。

## en-US

Use `showTime`and`referenceInterval` to allow range selectors that allow null values.

```tsx
import { useState } from 'react';
import { DatePicker, Radio, Space, type RangePickerProps } from 'arco-design';
import dayjs, { Dayjs } from 'dayjs';
const { RangePicker } = DatePicker;

function onSelect(dateString, date) {
  console.log('onSelect', dateString, date);
}

const onChange: RangePickerProps['onChange'] = (dateString, date) => {
  console.log('onChange: ', dateString, date);
};

function App() {
  const [value, setValue] = useState('date');
  const mode = value === 'date time' ? 'date' : value;
  const ranges: Array<{
    radio: string;
    format?: string;
    referenceInterval: [string | Dayjs, string | Dayjs];
  }> = [
    {
      radio: 'date',
      format: 'YYYY-MM-DD',
      referenceInterval: ['2019-08-01', '2023-09-01'],
    },
    {
      radio: 'week',
      referenceInterval: [dayjs('2023-08-01'), dayjs('2023-09-01')],
    },
    {
      radio: 'month',
      referenceInterval: ['2019-08-01', '2023-09-01'],
    },
    {
      radio: 'year',
      referenceInterval: ['2019', '2023'],
    },
    {
      radio: 'quarter',
      referenceInterval: [dayjs('2019-08-01'), dayjs('2023-09-01')],
    },
    {
      radio: 'date time',
      format: 'YYYY-MM-DD HH:mm:ss',
      referenceInterval: ['2019-08-01 00:00:00', '2023-09-01 09:09:06'],
    },
  ];
  const options = ranges.map((item) => item.radio);
  const getReferenceInterval = (radio: string): [string | Dayjs, string | Dayjs] =>
    ranges.find((item) => item.radio === radio)!['referenceInterval'];
  const style =
    value === 'date time'
      ? {
          width: 380,
        }
      : {
          width: 254,
          marginBottom: 20,
        };
  return (
    <Space direction="vertical">
      <Radio.Group options={options} value={value} onChange={(v) => setValue(v)} type="button" />
      <RangePicker
        allowEmpty
        referenceInterval={getReferenceInterval(value)}
        mode={mode}
        onChange={onChange}
        onSelect={onSelect}
        style={style}
        showTime={value === 'date time'}
      />
    </Space>
  );
}

export default App;

```
