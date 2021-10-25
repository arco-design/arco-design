import React, { useRef, useContext, PropsWithChildren, ForwardRefExoticComponent } from 'react';
import cs from '../_util/classNames';
import omit from '../_util/omit';
import { ConfigContext } from '../ConfigProvider';
import { TabPaneProps } from './interface';

function TabPane(props: PropsWithChildren<TabPaneProps>, ref) {
  const shouldRender = useRef<boolean>(false);

  const { getPrefixCls } = useContext(ConfigContext);

  const { children, className, style, lazyload, isActive, ...rest } = props;
  const prefixCls = getPrefixCls('tabs');

  shouldRender.current = lazyload ? shouldRender.current || isActive : true;

  return (
    shouldRender.current && (
      <div
        ref={ref}
        {...omit(rest, ['destroyOnHide', 'title', 'closable'])}
        className={cs(`${prefixCls}-pane`, className)}
        style={style}
      >
        {children}
      </div>
    )
  );
}

export type TabPaneType = ForwardRefExoticComponent<PropsWithChildren<TabPaneProps>> & {
  isTabPane: boolean;
};

const TabPaneRef: TabPaneType = React.forwardRef(TabPane) as TabPaneType;

TabPaneRef.displayName = 'TabPane';

TabPaneRef.isTabPane = true;

export default TabPaneRef;

export { TabPaneProps };
