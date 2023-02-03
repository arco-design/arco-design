import React, { useContext, useState } from 'react';
import { TriggerProps } from '../../Trigger';
import cs from '../../_util/classNames';
import { MenuSubMenuProps } from '../interface';
import IconRight from '../../../icon/react-icon/IconRight';
import IconLeft from '../../../icon/react-icon/IconLeft';
import IconDown from '../../../icon/react-icon/IconDown';
import { isChildrenSelected } from '../util';
import omit from '../../_util/omit';
import Dropdown from '../../Dropdown';
import Menu from '../index';
import MenuIndent from '../indent';
import MenuContext from '../context';
import { ConfigContext } from '../../ConfigProvider';
import { ArrowLeft, ArrowRight, Enter } from '../../_util/keycode';
import useId from '../../_util/hooks/useId';

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
    ...rest
  } = props;
  const {
    id: menuId,
    prefixCls,
    mode,
    inDropdown,
    levelIndent,
    selectedKeys = [],
    icons,
    triggerProps: contextTriggerProps,
    onClickSubMenu,
    onClickMenuItem,
  } = useContext(MenuContext);

  const { rtl } = useContext(ConfigContext);
  const triggerProps = { ...contextTriggerProps, ...propTriggerProps };
  const [popupVisible, setPopupVisible] = useState(false);

  const baseClassName = `${prefixCls}-pop`;
  const isSelected = selectable && selectedKeys.indexOf(props._key as string) > -1;
  const needPopOnBottom = mode === 'horizontal' && !inDropdown;

  // Unique ID of this instance
  const instanceId = useId(`${menuId}-submenu-pop-`);

  const renderSuffix = () => {
    const MergedIconRight =
      icons && icons.popArrowRight ? icons.popArrowRight : rtl ? <IconLeft /> : <IconRight />;
    const MergedIconDown =
      icons && icons.horizontalArrowDown ? icons.horizontalArrowDown : <IconDown />;
    return (
      <span className={`${prefixCls}-icon-suffix`}>
        {needPopOnBottom ? MergedIconDown : MergedIconRight}
      </span>
    );
  };

  const hasSelectedStatus = isChildrenSelected(children, selectedKeys) || isSelected;
  const popPosition: TriggerProps['position'][] = rtl ? ['br', 'lt'] : ['bl', 'rt'];
  const subMenuClickHandler = (event) => {
    onClickSubMenu(_key, level, 'pop');
    selectable && onClickMenuItem(_key, event);
  };

  return (
    <Dropdown
      trigger="hover"
      popupVisible={popupVisible}
      onVisibleChange={setPopupVisible}
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
        position: needPopOnBottom ? popPosition[0] : popPosition[1],
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
        tabIndex={0}
        aria-haspopup
        aria-expanded={popupVisible}
        aria-controls={instanceId}
        ref={forwardedRef}
        style={style}
        className={cs(
          baseClassName,
          `${baseClassName}-header`,
          {
            [`${prefixCls}-selected`]: hasSelectedStatus,
          },
          className
        )}
        onClick={subMenuClickHandler}
        onKeyDown={(event) => {
          const keyCode = event.keyCode || event.which;
          if (keyCode === Enter.code) {
            subMenuClickHandler(event);
          } else if (keyCode === ArrowLeft.code) {
            setPopupVisible(false);
          } else if (keyCode === ArrowRight.code) {
            setPopupVisible(true);
          }
        }}
        {...omit(rest, ['key', 'popup'])}
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
