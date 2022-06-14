---
order: 6
title:
  zh-CN: 悬浮按钮菜单
  en-US: Floating Button Menu
---

## zh-CN

指定 `mode` 为 `popButton` 使用按钮组样式的悬浮菜单。

## en-US

By setting `mode` to `popButton`, you can use a button group style floating menu.

```js
import { useState } from 'react';
import { Menu, Trigger } from '@arco-design/web-react';
import { IconMessage, IconClose, IconBug, IconBulb } from '@arco-design/web-react/icon';
const MenuItem = Menu.Item;

function App() {
  const renderMenu = () => {
    return (
      <Menu
        style={{ marginBottom: -4 }}
        mode="popButton"
        tooltipProps={{ position: 'left' }}
        hasCollapseButton
      >
        <MenuItem key="1">
          <IconBug />
          Bugs
        </MenuItem>
        <MenuItem key="2">
          <IconBulb />
          Ideas
        </MenuItem>
      </Menu>
    );
  };

  const [popupVisibleOne, setPopupVisibleOne] = useState(false);
  const [popupVisibleTwo, setPopupVisibleTwo] = useState(false);
  return (
    <div className="menu-demo menu-demo-button">
      <Trigger
        popup={renderMenu}
        trigger={['click', 'hover']}
        clickToClose
        position="top"
        onVisibleChange={(v) => setPopupVisibleOne(v)}
      >
        <div className={`button-trigger ${popupVisibleOne ? 'button-trigger-active' : ''}`}>
          {popupVisibleOne ? <IconClose /> : <IconMessage />}
        </div>
      </Trigger>

      <Trigger
        popup={renderMenu}
        trigger={['click', 'hover']}
        clickToClose
        position="top"
        onVisibleChange={(v) => setPopupVisibleTwo(v)}
      >
        <div className={`button-trigger ${popupVisibleTwo ? 'button-trigger-active' : ''}`}>
          {popupVisibleTwo ? <IconClose /> : <IconMessage />}
        </div>
      </Trigger>
    </div>
  );
}

export default App;
```

```css
.menu-demo {
  box-sizing: border-box;
  width: 100%;
  padding: 40px;
  background-color: var(--color-neutral-2);
}

.menu-demo .arco-menu-inner {
  overflow-y: auto;
}

.menu-demo-button {
  position: relative;
  width: 660px;
  height: 300px;
  background-color: var(--color-fill-2);
}

.button-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 80px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 14px;
  color: var(--color-white);
  cursor: pointer;
  transition: all 0.1s;
}

.button-trigger:nth-child(1) {
  left: 150px;
  background-color: var(--color-neutral-5);
}

.button-trigger:nth-child(1).button-trigger-active {
  background-color: var(--color-neutral-4);
}

.button-trigger:nth-child(2) {
  left: 372px;
  background-color: rgb(var(--arcoblue-6));
}

.button-trigger:nth-child(2).button-trigger-active {
  background-color: var(--color-primary-light-4);
}
```
