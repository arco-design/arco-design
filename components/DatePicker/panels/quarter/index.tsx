import React, { useContext, ReactNode } from 'react';
import merge from 'lodash/merge';
import { Dayjs } from 'dayjs';
import { QuarterPickerProps, ModeType, PrivateCType } from '../../interface';
import { dayjs } from '../../../_util/dayjs';
import cs from '../../../_util/classNames';
import { ConfigContext } from '../../../ConfigProvider';
import Header from '../header';
import Body from '../body';
import YearPanel from '../year';
import { padStart } from '../../../_util/pad';

interface InnerQuarterPickerProps extends QuarterPickerProps {
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

function QuarterPicker(props: InnerQuarterPickerProps & PrivateCType) {
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

  const prefixCls = getPrefixCls('panel-quarter');

  const classNames = cs(prefixCls);

  const bodyProps = isRangePicker ? { rangeValues } : { value };

  const showYear = pageShowDate.year();

  const rows = [
    [1, 2, 3, 4].map((q) => ({
      name: `Q${q}`,
      time: dayjs(`${showYear}-${padStart((q - 1) * 3 + 1, 2, '0')}-01`),
    })),
  ];

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
        mode="quarter"
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
          setPanelMode('quarter');
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
        icons={icons}
        prefixCls={getPrefixCls('picker')}
        value={pageShowDate}
        mode={panelMode}
        onChangePanel={onChangePanel}
        rtl={rtl}
      />
      <div className={`${prefixCls}-wrapper`}>{renderCalendar()}</div>
    </div>
  );
}

export default QuarterPicker;
