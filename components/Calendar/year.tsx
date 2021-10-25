import React from 'react';
import { Dayjs } from 'dayjs';
import { padStart } from '../_util/pad';
import { dayjs } from '../_util/dayjs';
import { CalendarProps } from './interface';
import Month from './month';
import useCellClassName from './hooks/useCellClassName';

interface YearProps extends CalendarProps {
  prefixCls?: string;
  pageData?: any;
  mergedValue?: Dayjs;
  selectHandler?: (time: Dayjs, disabled: boolean) => void;
  mergedPageShowDate?: Dayjs;
  CALENDAR_LOCALE?: Record<string, any>;
  innerMode?: 'day' | 'week' | 'month' | 'year';
}

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
    name: month,
    value: index,
  };
});

const monthGroup = Array(3);
for (let i = 0; i < 3; i++) {
  monthGroup[i] = MONTHS.slice(i * 4, 4 * (i + 1));
}

const monthGroupPanel = Array(4);
for (let i = 0; i < 4; i++) {
  monthGroupPanel[i] = MONTHS.slice(i * 3, 3 * (i + 1));
}

function Year(props: YearProps) {
  const {
    prefixCls,
    mergedPageShowDate,
    panel,
    onMouseEnterCell,
    disabledDate,
    monthRender,
    selectHandler,
    innerMode,
    CALENDAR_LOCALE,
  } = props;

  const getCellClassName = useCellClassName({
    ...props,
    isSameTime: (current, target) => current.isSame(target, 'month'),
  });

  const showYear = mergedPageShowDate.year();

  const mg = panel ? monthGroupPanel : monthGroup;
  return (
    <div className={`${prefixCls}-year`}>
      {mg.map((row, rowIndex) => (
        <div className={`${prefixCls}-year-row`} key={rowIndex}>
          {row.map((col) => {
            const time = dayjs(`${showYear}-${padStart(col.value + 1, 2, '0')}-01`);
            const disabled = typeof disabledDate === 'function' && disabledDate(time);
            const divProps = panel ? { onClick: () => selectHandler(time, disabled) } : {};

            return (
              <div
                key={col.value}
                className={getCellClassName({ ...col, time }, disabled)}
                onMouseEnter={() => onMouseEnterCell && onMouseEnterCell(time, disabled)}
              >
                {monthRender ? (
                  React.cloneElement(monthRender(time) as React.ReactElement, divProps)
                ) : panel ? (
                  <div className={`${prefixCls}-date`} {...divProps}>
                    <div className={`${prefixCls}-date-value`}>
                      {CALENDAR_LOCALE.month.short[col.name]}
                    </div>
                  </div>
                ) : (
                  <div className={`${prefixCls}-month-with-days`}>
                    <div className={`${prefixCls}-month-title`}>
                      {CALENDAR_LOCALE.month.long[col.name]}
                    </div>
                    <Month {...props} cell value={col.value} innerMode={innerMode} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Year;
