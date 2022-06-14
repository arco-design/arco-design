---
order: 5
title:
  zh-CN: 悬浮菜单
  en-US: Floating Menu
---

## zh-CN

指定 `mode` 为 `pop` 可以使用悬浮菜单。

## en-US

Specify `mode` as `pop` to use floating menu.

```js
import { Menu } from '@arco-design/web-react';
import { IconApps, IconSafe, IconBulb, IconRobot, IconFire } from '@arco-design/web-react/icon';
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const App = () => {
  return (
    <div className="menu-demo-round" style={{ height: 600 }}>
      <Menu style={{ width: 200 }} mode="pop" hasCollapseButton>
        <MenuItem key="0">
          <IconApps />
          Navigation 1
        </MenuItem>
        <SubMenu
          key="1"
          title={
            <>
              <IconRobot />
              Navigation 2
            </>
          }
        >
          <MenuItem key="1_0">Beijing</MenuItem>
          <MenuItem key="1_1">Shanghai</MenuItem>
          <MenuItem key="1_2">Guangzhou</MenuItem>
        </SubMenu>
        <SubMenu
          key="2"
          title={
            <>
              <IconBulb />
              Navigation 3
            </>
          }
        >
          <MenuItem key="2_0">Wuhan</MenuItem>
          <MenuItem key="2_1">Chengdu</MenuItem>
        </SubMenu>
        <MenuItem key="3">
          <IconSafe />
          Navigation 4
        </MenuItem>
        <MenuItem key="4">
          <IconFire />
          Navigation 5
        </MenuItem>
      </Menu>
    </div>
  );
};

export default App;
```

```css
.menu-demo-round {
  box-sizing: border-box;
  width: 100%;
  padding: 40px;
  background-color: var(--color-neutral-2);
}

.menu-demo-round .arco-menu-inner {
  overflow-y: auto;
}

.menu-demo-round .arco-menu {
  height: 100%;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
}

.menu-demo-round .arco-menu:not(.arco-menu-collapse) .arco-menu-collapse-button {
  right: 0;
  bottom: 8px;
  transform: translateX(50%);
}

.menu-demo-round .arco-menu:not(.arco-menu-collapse)::before {
  content: '';
  position: absolute;
  width: 48px;
  height: 48px;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background-color: inherit;
  box-shadow: -4px 0 2px var(--color-bg-2), 0 0 1px rgba(0, 0, 0, 0.3);
  transform: translateX(50%);
}

.menu-demo-round .arco-menu-collapse {
  height: auto;
  padding-top: 24px;
  padding-bottom: 138px;
  border-radius: 22px;
}

.menu-demo-round .arco-menu-collapse-button {
  right: 8px;
  bottom: 8px;
}

.menu-demo-round .arco-menu-collapse-button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
```
