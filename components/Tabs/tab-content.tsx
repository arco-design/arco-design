import React, { ReactElement } from 'react';
import cs from '../_util/classNames';
import { TabsProps } from './tabs';
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
          const mergedDestroyOnHide =
            'destroyOnHide' in child.props ? child.props.destroyOnHide : destroyOnHide;
          return (
            <div
              key={child.key as string}
              className={cs(`${prefixCls}-content-item`, {
                [`${prefixCls}-content-item-active`]: child.key === activeTab,
              })}
            >
              {activeIndex !== index && mergedDestroyOnHide
                ? null
                : React.cloneElement(child, {
                    lazyload,
                    isActive: child.key === activeTab,
                  })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
