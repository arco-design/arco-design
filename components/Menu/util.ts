import React, { ReactElement, ReactNode } from 'react';

export type MenuInfo = {
  keyPath: string[];
  prev: string;
  next: string;
  firstChild?: string;
  lastChild?: string;
  disabled?: boolean;
};

export const PROPS_NEED_TO_BE_PASSED_IN_SUBMENU = ['popup', 'triggerProps', 'selectable'];

const flattenReactFragment = (children: ReactNode): ReactNode[] => {
  return React.Children.toArray(children).reduce<ReactNode[]>((result, child) => {
    if (React.isValidElement(child) && child.type === React.Fragment) {
      return result.concat(flattenReactFragment(child.props.children));
    }
    return result.concat(child);
  }, []);
};

const isIconElement = (node: ReactNode) => {
  if (!React.isValidElement(node)) {
    return false;
  }

  return node.props?.isIcon || (node.type as any)?.defaultProps?.isIcon;
};

export const splitSubMenuTitle = (title: ReactNode) => {
  const titleNodes = flattenReactFragment(title);
  const firstTitleNodeIndex = titleNodes.findIndex((node) => {
    return !(typeof node === 'string' && node.trim() === '');
  });

  if (firstTitleNodeIndex > -1 && isIconElement(titleNodes[firstTitleNodeIndex])) {
    return {
      titleIcon: titleNodes[firstTitleNodeIndex],
      titleText: titleNodes.slice(firstTitleNodeIndex + 1),
    };
  }

  return {
    titleIcon: null,
    titleText: title,
  };
};

// Expand MenuGroup to get an array only contains MenuItem and SubMenu
const flatMenuGroup = (children): ReactElement[] => {
  let validMenuItems = [];

  React.Children.forEach(children, (item) => {
    const menuType = item?.type?.menuType;
    if (menuType === 'MenuItem' || menuType === 'SubMenu') {
      validMenuItems.push(item);
    } else if (menuType === 'MenuGroup') {
      validMenuItems = validMenuItems.concat(flatMenuGroup(item.props.children));
    }
  });

  return validMenuItems;
};

export const generateInfoMap = (
  children,
  keyPath: string[] = [],
  result: {
    [key: string]: MenuInfo;
  } = {}
) => {
  const validChildrenList: any[] = flatMenuGroup(children);

  validChildrenList.forEach((item, index) => {
    const key = item.key;
    const menuType = item.type.menuType;
    const _keyPath = [key, ...keyPath];
    const info: MenuInfo = {
      keyPath: [],
      prev: validChildrenList[index - 1]?.key || null,
      next: validChildrenList[index + 1]?.key || null,
    };

    if (index === 0 || index === validChildrenList.length - 1) {
      const parentKey = _keyPath[1];
      const propertyName = index === 0 ? 'firstChild' : 'lastChild';
      if (parentKey) {
        result[parentKey] = {
          ...result[parentKey],
          [propertyName]: key,
        };
      }
    }

    switch (menuType) {
      case 'SubMenu':
        info.keyPath = _keyPath;
        generateInfoMap(item.props.children, _keyPath, result);
        break;

      case 'MenuItem':
        info.keyPath = _keyPath;
        info.disabled = item.props.disabled;
        break;

      default:
        break;
    }

    result[key] = {
      ...result[key],
      ...info,
    };
  });

  return result;
};

export const processChildren = (
  children,
  props
): Array<Exclude<unknown, boolean | null | undefined>> => {
  return React.Children.map(children, (item, index) => {
    if (!item || !item.props) {
      return item;
    }

    const isHTMLElement = typeof item.type === 'string';
    const isMenuSubComponent = item.type && item.type.menuType;

    // 处理 <div> 包裹 MenuItem 之类的情况
    if (!isMenuSubComponent && item.props.children) {
      const _props = isHTMLElement ? {} : props;
      const itemChildrenList = processChildren(item.props.children, props);
      return React.cloneElement(item, {
        ..._props,
        _key: item.key,
        children: itemChildrenList.length === 1 ? itemChildrenList[0] : itemChildrenList,
      });
    }

    return isHTMLElement
      ? item
      : React.cloneElement(item, {
          ...props,
          // Properties of the component itself have higher priority
          ...item.props,
          _key: item.key || `$menu-${index}`,
        });
  });
};

export function isChildrenSelected(children, keys: string[]) {
  let find = false;
  function loop(_children) {
    if (!_children || find) {
      return;
    }
    React.Children.forEach(_children, (c) => {
      if (c && c.props && c.type && !find) {
        const menuType = c.type.menuType;
        const selectable = c.props.selectable;
        if (menuType === 'MenuItem') {
          find = keys.indexOf(c.key) !== -1;
        } else if (menuType === 'SubMenu' && selectable) {
          find = keys.indexOf(c.key) !== -1;
        }
        if (!find && c.props.children) {
          loop(c.props.children);
        }
      }
    });
  }
  loop(children);
  return find;
}
