import React, { createContext, useContext, PropsWithChildren } from 'react';
import { isFunction } from '../_util/is';
import cs from '../_util/classNames';
import CollapseItem from './item';
import omit from '../_util/omit';
import { ConfigContext } from '../ConfigProvider';
import IconCaretRight from '../../icon/react-icon/IconCaretRight';
import useMergeValue from '../_util/hooks/useMergeValue';
import IconCaretLeft from '../../icon/react-icon/IconCaretLeft';
import { CollapseProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

const getActiveKeys = (keys: CollapseProps['activeKey'], accordion: boolean): string[] => {
  const res = [].concat(keys);
  if (accordion) {
    return res.slice(0, 1);
  }
  return res;
};

const defaultProps: CollapseProps = {
  bordered: true,
  lazyload: true,
  expandIconPosition: 'left',
};

export const CollapseContext = createContext<
  Pick<
    CollapseProps,
    'expandIcon' | 'triggerRegion' | 'expandIconPosition' | 'lazyload' | 'destroyOnHide'
  > & {
    activeKeys: string[];
    onToggle?: (_key: string, _e) => void;
  }
>({
  expandIconPosition: 'left',
  expandIcon: <IconCaretRight />,
  activeKeys: [],
  onToggle: () => {},
});

function Collapse(baseProps: PropsWithChildren<CollapseProps>, ref) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<PropsWithChildren<CollapseProps>>(
    baseProps,
    defaultProps,
    componentConfig?.Collapse
  );

  const [activeKeys, setActiveKeys] = useMergeValue<string[]>([], {
    defaultValue:
      'defaultActiveKey' in props
        ? getActiveKeys(props.defaultActiveKey, props.accordion)
        : undefined,
    value: 'activeKey' in props ? getActiveKeys(props.activeKey, props.accordion) : undefined,
  });

  const {
    children,
    className,
    style,
    bordered,
    lazyload,
    expandIcon,
    expandIconPosition,
    destroyOnHide,
    accordion,
    triggerRegion,
    onChange,
    ...rest
  } = props;

  const prefixCls = getPrefixCls('collapse');

  const onItemClick = (key: string, e): void => {
    let newActiveKeys = [...(activeKeys || [])];
    const index = activeKeys?.indexOf(key);
    if (index > -1) {
      newActiveKeys.splice(index, 1);
    } else if (accordion) {
      newActiveKeys = [key];
    } else {
      newActiveKeys.push(key);
    }
    if (!('activeKey' in props)) {
      setActiveKeys(newActiveKeys);
    }
    isFunction(onChange) && onChange(key, newActiveKeys, e);
  };

  return (
    <CollapseContext.Provider
      value={{
        activeKeys,
        triggerRegion,
        lazyload,
        destroyOnHide,
        expandIconPosition,
        onToggle: onItemClick,
        expandIcon:
          'expandIcon' in props ? (
            expandIcon
          ) : expandIconPosition === 'right' ? (
            <IconCaretLeft />
          ) : (
            <IconCaretRight />
          ),
      }}
    >
      <div
        ref={ref}
        {...omit(rest, ['activeKey', 'defaultActiveKey'])}
        className={cs(
          prefixCls,
          `${prefixCls}-${bordered ? 'border' : 'borderless'}`,
          { [`${prefixCls}-rtl`]: rtl },
          className
        )}
        style={style}
      >
        {children}
      </div>
    </CollapseContext.Provider>
  );
}

const ForwardRefCollapse = React.forwardRef<unknown, PropsWithChildren<CollapseProps>>(Collapse);

const CollapseComponent = ForwardRefCollapse as typeof ForwardRefCollapse & {
  Item: typeof CollapseItem;
};

CollapseComponent.displayName = 'Collapse';

CollapseComponent.Item = CollapseItem;

export default CollapseComponent;

export { CollapseProps };
