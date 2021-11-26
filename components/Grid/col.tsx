import React, { useContext, forwardRef } from 'react';
import cs from '../_util/classNames';
import { isNumber, isObject } from '../_util/is';
import { ConfigContext } from '../ConfigProvider';
import { ColProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';
import { RowContext } from './context';

const defaultProps: ColProps = {
  span: 24,
};

function Col(baseProps: ColProps, ref) {
  const { getPrefixCls, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<ColProps>(baseProps, defaultProps, componentConfig?.['Grid.Col']);
  const { gutter, div } = useContext(RowContext);

  const {
    className,
    style,
    children,
    span,
    offset,
    order,
    pull,
    push,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    ...rest
  } = props;

  function adaptationGrid(prefixCls: string, mergeClassName: { [key: string]: any }) {
    const screenList = { xs, sm, md, lg, xl, xxl };
    Object.keys(screenList).forEach((screen) => {
      const screenValue = screenList[screen];
      if (screenValue && isNumber(screenValue)) {
        mergeClassName[`${prefixCls}-${screen}-${screenValue}`] = true;
      } else if (screenValue && isObject(screenValue)) {
        mergeClassName[`${prefixCls}-${screen}-${screenValue.span}`] = screenValue.span;
        mergeClassName[`${prefixCls}-${screen}-offset-${screenValue.offset}`] = screenValue.offset;
        mergeClassName[`${prefixCls}-${screen}-order-${screenValue.order}`] = screenValue.order;
        mergeClassName[`${prefixCls}-${screen}-pull-${screenValue.pull}`] = screenValue.pull;
        mergeClassName[`${prefixCls}-${screen}-push-${screenValue.push}`] = screenValue.push;
      }
    });
    return mergeClassName;
  }

  const prefixCls = getPrefixCls('col');
  let mergeClassName = {
    [`${prefixCls}`]: !div,
    [`${prefixCls}-order-${order}`]: order,
    [`${prefixCls}-${span}`]: !div && !xs && !sm && !md && !lg && !xl && !xxl,
    [`${prefixCls}-offset-${offset}`]: offset,
    [`${prefixCls}-pull-${pull}`]: pull,
    [`${prefixCls}-push-${push}`]: push,
  };
  mergeClassName = adaptationGrid(prefixCls, mergeClassName);
  const classNames = cs(mergeClassName, className);

  const paddingStyle: {
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
  } = {};
  if (Array.isArray(gutter) && !div) {
    const paddingHorizontal = (gutter[0] && gutter[0] / 2) || 0;
    const paddingVertical = (gutter[1] && gutter[1] / 2) || 0;
    if (paddingHorizontal) {
      paddingStyle.paddingLeft = paddingHorizontal;
      paddingStyle.paddingRight = paddingHorizontal;
    }
    if (paddingVertical) {
      paddingStyle.paddingTop = paddingVertical;
      paddingStyle.paddingBottom = paddingVertical;
    }
  }

  return (
    <div
      ref={ref}
      {...rest}
      style={{
        ...style,
        ...paddingStyle,
      }}
      className={classNames}
    >
      {children}
    </div>
  );
}

const ColComponent = forwardRef(Col);

ColComponent.displayName = 'Col';

export default ColComponent;

export { ColProps };
