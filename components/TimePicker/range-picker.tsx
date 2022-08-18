import React, { useContext } from 'react';
import { Dayjs } from 'dayjs';
import TimePicker from './time-picker';
import { RangePickerProps } from './interface';
import { isArray, isDayjs } from '../_util/is';
import { toLocal, toTimezone } from '../_util/dayjs';
import omit from '../_util/omit';
import PickerContext from './context';

interface InnerRangePickerProps extends RangePickerProps {
  focusedInputIndex?: number;
  changeFocusedInputIndex?: (index: number) => void;
  popupVisible?: boolean;
  onConfirmValue?: (value: Dayjs[]) => void;
  valueShow?: Dayjs[];
  setValueShow?: (valueShow: Dayjs[]) => void;
}

function RangePicker(props: InnerRangePickerProps) {
  const {
    format = 'HH:mm:ss',
    onSelect,
    focusedInputIndex,
    changeFocusedInputIndex,
    popupVisible,
    onConfirmValue,
    valueShow = [],
    setValueShow,
    disableConfirm,
    ...rest
  } = props;

  const { utcOffset, timezone } = useContext(PickerContext);

  function onSelectTime(_: string, time: Dayjs) {
    const zoneValue = valueShow.slice();
    const v = valueShow.map((a) => toLocal(a, utcOffset, timezone));

    zoneValue[focusedInputIndex] = toTimezone(time, utcOffset, timezone);
    v[focusedInputIndex] = time;

    onSelect &&
      onSelect(
        v.map((t) => t.format(format)),
        v
      );

    setValueShow(zoneValue);

    if (disableConfirm && isArray(v) && isDayjs(v[0]) && isDayjs(v[1])) {
      onConfirmValue(zoneValue);
    }
  }

  function onConfirmValueInner() {
    if (valueShow.length && (valueShow[0] === undefined || valueShow[1] === undefined)) {
      changeFocusedInputIndex(focusedInputIndex === 0 ? 1 : 0);
    } else {
      onConfirmValue(valueShow);
    }
  }

  const timepickerProps = omit(rest, ['defaultValue', 'placeholder', 'value', 'onChange']);
  const currentShowValue = valueShow[focusedInputIndex];

  return (
    <TimePicker
      onSelect={onSelectTime}
      value={currentShowValue}
      format={format}
      isRangePicker
      onConfirmValue={onConfirmValueInner}
      confirmBtnDisabled={!isDayjs(currentShowValue)}
      valueShow={currentShowValue}
      popupVisible={popupVisible}
      disableConfirm={disableConfirm}
      {...timepickerProps}
    />
  );
}

export default RangePicker;
