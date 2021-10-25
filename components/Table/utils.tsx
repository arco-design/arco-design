import { isArray } from '../_util/is';

export function getScrollBarHeight(ele: HTMLElement | null) {
  return ele ? ele.offsetHeight - ele.clientHeight : 0;
}

export function getScrollBarWidth(ele: HTMLElement | null) {
  return ele ? ele.offsetWidth - ele.clientWidth : 0;
}

export function isChildrenNotEmpty(record, field: string) {
  return isArray(record[field]) && record[field].length;
}
