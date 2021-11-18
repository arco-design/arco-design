import React, { useContext, useEffect } from 'react';
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

const SubMenuInline = (props: MenuSubMenuProps & { forwardedRef }) => {
  const { _key, children, style, className, title, level, forwardedRef, ...rest } = props;
  const {
    prefixCls,
    levelIndent,
    openKeys = [],
    selectedKeys = [],
    icons,
    onClickSubMenu,
    collectInlineMenuKeys,
  } = useContext(MenuContext);

  const baseClassName = `${prefixCls}-inline`;
  const isOpen = openKeys?.indexOf(_key) > -1;
  const [height, setHeight] = useStateWithPromise(isOpen ? 'auto' : 0);

  const subMenuClickHandler = () => onClickSubMenu(_key, level, 'inline');
  const isActive = useHotkeyHandler(
    _key,
    (isActive, type) => isActive && type === 'enter' && subMenuClickHandler()
  );

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
  });

  const header = (
    <div
      className={cs(`${baseClassName}-header`, {
        [`${prefixCls}-active`]: isActive,
        [`${prefixCls}-selected`]: isChildrenSelected(children, selectedKeys),
      })}
      onClick={() => subMenuClickHandler()}
    >
      <MenuIndent level={level} prefixCls={prefixCls} levelIndent={levelIndent} />
      <span>{title}</span>
      <span className={`${prefixCls}-icon-suffix ${isOpen ? 'is-open' : ''}`}>
        {icons && icons.horizontalArrowDown ? icons.horizontalArrowDown : <IconDown />}
      </span>
    </div>
  );

  const content = (
    <div className={cs(`${baseClassName}-content`)} style={{ height }}>
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
