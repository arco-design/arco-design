---
order: 1
title:
  zh-CN: 深色模式导航
  en-US: Dark Theme
---

## zh-CN

通过 `theme` 指定主题，分为 `light` 和 `dark` 两种。

## en-US

The theme is specified by `theme`, which can be divided into two types: `light` and `dark`.

```js
import { Menu } from '@arco-design/web-react';
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

function App() {
  return (
    <div className="menu-demo">
      <Menu mode="horizontal" theme="dark" defaultSelectedKeys={['1']}>
        <MenuItem key="0" style={{ padding: 0, marginRight: 38 }} disabled>
          <div
            style={{
              width: 80,
              height: 30,
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
