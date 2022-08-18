import dayjs, { Dayjs } from 'dayjs';
import { isArray, isDayjs } from '../_util/is';

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

export function isDisabledDate(date, disabledDate, mode, originMode): boolean {
  if (typeof disabledDate !== 'function') {
    return false;
  }
  if (!originMode || originMode === mode) {
    return disabledDate(date);
  }
  return disabledDate(date.startOf(mode)) && disabledDate(date.endOf(mode));
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
