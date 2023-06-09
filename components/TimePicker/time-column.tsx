import React, { useRef, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { scrollTo } from './util';
import cs from '../_util/classNames';
import usePrevious from '../_util/hooks/usePrevious';

type ListItem = {
  label?: string;
  value?: number | string;
  disabled?: boolean;
  selected?: boolean;
};

export interface TimeColumnProps {
  prefixCls?: string;
  list?: ListItem[];
  value?: number | string;
  onHandleSelect?: (value?: number | string, unit?: string) => void;
  unit?: 'hour' | 'minute' | 'second' | 'ampm';
  popupVisible?: boolean;
  scrollSticky?: boolean;
}

export default function TimeColumn(props: TimeColumnProps) {
  const { prefixCls, list, value, onHandleSelect, unit, popupVisible, scrollSticky } = props;

  const lis = useRef<Map<number | string, HTMLElement | null>>(new Map());
  const wrapper = useRef<HTMLDivElement>();
  const ul = useRef<HTMLUListElement>();
  const listItemHeight = useRef<number>(0);

  const prevPopupVisible = usePrevious(popupVisible);

  const prevScrollTop = useRef<number>(wrapper.current && wrapper.current.scrollTop);

  useEffect(() => {
    const li = lis.current.get(value);
    if (li && popupVisible && prevPopupVisible) {
      scrollTo(wrapper.current, li.offsetTop, 150);
      prevScrollTop.current = li.offsetTop;
    }
  }, [value]);

  useEffect(() => {
    if (popupVisible && popupVisible !== prevPopupVisible) {
      const li = lis.current.get(value);
      if (li) {
        scrollTo(wrapper.current, li.offsetTop, 0);
        prevScrollTop.current = li.offsetTop;
      }
    }
  }, [popupVisible, prevPopupVisible]);

  useEffect(() => {
    if (list.length <= 1) {
      return;
    }
    listItemHeight.current =
      (ul.current.clientHeight - wrapper.current.clientHeight) / (list.length - 1);
  }, [list.length]);

  const onScrollList = useCallback(
    debounce(() => {
      const mathFunc =
        wrapper.current.scrollTop - prevScrollTop.current > 0 ? Math.ceil : Math.floor;
      const index = mathFunc(wrapper.current.scrollTop / listItemHeight.current);

      if (index !== value && list[index] && !list[index].disabled) {
        onHandleSelect(list[index].value, unit);
      }
    }, 100),
    [onHandleSelect]
  );

  return (
    <div
      className={cs(`${prefixCls}-list`)}
      ref={wrapper}
      onWheel={scrollSticky ? onScrollList : undefined}
    >
      <ul ref={ul}>
        {list.map((item) => {
          return (
            <li
              key={item.value}
              className={cs(`${prefixCls}-cell`, {
                [`${prefixCls}-cell-disabled`]: item.disabled,
                [`${prefixCls}-cell-selected`]: item.selected,
              })}
              onClick={() => !item.disabled && onHandleSelect(item.value, unit)}
              ref={(element) => {
                lis.current.set(item.value, element);
              }}
            >
              <div className={`${prefixCls}-cell-inner`}>{item.label}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
