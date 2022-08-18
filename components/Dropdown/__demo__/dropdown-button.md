---
order: 5
title:
  zh-CN: 按钮下拉框
  en-US: Dropdown with button
---

## zh-CN

使用 `<Dropdown.Button>` 可以使用右边是额外的相关功能菜单的按钮。

## en-US

Use `<Dropdown.Button>` to use the Dropdown with button on its right side which are additional menus.

```js
import React from 'react';
import { Dropdown, Menu, Tooltip, Space } from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';

const dropList = (
  <Menu>
    <Menu.Item key="1">Save now</Menu.Item>
    <Menu.Item key="2">Save and Publish</Menu.Item>
  </Menu>
);

const App = () => {
  return (
    <Space size="large" className="dropdown-demo">
      <Dropdown.Button type="secondary" droplist={dropList}>
        Publish
      </Dropdown.Button>
      <Dropdown.Button type="secondary" droplist={dropList} disabled>
        Disabled
      </Dropdown.Button>
      <Dropdown.Button type="primary" droplist={dropList} icon={<IconDown />}>
        Publish
      </Dropdown.Button>
      <Dropdown.Button
        type="primary"
        droplist={dropList}
        buttonsRender={([leftButton, rightButton]) => [
          <Tooltip content="Tooltip">{leftButton}</Tooltip>,
          React.cloneElement(rightButton, {
            loading: true,
          }),
        ]}
      >
        With Tooltip
      </Dropdown.Button>
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
