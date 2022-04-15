import React, { useEffect, useImperativeHandle, useRef, useMemo, useState, ReactNode } from 'react';
import {
  Key,
  getValidScrollTop,
  getCompareItemRelativeTop,
  getItemAbsoluteTop,
  getItemRelativeTop,
  getNodeHeight,
  getRangeIndex,
  getScrollPercentage,
  GHOST_ITEM_KEY,
  getLongestItemIndex,
  getLocationItem,
} from './utils/itemUtil';
import { raf, caf } from '../../_util/raf';
import { isNumber } from '../../_util/is';
import usePrevious from '../../_util/hooks/usePrevious';
import { findListDiffIndex, getIndexByStartLoc } from './utils/algorithmUtil';
import Filler from './Filler';
import useStateWithPromise from '../../_util/hooks/useStateWithPromise';
import useIsFirstRender from '../../_util/hooks/useIsFirstRender';
import useForceUpdate from '../../_util/hooks/useForceUpdate';
import ResizeObserver from '../../_util/resizeObserver';
import useIsomorphicLayoutEffect from '../../_util/hooks/useIsomorphicLayoutEffect';

export type RenderFunc<T> = (
  item: T,
  index: number,
  props: { style: React.CSSProperties }
) => ReactNode;

type Status = 'NONE' | 'MEASURE_START' | 'MEASURE_DONE';

export interface VirtualListProps<T> extends React.HTMLAttributes<any> {
  children: RenderFunc<T>;
  data: T[];
  /* Viewable area height (`2.11.0` starts support `string` type such as `80%`) */
  height?: number | string;
  /* The element height used to calculate how many elements are actually rendered */
  itemHeight?: number;
  /* HTML tags for wrapping */
  wrapper?: string | React.FC<any> | React.ComponentClass<any>;
  /* Threshold of the number of elements that auto enable virtual scrolling, use `null` to disable virtual scrolling */
  threshold?: number | null;
  /* Whether it's static elements of the same height */
  isStaticItemHeight?: boolean;
  /* Key of the specified element, or function to get the key */
  itemKey?: Key | ((item: T, index: number) => Key);
  /* Whether need to measure longest child element */
  measureLongestItem?: boolean;
  /* Configure the default behavior related to scrolling */
  scrollOptions?: ScrollIntoViewOptions;
  onScroll?: React.UIEventHandler<HTMLElement>;
}

export type AvailableVirtualListProps = Pick<
  VirtualListProps<any>,
  'height' | 'itemHeight' | 'threshold' | 'isStaticItemHeight' | 'scrollOptions'
>;

interface RelativeScroll {
  itemIndex: number;
  relativeTop: number;
}

interface VirtualListState {
  status: Status;
  startIndex: number;
  endIndex: number;
  itemIndex: number;
  itemOffsetPtg: number;
  startItemTop: number;
  scrollTop: number;
}

export type VirtualListHandle = {
  dom: HTMLElement;
  scrollTo: (
    arg:
      | number
      | {
          index: number;
          options?: ScrollIntoViewOptions;
        }
      | {
          key: Key;
          options?: ScrollIntoViewOptions;
        }
  ) => void;
};

// map for height of each element
type ItemHeightMap = { [p: string]: number };

// height of the virtual element, used to calculate total height of the virtual list
const DEFAULT_VIRTUAL_ITEM_HEIGHT = 32;
const KEY_VIRTUAL_ITEM_HEIGHT = `__virtual_item_height_${Math.random().toFixed(5).slice(2)}`;

// after collecting the real height of the first screen element, calculate the virtual ItemHeight to trigger list re-rendering
const useComputeVirtualItemHeight = (refItemHeightMap: React.MutableRefObject<ItemHeightMap>) => {
  const forceUpdate = useForceUpdate();
  const { current: heightMap } = refItemHeightMap;

  useEffect(() => {
    // virtual item height should be static as possible, otherwise it is easy to cause jitter
    if (Object.keys(heightMap).length && !heightMap[KEY_VIRTUAL_ITEM_HEIGHT]) {
      heightMap[KEY_VIRTUAL_ITEM_HEIGHT] = Object.entries(heightMap).reduce(
        (sum, [, currentHeight], currentIndex, array) => {
          const nextSum = sum + currentHeight;
          return currentIndex === array.length - 1 ? Math.round(nextSum / array.length) : nextSum;
        },
        0
      );
      forceUpdate();
    }
  }, [Object.keys(heightMap).length]);
};

// cache the constructed results of child nodes to avoid redrawing of child nodes caused by re-construction during drawing
const useCacheChildrenNodes = (children: VirtualListProps<any>['children']) => {
  const refCacheMap = useRef<{ [key: number]: ReactNode }>({});
  const refPrevChildren = useRef(children);

  useEffect(() => {
    refPrevChildren.current = children;
  }, [children]);

  // children change means state of parent component is updated, so clear cache
  if (children !== refPrevChildren.current) {
    refCacheMap.current = {};
  }

  return (item, index, props) => {
    if (!refCacheMap.current.hasOwnProperty(index)) {
      refCacheMap.current[index] = children(item, index, props);
    }
    return refCacheMap.current[index];
  };
};

const VirtualList: React.ForwardRefExoticComponent<
  VirtualListProps<any> & React.RefAttributes<VirtualListHandle>
> = React.forwardRef((props: VirtualListProps<any>, ref) => {
  const {
    style,
    className,
    children,
    data = [],
    itemKey,
    threshold = 100,
    wrapper: WrapperTagName = 'div',
    height: propHeight = '100%',
    isStaticItemHeight = true,
    itemHeight: propItemHeight,
    measureLongestItem,
    scrollOptions,
    onScroll,
    ...restProps
  } = props;
  // Compatible with setting the height of the list through style.maxHeight
  const styleListMaxHeight = (style && style.maxHeight) || propHeight;

  const refItemHeightMap = useRef<ItemHeightMap>({});
  const [stateHeight, setStateHeight] = useState(200);
  const renderChild = useCacheChildrenNodes(children);

  useComputeVirtualItemHeight(refItemHeightMap);

  // Elements with the same height, the height of the item is based on the first rendering
  const itemCount = data.length;
  const itemHeight =
    propItemHeight ||
    refItemHeightMap.current[KEY_VIRTUAL_ITEM_HEIGHT] ||
    DEFAULT_VIRTUAL_ITEM_HEIGHT;
  const viewportHeight = isNumber(styleListMaxHeight) ? styleListMaxHeight : stateHeight;
  const itemCountVisible = Math.ceil(viewportHeight / itemHeight);
  const itemTotalHeight = itemHeight * itemCount;
  const isVirtual =
    threshold !== null && itemCount >= threshold && itemTotalHeight > viewportHeight;

  const refList = useRef(null);
  const refRafId = useRef(null);
  const refLockScroll = useRef(false);
  const refIsVirtual = useRef(isVirtual);

  // The paddingTop of the record scrolling list is used to correct the scrolling distance
  const scrollListPadding = useMemo<{ top: number; bottom: number }>(() => {
    if (refList.current) {
      const getPadding = (property) =>
        +window.getComputedStyle(refList.current)[property].replace(/\D/g, '');
      return {
        top: getPadding('paddingTop'),
        bottom: getPadding('paddingBottom'),
      };
    }

    return { top: 0, bottom: 0 };
  }, [refList.current]);

  const [state, setState] = useStateWithPromise<VirtualListState>({
    // measure status
    status: 'NONE',
    // render range info
    startIndex: 0,
    endIndex: 0,
    itemIndex: 0,
    itemOffsetPtg: 0,
    // scroll info
    startItemTop: 0,
    scrollTop: 0,
  });

  const prevData = usePrevious(data) || [];
  const isFirstRender = useIsFirstRender();

  const getItemKey = (item, index) => {
    return typeof itemKey === 'function'
      ? itemKey(item, index)
      : typeof itemKey === 'string'
      ? item[itemKey]
      : item.key || index;
  };

  const getItemKeyByIndex = (index, items = data) => {
    if (index === items.length) {
      return GHOST_ITEM_KEY;
    }
    const item = items[index];
    return item !== undefined ? getItemKey(item, index) : null;
  };

  const getCachedItemHeight = (key: Key): number => {
    return refItemHeightMap.current[key] || itemHeight;
  };

  const internalScrollTo = (relativeScroll: RelativeScroll): void => {
    const { itemIndex: compareItemIndex, relativeTop: compareItemRelativeTop } = relativeScroll;
    const { scrollHeight, clientHeight } = refList.current;
    const originScrollTop = state.scrollTop;
    const maxScrollTop = scrollHeight - clientHeight;

    let bestSimilarity = Number.MAX_VALUE;
    let bestScrollTop: number = null;
    let bestItemIndex: number = null;
    let bestItemOffsetPtg: number = null;
    let bestStartIndex: number = null;
    let bestEndIndex: number = null;
    let missSimilarity = 0;

    for (let i = 0; i < maxScrollTop; i++) {
      const scrollTop = getIndexByStartLoc(0, maxScrollTop, originScrollTop, i);
      const scrollPtg = getScrollPercentage({ scrollTop, scrollHeight, clientHeight });
      const { itemIndex, itemOffsetPtg, startIndex, endIndex } = getRangeIndex(
        scrollPtg,
        itemCount,
        itemCountVisible
      );

      if (startIndex <= compareItemIndex && compareItemIndex <= endIndex) {
        const locatedItemRelativeTop = getItemRelativeTop({
          itemHeight: getCachedItemHeight(getItemKeyByIndex(itemIndex)),
          itemOffsetPtg,
          clientHeight,
          scrollPtg,
        });

        const compareItemTop = getCompareItemRelativeTop({
          locatedItemRelativeTop,
          locatedItemIndex: itemIndex,
          compareItemIndex,
          startIndex,
          endIndex,
          itemHeight,
          getItemKey: getItemKeyByIndex,
          itemElementHeights: refItemHeightMap.current,
        });

        const similarity = Math.abs(compareItemTop - compareItemRelativeTop);
        if (similarity < bestSimilarity) {
          bestSimilarity = similarity;
          bestScrollTop = scrollTop;
          bestItemIndex = itemIndex;
          bestItemOffsetPtg = itemOffsetPtg;
          bestStartIndex = startIndex;
          bestEndIndex = endIndex;

          missSimilarity = 0;
        } else {
          missSimilarity += 1;
        }
      }

      if (missSimilarity > 10) {
        break;
      }
    }

    if (bestScrollTop !== null) {
      refLockScroll.current = true;
      refList.current.scrollTop = bestScrollTop;

      setState({
        ...state,
        status: 'MEASURE_START',
        scrollTop: bestScrollTop,
        itemIndex: bestItemIndex,
        itemOffsetPtg: bestItemOffsetPtg,
        startIndex: bestStartIndex,
        endIndex: bestEndIndex,
      });
    }

    refRafId.current = raf(() => {
      refLockScroll.current = false;
    });
  };

  // Record the current element position when the real list is scrolled, and ensure that the position is correct after switching to the virtual list
  const rawListScrollHandler = (event) => {
    const { scrollTop: rawScrollTop, clientHeight, scrollHeight } = refList.current;
    const scrollTop = getValidScrollTop(rawScrollTop, scrollHeight - clientHeight);

    const scrollPtg = getScrollPercentage({
      scrollTop,
      clientHeight,
      scrollHeight,
    });

    const { index, offsetPtg } = getLocationItem(scrollPtg, itemCount);

    setState({
      ...state,
      scrollTop,
      itemIndex: index,
      itemOffsetPtg: offsetPtg,
    });

    event && onScroll && onScroll(event);
  };

  // Modify the state and recalculate the position in the next render
  const virtualListScrollHandler = (event, isInit = false) => {
    const { scrollTop: rawScrollTop, clientHeight, scrollHeight } = refList.current;
    const scrollTop = getValidScrollTop(rawScrollTop, scrollHeight - clientHeight);

    // Prevent jitter
    if (!isInit && (scrollTop === state.scrollTop || refLockScroll.current)) {
      return;
    }

    const scrollPtg = getScrollPercentage({
      scrollTop,
      clientHeight,
      scrollHeight,
    });
    const { itemIndex, itemOffsetPtg, startIndex, endIndex } = getRangeIndex(
      scrollPtg,
      itemCount,
      itemCountVisible
    );

    setState({
      ...state,
      scrollTop,
      itemIndex,
      itemOffsetPtg,
      startIndex,
      endIndex,
      status: 'MEASURE_START',
    });

    event && onScroll && onScroll(event);
  };

  useEffect(() => {
    return () => {
      refRafId.current && caf(refRafId.current);
    };
  }, []);

  // rerender when the number of visible elements changes
  useEffect(() => {
    if (refList.current) {
      if (isFirstRender) {
        refList.current.scrollTop = 0;
      }
      virtualListScrollHandler(null, true);
    }
  }, [itemCountVisible]);

  // Handle additions and deletions of list items or switching the virtual state
  useEffect(() => {
    let changedItemIndex: number = null;
    const switchTo = refIsVirtual.current !== isVirtual ? (isVirtual ? 'virtual' : 'raw') : '';

    refIsVirtual.current = isVirtual;

    if (viewportHeight && prevData.length !== data.length) {
      const diff = findListDiffIndex(prevData, data, getItemKey);
      changedItemIndex = diff ? diff.index : null;
    }

    // No need to correct the position when the number of elements in the real list changes
    if (switchTo || (isVirtual && changedItemIndex)) {
      const { clientHeight } = refList.current;
      const locatedItemRelativeTop = getItemRelativeTop({
        itemHeight: getCachedItemHeight(getItemKeyByIndex(state.itemIndex, prevData)),
        itemOffsetPtg: state.itemOffsetPtg,
        scrollPtg: getScrollPercentage({
          scrollTop: state.scrollTop,
          scrollHeight: prevData.length * itemHeight,
          clientHeight,
        }),
        clientHeight,
      });

      if (switchTo === 'raw') {
        let rawTop = locatedItemRelativeTop;
        for (let index = 0; index < state.itemIndex; index++) {
          rawTop -= getCachedItemHeight(getItemKeyByIndex(index));
        }

        refList.current.scrollTop = -rawTop;
        refLockScroll.current = true;
        refRafId.current = raf(() => {
          refLockScroll.current = false;
        });
      } else {
        internalScrollTo({
          itemIndex: state.itemIndex,
          relativeTop: locatedItemRelativeTop,
        });
      }
    }
  }, [data, isVirtual]);

  useIsomorphicLayoutEffect(() => {
    if (state.status === 'MEASURE_START') {
      const { scrollTop, scrollHeight, clientHeight } = refList.current;
      const scrollPtg = getScrollPercentage({
        scrollTop,
        scrollHeight,
        clientHeight,
      });

      // Calculate the top value of the first rendering element
      let startItemTop = getItemAbsoluteTop({
        scrollPtg,
        clientHeight,
        scrollTop: scrollTop - (scrollListPadding.top + scrollListPadding.bottom) * scrollPtg,
        itemHeight: getCachedItemHeight(getItemKeyByIndex(state.itemIndex)),
        itemOffsetPtg: state.itemOffsetPtg,
      });
      for (let index = state.itemIndex - 1; index >= state.startIndex; index--) {
        startItemTop -= getCachedItemHeight(getItemKeyByIndex(index));
      }

      setState({
        ...state,
        startItemTop,
        status: 'MEASURE_DONE',
      });
    }
  }, [state]);

  useImperativeHandle<any, VirtualListHandle>(
    ref,
    () => ({
      dom: refList.current,
      // Scroll to a certain height or an element
      scrollTo: (arg) => {
        refRafId.current && caf(refRafId.current);
        refRafId.current = raf(() => {
          if (typeof arg === 'number') {
            refList.current.scrollTop = arg;
            return;
          }

          const index =
            'index' in arg
              ? arg.index
              : 'key' in arg
              ? data.findIndex((item, index) => getItemKey(item, index) === arg.key)
              : 0;
          const item = data[index];

          if (!item) {
            return;
          }

          let align: ScrollIntoViewOptions['block'] =
            typeof arg === 'object' && arg.options?.block
              ? arg.options.block
              : scrollOptions?.block || 'nearest';
          const { clientHeight, scrollTop } = refList.current;

          if (isVirtual && !isStaticItemHeight) {
            if (align === 'nearest') {
              const { itemIndex, itemOffsetPtg } = state;
              if (Math.abs(itemIndex - index) < itemCountVisible) {
                let itemTop = getItemRelativeTop({
                  itemHeight: getCachedItemHeight(getItemKeyByIndex(itemIndex)),
                  itemOffsetPtg,
                  clientHeight,
                  scrollPtg: getScrollPercentage(refList.current),
                });

                if (index < itemIndex) {
                  for (let i = index; i < itemIndex; i++) {
                    itemTop -= getCachedItemHeight(getItemKeyByIndex(i));
                  }
                } else {
                  for (let i = itemIndex; i < index; i++) {
                    itemTop += getCachedItemHeight(getItemKeyByIndex(i));
                  }
                }

                // When the target element is within the field of view, exit directly
                if (itemTop < 0 || itemTop > clientHeight) {
                  align = itemTop < 0 ? 'start' : 'end';
                } else {
                  return;
                }
              } else {
                align = index < itemIndex ? 'start' : 'end';
              }
            }

            setState({
              ...state,
              startIndex: Math.max(0, index - itemCountVisible),
              endIndex: Math.min(itemCount - 1, index + itemCountVisible),
            }).then(() => {
              const itemHeight = getCachedItemHeight(getItemKey(item, index));
              internalScrollTo({
                itemIndex: index,
                relativeTop:
                  align === 'start'
                    ? 0
                    : (clientHeight - itemHeight) / (align === 'center' ? 2 : 1),
              });
            });
          } else {
            const indexItemHeight = getCachedItemHeight(getItemKeyByIndex(index));
            let itemTop = 0;
            for (let i = 0; i < index; i++) {
              itemTop += getCachedItemHeight(getItemKeyByIndex(i));
            }
            const itemBottom = itemTop + indexItemHeight;

            if (align === 'nearest') {
              if (itemTop < scrollTop) {
                align = 'start';
              } else if (itemBottom > scrollTop + clientHeight) {
                align = 'end';
              }
            }

            const viewportHeight = clientHeight - indexItemHeight;
            refList.current.scrollTop =
              itemTop - (align === 'start' ? 0 : viewportHeight / (align === 'center' ? 2 : 1));
          }
        });
      },
    }),
    [data, itemHeight, state]
  );

  const renderChildren = (list, startIndex: number) => {
    return list.map((item, index) => {
      const originIndex = startIndex + index;
      const node = renderChild(item, originIndex, {
        style: {},
      }) as React.ReactElement;
      const key = getItemKey(item, originIndex);
      return React.cloneElement(node, {
        key,
        ref: (ele: HTMLElement) => {
          const { current: heightMap } = refItemHeightMap;
          // Minimize the measurement of element height as much as possible to avoid frequent triggering of browser reflow
          // Method getNodeHeight get the clientHeight from the DOM referred by React ref. If result is wrong, check the ref of this element
          if (
            ele &&
            state.status === 'MEASURE_START' &&
            (!isStaticItemHeight || heightMap[key] === undefined)
          ) {
            if (isStaticItemHeight) {
              if (!heightMap[KEY_VIRTUAL_ITEM_HEIGHT]) {
                heightMap[KEY_VIRTUAL_ITEM_HEIGHT] = getNodeHeight(ele);
              }
              heightMap[key] = heightMap[KEY_VIRTUAL_ITEM_HEIGHT];
            } else {
              heightMap[key] = getNodeHeight(ele);
            }
          }
        },
      });
    });
  };

  // Render the widest element to provide the maximum width of the container initially
  const refLongestItemIndex = useRef<number>(null);

  // Don't add `renderChild` to the array dependency, it will change every time when rerender
  useEffect(() => {
    refLongestItemIndex.current = null;
  }, [data]);

  const renderLongestItem = () => {
    if (measureLongestItem) {
      const index =
        refLongestItemIndex.current === null
          ? getLongestItemIndex(data)
          : refLongestItemIndex.current;
      const item = data[index];

      refLongestItemIndex.current = index;

      return item ? (
        <div style={{ height: 1, overflow: 'hidden', opacity: 0 }}>
          {renderChild(item, index, { style: {} })}
        </div>
      ) : null;
    }
    return null;
  };

  return (
    <ResizeObserver
      onResize={() => {
        if (refList.current && !isNumber(styleListMaxHeight)) {
          const { clientHeight } = refList.current;
          setStateHeight(clientHeight);
        }
      }}
    >
      <WrapperTagName
        ref={refList}
        style={{
          overflowY: 'auto',
          overflowAnchor: 'none',
          ...style,
          maxHeight: styleListMaxHeight,
        }}
        className={className}
        onScroll={isVirtual ? virtualListScrollHandler : rawListScrollHandler}
        {...restProps}
      >
        {isVirtual ? (
          <>
            <Filler
              height={itemTotalHeight}
              offset={state.status === 'MEASURE_DONE' ? state.startItemTop : 0}
            >
              {renderChildren(data.slice(state.startIndex, state.endIndex + 1), state.startIndex)}
            </Filler>
            {renderLongestItem()}
          </>
        ) : (
          <Filler height={viewportHeight}>{renderChildren(data, 0)}</Filler>
        )}
      </WrapperTagName>
    </ResizeObserver>
  );
});

VirtualList.displayName = 'VirtualList';

export default VirtualList;
