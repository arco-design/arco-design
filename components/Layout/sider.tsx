import React, {
  forwardRef,
  useContext,
  useEffect,
  createContext,
  useRef,
  useMemo,
  useState,
} from 'react';
import cs from '../_util/classNames';
import IconLeft from '../../icon/react-icon/IconLeft';
import IconRight from '../../icon/react-icon/IconRight';
import { ConfigContext } from '../ConfigProvider';
import ResizeBox, { ResizeBoxProps } from '../ResizeBox';
import { isArray, isNumber } from '../_util/is';
import ResponsiveObserve, { responsiveMap } from '../_util/responsiveObserve';
import useMergeValue from '../_util/hooks/useMergeValue';
import { SiderProps } from './interface';

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
    resizeBoxProps = {},
  } = props;

  const uniqueId = generateId('arco-sider-');

  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('layout-sider');
  const [collapsed, setCollapsed] = useMergeValue(false, {
    value: 'collapsed' in props ? props.collapsed : undefined,
    defaultValue: props.defaultCollapsed,
  });
  // Parsing props width from number to string, to be used as css property value.
  // Using px as the default unit
  const propsWidth = isNumber(width) ? `${width}px` : String(width);
  const _collapsedWidth = isNumber(collapsedWidth) ? `${collapsedWidth}` : String(collapsedWidth);
  const [siderWidth, setSiderWidth] = useState<string>(collapsed ? _collapsedWidth : propsWidth);

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

  useEffect(() => {
    // Parsing collapsed width from number to string, to be used as css property value.
    // Using px as the default unit
    const _collapsedWidth = isNumber(collapsedWidth)
      ? `${collapsedWidth}px`
      : String(collapsedWidth);
    setSiderWidth(collapsed ? _collapsedWidth : propsWidth);
  }, [collapsed, propsWidth, collapsedWidth]);

  const resizable =
    (resizeDirections && isArray(resizeDirections)) || resizeBoxProps.directions?.length;
  const TagName: string | React.JSXElementConstructor<any> = resizable ? ResizeBox : 'aside';

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

  const resizeProps = useMemo<ResizeBoxProps>(() => {
    if (resizable) {
      return {
        component: 'aside',
        ...resizeBoxProps,
        width: siderWidth,
        directions: resizeDirections,
        onMoving: (event, size) => {
          setSiderWidth(`${size.width}px`);
          resizeBoxProps?.onMoving?.(event, size);
        },
      };
    }
    return {};
  }, [resizable, resizeDirections, siderWidth, resizeBoxProps]);

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

const ForwardRefSider = forwardRef<unknown, SiderProps>(Sider);

const SiderComponent = ForwardRefSider as typeof ForwardRefSider & {
  __ARCO_SIGN__: 'sider';
};

SiderComponent.displayName = 'LayoutSider';

SiderComponent.__ARCO_SIGN__ = 'sider';

export default SiderComponent;
