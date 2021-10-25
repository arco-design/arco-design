import React from 'react';
import { Dayjs } from 'dayjs';
import { methods } from '../../../_util/dayjs';
import { WeekPickerProps, PrivateCType, ModeType } from '../../interface';
import DatePanel from '../date';

interface InnerWeekPickerProps extends WeekPickerProps {
  isRangePicker?: boolean;
  rangeValues?: Dayjs[];
  pageShowDate?: Dayjs;
  onPrev?: () => void;
  onNext?: () => void;
  onSuperPrev?: () => void;
  onSuperNext?: () => void;
  localeName?: string;
  panelMode?: ModeType;
  setPanelMode?: (mode: ModeType) => void;
}

function WeekPicker(props: InnerWeekPickerProps & PrivateCType) {
  const {
    value,
    isRangePicker,
    rangeValues,
    onPrev,
    onNext,
    onSuperPrev,
    onSuperNext,
    localeName,
    dayStartOfWeek,
    ...rest
  } = props;

  const bodyProps = isRangePicker ? { rangeValues } : { value };
  const headerOperations = { onPrev, onNext, onSuperPrev, onSuperNext };

  function isSameTime(current: Dayjs, target: Dayjs) {
    return methods.isSameWeek(current, target, dayStartOfWeek, localeName);
  }

  return (
    <DatePanel
      {...rest}
      {...bodyProps}
      {...headerOperations}
      isWeek
      isSameTime={isSameTime}
      isRangePicker={isRangePicker}
      dayStartOfWeek={dayStartOfWeek}
    />
  );
}

WeekPicker.defaultProps = {
  pickerType: 'week',
  dayStartOfWeek: 0,
};

export default WeekPicker;
