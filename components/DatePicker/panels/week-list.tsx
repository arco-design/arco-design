import React from 'react';

interface WeekListProps {
  prefixCls?: string;
  dayStartOfWeek?: number;
  isWeek?: boolean;
  CALENDAR_LOCALE?: Record<string, any>;
}

function WeekList(props: WeekListProps) {
  const { prefixCls, dayStartOfWeek, isWeek, CALENDAR_LOCALE } = props;
  let weekList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  weekList = weekList.slice(dayStartOfWeek).concat(weekList.slice(0, dayStartOfWeek));
  if (isWeek) {
    weekList.unshift('');
  }
  const weekLocale = CALENDAR_LOCALE.week.short;
  return (
    <div className={`${prefixCls}-week-list`}>
      {weekList.map((w) => (
        <div className={`${prefixCls}-week-list-item`} key={w}>
          {w && weekLocale[w]}
        </div>
      ))}
    </div>
  );
}

export default WeekList;
