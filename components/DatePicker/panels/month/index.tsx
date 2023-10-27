import React, { useContext, useMemo, ReactNode } from 'react';
import merge from 'lodash/merge';
import { Dayjs } from 'dayjs';
import { MonthPickerProps, ModeType, PrivateCType } from '../../interface';
import { dayjs } from '../../../_util/dayjs';
import cs from '../../../_util/classNames';
import { ConfigContext } from '../../../ConfigProvider';
import Header from '../header';
import Body from '../body';
import YearPanel from '../year';
import { padStart } from '../../../_util/pad';

interface InnerMonthPickerProps extends MonthPickerProps {
  rangeValues?: Dayjs[];
  onMouseEnterCell?: (time: Dayjs, disabled: boolean) => void;
  onMouseLeaveCell?: (time: Dayjs, disabled: boolean) => void;
  dateRender?: (currentDate: Dayjs) => ReactNode;
  pageShowDate?: Dayjs;
  isRangePicker?: boolean;
  onSuperPrev?: () => void;
  onSuperNext?: () => void;
  panelMode?: ModeType;
  setPanelMode?: (mode: ModeType) => void;
}

function MonthPicker(props: InnerMonthPickerProps & PrivateCType) {
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
    getHeaderOperations,
    setPageShowDate,
    icons,
    panelMode,
    setPanelMode,
    ...rest
  } = props;

  const { locale: globalLocale, getPrefixCls, rtl } = useContext(ConfigContext);
  const DATEPICKER_LOCALE = merge(globalLocale.DatePicker, locale);
  const CALENDAR_LOCALE = DATEPICKER_LOCALE.Calendar;

  const prefixCls = getPrefixCls('panel-month');

  const classNames = cs(prefixCls);

  const bodyProps = isRangePicker ? { rangeValues } : { value };

  const showYear = pageShowDate.year();

  const rows = useMemo(() => {
    const MONTHS = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ].map((month, index) => {
      return {
        name: CALENDAR_LOCALE.month.short[month],
        time: dayjs(`${showYear}-${padStart(index + 1, 2, '0')}`, 'YYYY-MM').endOf('month'),
      };
    });

    const monthGroup = Array(4);
    for (let i = 0; i < 4; i++) {
      monthGroup[i] = MONTHS.slice(i * 3, 3 * (i + 1));
    }
    return monthGroup;
  }, [showYear, CALENDAR_LOCALE]);

  function renderCalendar() {
    return (
      <Body
        {...rest}
        {...bodyProps}
        prefixCls={getPrefixCls('picker')}
        rows={rows}
        onSelectDate={onSelect}
        isSameTime={(current: Dayjs, target: Dayjs) => current.isSame(target, 'month')}
        onMouseEnterCell={onMouseEnterCell}
        onMouseLeaveCell={onMouseLeaveCell}
        dateRender={dateRender}
        disabledDate={disabledDate}
        CALENDAR_LOCALE={CALENDAR_LOCALE}
        mode="month"
        format={format}
      />
    );
  }

  const headerOperations = { onSuperPrev, onSuperNext };

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
      />
    );
  }

  return (
    <div className={classNames} style={style}>
      <Header
        {...headerOperations}
        DATEPICKER_LOCALE={DATEPICKER_LOCALE}
        icons={icons}
        prefixCls={getPrefixCls('picker')}
        value={pageShowDate}
        mode={panelMode}
        onChangePanel={onChangePanel}
        rtl={rtl}
      />
      {renderCalendar()}
    </div>
  );
}

export default MonthPicker;
