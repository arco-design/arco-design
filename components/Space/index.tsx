import React, { useContext, Fragment, forwardRef } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { isArray, isNumber } from '../_util/is';
import { SpaceSize, SpaceProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

const defaultProps: SpaceProps = {
  size: 'small',
  direction: 'horizontal',
};

function Space(baseProps: SpaceProps, ref) {
  const { getPrefixCls, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<SpaceProps>(baseProps, defaultProps, componentConfig?.Space);
  const { className, style, children, size, direction, align, wrap, split, ...rest } = props;

  const prefixCls = getPrefixCls('space');

  const innerAlign = align || (direction === 'horizontal' ? 'center' : '');

  const classNames = cs(
    prefixCls,
    {
      [`${prefixCls}-${direction}`]: direction,
      [`${prefixCls}-align-${innerAlign}`]: innerAlign,
      [`${prefixCls}-wrap`]: wrap,
    },
    className
  );

  function getMargin(size: SpaceSize) {
    if (isNumber(size)) {
      return size;
    }
    switch (size) {
      case 'mini':
        return 4;
      case 'small':
        return 8;
      case 'medium':
        return 16;
      case 'large':
        return 24;
      default:
        return 8;
    }
  }

  const childrenList = React.Children.toArray(children);

  function getMarginStyle(index) {
    const isLastOne = childrenList.length === index + 1;
    if (typeof size === 'string' || typeof size === 'number') {
      const margin = getMargin(size);
      if (wrap) {
        return isLastOne
          ? { marginBottom: margin }
          : {
              marginRight: margin,
              marginBottom: margin,
            };
      }
      return !isLastOne
        ? {
            [direction === 'vertical' ? 'marginBottom' : 'marginRight']: margin,
          }
        : {};
    }
    if (isArray(size)) {
      const marginRight = getMargin(size[0]);
      const marginBottom = getMargin(size[1]);
      if (wrap) {
        return isLastOne
          ? { marginBottom }
          : {
              marginRight,
              marginBottom,
            };
      }
      if (direction === 'vertical') {
        return { marginBottom };
      }
      return { marginRight };
    }
  }

  return (
    <div ref={ref} className={classNames} style={style} {...rest}>
      {childrenList.map((child, index) => {
        const shouldRenderSplit = split !== undefined && split !== null && index > 0;
        return (
          <Fragment key={index}>
            {shouldRenderSplit && <div className={`${prefixCls}-item-split`}>{split}</div>}
            <div className={`${prefixCls}-item`} style={getMarginStyle(index)}>
              {child}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

const SpaceComponent = forwardRef<unknown, SpaceProps>(Space);

SpaceComponent.displayName = 'Space';

export default SpaceComponent;

export { SpaceSize, SpaceProps };
