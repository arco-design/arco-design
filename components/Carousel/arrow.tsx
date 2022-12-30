import React, { useContext } from 'react';
import IconLeft from '../../icon/react-icon/IconLeft';
import IconRight from '../../icon/react-icon/IconRight';
import IconUp from '../../icon/react-icon/IconUp';
import IconDown from '../../icon/react-icon/IconDown';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { CarouselArrowProps } from './interface';
import useKeyboardEvent from '../_util/hooks/useKeyboardEvent';

function CarouselArrow(props: CarouselArrowProps, ref) {
  const { className, direction = 'horizontal', showArrow = 'always', prev, next, icons } = props;

  const getKeyboardEvents = useKeyboardEvent();
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('carousel');
  const arrowClass = cs(
    `${prefixCls}-arrow`,
    {
      [`${prefixCls}-arrow-hover`]: showArrow === 'hover',
    },
    className
  );
  const iconPrev =
    icons && icons.hasOwnProperty('prev') ? (
      icons.prev
    ) : direction === 'horizontal' ? (
      <IconLeft />
    ) : (
      <IconUp />
    );
  const iconNext =
    icons && icons.hasOwnProperty('next') ? (
      icons.next
    ) : direction === 'horizontal' ? (
      <IconRight />
    ) : (
      <IconDown />
    );

  return (
    <div ref={ref} className={arrowClass}>
      <div
        className={`${prefixCls}-arrow-${direction === 'vertical' ? 'top' : 'left'}`}
        onClick={prev}
        role="button"
        tabIndex={0}
        {...getKeyboardEvents({ onPressEnter: prev })}
      >
        {iconPrev}
      </div>
      <div
        className={`${prefixCls}-arrow-${direction === 'vertical' ? 'bottom' : 'right'}`}
        onClick={next}
        role="button"
        tabIndex={0}
        {...getKeyboardEvents({ onPressEnter: next })}
      >
        {iconNext}
      </div>
    </div>
  );
}

const CarouselArrowComponent = React.forwardRef<unknown, CarouselArrowProps>(CarouselArrow);

export default CarouselArrowComponent;
