import dayjs, { Dayjs } from 'dayjs';
import { isArray, isDayjs } from '../_util/is';
import { methods, getDayjsValue } from '../_util/dayjs';

// Only used by RangePicker's default week format, including its explicit equivalent.
export function getDefaultWeekValue(
  value,
  locale: string,
  utcOffset?: number,
  timezone?: string,
  fallbackFormat = 'YYYY-wo'
) {
  if (isArray(value)) {
    return value.map((item) =>
      getDefaultWeekValue(item, locale, utcOffset, timezone, fallbackFormat)
    );
  }
  if (typeof value !== 'string' || !value) {
    return getDayjsValue(value, fallbackFormat, utcOffset, timezone);
  }

  const match = value.match(/^(\d{4})-(\d{1,2})/);
  if (match) {
    const year = Number(match[1]);
    const week = Number(match[2]);
    if (week >= 1 && week <= 53) {
      // July always belongs to its calendar year's week-year.
      const date = dayjs(`${year}-07-01`).locale(locale).week(week).startOf('week');
      if (date.format('gggg-wo') === value) {
        // A week label names the panel's calendar week, not a local-time instant.
        // The panel stores target-zone wall-clock dates as Dayjs values: converting
        // this canonical week start again could move it to the previous week.
        return date;
      }
    }
  }

  // Calendar strings and all other inputs retain the legacy parsing behavior.
  return getDayjsValue(value, fallbackFormat, utcOffset, timezone);
}

function getFormat(time) {
  return isDayjs(time) && time.format('HH:mm:ss');
}

export function isTimeArrayChange(prevTime: Dayjs[], nextTime: Dayjs[]) {
  return (
    getFormat(prevTime[0]) !== getFormat(nextTime[0]) ||
    getFormat(prevTime[1]) !== getFormat(nextTime[1])
  );
}

export function getAvailableDayjsLength(value) {
  if (!value) {
    return 0;
  }
  if (isArray(value)) {
    if (isDayjs(value[0]) && isDayjs(value[1])) {
      return 2;
    }
    if (!isDayjs(value[0]) && !isDayjs(value[1])) {
      return 0;
    }
    return 1;
  }
  return 0;
}

// https://github.com/react-component/picker/blob/master/src/utils/dateUtil.ts#L234
export function isDisabledDate(cellDate, disabledDate, mode): boolean {
  if (typeof disabledDate !== 'function') {
    return false;
  }
  // Whether cellDate is disabled in range
  const getDisabledFromRange = (
    currentMode: 'date' | 'month' | 'year',
    start: number,
    end: number
  ) => {
    let current = start;
    while (current <= end) {
      let date: Dayjs;
      switch (currentMode) {
        case 'date': {
          date = methods.set(cellDate, 'date', current);
          if (!disabledDate(date)) {
            return false;
          }
          break;
        }
        case 'month': {
          date = methods.set(cellDate, 'month', current);
          if (!isDisabledDate(date, disabledDate, 'month')) {
            return false;
          }
          break;
        }
        case 'year': {
          date = methods.set(cellDate, 'year', current);
          if (!isDisabledDate(date, disabledDate, 'year')) {
            return false;
          }
          break;
        }
        default:
          break;
      }
      current += 1;
    }
    return true;
  };
  switch (mode) {
    case 'date':
    case 'week': {
      return disabledDate(cellDate);
    }
    case 'month': {
      const startDate = 1;
      const endDate = cellDate.endOf('month').get('date');
      return getDisabledFromRange('date', startDate, endDate);
    }
    case 'quarter': {
      const startMonth = Math.floor(cellDate.get('month') / 3) * 3;
      const endMonth = startMonth + 2;
      return getDisabledFromRange('month', startMonth, endMonth);
    }
    case 'year': {
      return getDisabledFromRange('month', 0, 11);
    }
    default:
      return false;
  }
}

type WeekStartType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export function getDefaultWeekStart(dayjsLocale: string): WeekStartType {
  return (dayjs.Ls?.[dayjsLocale]?.weekStart as WeekStartType) || 0;
}

export function getLocaleDayjsValue(
  date: Dayjs | undefined,
  dayjsLocale: string
): Dayjs | undefined {
  return date ? date.locale(dayjsLocale) : date;
}

export function getFormatByIndex(format: string | string[], index: number) {
  return isArray(format) ? format[index] : format;
}
