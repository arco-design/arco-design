import React, { useContext } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import type { ButtonGroupProps } from './interface';

function Group(props: ButtonGroupProps, ref) {
  const { className, style, children } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('btn-group');
  const classNames = cs(prefixCls, className);

  return (
    <div ref={ref} className={classNames} style={style}>
      {children}
    </div>
  );
}

const GroupComponent = React.forwardRef<unknown, ButtonGroupProps>(Group);

GroupComponent.displayName = 'ButtonGroup';

export default GroupComponent;

export { ButtonGroupProps };
