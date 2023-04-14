import React, { useMemo } from 'react';
import IconLeft from '../../../icon/react-icon/IconLeft';
import IconRight from '../../../icon/react-icon/IconRight';
import IconUp from '../../../icon/react-icon/IconUp';
import IconDown from '../../../icon/react-icon/IconDown';
import IconHover from '../../_class/icon-hover';
import cs from '../../_util/classNames';
import { TabsProps } from '../tabs';
import { ReturnType } from '../hook/useDomSize';
import { isNull } from '../../_util/is';

interface TabNavIconProps {
  direction: TabsProps['direction'];
  align: 'left' | 'right';
  headerSize: ReturnType;
  headerWrapperSize: ReturnType;
  currentOffset: number;
  prefixCls?: string;
  icon?: React.ReactNode;
  iconPos?: 'prev' | 'next';
  rtl?: boolean;
  onChange?: (offset: number) => void;
}

const horizontalMap: Record<TabNavIconProps['iconPos'], 'left' | 'right'> = {
  prev: 'left',
  next: 'right',
};
const vertialMap: Record<TabNavIconProps['iconPos'], 'up' | 'down'> = { prev: 'up', next: 'down' };

const TabNavIcon = (props: TabNavIconProps) => {
  const {
    direction,
    headerSize,
    headerWrapperSize,
    prefixCls,
    iconPos,
    currentOffset: curOffset,
    align,
    rtl,
    icon,
  } = props;
  const { height: wrapHeight, width: wrapWidth } = headerWrapperSize;
  const { height: headerHeight, width: headerWidth } = headerSize;
  const maxHeightOffset = headerHeight - wrapHeight;
  const maxWidthOffset = headerWidth - wrapWidth;

  const defaultIcon = {
    up: <IconUp />,
    down: <IconDown />,
    left: rtl ? <IconRight /> : <IconLeft />,
    right: rtl ? <IconLeft /> : <IconRight />,
  };

  const onChange = (offset) => {
    if (offset !== props.currentOffset) {
      props.onChange && props.onChange(offset);
    }
  };

  const handleHozClick = (e, pos) => {
    e.preventDefault();
    let nextOffset;
    if (align === 'left') {
      nextOffset = pos === 'left' ? curOffset - wrapWidth : curOffset + wrapWidth;
    } else {
      nextOffset = pos === 'left' ? curOffset + wrapWidth : curOffset - wrapWidth;
    }
    onChange(nextOffset);
  };

  const handleVerticalClick = (e, pos) => {
    e.preventDefault();
    let nextOffset;
    if (pos === 'up') {
      nextOffset = curOffset - wrapHeight;
    } else {
      nextOffset = curOffset + wrapHeight;
      if (nextOffset >= headerHeight) return;
    }
    onChange(nextOffset);
  };

  const disabledPrev = useMemo(() => {
    if (align === 'left') {
      return curOffset <= 0;
    }
    return direction === 'vertical' ? curOffset >= maxHeightOffset : curOffset >= maxWidthOffset;
  }, [align, direction, curOffset, maxWidthOffset, curOffset]);

  const disabledNext = useMemo(() => {
    if (align === 'left') {
      return direction === 'vertical' ? curOffset >= maxHeightOffset : curOffset >= maxWidthOffset;
    }
    return curOffset <= 0;
  }, [align, direction, maxHeightOffset, maxWidthOffset, curOffset]);

  if (isNull(icon)) {
    return null;
  }

  const iconDirection = direction === 'horizontal' ? horizontalMap[iconPos] : vertialMap[iconPos];
  const disabled = iconPos === 'prev' ? disabledPrev : disabledNext;
  const className = cs(`${prefixCls}-${iconDirection}-icon`, {
    [`${prefixCls}-nav-icon-disabled`]: disabled,
  });

  const handleClick = direction === 'vertical' ? handleVerticalClick : handleHozClick;
  return (
    <IconHover
      disabled={disabled}
      className={className}
      prefix={prefixCls}
      onClick={(e) => handleClick(e, iconDirection)}
    >
      {icon || defaultIcon[iconDirection]}
    </IconHover>
  );
};

export default TabNavIcon;
