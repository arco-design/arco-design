import React, { useMemo, useContext } from 'react';
import merge from 'lodash/merge';
import { Dayjs } from 'dayjs';
import { DatePickerProps, DisabledRangeTimeFunc, ModeType, PrivateCType } from '../../interface';
import cs from '../../../_util/classNames';
import { isObject } from '../../../_util/is';
import { getTimeFormat, methods, getDayjsValue } from '../../../_util/dayjs';
import { ConfigContext } from '../../../ConfigProvider';
import TimePicker from '../../../TimePicker/time-picker';
import Header from '../header';
import Body from '../body';
import MonthPanel from '../month';
import YearPanel from '../year';
import { newArray } from '../../../_util/constant';
import PickerContext from '../../context';

interface InnerDatePickerProps extends DatePickerProps {
  onTimePickerSelect?: (timeString: string, time: Dayjs) => void;
  onMouseEnterCell?: (time: Dayjs, disabled: boolean) => void;
  onMouseLeaveCell?: (time: Dayjs, disabled: boolean) => void;
  pageShowDate?: Dayjs;
  isRangePicker?: boolean;
  rangeValues?: Dayjs[];
  isWeek?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  onSuperPrev?: () => void;
  onSuperNext?: () => void;
  isSameTime?: (current?: Dayjs, target?: Dayjs) => boolean;
  format?: string;
  index?: number;
  timeValue?: Dayjs;
  isTimePanel?: boolean;
  panelMode?: ModeType;
  setPanelMode?: (mode: ModeType) => void;
}

const allDaysInOnePage = 6 * 7;

const getReturn = (time: Dayjs) => {
  return {
    year: time.year(),
    month: time.month() + 1,
    day: time.day(),
    name: time.date(),
    time,
  };
};

const getTimeObj = (time: Dayjs) => {
  return {
    ...getReturn(methods.startOf(time, 'month')),
    days: time.daysInMonth(),
  };
};

function getAllDaysByTime(props: InnerDatePickerProps, time: Dayjs) {
  const { dayStartOfWeek = 0, isWeek } = props;
  const current = getTimeObj(time);

  const flatRows = newArray(allDaysInOnePage).map(() => ({}));
  const startIndex =
    current.day - dayStartOfWeek < 0
      ? 7 + (current.day - dayStartOfWeek)
      : current.day - dayStartOfWeek;
  flatRows[startIndex] = {
    ...current,
  };
  // pre
  for (let i = 0; i < startIndex; i++) {
    flatRows[startIndex - i - 1] = {
      ...getReturn(methods.subtract(current.time, i + 1, 'day')),
      isPrev: true,
    };
  }
  // next
  for (let i = 0; i < allDaysInOnePage - startIndex - 1; i++) {
    flatRows[startIndex + i + 1] = {
      ...getReturn(methods.add(current.time, i + 1, 'day')),
      isNext: i >= current.days - 1,
    };
  }
  const rows = newArray(6).map(() => []);
  for (let i = 0; i < 6; i++) {
    rows[i] = flatRows.slice(i * 7, 7 * (i + 1));
    if (isWeek) {
      const weekTime = rows[i][0].time;
      const weekRows = [...rows[i]];
      rows[i].unshift({
        weekRows,
        weekOfYear: weekTime.week(),
      });
    }
  }
  return rows;
}

function DatePicker(props: InnerDatePickerProps & PrivateCType) {
  const {
    isWeek,
    popupVisible,
    format,
    dayStartOfWeek = 0,
    pageShowDate,
    showTime,
    style,
    timepickerProps,
    onMouseEnterCell,
    onMouseLeaveCell,
    dateRender,
    disabledDate,
    disabledTime,
    value,
    rangeValues,
    locale,
    isRangePicker,
    onSelect,
    onTimePickerSelect,
    onPrev,
    onNext,
    onSuperPrev,
    onSuperNext,
    isSameTime,
    index,
    getHeaderOperations,
    setPageShowDate,
    timeValue,
    hideNotInViewDates,
    icons,
    isTimePanel,
    panelMode,
    setPanelMode,
    ...rest
  } = props;

  const { locale: globalLocale, getPrefixCls } = useContext(ConfigContext);

  const { utcOffset, timezone } = useContext(PickerContext);

  const DATEPICKER_LOCALE = merge(globalLocale.DatePicker, locale);

  const prefixCls = getPrefixCls(isWeek ? 'panel-week' : 'panel-date');

  const classNames = cs(prefixCls);

  const bodyProps = isRangePicker ? { rangeValues } : { value };

  const timeFormat = (isObject(showTime) && showTime.format) || getTimeFormat(format);

  // page data list
  const rows = useMemo(() => {
    return getAllDaysByTime(props, pageShowDate);
  }, [pageShowDate.toString(), dayStartOfWeek]);

  let disabledTimeProps;

  if (isRangePicker) {
    disabledTimeProps =
      typeof disabledTime === 'function'
        ? (disabledTime as DisabledRangeTimeFunc)(rangeValues[index], index === 0 ? 'start' : 'end')
        : {};
  } else {
    disabledTimeProps =
      typeof disabledTime === 'function' ? disabledTime(getDayjsValue(value, format) as Dayjs) : {};
  }

  function renderCalendar() {
    return (
      <Body
        {...rest}
        {...bodyProps}
        showWeekList
        isWeek={isWeek}
        prefixCls={getPrefixCls('picker')}
        dayStartOfWeek={dayStartOfWeek}
        rows={rows}
        isSameTime={
          isSameTime || ((current: Dayjs, target: Dayjs) => current.isSame(target, 'day'))
        }
        onSelectDate={onSelect}
        onMouseEnterCell={onMouseEnterCell}
        onMouseLeaveCell={onMouseLeaveCell}
        dateRender={dateRender}
        disabledDate={disabledDate}
        CALENDAR_LOCALE={DATEPICKER_LOCALE.Calendar}
        mode={isWeek ? 'week' : 'date'}
        format={format}
        hideNotInViewDates={hideNotInViewDates}
      />
    );
  }

  function renderTimePicker() {
    const showTimeProps = isObject(showTime) ? showTime : {};

    return (
      <div className={`${prefixCls}-timepicker`}>
        <header className={`${prefixCls}-timepicker-title`}>{DATEPICKER_LOCALE.selectTime}</header>
        <TimePicker
          {...timepickerProps}
          {...showTimeProps}
          {...disabledTimeProps}
          hideFooter
          format={timeFormat}
          valueShow={timeValue.format(timeFormat)}
          onSelect={onTimePickerSelect}
          popupVisible={popupVisible}
          utcOffset={utcOffset}
          timezone={timezone}
        />
      </div>
    );
  }

  const headerOperations = { onPrev, onSuperPrev, onNext, onSuperNext };

  function onChangePanel(mode) {
    setPanelMode(mode);
  }

  if (panelMode === 'year') {
    return (
      <YearPanel
        {...getHeaderOperations(panelMode)}
        pageShowDate={pageShowDate}
        onSelect={(_, date) => {
          setPanelMode('month');
          setPageShowDate(date);
        }}
        disabledDate={disabledDate}
        originMode="date"
      />
    );
  }

  if (panelMode === 'month') {
    return (
      <MonthPanel
        {...getHeaderOperations(panelMode)}
        setPageShowDate={setPageShowDate}
        pageShowDate={pageShowDate}
        panelMode={panelMode}
        getHeaderOperations={getHeaderOperations}
        onSelect={(_, date) => {
          setPanelMode('date');
          setPageShowDate(date);
        }}
        disabledDate={disabledDate}
        originMode="date"
      />
    );
  }

  return (
    <div className={classNames} style={style}>
      {showTime && isTimePanel ? (
        renderTimePicker()
      ) : (
        <div className={`${prefixCls}-inner`}>
          <Header
            {...headerOperations}
            icons={icons}
            prefixCls={getPrefixCls('picker')}
            value={pageShowDate}
            mode={panelMode}
            onChangePanel={onChangePanel}
          />
          {renderCalendar()}
        </div>
      )}
    </div>
  );
}

DatePicker.defaultProps = {
  dayStartOfWeek: 0,
  pickerType: 'date',
};

export default DatePicker;
