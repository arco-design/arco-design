import React, { useContext, ReactNode } from 'react';
import { Dayjs } from 'dayjs';
import cs from '../../_util/classNames';
import WeekList from './week-list';
import useCellClassName from '../hooks/useCellClassName';
import { CalendarValue } from '../interface';
import PickerContext from '../context';
import { isDisabledDate } from '../util';

type RowType = {
  time?: Dayjs;
  name?: string;
  weekOfYear?: number;
  isPrev?: boolean;
  isNext?: boolean;
};

export interface PanelBodyProps {
  showWeekList?: boolean;
  dayStartOfWeek?: number;
  isWeek?: boolean;
  prefixCls?: string;
  onSelectDate?: (timeString: string, time: Dayjs) => void;
  CALENDAR_LOCALE?: Record<string, any>;
  disabledDate?: (current: Dayjs) => boolean;
  onMouseEnterCell?: (date: Dayjs, disabled: boolean) => void;
  onMouseLeaveCell?: (date: Dayjs, disabled: boolean) => void;
  dateRender?: (date?: Dayjs) => ReactNode;
  rows?: RowType[][];
  value?: CalendarValue;
  isSameTime?: (current: Dayjs, target: Dayjs) => boolean;
  mode?: 'date' | 'week' | 'month' | 'year' | 'quarter';
  originMode?: 'date' | 'week' | 'month' | 'year' | 'quarter';
  format?: string;
  hideNotInViewDates?: boolean;
  valueShowHover?: Dayjs[];
}

function Body(props: PanelBodyProps) {
  const {
    prefixCls,
    isWeek,
    disabledDate,
    onSelectDate,
    dateRender,
    onMouseEnterCell,
    onMouseLeaveCell,
    dayStartOfWeek,
    CALENDAR_LOCALE,
    rows,
    showWeekList,
    isSameTime,
    format,
    mode,
    originMode,
  } = props;

  const { utcOffset, timezone } = useContext(PickerContext);

  const getCellClassName = useCellClassName({
    ...props,
    isSameTime,
  });

  function renderRow(row: RowType[]) {
    return row.map((col, index) => {
      if (col.time) {
        const disabled = isDisabledDate(col.time, disabledDate, mode, originMode);
        const onClickHandler = () => !disabled && onSelectDate(col.time.format(format), col.time);

        return (
          <div
            key={index}
            className={getCellClassName(col, disabled, utcOffset, timezone)}
            onMouseEnter={() => onMouseEnterCell && onMouseEnterCell(col.time, disabled)}
            onMouseLeave={() => onMouseLeaveCell && onMouseLeaveCell(col.time, disabled)}
            onClick={onClickHandler}
          >
            {dateRender ? (
              React.cloneElement(dateRender(col.time) as React.ReactElement)
            ) : (
              <div className={`${prefixCls}-date`}>
                <div className={`${prefixCls}-date-value`}>{col.name}</div>
              </div>
            )}
          </div>
        );
      }
      if ('weekOfYear' in col) {
        return (
          <div key={index} className={cs(`${prefixCls}-cell`, `${prefixCls}-cell-week`)}>
            <div className={`${prefixCls}-date`}>
              <div className={`${prefixCls}-date-value`}>{col.weekOfYear}</div>
            </div>
          </div>
        );
      }
    });
  }

  return (
    <>
      {showWeekList && (
        <WeekList
          prefixCls={prefixCls}
          dayStartOfWeek={dayStartOfWeek}
          isWeek={isWeek}
          CALENDAR_LOCALE={CALENDAR_LOCALE}
        />
      )}
      <div className={`${prefixCls}-body`}>
        {rows.map((row, index) => (
          <div
            key={index}
            className={cs(`${prefixCls}-row`, { [`${prefixCls}-row-week`]: isWeek })}
          >
            {renderRow(row)}
          </div>
        ))}
      </div>
    </>
  );
}

export default Body;
