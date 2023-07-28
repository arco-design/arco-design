---
order: 2
title:
  zh-CN: 缩起内嵌菜单
  en-US: Collapsed Menu
---

## zh-CN

通过 `collapse` 来指定菜单收起。通过 `renderItemInTooltip` 指定菜单收起时，`Tooltip` 中展示的菜单项内容。

## en-US

Use `collapse` to specify the menu to collapse. Use `renderItemInTooltip` to specify the content of the menu item displayed in `Tooltip` when the menu is collapsed.

```js
import { useState } from 'react';
import { Menu, Button } from '@arco-design/web-react';
import {
  IconMenuFold,
  IconMenuUnfold,
  IconApps,
  IconBug,
  IconBulb,
  IconBook,
} from '@arco-design/web-react/icon';
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

function App() {
  const [collapse, setCollapse] = useState(false);
  return (
    <div className="menu-demo">
      <Button
        style={{
          padding: '0 12px',
          height: 30,
          lineHeight: '30px',
          marginBottom: 4,
        }}
        type="primary"
        onClick={() => setCollapse(!collapse)}
      >
        {collapse ? <IconMenuUnfold /> : <IconMenuFold />}
      </Button>
      <Menu
        style={{ width: 200, borderRadius: 4 }}
        theme="dark"
        collapse={collapse}
        defaultOpenKeys={['0']}
        defaultSelectedKeys={['0_2']}
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
          <MenuItem key="0_2">Menu 3</MenuItem>
          <MenuItem key="0_3">Menu 4</MenuItem>
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
          <MenuItem key="2_0">Menu 1</MenuItem>
          <MenuItem key="2_1">Menu 2</MenuItem>
        </SubMenu>
        <MenuItem renderItemInTooltip={() => 'NAVIGATION-4'}>
          <IconBook /> Navigation 4
        </MenuItem>
      </Menu>
    </div>
  );
}

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
