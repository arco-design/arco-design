import { Dayjs } from 'dayjs';
import cs from '../../_util/classNames';
import { isArray } from '../../_util/is';
import { getNow, getSortedDayjsArray } from '../../_util/dayjs';
import { getAvailableDayjsLength } from '../util';

function getDateValue(date?: Dayjs[], index?: number) {
  if (!date) {
    return undefined;
  }
  if (isArray(date)) {
    return date[index];
  }
}

export default function useClassName(props) {
  const { prefixCls, value, rangeValues, valueShowHover, isSameTime, mode, hideNotInViewDates } =
    props;

  const selectedLength = getAvailableDayjsLength(rangeValues);
  const hoverLength = getAvailableDayjsLength(valueShowHover);

  const sortedRangeValues =
    selectedLength !== 2 && hoverLength === 2 ? getSortedDayjsArray(valueShowHover) : rangeValues;
  const sortedHoverRangeValues = selectedLength === 2 ? getSortedDayjsArray(valueShowHover) : [];

  function isInRange(current: Dayjs, startDate, endDate): boolean {
    // show placeholder range
    // if (!startDate || !endDate) {
    //   if (startDate) {
    //     return isSameTime(current, startDate) || current.isAfter(startDate);
    //   }
    //   if (endDate) {
    //     return isSameTime(current, endDate) || current.isBefore(endDate);
    //   }
    //   return false;
    // }
    if (startDate && endDate) {
      return (
        isSameTime(current, startDate) ||
        isSameTime(current, endDate) ||
        current.isBetween(startDate, endDate, null)
      );
    }
  }

  return function getCellClassName(cellDateObj, disabled) {
    const rangeStart = getDateValue(sortedRangeValues, 0);
    const rangeEnd = getDateValue(sortedRangeValues, 1);
    const hoverRangeStart = getDateValue(sortedHoverRangeValues, 0);
    const hoverRangeEnd = getDateValue(sortedHoverRangeValues, 1);

    const isInView = !cellDateObj.isPrev && !cellDateObj.isNext;

    const selected = value && isSameTime(cellDateObj.time, value);

    let isToday = isSameTime(cellDateObj.time, getNow());

    const checkIsInView = mode !== 'week' ? isInView : true;

    if (mode === 'week') {
      isToday = getNow().isSame(cellDateObj.time, 'date');
    }

    if (mode === 'quarter') {
      isToday = getNow().isSame(cellDateObj.time, 'quarter');
    }

    function getIsRangeStartOrEnd(v) {
      return checkIsInView && !disabled && v && isSameTime(cellDateObj.time, v);
    }

    const isRangeStart = getIsRangeStartOrEnd(rangeStart);
    const isRangeEnd = getIsRangeStartOrEnd(rangeEnd);
    const isHoverRangeStart = getIsRangeStartOrEnd(hoverRangeStart);
    const isHoverRangeEnd = getIsRangeStartOrEnd(hoverRangeEnd);

    let isRangeEdgeInHoverRange = false;
    if (isRangeStart) {
      isRangeEdgeInHoverRange =
        hoverRangeStart &&
        rangeStart &&
        hoverRangeStart.isBefore(rangeStart) &&
        isInRange(rangeStart, hoverRangeStart, hoverRangeEnd);
    } else if (isRangeEnd) {
      isRangeEdgeInHoverRange =
        hoverRangeEnd &&
        rangeEnd &&
        hoverRangeEnd.isAfter(rangeEnd) &&
        isInRange(rangeEnd, hoverRangeStart, hoverRangeEnd);
    }

    let isHoverRangeEdgeInRange = false;
    if (isHoverRangeStart) {
      isHoverRangeEdgeInRange =
        hoverRangeStart &&
        rangeStart &&
        rangeStart.isBefore(hoverRangeStart) &&
        isInRange(hoverRangeStart, rangeStart, rangeEnd);
    } else if (isHoverRangeEnd) {
      isHoverRangeEdgeInRange =
        hoverRangeEnd &&
        rangeEnd &&
        rangeEnd.isAfter(hoverRangeEnd) &&
        isInRange(hoverRangeEnd, rangeStart, rangeEnd);
    }

    return cs(`${prefixCls}-cell`, {
      [`${prefixCls}-cell-disabled`]: disabled,
      [`${prefixCls}-cell-hidden`]: hideNotInViewDates && !isInView,
      [`${prefixCls}-cell-in-view`]: isInView,
      [`${prefixCls}-cell-today`]: isToday && isInView,
      [`${prefixCls}-cell-selected`]: selected,
      [`${prefixCls}-cell-range-start`]: isRangeStart,
      [`${prefixCls}-cell-range-end`]: isRangeEnd,
      [`${prefixCls}-cell-in-range`]:
        checkIsInView && !disabled && isInRange(cellDateObj.time, rangeStart, rangeEnd),
      [`${prefixCls}-cell-hover-range-start`]: isHoverRangeStart,
      [`${prefixCls}-cell-hover-range-end`]: isHoverRangeEnd,
      [`${prefixCls}-cell-hover-in-range`]:
        checkIsInView && !disabled && isInRange(cellDateObj.time, hoverRangeStart, hoverRangeEnd),
      [`${prefixCls}-cell-range-edge-in-hover-range`]: isRangeEdgeInHoverRange,
      [`${prefixCls}-cell-hover-range-edge-in-range`]: isHoverRangeEdgeInRange,
    });
  };
}
