---
order: 10
title:
  zh-CN: 带图标的菜单
  en-US: Menu with icons
---

## zh-CN

菜单项前可以添加图标。

## en-US

You can add icons before menu items.

```js
import { Dropdown, Menu, Button } from '@arco-design/web-react';
import { IconDown, IconLocation } from '@arco-design/web-react/icon';
const iconStyle = {
  marginRight: 8,
  fontSize: 16,
  transform: 'translateY(1px)',
};
const dropList = (
  <Menu>
    <Menu.Item key="1">
      <IconLocation style={iconStyle} />
      Beijing
    </Menu.Item>
    <Menu.Item key="2">
      <IconLocation style={iconStyle} />
      Shanghai
    </Menu.Item>
    <Menu.Item key="3">
      <IconLocation style={iconStyle} />
      Guangzhou
    </Menu.Item>
  </Menu>
);

function App() {
  return (
    <div className="dropdown-demo">
      <Dropdown droplist={dropList} trigger="click" position="bl">
        <Button type="text">
          Click me <IconDown />
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
