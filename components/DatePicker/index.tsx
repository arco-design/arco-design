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
  DatePickerHandle,
} from './interface';

function wrapper<P = any, T extends DatePickerHandle = DatePickerHandle>(
  picker: ReactElement<P>,
  options: { displayName: string; mode: ModeType }
) {
  return class PickerWrapper extends React.Component<P> {
    static displayName = options.displayName;

    refPicker: React.RefObject<T>;

    constructor(props) {
      super(props);
      this.refPicker = React.createRef();
    }

    focus() {
      this.refPicker.current && this.refPicker.current.focus && this.refPicker.current.focus();
    }

    blur() {
      this.refPicker.current && this.refPicker.current.blur && this.refPicker.current.blur();
    }

    render() {
      return <Picker {...this.props} ref={this.refPicker} picker={picker} mode={options.mode} />;
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

export default Object.assign(DatePicker, {
  MonthPicker,
  YearPicker,
  WeekPicker,
  QuarterPicker,
  RangePicker,
}) as DatePickerDecorator;

export {
  DatePickerProps,
  MonthPickerProps,
  YearPickerProps,
  WeekPickerProps,
  QuarterPickerProps,
  RangePickerProps,
};
