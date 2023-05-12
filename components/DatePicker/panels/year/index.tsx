import React, { useContext, ReactNode } from 'react';
import merge from 'lodash/merge';
import { Dayjs } from 'dayjs';
import { YearPickerProps } from '../../interface';
import { dayjs, getNow } from '../../../_util/dayjs';
import cs from '../../../_util/classNames';
import { ConfigContext } from '../../../ConfigProvider';
import Header from '../header';
import Body from '../body';
import { newArray } from '../../../_util/constant';
import PickerContext from '../../context';

interface InnerYearPickerProps extends YearPickerProps {
  dateRender?: (currentDate: Dayjs) => ReactNode;
  disabledDate?: (current: Dayjs) => boolean;
  onMouseEnterCell?: (time: Dayjs, disabled: boolean) => void;
  onMouseLeaveCell?: (time: Dayjs, disabled: boolean) => void;
  pageShowDate?: Dayjs;
  isRangePicker?: boolean;
  rangeValues?: Dayjs[];
  onSuperPrev?: () => void;
  onSuperNext?: () => void;
}

function YearPicker(props: InnerYearPickerProps) {
  const {
    pageShowDate,
    style,
    onMouseEnterCell,
    onMouseLeaveCell,
    dateRender,
    disabledDate,
    value,
    locale,
    isRangePicker,
    onSelect,
    rangeValues,
    onSuperPrev,
    onSuperNext,
    format,
    icons,
    ...rest
  } = props;

  const { locale: globalLocale, getPrefixCls, rtl } = useContext(ConfigContext);
  const DATEPICKER_LOCALE = merge(globalLocale.DatePicker, locale);
  const CALENDAR_LOCALE = DATEPICKER_LOCALE.Calendar;

  const { utcOffset, timezone } = useContext(PickerContext);

  const prefixCls = getPrefixCls('panel-year');

  const classNames = cs(prefixCls);

  const bodyProps = isRangePicker ? { rangeValues } : { value };

  const showYear = pageShowDate ? pageShowDate.year() : getNow(utcOffset, timezone).year();
  const startYear = Math.floor(showYear / 10) * 10 - 1;
  const groupRow = newArray(3).map((_) => '');
  const rows = newArray(4)
    .map((_) => groupRow)
    .map((arr, i) => {
      return arr.map((_, j) => {
        return {
          name: startYear + i * 3 + j,
          time: dayjs(`${startYear + i * 3 + j}`, 'YYYY').endOf('year'),
          isPrev: i === 0 && j === 0,
          isNext: i === 3 && j === 2,
        };
      });
    });

  function renderCalendar() {
    return (
      <Body
        {...rest}
        {...bodyProps}
        prefixCls={getPrefixCls('picker')}
        rows={rows}
        onSelectDate={onSelect}
        isSameTime={(current: Dayjs, target: Dayjs) => current.isSame(target, 'year')}
        onMouseEnterCell={onMouseEnterCell}
        onMouseLeaveCell={onMouseLeaveCell}
        dateRender={dateRender}
        disabledDate={disabledDate}
        CALENDAR_LOCALE={CALENDAR_LOCALE}
        mode="year"
        format={format}
      />
    );
  }

  const headerOperations = { onSuperPrev, onSuperNext };

  return (
    <div className={classNames} style={style}>
      <Header
        prefixCls={getPrefixCls('picker')}
        icons={icons}
        title={`${rows[0][1].name} - ${rows[3][2].name}`}
        rtl={rtl}
        {...headerOperations}
      />
      {renderCalendar()}
    </div>
  );
}

export default YearPicker;
