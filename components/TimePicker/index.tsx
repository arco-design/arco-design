import React, { ReactElement } from 'react';
import Picker from './picker';
import TimePickerPopup from './time-picker';
import RangePickerPopup from './range-picker';

import { TimePickerDecorator, RangePickerProps, TimePickerProps } from './interface';

function wrapper<P = any>(picker: ReactElement<P>, displayName: string, type?: string) {
  return class PickerWrapper extends React.Component<P> {
    static displayName = displayName;

    render() {
      return <Picker {...this.props} picker={picker} isRangePicker={type === 'range'} />;
    }
  };
}

const TimePicker = wrapper<TimePickerProps>(<TimePickerPopup />, 'TimePicker');
const RangePicker = wrapper<RangePickerProps>(
  <RangePickerPopup />,
  'TimePickerRangePicker',
  'range'
);

Object.assign(TimePicker, { RangePicker });

export default TimePicker as TimePickerDecorator;

export { TimePickerProps, RangePickerProps as TimeRangePickerProps };
