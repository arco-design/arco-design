import React, { useContext, useMemo, useState } from 'react';
import cs from '../../_util/classNames';
import { MenuSubMenuProps } from '../interface';
import IconRight from '../../../icon/react-icon/IconRight';
import IconDown from '../../../icon/react-icon/IconDown';
import { isChildrenSelected } from '../util';
import omit from '../../_util/omit';
import Dropdown from '../../Dropdown';
import Menu from '../index';
import MenuIndent from '../indent';
import MenuContext from '../context';
import { useHotkeyHandler } from '../hotkey';

let globalPopSubMenuIndex = 0;

const SubMenuPop = (props: MenuSubMenuProps & { forwardedRef }) => {
  const {
    _key,
    children,
    style,
    className,
    title,
    level,
    selectable,
    forwardedRef,
    triggerProps: propTriggerProps,
  } = props;
  const {
    id: menuId,
    prefixCls,
    mode,
    inDropdown,
    levelIndent,
    hotkeyInfo,
    selectedKeys = [],
    icons,
    triggerProps: contextTriggerProps,
    onClickSubMenu,
    onClickMenuItem,
  } = useContext(MenuContext);

  const triggerProps = { ...contextTriggerProps, ...propTriggerProps };
  const [popupVisible, setPopupVisible] = useState(false);

  const baseClassName = `${prefixCls}-pop`;
  const isSelected = selectable && selectedKeys.indexOf(props._key as string) > -1;
  const needPopOnBottom = mode === 'horizontal' && !inDropdown;

  const isActive = useHotkeyHandler(_key, () => {
    setPopupVisible(hotkeyInfo.activeKeyPath.indexOf(_key) > 0);
  });

  // Unique ID of this instance
  const instanceId = useMemo<string>(() => {
    const id = `${menuId}-submenu-pop-${globalPopSubMenuIndex}`;
    globalPopSubMenuIndex++;
    return id;
  }, []);

  const renderSuffix = () => {
    const MergedIconRight = icons && icons.popArrowRight ? icons.popArrowRight : <IconRight />;
    const MergedIconDown =
      icons && icons.horizontalArrowDown ? icons.horizontalArrowDown : <IconDown />;
    return (
      <span className={`${prefixCls}-icon-suffix`}>
        {needPopOnBottom ? MergedIconDown : MergedIconRight}
      </span>
    );
  };

  const hasSelectedStatus = isChildrenSelected(children, selectedKeys) || isSelected;

  return (
    <Dropdown
      trigger="hover"
      onVisibleChange={(visible) => setPopupVisible(visible)}
      droplist={
        <Menu
          id={instanceId}
          selectedKeys={selectedKeys}
          onClickMenuItem={(key, event) => {
            onClickMenuItem(key, event);
            setPopupVisible(false);
          }}
        >
          {children}
        </Menu>
      }
      triggerProps={{
        position: needPopOnBottom ? 'bl' : 'rt',
        popupVisible,
        showArrow: true,
        autoAlignPopupMinWidth: true,
        classNames: 'fadeIn',
        duration: 100,
        mouseEnterDelay: 50,
        mouseLeaveDelay: 50,
        className: cs(`${baseClassName}-trigger`, triggerProps && triggerProps.className),
        ...omit(triggerProps, ['className']),
      }}
    >
      <div
        aria-haspopup
        aria-expanded={popupVisible}
        aria-controls={instanceId}
        ref={forwardedRef}
        style={style}
        className={cs(
          baseClassName,
          `${baseClassName}-header`,
          {
            [`${prefixCls}-active`]: isActive,
            [`${prefixCls}-selected`]: hasSelectedStatus,
          },
          className
        )}
        onClick={(event) => {
          onClickSubMenu(_key, level, 'pop');
          selectable && onClickMenuItem(_key, event);
        }}
      >
        <MenuIndent prefixCls={prefixCls} levelIndent={levelIndent} level={level} />
        {title}
        {renderSuffix()}
        {hasSelectedStatus && mode === 'horizontal' ? (
          <div className={`${prefixCls}-selected-label`} />
        ) : null}
      </div>
    </Dropdown>
  );
};

export default SubMenuPop;
