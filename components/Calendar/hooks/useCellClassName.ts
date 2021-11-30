import { Dayjs } from 'dayjs';
import cs from '../../_util/classNames';
import { isArray } from '../../_util/is';
import { getNow } from '../../_util/dayjs';

function getDateValue(date?: Dayjs[], index?: number) {
  if (!date) {
    return undefined;
  }
  if (isArray(date)) {
    return date[index];
  }
}

export default function useClassName(props) {
  const { prefixCls, mergedValue, rangeValues, hoverRangeValues, panel, isSameTime, innerMode } =
    props;

  function isInRange(current, startDate, endDate) {
    if (!startDate || !endDate) {
      return false;
    }
    return (
      isSameTime(current, startDate) ||
      isSameTime(current, endDate) ||
      current.isBetween(startDate, endDate, null, '[]')
    );
  }

  return function getCellClassName(cellDateObj, disabled) {
    const rangeStart = getDateValue(rangeValues, 0);
    const rangeEnd = getDateValue(rangeValues, 1);

    const hoverRangeStart = getDateValue(hoverRangeValues, 0);
    const hoverRangeEnd = getDateValue(hoverRangeValues, 1);

    const isInView = !cellDateObj.isPrev && !cellDateObj.isNext;

    const rangeAvailable = isInView && panel;

    const isRangeStart = rangeAvailable && rangeStart && isSameTime(cellDateObj.time, rangeStart);
    const isRangeEnd = rangeAvailable && rangeEnd && isSameTime(cellDateObj.time, rangeEnd);

    const nearRangeStart = hoverRangeStart && rangeStart && hoverRangeStart.isBefore(rangeStart);
    const nearRangeEnd = rangeEnd && hoverRangeEnd && hoverRangeEnd.isAfter(rangeEnd);

    const isHoverNearRange = (nearRangeStart && isRangeStart) || (nearRangeEnd && isRangeEnd);

    let isToday = isSameTime(cellDateObj.time, getNow());

    if (!panel && innerMode === 'year') {
      isToday = getNow().isSame(cellDateObj.time, 'date');
    }

    return cs(`${prefixCls}-cell`, {
      [`${prefixCls}-cell-in-view`]: isInView,
      [`${prefixCls}-cell-today`]: isToday,
      [`${prefixCls}-cell-selected`]: mergedValue && isSameTime(cellDateObj.time, mergedValue),
      [`${prefixCls}-cell-range-start`]: isRangeStart,
      [`${prefixCls}-cell-range-end`]: isRangeEnd,
      [`${prefixCls}-cell-in-range`]:
        rangeAvailable && isInRange(cellDateObj.time, rangeStart, rangeEnd),
      [`${prefixCls}-cell-in-range-near-hover`]: isHoverNearRange,
      [`${prefixCls}-cell-hover-range-start`]:
        rangeAvailable && hoverRangeStart && isSameTime(cellDateObj.time, hoverRangeStart),
      [`${prefixCls}-cell-hover-range-end`]:
        rangeAvailable && hoverRangeEnd && isSameTime(cellDateObj.time, hoverRangeEnd),
      [`${prefixCls}-cell-hover-in-range`]:
        rangeAvailable && isInRange(cellDateObj.time, hoverRangeStart, hoverRangeEnd),
      [`${prefixCls}-cell-disabled`]: disabled,
    });
  };
}
