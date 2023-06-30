import React, { ReactNode, useContext } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { CarouselIndicatorProps } from './interface';

function CarouselIndicator(props: CarouselIndicatorProps, ref) {
  const { getPrefixCls } = useContext(ConfigContext);
  const {
    className,
    type = 'line',
    count = 2,
    activeIndex = 0,
    position = 'bottom',
    trigger = 'click',
    onSelectIndex,
  } = props;

  const prefixCls = getPrefixCls('carousel-indicator');
  const indicatorContent: ReactNode[] = [];

  if (type === 'slider') {
    const step = 100 / count;
    indicatorContent.push(
      <span
        key={0}
        style={{ width: `${step}%`, left: `${activeIndex * step}%` }}
        className={cs(`${prefixCls}-item`, `${prefixCls}-item-active`)}
      />
    );
  } else {
    for (let i = 0; i < count; i++) {
      indicatorContent.push(
        <span
          key={i}
          data-index={i}
          className={cs(`${prefixCls}-item`, {
            [`${prefixCls}-item-active`]: i === activeIndex,
          })}
        />
      );
    }
  }

  const wrapperProps = {
    ref,
    className: cs(prefixCls, `${prefixCls}-${type}`, `${prefixCls}-${position}`, className),
    [trigger === 'click' ? 'onClick' : 'onMouseMove']: (event) => {
      event.preventDefault();
      if (type === 'slider') {
        // clear up effect from event bubbling
        if (event.target === event.currentTarget) {
          const { x: startX, width } = event.currentTarget.getBoundingClientRect();
          const offsetX = event.nativeEvent.clientX - startX;
          const index = ~~((offsetX / width) * count);
          index !== activeIndex && onSelectIndex(index);
        }
      } else {
        const dataIndex: string = event.target.getAttribute('data-index');
        // Judge if data-index exists at first, event.target can be the wrapper of indicators
        dataIndex && +dataIndex !== activeIndex && onSelectIndex(+dataIndex);
      }
    },
  };

  return <div {...wrapperProps}>{indicatorContent}</div>;
}

const CarouselIndicatorComponent = React.forwardRef<unknown, CarouselIndicatorProps>(
  CarouselIndicator
);

export default CarouselIndicatorComponent;
