import React, { forwardRef, useContext, useEffect, createContext, useRef } from 'react';
import cs from '../_util/classNames';
import IconLeft from '../../icon/react-icon/IconLeft';
import IconRight from '../../icon/react-icon/IconRight';
import { ConfigContext } from '../ConfigProvider';
import ResizeBox from '../ResizeBox';
import { isArray } from '../_util/is';
import ResponsiveObserve, { responsiveMap } from '../_util/responsiveObserve';
import useMergeValue from '../_util/hooks/useMergeValue';
import { SiderProps } from './interface';

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

export const SiderContext = createContext<{
  siderCollapsed: boolean;
  collapsedWidth: string | number;
}>({
  siderCollapsed: false,
  collapsedWidth: 64,
});

const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

function Sider(props: SiderProps, ref) {
  const {
    children,
    className,
    style,
    theme = 'light',
    trigger,
    reverseArrow,
    collapsedWidth = 48,
    width = 200,
    collapsible,
    resizeDirections,
    onSiderMount,
    onSiderUnmount,
    breakpoint,
    onBreakpoint,
    onCollapse,
  } = props;

  const uniqueId = generateId('arco-sider-');

  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('layout-sider');

  const [collapsed, setCollapsed] = useMergeValue(false, {
    value: props.collapsed,
  });

  const refResponsiveHandlerToken = useRef(null);
  // 提供给 ResponsiveHandler，使得其可以获得最新的 state 值
  const refStateForResponsiveHandler = useRef(null);
  refStateForResponsiveHandler.current = {
    breakpoint,
    collapsed,
    onCollapse,
    onBreakpoint,
  };

  useEffect(() => {
    onSiderMount && onSiderMount(uniqueId);

    if (collapsible && breakpoint in responsiveMap) {
      refResponsiveHandlerToken.current = ResponsiveObserve.subscribe(
        (screens, breakpointChecked) => {
          const { breakpoint, collapsed, onCollapse, onBreakpoint } =
            refStateForResponsiveHandler.current;

          if (!breakpointChecked || breakpointChecked === breakpoint) {
            const nextCollapsed = !screens[breakpoint];
            if (nextCollapsed !== collapsed) {
              setCollapsed(nextCollapsed);
              onCollapse && onCollapse(nextCollapsed, 'responsive');
            }
            onBreakpoint && onBreakpoint(nextCollapsed);
          }
        }
      );
    }

    return () => {
      onSiderUnmount && onSiderUnmount(uniqueId);

      if (refResponsiveHandlerToken.current) {
        ResponsiveObserve.unsubscribe(refResponsiveHandlerToken.current);
      }
    };
  }, []);

  const rawWidth = collapsed ? collapsedWidth : width;
  const siderWidth = isNumber(rawWidth) ? `${rawWidth}px` : String(rawWidth);

  const renderTrigger = () => {
    const triggerIcon =
      trigger ||
      (collapsed ? (
        reverseArrow ? (
          <IconLeft />
        ) : (
          <IconRight />
        )
      ) : reverseArrow ? (
        <IconRight />
      ) : (
        <IconLeft />
      ));

    return collapsible && trigger !== null ? (
      <div
        style={{ width: siderWidth }}
        className={cs(`${prefixCls}-trigger`, {
          [`${prefixCls}-trigger-light`]: theme === 'light',
        })}
        onClick={() => {
          setCollapsed(!collapsed);
          onCollapse && onCollapse(!collapsed, 'clickTrigger');
        }}
      >
        {triggerIcon}
      </div>
    ) : null;
  };

  let TagName: string | React.JSXElementConstructor<any> = 'aside';
  let resizeProps = {};
  if (resizeDirections && isArray(resizeDirections)) {
    TagName = ResizeBox;
    resizeProps = { directions: resizeDirections, component: 'aside' };
  }

  return (
    <SiderContext.Provider
      value={{
        siderCollapsed: collapsed,
        collapsedWidth,
      }}
    >
      <TagName
        ref={ref}
        style={{
          width: siderWidth,
          ...style,
        }}
        className={cs(
          prefixCls,
          {
            [`${prefixCls}-light`]: theme === 'light',
            [`${prefixCls}-has-trigger`]: trigger !== null && collapsible,
            [`${prefixCls}-collapsed`]: collapsed,
          },
          className
        )}
        {...resizeProps}
      >
        <div className={`${prefixCls}-children`}>{children}</div>
        {renderTrigger()}
      </TagName>
    </SiderContext.Provider>
  );
}

const SiderComponent = forwardRef<unknown, SiderProps>(Sider);

SiderComponent.defaultProps = {
  // private use
  sign: 'sider',
};

SiderComponent.displayName = 'LayoutSider';

export default SiderComponent;
