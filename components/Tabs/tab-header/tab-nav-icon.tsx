import React from 'react';
import IconLeft from '../../../icon/react-icon/IconLeft';
import IconRight from '../../../icon/react-icon/IconRight';
import IconUp from '../../../icon/react-icon/IconUp';
import IconDown from '../../../icon/react-icon/IconDown';
import IconHover from '../../_class/icon-hover';
import cs from '../../_util/classNames';

const TabNavIcon = (props) => {
  const {
    direction,
    headerSize,
    headerWrapperSize,
    prefixCls,
    iconPos,
    currentOffset: curOffset,
    align,
    rtl,
  } = props;

  const { height: wrapHeight, width: wrapWidth } = headerWrapperSize;
  const { height: headerHeight, width: headerWidth } = headerSize;
  const maxHeightOffset = headerHeight - wrapHeight;
  const maxWidthOffset = headerWidth - wrapWidth;

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

  let disabledPrev = false;
  let disabledNext = false;

  if (align === 'left') {
    disabledPrev = curOffset <= 0;
    disabledNext =
      direction === 'vertical' ? curOffset >= maxHeightOffset : curOffset >= maxWidthOffset;
  } else {
    disabledPrev =
      direction === 'vertical' ? curOffset >= maxHeightOffset : curOffset >= maxWidthOffset;
    disabledNext = curOffset <= 0;
  }

  return direction === 'vertical' ? (
    iconPos === 'prev' ? (
      <IconHover
        disabled={disabledPrev}
        prefix={prefixCls}
        className={cs(`${prefixCls}-up-icon`, {
          [`${prefixCls}-nav-icon-disabled`]: disabledPrev,
        })}
        onClick={(e) => {
          handleVerticalClick(e, 'up');
        }}
      >
        <IconUp />
      </IconHover>
    ) : (
      <IconHover
        prefix={prefixCls}
        className={cs(`${prefixCls}-down-icon`, {
          [`${prefixCls}-nav-icon-disabled`]: disabledNext,
        })}
        disabled={disabledNext}
        onClick={(e) => {
          handleVerticalClick(e, 'down');
        }}
      >
        <IconDown />
      </IconHover>
    )
  ) : iconPos === 'prev' ? (
    <IconHover
      prefix={prefixCls}
      disabled={disabledPrev}
      className={cs(`${prefixCls}-left-icon`, {
        [`${prefixCls}-nav-icon-disabled`]: disabledPrev,
      })}
      onClick={(e) => {
        handleHozClick(e, 'left');
      }}
    >
      {rtl ? <IconRight /> : <IconLeft />}
    </IconHover>
  ) : (
    <IconHover
      prefix={prefixCls}
      className={cs(`${prefixCls}-right-icon`, {
        [`${prefixCls}-nav-icon-disabled`]: disabledNext,
      })}
      disabled={disabledNext}
      onClick={(e) => {
        handleHozClick(e, 'right');
      }}
    >
      {rtl ? <IconLeft /> : <IconRight />}
    </IconHover>
  );
};

export default TabNavIcon;
