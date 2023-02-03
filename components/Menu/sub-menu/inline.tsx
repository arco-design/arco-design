import React, { CSSProperties, useContext, ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import cs from '../../_util/classNames';
import useStateWithPromise from '../../_util/hooks/useStateWithPromise';
import { MenuSubMenuProps } from '../interface';
import IconDown from '../../../icon/react-icon/IconDown';
import { processChildren, isChildrenSelected, PROPS_NEED_TO_BE_PASSED_IN_SUBMENU } from '../util';
import MenuContext from '../context';
import MenuIndent from '../indent';
import pick from '../../_util/pick';
import omit from '../../_util/omit';
import { Enter } from '../../_util/keycode';
import useId from '../../_util/hooks/useId';

// Use visibility: hidden to avoid Menu.Item get focused by Tab key
const CONTENT_HIDDEN_STYLE: CSSProperties = { height: 0, visibility: 'hidden' };

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
  } = useContext(MenuContext);

  const baseClassName = `${prefixCls}-inline`;
  const isOpen = openKeys?.indexOf(_key) > -1;
  const isSelected =
    (selectable && selectedKeys.indexOf(props._key as string) > -1) ||
    isChildrenSelected(children, selectedKeys);

  const [contentStyle, setContentStyle] = useStateWithPromise<CSSProperties>(
    isOpen ? { height: 'auto' } : CONTENT_HIDDEN_STYLE
  );

  const subMenuClickHandler = (event) => {
    onClickSubMenu(_key, level, 'inline');
    selectable && onClickMenuItem(_key, event);
  };

  // Unique ID of this instance
  const instanceId = useId(`${menuId}-submenu-inline-`);

  // Should omit these properties in Menu.Item
  const childrenList = processChildren(children, {
    ...pick(rest, PROPS_NEED_TO_BE_PASSED_IN_SUBMENU),
    level: level + 1,
    selectable,
  }) as ReactNode[];

  const header = (
    <div
      tabIndex={0}
      aria-expanded={isOpen}
      aria-controls={instanceId}
      className={cs(`${baseClassName}-header`, {
        [`${prefixCls}-selected`]: isSelected,
      })}
      onClick={subMenuClickHandler}
      onKeyDown={(event) => {
        const keyCode = event.keyCode || event.which;
        if (keyCode === Enter.code) {
          subMenuClickHandler(event);
        }
      }}
    >
      <MenuIndent level={level} prefixCls={prefixCls} levelIndent={levelIndent} />
      <span>{title}</span>
      <span className={`${prefixCls}-icon-suffix ${isOpen ? 'is-open' : ''}`}>
        {icons && icons.horizontalArrowDown ? icons.horizontalArrowDown : <IconDown />}
      </span>
    </div>
  );

  const content = (
    <div id={instanceId} className={cs(`${baseClassName}-content`)} style={contentStyle}>
      {childrenList}
    </div>
  );

  return (
    <div
      ref={forwardedRef}
      className={cs(baseClassName, className)}
      style={style}
      {...omit(rest, ['key', 'popup', 'triggerProps'])}
    >
      {header}
      <CSSTransition
        in={isOpen}
        timeout={200}
        classNames={baseClassName}
        unmountOnExit={false}
        onEnter={async (element) => {
          await setContentStyle(CONTENT_HIDDEN_STYLE);
          await setContentStyle({ height: element.scrollHeight });
        }}
        onEntered={() => {
          setContentStyle({ height: 'auto' });
        }}
        onExit={async (element) => {
          await setContentStyle({ height: element.scrollHeight });
          await setContentStyle(CONTENT_HIDDEN_STYLE);
        }}
      >
        {content}
      </CSSTransition>
    </div>
  );
};

export default SubMenuInline;
