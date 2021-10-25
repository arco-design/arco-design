import React, { forwardRef, useContext } from 'react';
import SubMenuInline from './inline';
import SubMenuPop from './pop';
import { MenuSubMenuProps } from '../interface';
import MenuContext from '../context';

function SubMenu(props: MenuSubMenuProps, ref) {
  const { children, popup, level } = props;
  const { mode, collapse, inDropdown } = useContext(MenuContext);

  const forcePopup = !!(typeof popup === 'function' ? popup(level) : popup);
  const mergedPopup = forcePopup || collapse || inDropdown || mode !== 'vertical';
  const MergedMenu = mergedPopup ? SubMenuPop : SubMenuInline;

  return (
    <MergedMenu forwardedRef={ref} {...props}>
      {children}
    </MergedMenu>
  );
}

const ForwardRefSubMenu = forwardRef(SubMenu);

const SubMenuComponent = ForwardRefSubMenu as typeof ForwardRefSubMenu & {
  menuType: string;
};

SubMenuComponent.displayName = 'SubMenu';

SubMenuComponent.menuType = 'SubMenu';

export default SubMenuComponent;
