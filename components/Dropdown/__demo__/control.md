---
order: 7
title:
  zh-CN: 隐藏菜单
  en-US: Control visibility of menu
---

## zh-CN

通过 `popupVisible` 和 `onVisibleChange` 控制下拉框的展开和收起。
具体 `onVisibleChange` 的触发时机可查看[Trigger](/react/components/trigger#受控用法)组件文档。

## en-US

Use `popupVisible` and `onVisibleChange` to control the visibility of the dropdown menu.
Refer to [Trigger](/react/components/trigger#Controlled) for more details about trigger timing of `onVisibleChange`. 

```js
import { useState, useRef } from 'react';
import { Dropdown, Menu, Button } from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';

function Demo() {
  const [popupVisible, setPopupVisible] = useState(false);
  const refMenuItemClicked = useRef(null);

  const dropList = (
    <Menu
      onClickMenuItem={(key) => {
        refMenuItemClicked.current = key;
      }}
    >
      <Menu.Item key="1">Will not close the menu</Menu.Item>
      <Menu.Item key="2">Will close the menu</Menu.Item>
    </Menu>
  );

  return (
    <div className="dropdown-demo">
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
    </div>
  );
}

ReactDOM.render(<Demo />, CONTAINER);
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
