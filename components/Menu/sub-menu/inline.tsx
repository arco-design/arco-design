import React, { useContext, useEffect, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import cs from '../../_util/classNames';
import useStateWithPromise from '../../_util/hooks/useStateWithPromise';
import { MenuSubMenuProps } from '../interface';
import IconDown from '../../../icon/react-icon/IconDown';
import { processChildren, isChildrenSelected, PROPS_NEED_TO_BE_PASSED_IN_SUBMENU } from '../util';
import MenuContext from '../context';
import MenuIndent from '../indent';
import { useHotkeyHandler } from '../hotkey';
import pick from '../../_util/pick';

let globalInlineSubMenuIndex = 0;

const SubMenuInline = (props: MenuSubMenuProps & { forwardedRef }) => {
  const { _key, children, style, className, title, level, forwardedRef, selectable, ...rest } =
    props;
  const {
    id: menuId,
    prefixCls,
    levelIndent,
    openKeys = [],
    selectedKeys = [],
    icons,
    onClickSubMenu,
    onClickMenuItem,
    collectInlineMenuKeys,
  } = useContext(MenuContext);

  const baseClassName = `${prefixCls}-inline`;
  const isOpen = openKeys?.indexOf(_key) > -1;
  const isSelected =
    (selectable && selectedKeys.indexOf(props._key as string) > -1) ||
    isChildrenSelected(children, selectedKeys);

  const [height, setHeight] = useStateWithPromise(isOpen ? 'auto' : 0);

  const subMenuClickHandler = (event) => {
    onClickSubMenu(_key, level, 'inline');
    selectable && onClickMenuItem(_key, event);
  };
  const isActive = useHotkeyHandler(
    _key,
    (isActive, type) => isActive && type === 'enter' && subMenuClickHandler(null)
  );

  // Unique ID of this instance
  const instanceId = useMemo<string>(() => {
    const id = `${menuId}-submenu-inline-${globalInlineSubMenuIndex}`;
    globalInlineSubMenuIndex++;
    return id;
  }, []);

  useEffect(() => {
    collectInlineMenuKeys(props._key);
    return () => {
      collectInlineMenuKeys(props._key, true);
    };
  }, []);

  // Should omit these properties in Menu.Item
  const childrenList = processChildren(children, {
    ...pick(rest, PROPS_NEED_TO_BE_PASSED_IN_SUBMENU),
    level: level + 1,
    selectable,
  });

  const header = (
    <div
      aria-expanded={isOpen}
      aria-controls={instanceId}
      className={cs(`${baseClassName}-header`, {
        [`${prefixCls}-active`]: isActive,
        [`${prefixCls}-selected`]: isSelected,
      })}
      onClick={subMenuClickHandler}
    >
      <MenuIndent level={level} prefixCls={prefixCls} levelIndent={levelIndent} />
      <span>{title}</span>
      <span className={`${prefixCls}-icon-suffix ${isOpen ? 'is-open' : ''}`}>
        {icons && icons.horizontalArrowDown ? icons.horizontalArrowDown : <IconDown />}
      </span>
    </div>
  );

  const content = (
    <div id={instanceId} className={cs(`${baseClassName}-content`)} style={{ height }}>
      {childrenList}
    </div>
  );

  return (
    <div ref={forwardedRef} className={cs(baseClassName, className)} style={style}>
      {header}
      <CSSTransition
        in={isOpen}
        timeout={200}
        classNames={baseClassName}
        unmountOnExit={false}
        onEnter={(element) => {
          setHeight(0).then(() => {
            setHeight(element.scrollHeight);
          });
        }}
        onEntered={() => {
          setHeight('auto');
        }}
        onExit={(element) => {
          setHeight(element.scrollHeight).then(() => {
            setHeight(0);
          });
        }}
      >
        {content}
      </CSSTransition>
    </div>
  );
};

export default SubMenuInline;
