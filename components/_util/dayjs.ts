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

function startOfWeekTimestamp(date, weekStart: number) {
  // 计算 date 与前一个 weekStart 日期的间隔
  const diff = (date.day() - weekStart + 7) % 7;
  const startOfWeek = date.clone().startOf('day').subtract(diff, 'day');
  return startOfWeek.valueOf();
}
function isSameWeekMoment(date1, date2, weekStart: number) {
  return startOfWeekTimestamp(date1, weekStart) === startOfWeekTimestamp(date2, weekStart);
}

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
      ? isSameWeekMoment(date1, date2, weekStart)
      : date1.locale({ ...dayjs.Ls[localeName], weekStart }).isSame(date2, 'week');
  },
};

// convert timezone to utcOffset
// https://github.com/iamkun/dayjs/blob/dev/src/plugin/timezone/index.js#L3

const typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5,
};

// Cache time-zone lookups from Intl.DateTimeFormat,
// as it is a *very* slow method.
const dtfCache = {};
const getDateTimeFormat = (timezone, timeZoneName?: string) => {
  const key = `${timezone}|${timeZoneName || 'short'}`;
  let dtf = dtfCache[key];
  if (!dtf) {
    dtf = new Intl.DateTimeFormat('en-US', {
      hour12: false,
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    dtfCache[key] = dtf;
  }
  return dtf;
};

const makeFormatParts = (timestamp, timezone) => {
  const date = new Date(timestamp);
  const dtf = getDateTimeFormat(timezone);
  return dtf.formatToParts(date);
};

const tzOffset = (timestamp, timezone) => {
  const formatResult = makeFormatParts(timestamp, timezone);
  const filled = [];
  for (let i = 0; i < formatResult.length; i += 1) {
    const { type, value } = formatResult[i];
    const pos = typeToPos[type];

    if (pos >= 0) {
      filled[pos] = parseInt(value, 10);
    }
  }
  const hour = filled[3];
  // Workaround for the same behavior in different node version
  // https://github.com/nodejs/node/issues/33027
  /* istanbul ignore next */
  const fixedHour = hour === 24 ? 0 : hour;
  const utcTs = Date.UTC(filled[0], filled[1] - 1, filled[2], fixedHour, filled[4], filled[5], 0);
  let asTS = +timestamp;
  const over = asTS % 1000;
  asTS -= over;
  return (utcTs - asTS) / (60 * 1000);
};

// find the right offset a given local time. The o input is our guess, which determines which
// offset we'll pick in ambiguous cases (e.g. there are two 3 AMs b/c Fallback DST)
// https://github.com/moment/luxon/blob/master/src/datetime.js#L76
const fixOffset = (localTS, o0, tz) => {
  // Our UTC time is just a guess because our offset is just a guess
  let utcGuess = localTS - o0 * 60 * 1000;
  // Test whether the zone matches the offset for this ts
  const o2 = tzOffset(utcGuess, tz);
  // If so, offset didn't change and we're done
  if (o0 === o2) {
    return [utcGuess, o0];
  }
  // If not, change the ts by the difference in the offset
  utcGuess -= (o2 - o0) * 60 * 1000;
  // If that gives us the local time we want, we're done
  const o3 = tzOffset(utcGuess, tz);
  if (o2 === o3) {
    return [utcGuess, o2];
  }
  // If it's different, we're in a hole time.
  // The offset has changed, but the we don't adjust the time
  return [localTS - Math.min(o2, o3) * 60 * 1000, Math.max(o2, o3)];
};

export function timezoneToOffset(inputTs: number, timezone: string) {
  return fixOffset(inputTs, tzOffset(new Date().getTime(), timezone), timezone)[1];
}

// get local now time
export function getNow(utcOffset?: number, timezone?: string) {
  return isUndefined(utcOffset) && !timezone ? dayjs() : toTimezone(dayjs(), utcOffset, timezone);
}

// convert local date to specify timezone date
export function toTimezone(
  time: Dayjs,
  utcOffset?: number,
  timezone?: string,
  local?: boolean
): Dayjs {
  if (!time || (isUndefined(utcOffset) && !timezone)) {
    return time;
  }
  const localOffset = -time.toDate().getTimezoneOffset();
  const uOffset = isUndefined(utcOffset)
    ? !timezone
      ? localOffset
      : timezoneToOffset(time.valueOf(), timezone)
    : utcOffset;
  const timezoneOffset = Math.abs(uOffset) <= 16 ? uOffset * 60 : uOffset;
  const diffOffset = local ? localOffset - timezoneOffset : timezoneOffset - localOffset;
  return dayjs(dayjs(time).valueOf() + diffOffset * 60 * 1000);
}

// convert specify timezone date to local date
export function toLocal(time: Dayjs, utcOffset?: number, timezone?: string): Dayjs {
  return toTimezone(time, utcOffset, timezone, true);
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

export function getDayjsValue(time, format: string, utcOffset?: number, timezone?: string) {
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
    utcOffset !== undefined || timezone
      ? toTimezone(formatValue(t), utcOffset, timezone)
      : formatValue(t);

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
