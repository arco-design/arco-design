---
order: 3
title:
  zh-CN: 内嵌菜单
  en-US: Sub Menu
---

## zh-CN

菜单内可以嵌入多个子项，通过 `defaultOpenKeys` 可以设置默认打开的子项。

## en-US

Multiple sub-items can be embedded in the menu, and the items that are opened by default can be set through `defaultOpenKeys`.

```js
import { Menu } from '@arco-design/web-react';
import { IconApps, IconBug, IconBulb } from '@arco-design/web-react/icon';
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const App = () => {
  return (
    <div className="menu-demo" style={{ height: 600 }}>
      <Menu
        style={{ width: 200, height: '100%' }}
        hasCollapseButton
        defaultOpenKeys={['0']}
        defaultSelectedKeys={['0_1']}
      >
        <SubMenu
          key="0"
          title={
            <>
              <IconApps /> Navigation 1
            </>
          }
        >
          <MenuItem key="0_0">Menu 1</MenuItem>
          <MenuItem key="0_1">Menu 2</MenuItem>
          <MenuItem key="0_2" disabled>
            Menu 3
          </MenuItem>
        </SubMenu>
        <SubMenu
          key="1"
          title={
            <>
              <IconBug /> Navigation 2
            </>
          }
        >
          <MenuItem key="1_0">Menu 1</MenuItem>
          <MenuItem key="1_1">Menu 2</MenuItem>
          <MenuItem key="1_2">Menu 3</MenuItem>
        </SubMenu>
        <SubMenu
          key="2"
          title={
            <>
              <IconBulb /> Navigation 3
            </>
          }
        >
          <MenuItemGroup key="2_0" title="Menu Group 1">
            <MenuItem key="2_0_0">Menu 1</MenuItem>
            <MenuItem key="2_0_1">Menu 2</MenuItem>
          </MenuItemGroup>
          <MenuItemGroup key="2_1" title="Menu Group 1">
            <MenuItem key="2_1_0">Menu 3</MenuItem>
            <MenuItem key="2_1_1">Menu 4</MenuItem>
          </MenuItemGroup>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default App;
```

```css:silent
.menu-demo {
  box-sizing: border-box;
  width: 100%;
  padding: 40px;
  background-color: var(--color-neutral-2);
}

.menu-demo .arco-menu-inner {
  overflow-y: auto;
}
```
