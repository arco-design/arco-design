---
order: 4
title:
  zh-CN: 触发事件
  en-US: Callback for MenuItem
---

## zh-CN

通过 `Menu.onClickMenuItem` 来为菜单指定点击菜单项时触发的回调函数。

## en-US

Use `Menu.onClickMenuItem` to specify the callback function to be triggered when the menu item is clicked.

```js
import { Dropdown, Menu, Button, Message } from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';
const dropList = (
  <Menu onClickMenuItem={(key) => Message.info(`You clicked ${key}`)}>
    <Menu.Item key="Beijing">Beijing</Menu.Item>
    <Menu.Item key="Shanghai">Shanghai</Menu.Item>
    <Menu.Item key="Guangzhou">Guangzhou</Menu.Item>
  </Menu>
);

function App() {
  return (
    <div className="dropdown-demo">
      <Dropdown droplist={dropList} position="bl" triggerProps={{ autoAlignPopupWidth: true }}>
        <Button type="text">
          Hover me and click an item <IconDown />
        </Button>
      </Dropdown>
    </div>
  );
}

export default App;
```

```css:silent
.dropdown-demo > .arco-btn {
  padding: 0 8px;
  font-weight: normal;
}

.dropdown-demo .arco-dropdown-popup-visible .arco-icon-down {
  transform: rotate(180deg);
}
```
