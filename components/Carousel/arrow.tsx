import React, { useContext } from 'react';
import IconLeft from '../../icon/react-icon/IconLeft';
import IconRight from '../../icon/react-icon/IconRight';
import IconUp from '../../icon/react-icon/IconUp';
import IconDown from '../../icon/react-icon/IconDown';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { CarouselArrowProps } from './interface';

function CarouselArrow(props: CarouselArrowProps, ref) {
  const { className, direction, showArrow, prev, next } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('carousel');
  const arrowClass = cs(
    `${prefixCls}-arrow`,
    {
      [`${prefixCls}-arrow-hover`]: showArrow === 'hover',
    },
    className
  );

  return (
    <div ref={ref} className={arrowClass}>
      <div
        className={`${prefixCls}-arrow-${direction === 'vertical' ? 'top' : 'left'}`}
        onClick={prev}
      >
        {direction === 'horizontal' ? <IconLeft /> : <IconUp />}
      </div>
      <div
        className={`${prefixCls}-arrow-${direction === 'vertical' ? 'bottom' : 'right'}`}
        onClick={next}
      >
        {direction === 'horizontal' ? <IconRight /> : <IconDown />}
      </div>
    </div>
  );
}

const CarouselArrowComponent = React.forwardRef<unknown, CarouselArrowProps>(CarouselArrow);

CarouselArrowComponent.defaultProps = {
  direction: 'horizontal',
  showArrow: 'always',
};

export default CarouselArrowComponent;
