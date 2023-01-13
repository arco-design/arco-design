import React, { useEffect, useContext, ReactNode, forwardRef, useRef, useMemo } from 'react';
import cs from '../_util/classNames';
import Item from './item';
import ItemGroup from './item-group';
import SubMenu from './sub-menu';
import OverflowWrap from './overflow-wrap';
import omit from '../_util/omit';
import { generateInfoMap, processChildren } from './util';
import { ConfigContext } from '../ConfigProvider';
import { MenuProps } from './interface';
import { SiderContext } from '../Layout';
import useMergeValue from '../_util/hooks/useMergeValue';
import IconMenuFold from '../../icon/react-icon/IconMenuFold';
import IconMenuUnfold from '../../icon/react-icon/IconMenuUnfold';
import useForceUpdate from '../_util/hooks/useForceUpdate';
import MenuContext from './context';
import useMergeProps from '../_util/hooks/useMergeProps';
import useKeyboardEvent from '../_util/hooks/useKeyboardEvent';
import useId from '../_util/hooks/useId';
import { isObject } from '../_util/is';

const DEFAULT_THEME: MenuProps['theme'] = 'light';

const defaultProps: MenuProps = {
  mode: 'vertical',
  selectable: true,
  ellipsis: true,
};

function Menu(baseProps: MenuProps, ref) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<MenuProps>(baseProps, defaultProps, componentConfig?.Menu);
  const {
    style,
    children,
    className,
    prefixCls: menuPrefixCls,
    mode,
    theme: propTheme,
    icons,
    levelIndent,
    collapse: propCollapse,
    inDropdown,
    selectable,
    triggerProps,
    tooltipProps,
    ellipsis,
    accordion,
    autoOpen,
    autoScrollIntoView,
    scrollConfig,
    hasCollapseButton,
    defaultOpenKeys,
    defaultSelectedKeys,
    openKeys: propOpenKeys,
    selectedKeys: propSelectedKeys,
    onClickSubMenu,
    onClickMenuItem,
    onCollapseChange,
    ...rest
  } = props;

  const [openKeys, setOpenKeys] = useMergeValue([], {
    defaultValue: defaultOpenKeys,
    value: propOpenKeys,
  });
  const [selectedKeys, setSelectedKeys] = useMergeValue([], {
    defaultValue: defaultSelectedKeys,
    value: propSelectedKeys,
  });
  const [collapse, setCollapse] = useMergeValue(false, {
    value: propCollapse,
  });

  const menuContext = useContext(MenuContext);
  const { siderCollapsed } = useContext(SiderContext);

  const prefixCls = menuPrefixCls || getPrefixCls('menu');
  const mergedCollapse = siderCollapsed || collapse || inDropdown || mode === 'popButton';
  const theme = propTheme || menuContext.theme || DEFAULT_THEME;

  const refSubMenuKeys = useRef<string[]>([]);
  const refPrevSubMenuKeys = useRef<string[]>([]);
  const forceUpdate = useForceUpdate();
  const getKeyboardEvents = useKeyboardEvent();

  const menuInfoMap = useMemo(() => {
    return generateInfoMap(children);
  }, [children]);

  // Unique ID of this instance
  const _instanceId = useId(`${prefixCls}-`);
  const instanceId = rest.id || _instanceId;

  // autoOpen 时，初次渲染展开所有的子菜单
  useEffect(() => {
    // 从 openKeys 中过滤已经不存在的 subMenuKey
    let validOpenKeys = openKeys.filter((key) => refSubMenuKeys.current.indexOf(key) !== -1);
    if (autoOpen) {
      const keysAdded = refSubMenuKeys.current.filter(
        (key) => refPrevSubMenuKeys.current.indexOf(key) === -1
      );
      validOpenKeys = openKeys.concat(keysAdded);
    }
    setOpenKeys(accordion ? validOpenKeys.slice(0, 1) : validOpenKeys);
    refPrevSubMenuKeys.current = refSubMenuKeys.current.slice();
  }, [refSubMenuKeys.current.toString()]);

  const mergedHasCollapseButton =
    mode !== 'horizontal' && mode !== 'popButton' && !inDropdown && hasCollapseButton;

  const renderChildren = () => {
    const childrenList = processChildren(children, { level: 1 }) as ReactNode[];
    const collapseIcon = collapse
      ? (icons && icons.collapseActive) || <IconMenuUnfold />
      : (icons && icons.collapseDefault) || <IconMenuFold />;
    const collapseButtonClickHandler = () => {
      const newCollapse = !collapse;
      setCollapse(newCollapse);
      onCollapseChange && onCollapseChange(newCollapse);
    };

    return (
      <>
        <div className={`${prefixCls}-inner`}>
          {mode === 'horizontal' && ellipsis !== false ? (
            <OverflowWrap ellipsisText={isObject(ellipsis) ? ellipsis.text : '···'}>
              {childrenList}
            </OverflowWrap>
          ) : (
            childrenList
          )}
        </div>

        {mergedHasCollapseButton && (
          <div
            tabIndex={0}
            role="button"
            aria-controls={instanceId}
            aria-expanded={!collapse}
            className={`${prefixCls}-collapse-button`}
            onClick={collapseButtonClickHandler}
            {...getKeyboardEvents({ onPressEnter: collapseButtonClickHandler })}
          >
            {collapseIcon}
          </div>
        )}
      </>
    );
  };

  const usedStyle = { ...style };
  if (mergedCollapse && !inDropdown) {
    delete usedStyle.width;
  }

  return (
    <div
      id={mergedHasCollapseButton ? instanceId : undefined}
      role="menu"
      {...omit(rest, ['isMenu'])}
      ref={ref}
      style={usedStyle}
      className={cs(
        prefixCls,
        `${prefixCls}-${theme}`,
        `${prefixCls}-${mode === 'horizontal' ? 'horizontal' : 'vertical'}`,
        {
          [`${prefixCls}-collapse`]: mergedCollapse,
          // 缩起状态自动变成 pop 模式
          [`${prefixCls}-pop`]: mode === 'pop' || mergedCollapse,
          [`${prefixCls}-pop-button`]: mode === 'popButton',
          [`${prefixCls}-rtl`]: rtl,
        },
        className
      )}
    >
      <MenuContext.Provider
        value={{
          mode,
          theme,
          collapse: mergedCollapse,
          levelIndent,
          inDropdown,
          selectedKeys,
          openKeys,
          icons,
          triggerProps,
          tooltipProps,
          autoScrollIntoView,
          scrollConfig,
          // pass props directly
          id: instanceId,
          prefixCls,
          collectInlineMenuKeys: (key, unmount) => {
            if (unmount) {
              refSubMenuKeys.current = refSubMenuKeys.current.filter((x) => x !== key);
            } else {
              refSubMenuKeys.current.push(key);
            }
            forceUpdate();
          },
          onClickMenuItem: (key, event) => {
            selectable && setSelectedKeys([key]);
            onClickMenuItem && onClickMenuItem(key, event, menuInfoMap[key]?.keyPath);
          },
          onClickSubMenu: (key, level, type) => {
            let newOpenKeys: string[] = [...openKeys];

            if (type === 'inline') {
              if (openKeys?.indexOf(key) > -1) {
                if (accordion && level === 1) {
                  newOpenKeys = [];
                } else {
                  newOpenKeys = openKeys.filter((item) => item !== key);
                }
              } else if (accordion && level === 1) {
                newOpenKeys = [key];
              } else {
                newOpenKeys = openKeys.concat([key]);
              }
            }

            setOpenKeys(newOpenKeys);
            onClickSubMenu && onClickSubMenu(key, newOpenKeys, menuInfoMap[key]?.keyPath);
          },
        }}
      >
        {renderChildren()}
      </MenuContext.Provider>
    </div>
  );
}

const ForwardRefMenu = forwardRef<unknown, MenuProps>(Menu);

const MenuComponent = ForwardRefMenu as typeof ForwardRefMenu & {
  Item: typeof Item;
  ItemGroup: typeof ItemGroup;
  SubMenu: typeof SubMenu;
  __ARCO_MENU__: boolean;
};

MenuComponent.displayName = 'Menu';

MenuComponent.Item = Item;
MenuComponent.SubMenu = SubMenu;
MenuComponent.ItemGroup = ItemGroup;
MenuComponent.__ARCO_MENU__ = true;

export default MenuComponent;

export { MenuProps, MenuSubMenuProps, MenuItemGroupProps, MenuItemProps } from './interface';
