import React, { useContext, Fragment, forwardRef, ReactElement } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { isArray, isNumber } from '../_util/is';
import { SpaceSize, SpaceProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';
import toArray from './toArray';

const defaultProps: SpaceProps = {
  size: 'small',
  direction: 'horizontal',
};

function Space(baseProps: SpaceProps, ref) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
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
      [`${prefixCls}-rtl`]: rtl,
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

  const childrenList = toArray(children);

  function getMarginStyle(index) {
    // const isLastOne =
    //   rtl && direction === 'horizontal' ? index === 0 : childrenList.length === index + 1;
    const isLastOne = childrenList.length === index + 1;
    const marginDirection = rtl ? 'marginLeft' : 'marginRight';

    if (typeof size === 'string' || typeof size === 'number') {
      const margin = getMargin(size);
      if (wrap) {
        return isLastOne
          ? { marginBottom: margin }
          : {
              [`${marginDirection}`]: margin,
              marginBottom: margin,
            };
      }
      return !isLastOne
        ? {
            [direction === 'vertical' ? 'marginBottom' : marginDirection]: margin,
          }
        : {};
    }
    if (isArray(size)) {
      const marginHorizontal = getMargin(size[0]);
      const marginBottom = getMargin(size[1]);
      if (wrap) {
        return isLastOne
          ? { marginBottom }
          : {
              [`${marginDirection}`]: marginHorizontal,
              marginBottom,
            };
      }
      if (direction === 'vertical') {
        return { marginBottom };
      }
      return { [`${marginDirection}`]: marginHorizontal };
    }
  }

  return (
    <div ref={ref} className={classNames} style={style} {...rest}>
      {childrenList.map((child, index) => {
        // Keep the key passed on the child to avoid additional DOM remounting
        // Related issue: https://github.com/arco-design/arco-design/issues/1320
        const key = (child as ReactElement)?.key || index;
        const shouldRenderSplit = split !== undefined && split !== null && index > 0;
        return (
          <Fragment key={key}>
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
