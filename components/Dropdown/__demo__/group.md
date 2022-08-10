---
order: 8
title:
  zh-CN: 分组菜单
  en-US: Grouped menu
---

## zh-CN

通过 `Menu.ItemGroup` 使用分组。

## en-US

Group menu items by `Menu.ItemGroup`.

```js
import { Dropdown, Menu, Button } from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';
const dropList = (
  <Menu>
    <Menu.ItemGroup title="Beijing">
      <Menu.Item>Haidian</Menu.Item>
      <Menu.Item>Chaoyang</Menu.Item>
      <Menu.Item>Shunyi</Menu.Item>
    </Menu.ItemGroup>
    <Menu.ItemGroup title="Hebei Province">
      <Menu.Item>Tangshan</Menu.Item>
      <Menu.Item>Baoding</Menu.Item>
    </Menu.ItemGroup>
  </Menu>
);

function App() {
  return (
    <div className="dropdown-demo">
      <Dropdown
        trigger="click"
        position="bl"
        droplist={dropList}
        triggerProps={{ autoAlignPopupWidth: true }}
      >
        <Button type="text">
          Group Menu <IconDown />
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
