import React, { ReactElement } from 'react';
import Picker from './picker';
import PickerRange from './picker-range';
import DatePickerPanel from './panels/date';
import MonthPickerPanel from './panels/month';
import YearPickerPanel from './panels/year';
import WeekPickerPanel from './panels/week';
import QuarterPickerPanel from './panels/quarter';

import {
  DatePickerProps,
  MonthPickerProps,
  YearPickerProps,
  WeekPickerProps,
  QuarterPickerProps,
  RangePickerProps,
  DatePickerDecorator,
  ModeType,
} from './interface';

function wrapper<P = any>(
  picker: ReactElement<P>,
  options: { displayName: string; mode: ModeType }
) {
  return class PickerWrapper extends React.Component<P> {
    static displayName = options.displayName;

    render() {
      return <Picker {...this.props} picker={picker} mode={options.mode} />;
    }
  };
}

const DatePicker = wrapper<DatePickerProps>(<DatePickerPanel />, {
  displayName: 'DatePicker',
  mode: 'date',
});
const MonthPicker = wrapper<MonthPickerProps>(<MonthPickerPanel />, {
  displayName: 'MonthPicker',
  mode: 'month',
});
const YearPicker = wrapper<YearPickerProps>(<YearPickerPanel />, {
  displayName: 'YearPicker',
  mode: 'year',
});
const WeekPicker = wrapper<WeekPickerProps>(<WeekPickerPanel />, {
  displayName: 'WeekPicker',
  mode: 'week',
});
const QuarterPicker = wrapper<QuarterPickerProps>(<QuarterPickerPanel />, {
  displayName: 'QuarterPicker',
  mode: 'quarter',
});

const RangePicker = PickerRange;

Object.assign(DatePicker, { MonthPicker, YearPicker, WeekPicker, QuarterPicker, RangePicker });

export default DatePicker as DatePickerDecorator;

export {
  DatePickerProps,
  MonthPickerProps,
  YearPickerProps,
  WeekPickerProps,
  QuarterPickerProps,
  RangePickerProps,
};
