import React from 'react';
import { Dayjs } from 'dayjs';
import { CalendarProps } from './interface';
import { dayjs, methods } from '../_util/dayjs';
import { newArray } from '../_util/constant';
import { padStart } from '../_util/pad';
import cs from '../_util/classNames';
import WeekList from './week-list';
import useCellClassName from './hooks/useCellClassName';

export interface MonthProps extends CalendarProps {
  prefixCls?: string;
  cell?: boolean;
  pageData?: any;
  mergedValue?: Dayjs;
  selectHandler?: (time: Dayjs, disabled: boolean) => void;
  innerMode?: 'day' | 'week' | 'month' | 'year';
  mergedPageShowDate?: Dayjs;
  CALENDAR_LOCALE?: Record<string, any>;
}

const allDaysInOnePage = 6 * 7;

const getReturn = (time: Dayjs) => {
  return {
    year: time.year(),
    month: time.month() + 1,
    date: time.date(),
    day: time.day(),
    time,
  };
};

const getTimeObj = (time: Dayjs) => {
  return {
    start: getReturn(methods.startOf(time, 'month')),
    end: getReturn(methods.endOf(time, 'month')),
    days: time.daysInMonth(),
  };
};

export function getAllDaysByTime(props: CalendarProps, time: Dayjs) {
  const { dayStartOfWeek = 0, isWeek } = props;
  const current = getTimeObj(time);

  const flatRows = newArray(allDaysInOnePage).map(() => ({}));
  // current.start.day is 0 for Sunday
  const startIndex = dayStartOfWeek === 0 ? current.start.day : (current.start.day || 7) - 1;
  flatRows[startIndex] = {
    ...current.start,
    isCurrent: true,
  };
  // pre
  for (let i = 0; i < startIndex; i++) {
    flatRows[startIndex - i - 1] = {
      ...getReturn(methods.subtract(current.start.time, i + 1, 'day')),
      isPrev: true,
    };
  }
  // next
  for (let i = 0; i < allDaysInOnePage - startIndex - 1; i++) {
    flatRows[startIndex + i + 1] = {
      ...getReturn(methods.add(current.start.time, i + 1, 'day')),
      isCurrent: i < current.days,
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

function Month(props: MonthProps) {
  const {
    prefixCls,
    cell,
    value,
    pageData,
    mergedValue,
    isWeek,
    disabledDate,
    selectHandler,
    panel,
    innerMode,
    dateRender,
    onMouseEnterCell,
    onMouseLeaveCell,
    dateInnerContent,
    mergedPageShowDate,
    dayStartOfWeek,
    CALENDAR_LOCALE,
  } = props;

  const pageShowDateYear = mergedPageShowDate.year();

  const getCellClassName = useCellClassName({
    ...props,
    isSameTime: (current: Dayjs, target: Dayjs) => current.isSame(target, 'day'),
  });

  function renderDays(row) {
    return row.map((col, index) => {
      if (col.time) {
        const disabled = typeof disabledDate === 'function' && disabledDate(col.time);
        const onClickHandler = () => selectHandler(col.time, disabled);
        const tdProps = isWeek ? { onClick: onClickHandler } : {};
        const tdDivProps = !isWeek ? { onClick: onClickHandler } : {};

        return (
          <div
            key={index}
            className={getCellClassName(col, disabled)}
            onMouseEnter={() => onMouseEnterCell && onMouseEnterCell(col.time, disabled)}
            onMouseLeave={() => onMouseLeaveCell && onMouseLeaveCell(col.time, disabled)}
            {...tdProps}
          >
            {dateRender ? (
              React.cloneElement(dateRender(col.time) as React.ReactElement, tdDivProps)
            ) : (
              <div className={`${prefixCls}-date`} {...tdDivProps}>
                <div className={`${prefixCls}-date-value`}>
                  {panel ? col.date : <div className={`${prefixCls}-date-circle`}>{col.date}</div>}
                </div>
                {!panel && innerMode !== 'year' && (
                  <div className={`${prefixCls}-date-content`}>
                    {dateInnerContent && dateInnerContent(col.time)}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      }
      if ('weekOfYear' in col) {
        const rowYear = mergedValue && mergedValue.year();
        const rowMonth = mergedValue && mergedValue.month() + 1;
        const rowWeek = mergedValue && mergedValue.week();
        const selectedWeek =
          mergedValue &&
          col.weekRows.find((r) => r.year === rowYear && r.month === rowMonth) &&
          rowWeek === col.weekOfYear;
        return (
          <div
            key={index}
            className={cs(`${prefixCls}-cell`, `${prefixCls}-cell-week`, {
              [`${prefixCls}-cell-selected-week`]: selectedWeek,
              [`${prefixCls}-cell-in-range`]: selectedWeek,
            })}
          >
            <div className={`${prefixCls}-date`}>
              <div className={`${prefixCls}-date-value`}>{col.weekOfYear}</div>
            </div>
          </div>
        );
      }
    });
  }

  let pd = pageData;
  if (typeof value === 'number') {
    pd = getAllDaysByTime(props, dayjs(`${pageShowDateYear}-${padStart(value + 1, 2, '0')}-01`));
  }
  return (
    <div className={cell ? `${prefixCls}-month-cell` : `${prefixCls}-month`}>
      <WeekList
        prefixCls={prefixCls}
        dayStartOfWeek={dayStartOfWeek}
        isWeek={isWeek}
        CALENDAR_LOCALE={CALENDAR_LOCALE}
        panel={panel}
        innerMode={innerMode}
      />
      <div className={`${prefixCls}-month-cell-body`}>
        {pd.map((row, index) => (
          <div
            key={index}
            className={cs(`${prefixCls}-month-row`, { [`${prefixCls}-row-week`]: isWeek })}
          >
            {renderDays(row)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Month;
