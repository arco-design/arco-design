import React, { useContext, forwardRef } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { FooterProps } from './interface';

function Footer(props: FooterProps, ref) {
  const { className, children, ...rest } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('layout-footer');
  const classNames = cs(prefixCls, className);
  return (
    <footer ref={ref} {...rest} className={classNames}>
      {children}
    </footer>
  );
}

const FooterComponent = forwardRef<unknown, FooterProps>(Footer);

FooterComponent.displayName = 'LayoutFooter';

export default FooterComponent;
