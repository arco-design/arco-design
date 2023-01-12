import React, { useState, useRef, useContext, ReactElement, ReactNode } from 'react';
import SubMenu from './sub-menu';
import { getStyle } from '../_util/style';
import MenuContext from './context';
import ResizeObserver from '../_util/resizeObserver';

const OVERFLOW_THRESHOLD = 5;

function getNodeWidth(node) {
  // getBoundingClientRect will get a result like 20.45
  // Use Math.ceil to avoid menu item wrap in specific menu-width
  return node && Math.ceil(+node.getBoundingClientRect().width);
}

function translatePxToNumber(str): number {
  const result = Number(str.replace('px', ''));
  return isNaN(result) ? 0 : result;
}

interface OverflowWrapProps {
  ellipsisText?: ReactNode;
  children: ReactNode;
}

const OverflowWrap = (props: OverflowWrapProps) => {
  const { children, ellipsisText = '···' } = props;
  const { prefixCls } = useContext(MenuContext);

  const refUl = useRef(null);
  const [lastVisibleIndex, setLastVisibleIndex] = useState(null);

  const overflowSubMenuClass = `${prefixCls}-overflow-sub-menu`;
  const overflowMenuItemClass = `${prefixCls}-overflow-hidden-menu-item`;
  const overflowSubMenuMirrorClass = `${prefixCls}-overflow-sub-menu-mirror`;

  function computeLastVisibleIndex() {
    if (!refUl.current) {
      return;
    }

    const ulElement = refUl.current;
    const maxWidth = getNodeWidth(ulElement) - OVERFLOW_THRESHOLD;
    const childNodeList = [].slice.call(ulElement.children);

    let menuItemIndex = 0;
    let currentItemRight = 0;
    let overflowSubMenuWidth = 0;

    // 注意 childrenNodeList.length !== React.Children.count(children) 所以需要用 menuItemIndex 来标记真实的 MenuItem 下标
    for (let i = 0; i < childNodeList.length; i++) {
      const node = childNodeList[i];
      const classNames = node.className.split(' ');
      const isOverflowSubMenu = classNames.indexOf(overflowSubMenuClass) > -1;
      const isOverflowSubMenuMirror = classNames.indexOf(overflowSubMenuMirrorClass) > -1;

      // 忽略 overflowSubMenu 的宽度，其宽度测量交由 overflowSubMenuMirror
      if (isOverflowSubMenu) {
        continue;
      }

      const nodeWidth =
        getNodeWidth(node) +
        translatePxToNumber(getStyle(node, 'marginLeft')) +
        translatePxToNumber(getStyle(node, 'marginRight'));

      if (isOverflowSubMenuMirror) {
        overflowSubMenuWidth = nodeWidth;
        continue;
      }

      currentItemRight += nodeWidth;

      // 将要溢出的菜单项
      if (currentItemRight > maxWidth) {
        setLastVisibleIndex(
          // 判断如果将最后一个菜单项换为 ... 是否会超出宽度
          menuItemIndex - (currentItemRight - nodeWidth + overflowSubMenuWidth <= maxWidth ? 1 : 2)
        );

        return;
      }

      menuItemIndex++;
    }

    // 全部可见
    setLastVisibleIndex(null);
  }

  const renderOverflowSubMenu = (children, isMirror = false) => {
    return (
      <SubMenu
        title={<span>{ellipsisText}</span>}
        key={`arco-menu-overflow-sub-menu${isMirror ? '-mirror' : ''}`}
        className={isMirror ? overflowSubMenuMirrorClass : overflowSubMenuClass}
        {...props}
        children={children}
      />
    );
  };

  const renderChildren = () => {
    let overflowSubMenu = null;
    const overflowSubMenuMirror = renderOverflowSubMenu(null, true);

    const originMenuItems = React.Children.map(children, (child, index) => {
      let item = child;

      if (lastVisibleIndex !== null) {
        if (index > lastVisibleIndex) {
          item = React.cloneElement(child as ReactElement, {
            className: overflowMenuItemClass,
          });
        }

        if (index === lastVisibleIndex + 1) {
          const overflowedItems = React.Children.toArray(children)
            .slice(lastVisibleIndex + 1)
            .map((child) =>
              React.cloneElement(child as ReactElement, { key: (child as ReactElement).props._key })
            );
          overflowSubMenu = renderOverflowSubMenu(overflowedItems);
        }
      }

      return item;
    });

    return [overflowSubMenuMirror, ...originMenuItems, overflowSubMenu];
  };

  return (
    <ResizeObserver onResize={computeLastVisibleIndex}>
      <div className={`${prefixCls}-overflow-wrap`} ref={refUl}>
        {renderChildren()}
      </div>
    </ResizeObserver>
  );
};

export default OverflowWrap;
