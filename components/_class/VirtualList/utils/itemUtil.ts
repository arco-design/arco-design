import { findDOMNode } from 'react-dom';
import getStringLength from '../../../_util/getStringLength';

/**
 * 为了计算方便，定位元素的下标可能返回数组长度，代表最后一个元素
 */
export const GHOST_ITEM_KEY = '__rc_ghost_item__';

export type Key = string | number;

interface LocationItemResult {
  /** 用于定位的元素的下标 */
  index: number;
  /** 定位元素自身需要补充的偏移量 */
  offsetPtg: number;
}

/**
 * 根据滚动条当前的滚动百分比，计算出基准元素
 * 在基准元素的上方和下方渲染可见区域的其他元素
 */
export function getLocationItem(scrollPtg: number, total: number): LocationItemResult {
  const itemIndex = Math.floor(scrollPtg * total);
  const itemTopPtg = itemIndex / total;
  const offsetPtg = (scrollPtg - itemTopPtg) / (1 / total);

  return {
    index: itemIndex,
    // scrollPtg >= itemTopPtg，计算结果为元素应当补充的滚动距离相对自身高度的偏移量
    offsetPtg: Number.isNaN(offsetPtg) ? 0 : offsetPtg,
  };
}

/**
 * 获取HTML元素高度
 */
export function getNodeHeight(node: HTMLElement, needMargin = false) {
  const element = findDOMNode(node) as HTMLElement;
  let marginVertical = 0;
  if (needMargin) {
    const { marginTop, marginBottom } = window.getComputedStyle(node);
    marginVertical = Number(marginTop.replace(/\D/g, '')) + Number(marginBottom.replace(/\D/g, ''));
    marginVertical = isNaN(marginVertical) ? 0 : marginVertical;
  }
  return element ? element.offsetHeight + marginVertical : 0;
}

/**
 * 获取有效的scrollTop值
 * Safari的缓动效果会获得负值的scrollTop
 */
export function getValidScrollTop(scrollTop: number, scrollRange: number) {
  return scrollTop < 0 ? 0 : scrollTop > scrollRange ? scrollRange : scrollTop;
}

/**
 * 视口已滚动距离 / 总可滚动距离
 */
export function getScrollPercentage({
  scrollTop,
  scrollHeight,
  clientHeight,
}: {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}): number {
  const scrollRange = scrollHeight - clientHeight;
  return scrollRange <= 0 ? 0 : getValidScrollTop(scrollTop, scrollRange) / scrollRange;
}

/**
 * 计算需要渲染的元素的开始下标、结束下标和用于定位的元素下标
 */
export function getRangeIndex(scrollPtg: number, itemCount: number, visibleCount: number) {
  const { index, offsetPtg } = getLocationItem(scrollPtg, itemCount);

  const beforeCount = Math.ceil(scrollPtg * visibleCount);
  const afterCount = Math.ceil((1 - scrollPtg) * visibleCount);

  return {
    itemIndex: index,
    itemOffsetPtg: offsetPtg,
    startIndex: Math.max(0, index - beforeCount),
    endIndex: Math.min(itemCount - 1, index + afterCount),
  };
}

interface ItemTopConfig {
  itemHeight: number;
  itemOffsetPtg: number;
  scrollTop: number;
  scrollPtg: number;
  clientHeight: number;
}

/**
 * 计算元素相对于视口顶部的偏移量
 */
export function getItemRelativeTop({
  itemHeight,
  itemOffsetPtg,
  scrollPtg,
  clientHeight,
}: Omit<ItemTopConfig, 'scrollTop'>) {
  return Math.floor(clientHeight * scrollPtg - itemHeight * itemOffsetPtg);
}

/**
 * 计算元素相对于整个滚动区域顶部的偏移量
 */
export function getItemAbsoluteTop({ scrollTop, ...rest }: ItemTopConfig) {
  return scrollTop + getItemRelativeTop(rest);
}

interface CompareItemConfig {
  locatedItemRelativeTop: number;
  locatedItemIndex: number;
  compareItemIndex: number;
  getItemKey: (index: number) => Key;
  startIndex: number;
  endIndex: number;
  itemElementHeights: { [key: string]: number };
  itemHeight: number;
}

/**
 * 计算某一指定下标的元素相对于视口顶部的偏移量
 */
export function getCompareItemRelativeTop({
  locatedItemRelativeTop,
  locatedItemIndex,
  compareItemIndex,
  startIndex,
  endIndex,
  getItemKey,
  itemElementHeights,
  itemHeight,
}: CompareItemConfig) {
  let compareItemTop: number = locatedItemRelativeTop;
  const compareItemKey = getItemKey(compareItemIndex);

  if (compareItemIndex <= locatedItemIndex) {
    for (let index = locatedItemIndex; index >= startIndex; index -= 1) {
      const key = getItemKey(index);
      if (key === compareItemKey) {
        break;
      }

      const prevItemKey = getItemKey(index - 1);
      compareItemTop -= itemElementHeights[prevItemKey] || itemHeight;
    }
  } else {
    for (let index = locatedItemIndex; index <= endIndex; index += 1) {
      const key = getItemKey(index);
      if (key === compareItemKey) {
        break;
      }

      compareItemTop += itemElementHeights[key] || itemHeight;
    }
  }

  return compareItemTop;
}

export function getLongestItemIndex(data: Array<any>): number {
  let result = -1;
  let length = 0;
  data.forEach((item, index) => {
    item = typeof item === 'string' ? item : item.props?.children;
    if (typeof item === 'string') {
      const _length = getStringLength(item);
      if (_length > length) {
        length = _length;
        result = index;
      }
    }
  });
  return result;
}
