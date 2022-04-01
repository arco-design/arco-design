import React, { ReactElement, useContext } from 'react';
import cs from '../_util/classNames';
import { TabsProps, TabsContext } from './tabs';
import { TabPaneProps, TabPaneType } from './tab-pane';

interface TabContentProps
  extends Pick<TabsProps, 'animation' | 'activeTab' | 'direction' | 'lazyload' | 'destroyOnHide'> {
  prefixCls: string;
  paneChildren: ReactElement<TabPaneProps, TabPaneType>[];
}

export default function TabContent(props: TabContentProps) {
  const { animation, activeTab, prefixCls, paneChildren, direction, lazyload, destroyOnHide } =
    props;
  const activeIndex = paneChildren.findIndex((p) => p.key === activeTab);
  const ctxProps = useContext(TabsContext);

  if (
    paneChildren.every((x) => {
      return x?.props && (!('children' in x.props) || x.props.children === null);
    })
  ) {
    return null;
  }

  const classNamesContentInner = cs(`${prefixCls}-content-inner`, {
    [`${prefixCls}-animation`]: animation,
  });

  return (
    <div className={`${prefixCls}-content ${prefixCls}-content-${direction}`}>
      <div
        className={classNamesContentInner}
        style={{
          marginLeft: `-${activeIndex * 100}%`,
        }}
      >
        {paneChildren.map((child, index) => {
          const { tabpane, tab } = ctxProps.getIdPrefix(index);

          const mergedDestroyOnHide =
            'destroyOnHide' in child.props ? child.props.destroyOnHide : destroyOnHide;

          const isActive = child.key === activeTab;
          return (
            <div
              key={child.key as string}
              className={cs(`${prefixCls}-content-item`, {
                [`${prefixCls}-content-item-active`]: isActive,
              })}
              role="tabpanel"
              id={tabpane}
              aria-hidden={isActive ? undefined : true}
              tabIndex={isActive ? 0 : -1}
              aria-labelledby={tab}
            >
              {activeIndex !== index && mergedDestroyOnHide
                ? null
                : React.cloneElement(child, {
                    lazyload,
                    isActive,
                  })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
