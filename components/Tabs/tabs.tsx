import React, {
  ReactElement,
  useRef,
  useImperativeHandle,
  useContext,
  PropsWithChildren,
  useMemo,
} from 'react';
import cs from '../_util/classNames';
import TabPane, { TabPaneType, TabPaneProps } from './tab-pane';
import TabHeader from './tab-header/index';
import TabContent from './tab-content';
import omit from '../_util/omit';
import { ConfigContext } from '../ConfigProvider';
import { isFunction, isObject } from '../_util/is';
import useMergeValue from '../_util/hooks/useMergeValue';
import { TabsProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

const sizeList = ['mini', 'small', 'default', 'large'];

let __ARCO_TABS_SEED_INDEX = 0;

const getPaneChildren = (props: TabsProps) => {
  const { children } = props;
  const paneChildren = [];
  React.Children.forEach(children, (child: ReactElement) => {
    if (child && child.type && (child as ReactElement<TabPaneProps, TabPaneType>).type.isTabPane) {
      paneChildren.push(child);
    }
  });
  return paneChildren as ReactElement<TabPaneProps, TabPaneType>[];
};

const getTabPaneAnimation = (props: TabsProps) => {
  const { direction, tabPosition, animation } = props;
  if (direction === 'vertical' || tabPosition === 'left' || tabPosition === 'right') {
    return false;
  }
  if (isObject(animation)) {
    return 'tabPane' in animation ? animation.tabPane : false;
  }
  return animation;
};

const defaultProps: TabsProps = {
  tabPosition: 'top',
  type: 'line',
  overflow: 'scroll',
  showAddButton: true,
  lazyload: true,
  headerPadding: true,
  scrollPosition: 'auto',
};

export const TabsContext = React.createContext<
  TabsProps & {
    getIdPrefix?: (suffix?: number | string) => { tab: string; tabpane: string };
    paneChildren?: ReactElement<TabPaneProps, TabPaneType>[];
    prefixCls?: string;
  }
>({});

function Tabs(baseProps: TabsProps, ref) {
  const { getPrefixCls, size: ctxSize, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<TabsProps>(baseProps, defaultProps, componentConfig?.Tabs);

  const paneChildren = getPaneChildren(props);

  const tabsRef = useRef<HTMLDivElement>();

  const [activeTab, setActiveTab] = useMergeValue<string>(
    (paneChildren[0] && paneChildren[0].key) as string,
    {
      defaultValue: 'defaultActiveTab' in props ? props.defaultActiveTab : undefined,
      value: 'activeTab' in props ? props.activeTab : undefined,
    }
  );

  const prefixCls = getPrefixCls('tabs');
  const size =
    props.size || ((sizeList.indexOf(ctxSize) > -1 ? ctxSize : 'default') as TabsProps['size']);

  const {
    animation,
    className,
    direction,
    style,
    type,
    justify,
    destroyOnHide,
    lazyload,
    onChange,
    onClickTab,
    onDeleteTab,
    renderTabHeader,
    ...rest
  } = props;

  const idPrefix = useMemo(() => {
    return `${prefixCls}-${__ARCO_TABS_SEED_INDEX++}-`;
  }, []);

  const tabPosition = direction === 'vertical' ? 'left' : props.tabPosition;

  const tabHeaderProps = {
    animation: isObject(animation) && 'inkBar' in animation ? animation.inkBar : true,
    activeTab,
    tabPosition,
    direction:
      ['left', 'right'].indexOf(tabPosition) > -1 ? ('vertical' as const) : ('horizontal' as const),
    paneChildren,
    onClickTab: (key: string) => {
      isFunction(onClickTab) && onClickTab(key);
      if (key !== activeTab) {
        if (!('activeTab' in props)) {
          setActiveTab(key);
        }
        isFunction(onChange) && onChange(key);
      }
    },
    onDeleteTab,
    prefixCls,
  };

  useImperativeHandle(ref, () => tabsRef, []);

  const TabContentDom = (
    <TabContent
      direction={['left', 'right'].indexOf(tabPosition) > -1 ? 'vertical' : 'horizontal'}
      animation={getTabPaneAnimation(props)}
      activeTab={activeTab}
      paneChildren={paneChildren}
      prefixCls={prefixCls}
      destroyOnHide={destroyOnHide}
      lazyload={lazyload}
    />
  );

  return (
    <div
      {...omit(rest, [
        'headerPadding',
        'tabPosition',
        'defaultActiveTab',
        'showAddButton',
        'extra',
        'onAddTab',
        'activeTab',
        'overflow',
        'editable',
        'renderTabTitle',
        'addButton',
        'deleteButton',
        'icons',
        'children',
        'size',
        'type',
        'scrollPosition',
        'offsetAlign',
      ])}
      style={style}
      className={cs(
        prefixCls,
        `${prefixCls}-${['left', 'right'].indexOf(tabPosition) > -1 ? 'vertical' : 'horizontal'}`,
        `${prefixCls}-${type}`,
        `${prefixCls}-${tabPosition}`,
        `${prefixCls}-size-${size}`,
        {
          [`${prefixCls}-justify`]: justify,
        },
        className
      )}
      ref={tabsRef}
    >
      <TabsContext.Provider
        value={{
          ...tabHeaderProps,
          getIdPrefix: (suffix: string | number) => {
            return {
              tab: `${idPrefix}tab-${suffix}`,
              tabpane: `${idPrefix}panel-${suffix}`,
            };
          },
        }}
      >
        {tabPosition === 'bottom' && TabContentDom}
        {isFunction(renderTabHeader) ? (
          renderTabHeader(
            {
              ...omit(props, ['children', 'style', 'className']),
              size,
              ...tabHeaderProps,
            },
            TabHeader
          )
        ) : (
          <TabHeader {...omit(props, ['children', 'style', 'className'])} size={size} />
        )}
        {tabPosition !== 'bottom' && TabContentDom}
      </TabsContext.Provider>
    </div>
  );
}

const ForwardRefTabs = React.forwardRef<unknown, PropsWithChildren<TabsProps>>(Tabs);

const TabsComponent = ForwardRefTabs as typeof ForwardRefTabs & {
  TabPane: typeof TabPane;
};

TabsComponent.displayName = 'Tabs';

TabsComponent.TabPane = TabPane;

export default TabsComponent;

export { TabsProps };
