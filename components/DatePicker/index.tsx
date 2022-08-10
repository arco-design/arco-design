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
} from './interface';

function wrapper<P = any>(picker: ReactElement<P>, displayName: string) {
  return class PickerWrapper extends React.Component<P> {
    static displayName = displayName;

    render() {
      return <Picker {...this.props} picker={picker} />;
    }
  };
}

const DatePicker = wrapper<DatePickerProps>(<DatePickerPanel />, 'DatePicker');
const MonthPicker = wrapper<MonthPickerProps>(<MonthPickerPanel />, 'MonthPicker');
const YearPicker = wrapper<YearPickerProps>(<YearPickerPanel />, 'YearPicker');
const WeekPicker = wrapper<WeekPickerProps>(<WeekPickerPanel />, 'WeekPicker');
const QuarterPicker = wrapper<QuarterPickerProps>(<QuarterPickerPanel />, 'QuarterPicker');

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
