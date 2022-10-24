import React, { useContext, useMemo, forwardRef } from 'react';
import cs from '../_util/classNames';
import { isNumber, isObject } from '../_util/is';
import { ConfigContext } from '../ConfigProvider';
import { ColProps, FlexType } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';
import { RowContext } from './context';

const defaultProps: ColProps = {
  span: 24,
};

function getFlexString(flex: FlexType) {
  if (typeof flex === 'string' && /\d+[px|%|em|rem|]{1}/.test(flex)) {
    return `0 0 ${flex}`;
  }
  return flex;
}

function Col(baseProps: ColProps, ref) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
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
    xxxl,
    flex,
    ...rest
  } = props;

  function adaptationGrid(prefixCls: string, mergeClassName: { [key: string]: any }) {
    const screenList = { xs, sm, md, lg, xl, xxl, xxxl };
    Object.keys(screenList).forEach((screen) => {
      const screenValue = screenList[screen];
      if (isNumber(screenValue)) {
        if (screenValue >= 0) {
          mergeClassName[`${prefixCls}-${screen}-${screenValue}`] = true;
        }
      } else if (isObject(screenValue)) {
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
    [`${prefixCls}-${span}`]: !div && !xs && !sm && !md && !lg && !xl && !xxl && !xxxl,
    [`${prefixCls}-offset-${offset}`]: offset,
    [`${prefixCls}-pull-${pull}`]: pull,
    [`${prefixCls}-push-${push}`]: push,
    [`${prefixCls}-rtl`]: rtl,
  };
  mergeClassName = adaptationGrid(prefixCls, mergeClassName);
  const classNames = cs(flex ? prefixCls : mergeClassName, className);

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

  const flexStyle = useMemo(
    () => (getFlexString(flex) ? { flex: getFlexString(flex) } : {}),
    [flex]
  );

  return (
    <div
      ref={ref}
      {...rest}
      style={{
        ...style,
        ...paddingStyle,
        ...flexStyle,
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
