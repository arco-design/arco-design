---
order: 0
title:
  zh-CN: 顶部导航菜单
  en-US: Horizontal
---

## zh-CN

设置 `mode` 为 `horizontal` 时，使用水平菜单。

## en-US

By setting `mode` to `horizontal`, you can use the horizontal menu.

```js
import { Menu } from '@arco-design/web-react';
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

function App() {
  return (
    <div className="menu-demo">
      <Menu mode="horizontal" defaultSelectedKeys={['1']}>
        <MenuItem
          key="0"
          style={{ padding: 0, marginRight: 38, }}
          disabled
        >
          <div
            style={{
              width: 80,
              height: 30,
              borderRadius: 2,
              background: 'var(--color-fill-3)',
              cursor: 'text',
            }}
          />
        </MenuItem>
        <MenuItem key="1">Home</MenuItem>
        <MenuItem key="2">Solution</MenuItem>
        <MenuItem key="3">Cloud Service</MenuItem>
        <MenuItem key="4">Cooperation</MenuItem>
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
