import React, { PropsWithChildren, useState } from 'react';
import { pickDataAttributes } from '../_util/pick';
import cs from '../_util/classNames';
import Dropdown from '../Dropdown';
import IconDown from '../../icon/react-icon/IconDown';
import omit from '../_util/omit';
import { BreadCrumbItemProps } from './interface';
import { isString } from '../_util/is';

function Item(props: PropsWithChildren<BreadCrumbItemProps>) {
  const {
    children,
    style,
    className,
    prefixCls,
    droplist,
    dropdownProps,
    href,
    onClick,
    tagName = 'div',
    ...rest
  } = props;
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const TagName = isString(href) ? 'a' : tagName;

  const dom = (
    <TagName
      href={href}
      onClick={onClick}
      role="listitem"
      style={style}
      className={cs(
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-with-dropdown`]: droplist,
        },
        className
      )}
      {...pickDataAttributes(rest)}
    >
      {children}
      {droplist && (
        <span
          aria-hidden
          className={cs(`${prefixCls}-item-dropdown-icon`, {
            [`${prefixCls}-item-dropdown-icon-active`]: dropdownVisible,
          })}
        >
          <IconDown />
        </span>
      )}
    </TagName>
  );

  return droplist ? (
    <Dropdown
      droplist={droplist}
      onVisibleChange={(visible) => {
        setDropdownVisible(visible);
        dropdownProps && dropdownProps.onVisibleChange && dropdownProps.onVisibleChange(visible);
      }}
      {...omit(dropdownProps, ['onVisibleChange'])}
    >
      {dom}
    </Dropdown>
  ) : (
    dom
  );
}

Item.displayName = 'BreadcrumbItem';

export default Item;

export { BreadCrumbItemProps };
