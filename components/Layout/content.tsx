import React, { useContext, forwardRef } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { ContentProps } from './interface';

function Content(props: ContentProps, ref) {
  const { className, children, ...rest } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('layout-content');
  const classNames = cs(prefixCls, className);
  return (
    <main ref={ref} {...rest} className={classNames}>
      {children}
    </main>
  );
}

const contentComponent = forwardRef<unknown, ContentProps>(Content);

contentComponent.displayName = 'LayoutContent';

export default contentComponent;
