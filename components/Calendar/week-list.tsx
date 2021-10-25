import React from 'react';

interface WeekListProps {
  prefixCls?: string;
  dayStartOfWeek?: 0 | 1;
  isWeek?: boolean;
  CALENDAR_LOCALE?: Record<string, any>;
  panel?: boolean;
  innerMode?: 'day' | 'week' | 'month' | 'year';
}

function WeekList(props: WeekListProps) {
  const { prefixCls, dayStartOfWeek, isWeek, CALENDAR_LOCALE, panel, innerMode } = props;
  const weekList = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  if (dayStartOfWeek === 0) {
    weekList.unshift('sunday');
  } else {
    weekList.push('sunday');
  }
  if (isWeek) {
    weekList.unshift('self');
  }
  const weekLocale = CALENDAR_LOCALE.week[panel || innerMode === 'year' ? 'short' : 'long'];
  return (
    <div className={`${prefixCls}-week-list`}>
      {weekList.map((w) => (
        <div className={`${prefixCls}-week-list-item`} key={w}>
          {weekLocale[w]}
        </div>
      ))}
    </div>
  );
}

export default WeekList;
