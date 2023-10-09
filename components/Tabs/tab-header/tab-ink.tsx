import React, { useRef, CSSProperties, useEffect } from 'react';
import isEqualWith from 'lodash/isEqualWith';
import cs from '../../_util/classNames';
import { getRectDiff } from '../utils';
import throttleByRaf from '../../_util/throttleByRaf';

const getInkStyle = (direction, curTitle, headerRef) => {
  let style: CSSProperties = {};

  if (curTitle) {
    const diffStyle = getRectDiff(curTitle, headerRef);
    if (direction === 'vertical') {
      style = {
        top: `${diffStyle.top}px`,
        height: `${curTitle.offsetHeight}px`,
        left: '',
        width: '',
      };
    } else {
      style = {
        left: `${diffStyle.left}px`,
        width: `${curTitle.offsetWidth}px`,
        top: '',
        height: '',
      };
    }
  }
  return style;
};

const TabInk = ({
  prefixCls,
  animation,
  disabled,
  direction,
  getTitleRef,
  activeTab,
  getHeaderRef,
  inkBarSize,
}) => {
  const inkRef = useRef<HTMLDivElement>();
  const inkStyleRef = useRef<CSSProperties>();

  useEffect(() => {
    const setInkStyle = throttleByRaf(() => {
      const newStyle = getInkStyle(
        direction,
        getTitleRef(activeTab),
        getHeaderRef('headerRef').current
      );

      if (newStyle && !isEqualWith(inkStyleRef.current, newStyle)) {
        inkStyleRef.current = newStyle;
        Object.keys(newStyle).forEach((key) => {
          inkRef.current.style[key] = newStyle[key];
        });
      }
    });

    setInkStyle();

    return () => {
      setInkStyle.cancel && setInkStyle.cancel();
    };
  });

  return (
    <div
      className={cs(`${prefixCls}-header-ink`, {
        [`${prefixCls}-header-ink-no-animation`]: !animation,
        [`${prefixCls}-header-ink-disabled`]: disabled,
        [`${prefixCls}-header-ink-custom`]: inkBarSize,
      })}
      ref={inkRef}
    >
      {inkBarSize && <div style={inkBarSize} className={`${prefixCls}-header-ink-inner`} />}
    </div>
  );
};

export default TabInk;
