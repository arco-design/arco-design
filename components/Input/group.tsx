import React, { useContext, PropsWithChildren } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { InputGroupProps } from './interface';

const Group = React.forwardRef<HTMLDivElement, PropsWithChildren<InputGroupProps>>(
  (props: PropsWithChildren<InputGroupProps>, ref) => {
    const { getPrefixCls } = useContext(ConfigContext);

    const { className, style, children, compact, ...rest } = props;
    const prefixCls = getPrefixCls('input-group');
    const classNames = cs(
      prefixCls,
      {
        [`${prefixCls}-compact`]: compact,
      },
      className
    );

    return (
      <div ref={ref} className={classNames} style={style} {...rest}>
        {children}
      </div>
    );
  }
);

Group.displayName = 'InputGroup';

export default Group;

export { InputGroupProps };
