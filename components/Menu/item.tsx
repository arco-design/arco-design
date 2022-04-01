import React, { forwardRef, useContext, useEffect, useRef } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';
import cs from '../_util/classNames';
import Tooltip from '../Tooltip';
import { MenuItemProps } from './interface';
import useIsFirstRender from '../_util/hooks/useIsFirstRender';
import MenuContext from './context';
import MenuIndent from './indent';
import omit from '../_util/omit';
import { useHotkeyHandler } from './hotkey';
import { PROPS_NEED_TO_BE_PASSED_IN_SUBMENU } from './util';

function Item(props: MenuItemProps, ref) {
  const {
    _key,
    children,
    level,
    disabled,
    className,
    style,
    wrapper: WrapperTagName = 'div',
    onClick,
    ...rest
  } = props;
  const {
    prefixCls,
    mode,
    collapse,
    inDropdown,
    levelIndent,
    selectedKeys,
    autoScrollIntoView,
    scrollConfig,
    tooltipProps,
    clearHotkeyInfo,
    onClickMenuItem,
  } = useContext(MenuContext);

  const refElement = useRef(null);
  const isFirstRender = useIsFirstRender();

  const needTextIndent = mode === 'vertical' && level > 1;
  const needTooltip = collapse && !inDropdown && level === 1;
  const isSelected = selectedKeys && ~selectedKeys.indexOf(_key);
  const isActive = useHotkeyHandler(_key, (isActive, type) => {
    if (isActive && type === 'enter') {
      onClickMenuItem(_key, null);
      clearHotkeyInfo();
    }
  });

  useEffect(() => {
    const shouldScroll = isActive || (isSelected && autoScrollIntoView);
    if (refElement.current && shouldScroll) {
      // 首次渲染需要等待展开动画结束之后滚动
      setTimeout(
        () => {
          scrollIntoView(refElement.current, {
            behavior: 'smooth',
            block: 'start',
            scrollMode: 'if-needed',
            boundary: document.body,
            ...scrollConfig,
          });
        },
        isFirstRender ? 500 : 0
      );
    }
  }, [isActive, isSelected, autoScrollIntoView]);

  const itemElement = (
    <WrapperTagName
      role="menuitem"
      ref={(_ref) => {
        ref = _ref;
        refElement.current = ref;
      }}
      style={style}
      className={cs(
        `${prefixCls}-item`,
        {
          [`${prefixCls}-disabled`]: disabled,
          [`${prefixCls}-active`]: isActive,
          [`${prefixCls}-selected`]: isSelected,
          // 存在缩进dom
          [`${prefixCls}-item-indented`]: needTextIndent && !collapse,
        },
        className
      )}
      onClick={(event) => {
        if (!disabled) {
          onClickMenuItem(_key, event);
          onClick && onClick(event);
          clearHotkeyInfo();
        }
      }}
      {...omit(rest, ['key', '_key'].concat(PROPS_NEED_TO_BE_PASSED_IN_SUBMENU))}
    >
      {needTextIndent && !collapse ? (
        <>
          <MenuIndent prefixCls={prefixCls} levelIndent={levelIndent} level={level} />
          <span
            className={`${prefixCls}-item-inner`}
            style={{
              display: 'block',
            }}
          >
            {children}
          </span>
        </>
      ) : (
        children
      )}

      {isSelected && mode === 'horizontal' ? (
        <div className={`${prefixCls}-selected-label`} />
      ) : null}
    </WrapperTagName>
  );

  return needTooltip ? (
    <Tooltip
      trigger="hover"
      content={<span>{children}</span>}
      position="right"
      triggerProps={{
        className: `${prefixCls}-item-tooltip`,
        ...(tooltipProps?.triggerProps || {}),
      }}
      {...omit(tooltipProps, ['triggerProps'])}
    >
      {itemElement}
    </Tooltip>
  ) : (
    itemElement
  );
}

const ForwardRefItem = forwardRef(Item);

const ItemComponent = ForwardRefItem as typeof ForwardRefItem & {
  menuType: string;
};

ItemComponent.displayName = 'MenuItem';

ItemComponent.menuType = 'MenuItem';

export default ItemComponent;
