import React, { CSSProperties, PropsWithChildren } from 'react';
import Trigger, { TriggerProps } from '../Trigger';
import cs from '../_util/classNames';

interface TriggerForToolbarProps {
  style?: CSSProperties;
  className?: string | string[];
  prefixCls: string;
  popup: TriggerProps['popup'];
}

export const TriggerForToolbar = (props: PropsWithChildren<TriggerForToolbarProps>) => {
  const { style, className, prefixCls, popup, children } = props;
  const classNames = cs(`${prefixCls}-trigger`, className);
  return (
    <Trigger style={style} className={classNames} popup={popup} showArrow>
      {children}
    </Trigger>
  );
};
