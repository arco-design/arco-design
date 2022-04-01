import React, { PropsWithChildren, useState } from 'react';
import cs from '../_util/classNames';
import Dropdown from '../Dropdown';
import IconDown from '../../icon/react-icon/IconDown';
import omit from '../_util/omit';
import { BreadCrumbItemProps } from './interface';

function Item(props: PropsWithChildren<BreadCrumbItemProps>) {
  const { children, style, className, prefixCls, droplist, dropdownProps } = props;
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const dom = (
    <div
      role="listitem"
      style={style}
      className={cs(
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-with-dropdown`]: droplist,
        },
        className
      )}
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
    </div>
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
