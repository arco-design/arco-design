---
order: 7
title:
  zh-CN: 隐藏菜单
  en-US: Control visibility of menu
---

## zh-CN

通过 `popupVisible` 和 `onVisibleChange` 控制下拉框的展开和收起。具体 `onVisibleChange` 的触发时机可查看[Trigger](/react/components/trigger#受控用法)组件文档。
如果 `droplist` 是 `Menu`，可以通过在 `onClickMenuItem` 中返回 `false` 来避免菜单自动隐藏。

## en-US

Use `popupVisible` and `onVisibleChange` to control the visibility of the dropdown menu. Refer to [Trigger](/react/components/trigger#Controlled) for more details about trigger timing of `onVisibleChange`.
If `droplist` is `Menu`, you can also prevent menu hiding by returning `false` in `onClickMenuItem`.

```js
import { useState, useRef } from 'react';
import { Dropdown, Menu, Button, Space } from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';

function DemoWithPopupVisible() {
  const [popupVisible, setPopupVisible] = useState(false);
  const refMenuItemClicked = useRef(null);
  const dropList = (
    <Menu
      onClickMenuItem={(key) => {
        refMenuItemClicked.current = key;
      }}
    >
      <Menu.Item key="1">Won't close the menu</Menu.Item>
      <Menu.Item key="2">Will close the menu</Menu.Item>
    </Menu>
  );
  return (
    <Dropdown
      droplist={dropList}
      trigger="click"
      position="bl"
      popupVisible={popupVisible}
      onVisibleChange={(visible) => {
        if (refMenuItemClicked.current === null || refMenuItemClicked.current === '2') {
          setPopupVisible(visible);
        }

        refMenuItemClicked.current = null;
      }}
    >
      <Button type="text">
        Click
        <IconDown />
      </Button>
    </Dropdown>
  );
}

function DemoWithOnClickMenuItem() {
  const dropList = (
    <Menu
      onClickMenuItem={(key) => {
        if (key === '1') {
          return false;
        }
      }}
    >
      <Menu.Item key="1">Return false in onClickMenuItem callback</Menu.Item>
      <Menu.Item key="2">Will close the menu</Menu.Item>
    </Menu>
  );
  return (
    <Dropdown droplist={dropList} trigger="click" position="bl">
      <Button type="text">
        Click
        <IconDown />
      </Button>
    </Dropdown>
  );
}

const App = () => {
  return (
    <Space size="large" className="dropdown-demo">
      <DemoWithPopupVisible />
      <DemoWithOnClickMenuItem />
    </Space>
  );
};

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
