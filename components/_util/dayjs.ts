import originDayjs, { Dayjs, OpUnitType, UnitType } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import AdvancedFormat from 'dayjs/plugin/advancedFormat';
import weekYear from 'dayjs/plugin/weekYear';
import QuarterOfYear from 'dayjs/plugin/quarterOfYear';
import { isDayjs, isArray, isUndefined } from '../_util/is';

const isMoment = (originDayjs() as any)._isAMomentObject;

if (isMoment) {
  (originDayjs as any).extend = () => {};
}

const overwriteIsDayjs = (_, Dayjs, dayjs) => {
  dayjs = function (date, c) {
    if (isDayjs(date)) {
      return date.clone();
    }
    const cfg = typeof c === 'object' ? c : {};
    cfg.date = date;
    cfg.args = arguments; // eslint-disable-line prefer-rest-params
    return new Dayjs(cfg);
  };

  const proto = Dayjs.prototype;
  const old$Utils = proto.$utils;
  proto.$utils = function () {
    const newUtils = old$Utils();
    newUtils.i = isDayjs;
    return newUtils;
  };

  dayjs.isDayjs = isDayjs;
};

originDayjs.extend(overwriteIsDayjs);

originDayjs.extend(customParseFormat);
originDayjs.extend(isBetween);
originDayjs.extend(weekOfYear);
originDayjs.extend(AdvancedFormat);
originDayjs.extend(weekYear);
originDayjs.extend(QuarterOfYear);

export const dayjs = originDayjs;

// 兼容 moment
export const methods = {
  add(time, value: number, unit: UnitType) {
    return isMoment ? time.clone().add(value, unit) : time.add(value, unit);
  },
  subtract(time, value: number, unit: UnitType) {
    return isMoment ? time.clone().subtract(value, unit) : time.subtract(value, unit);
  },
  startOf(time, unit?: OpUnitType) {
    return isMoment ? time.clone().startOf(unit) : time.startOf(unit);
  },
  endOf(time, unit?: OpUnitType) {
    return isMoment ? time.clone().endOf(unit) : time.endOf(unit);
  },
  set(time, unit: UnitType, value: number) {
    return isMoment ? time.clone().set(unit, value) : time.set(unit, value);
  },
  isSameWeek(date1, date2, weekStart: number, localeName) {
    return isMoment
      ? date1.locale(localeName, { week: { dow: weekStart } }).isSame(date2, 'week')
      : date1.locale({ ...dayjs.Ls[localeName], weekStart }).isSame(date2, 'week');
  },
};

const localOffset = -new Date().getTimezoneOffset();

// get local now time
export function getNow(utcOffset?: number) {
  return isUndefined(utcOffset) ? dayjs() : toTimezone(dayjs(), utcOffset);
}

// convert local date to specify timezone date
export function toTimezone(
  time: Dayjs | undefined,
  utcOffset: number = localOffset,
  local?: boolean
): Dayjs {
  const timezoneOffset = Math.abs(utcOffset) <= 16 ? utcOffset * 60 : utcOffset;
  const diffOffset = local ? localOffset - timezoneOffset : timezoneOffset - localOffset;
  return isUndefined(time) ? time : dayjs(dayjs(time).valueOf() + diffOffset * 60 * 1000);
}

// convert specify timezone date to local date
export function toLocal(time: Dayjs, utcOffset: number): Dayjs {
  return toTimezone(time, utcOffset, true);
}

export function initializeDateLocale(localeName: string, weekStart: number) {
  if (isMoment) {
    (dayjs as any).updateLocale(localeName, { week: { dow: weekStart } });
  } else {
    dayjs.locale({ ...dayjs.Ls[localeName], weekStart });
  }
}

export function getTimeFormat(format) {
  const units = ['H', 'h', 'm', 's', 'A', 'a'];
  let timeFormat = '';
  units.some((unit) => {
    if (format.indexOf(unit) !== -1) {
      timeFormat = `${unit}${format.split(` ${unit}`)[1]}`;
      return true;
    }
    return false;
  });
  return timeFormat || 'HH:mm:ss';
}

export function getDayjsValue(time, format: string, utcOffset?: number) {
  if (!time) {
    return undefined;
  }
  const formatValue = (value) => {
    if (isDayjs(value)) {
      return dayjs(value.valueOf());
    }
    if (typeof value === 'string') {
      const dv = dayjs(value, format);

      return dv.isValid() ? dv : dayjs(value, 'YYYY-MM-DD');
    }
    return dayjs(value);
  };

  // if set a timezone, convert to timezone date
  const getRealTime = (t) =>
    utcOffset !== undefined ? toTimezone(formatValue(t), utcOffset) : formatValue(t);

  if (isArray(time)) {
    return time.map((t) => (t ? getRealTime(t) : undefined));
  }

  return getRealTime(time);
}

export function getValueWithTime(date: Dayjs, time?: Dayjs): Dayjs {
  const y = date.year();
  const m = date.month();
  const d = date.date();

  if (time) {
    let returnTime = time;
    returnTime = methods.set(returnTime, 'year', y);
    returnTime = methods.set(returnTime, 'month', m);
    returnTime = methods.set(returnTime, 'date', d);

    return returnTime;
  }

  return date;
}

export function getSortedDayjsArray(values?: Dayjs[]) {
  if (!values || !values[0] || !values[1]) {
    return values;
  }
  const newValues = [...values];
  newValues.sort((a, b) => a.valueOf() - b.valueOf());
  return newValues;
}

export function isDayjsChange(prevValue: Dayjs | undefined, currentValue: Dayjs | undefined) {
  if (currentValue === undefined && prevValue === undefined) {
    return false;
  }
  return (
    (currentValue && !prevValue) ||
    (!currentValue && prevValue) ||
    dayjs(currentValue).valueOf() !== dayjs(prevValue).valueOf()
  );
}

export function isDayjsArrayChange(
  prevValue: Dayjs[] | undefined,
  currentValue: Dayjs[] | undefined
) {
  if (currentValue === undefined && prevValue === undefined) {
    return false;
  }
  return (
    (currentValue && !prevValue) ||
    (!currentValue && prevValue) ||
    (isArray(currentValue) &&
      isArray(prevValue) &&
      dayjs(currentValue[0]).valueOf() !== dayjs(prevValue[0]).valueOf()) ||
    dayjs(currentValue[1]).valueOf() !== dayjs(prevValue[1]).valueOf()
  );
}

export function isValidTimeString(str: string, format) {
  return typeof str === 'string' && dayjs(str, format).format(format) === str;
}
