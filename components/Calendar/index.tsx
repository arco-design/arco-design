import React, { useState, useContext, useMemo } from 'react';
import { Dayjs, UnitType } from 'dayjs';
import merge from 'lodash/merge';
import { ConfigContext } from '../ConfigProvider';
import { CalendarProps } from './interface';
import cs from '../_util/classNames';
import Month, { getAllDaysByTime } from './month';
import Year from './year';
import Header from './header/header';
import PanelHeader from './header/panel-header';
import useMergeProps from '../_util/hooks/useMergeProps';
import { getDayjsValue, getNow, methods } from '../_util/dayjs';
import { pickDataAttributes } from '../_util/pick';

function getFormat(mode: 'day' | 'week' | 'month' | 'year', panel?: boolean) {
  return mode === 'month' || (mode === 'year' && !panel) ? 'YYYY-MM-DD' : 'YYYY-MM';
}

const defaultProps: CalendarProps = {
  dayStartOfWeek: 0,
  panelWidth: 265,
  defaultMode: 'month',
  headerType: 'button',
  modes: ['month', 'year'],
};

function Calendar(baseProps: CalendarProps) {
  const { getPrefixCls, locale: globalLocale, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<CalendarProps>(baseProps, defaultProps, componentConfig?.Calendar);
  const {
    style,
    className,
    dayStartOfWeek,
    panel,
    locale,
    panelWidth,
    panelTodayBtn,
    defaultPageShowDate,
    value: propsValue,
    pageShowDate: propsPageShowDate,
    defaultValue,
    mode: propsMode,
    defaultMode,
    onChange,
    onPanelChange,
    headerRender,
    headerType,
    modes,
    panelOperations,
  } = props;

  const CALENDAR_LOCALE = merge(globalLocale.Calendar, locale);

  const prefixCls = getPrefixCls('calendar');

  const [mode, setMode] = useState<'day' | 'week' | 'month' | 'year'>(propsMode || defaultMode);
  const innerMode = propsMode || mode;

  const format = getFormat(innerMode, panel);

  const [value, setValue] = useState<Dayjs>(
    getDayjsValue(propsValue || defaultValue, format) as Dayjs
  );

  const [pageShowDate, setPageShowDate] = useState<Dayjs>(
    (getDayjsValue(defaultPageShowDate, format) as Dayjs) || value || getNow()
  );

  const mergedPageShowDate = (getDayjsValue(propsPageShowDate, format) || pageShowDate) as Dayjs;
  const mergedValue = 'value' in props ? (getDayjsValue(propsValue, format) as Dayjs) : value;

  // page data list
  const pageData = useMemo(() => {
    return getAllDaysByTime(props, mergedPageShowDate);
  }, [mergedPageShowDate.toString(), innerMode, dayStartOfWeek]);

  // value / pageShowDate / pageData
  function move(time: Dayjs) {
    setValue(time);
    onChange && onChange(time);
    onChangePageDate(time);
  }

  function onChangePageDate(time: Dayjs) {
    setPageShowDate(time);
    onPanelChange && onPanelChange(time);
  }

  function selectHandler(time: Dayjs, disabled) {
    if (!disabled) {
      move(time);
    }
  }

  let headerValueFormat = '';
  if (innerMode === 'month') {
    headerValueFormat = CALENDAR_LOCALE.formatMonth;
  } else if (innerMode === 'year') {
    headerValueFormat = CALENDAR_LOCALE.formatYear;
  }

  function changePageShowDate(type: 'prev' | 'next', unit: UnitType) {
    let newPageShowDate;
    if (type === 'prev') {
      newPageShowDate = methods.subtract(mergedPageShowDate, 1, unit);
    }
    if (type === 'next') {
      newPageShowDate = methods.add(mergedPageShowDate, 1, unit);
    }

    setPageShowDate(newPageShowDate);
    onPanelChange && onPanelChange(newPageShowDate);
  }

  function onChangeYear(year) {
    const newValue = methods.set(mergedPageShowDate, 'year', year);
    setPageShowDate(newValue);
    onPanelChange && onPanelChange(newValue);
  }

  function onChangeMonth(month) {
    const newValue = methods.set(mergedPageShowDate, 'month', month - 1);
    setPageShowDate(newValue);
    onPanelChange && onPanelChange(newValue);
  }

  function changeMode(mode) {
    setMode(mode);
  }

  const classNames = cs(
    prefixCls,
    innerMode === 'month' ? `${prefixCls}-mode-month` : `${prefixCls}-mode-year`,
    {
      [`${prefixCls}-panel`]: panel && (innerMode === 'month' || innerMode === 'year'),
      [`${prefixCls}-rtl`]: rtl,
    },
    className
  );

  const baseStyle = panel ? { width: panelWidth } : {};

  const baseHeaderProps = {
    prefixCls,
    changePageShowDate,
    headerValueFormat,
    mergedPageShowDate,
    modes,
    innerMode,
    panelOperations,
  };

  return (
    <div className={classNames} style={{ ...style, ...baseStyle }} {...pickDataAttributes(props)}>
      {typeof headerRender === 'function' ? (
        headerRender({
          value: mergedValue,
          pageShowDate: mergedPageShowDate,
          onChangeMode: changeMode,
          onChange: move,
          onChangePageDate,
        })
      ) : panel ? (
        <PanelHeader {...baseHeaderProps} />
      ) : (
        <Header
          {...baseHeaderProps}
          CALENDAR_LOCALE={CALENDAR_LOCALE}
          move={move}
          innerMode={innerMode}
          changeMode={changeMode}
          onChangeYear={onChangeYear}
          onChangeMonth={onChangeMonth}
          headerType={headerType}
        />
      )}
      {innerMode === 'month' && (
        <div className={`${prefixCls}-body`}>
          <Month
            {...props}
            prefixCls={prefixCls}
            pageData={pageData}
            mergedValue={mergedValue}
            innerMode={innerMode}
            selectHandler={selectHandler}
            mergedPageShowDate={mergedPageShowDate}
            CALENDAR_LOCALE={CALENDAR_LOCALE}
          />
        </div>
      )}
      {innerMode === 'year' && (
        <div className={`${prefixCls}-body`}>
          <Year
            {...props}
            prefixCls={prefixCls}
            pageData={pageData}
            mergedPageShowDate={mergedPageShowDate}
            innerMode={innerMode}
            mergedValue={mergedValue}
            selectHandler={selectHandler}
            CALENDAR_LOCALE={CALENDAR_LOCALE}
          />
        </div>
      )}
      {panelTodayBtn && panel && (
        <div className={`${prefixCls}-footer-btn-wrapper`} onClick={() => move(getNow())}>
          {CALENDAR_LOCALE.today}
        </div>
      )}
    </div>
  );
}

Calendar.displayName = 'Calendar';

export default Calendar;

export { CalendarProps };
