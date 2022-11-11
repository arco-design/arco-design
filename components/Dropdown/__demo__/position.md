---
order: 1
title:
  zh-CN: 弹出方向
  en-US: Position of popup
---

## zh-CN

通过 `position` 支持指定 6 种弹出方位，分别是：`top: 向上`, `tl: 左上`, `tr: 右上`, `bottom: 下方`, `bl: 左下(默认)`, `br: 右下`。

## en-US

Six popup `position` are available: `top`, `tl: top-left`, `tr: top-right`, `bottom`, `bl: bottom-left` (default), `br: bottom-right`。

```js
import { Dropdown, Menu, Button, Space } from '@arco-design/web-react';
const positions = ['bl', 'bottom', 'br', 'tl', 'top', 'tr'];
const descriptions = ['BottomLeft', 'BottomCenter', 'BottomRight', 'TopLeft', 'Top', 'TopRight'];

const App = () => {
  return (
    <Space size="large" className="dropdown-demo">
      {positions.map((position, index) => (
        <Dropdown
          key={index}
          position={position}
          droplist={
            <Menu>
              <Menu.Item key="1">Menu Item 1</Menu.Item>
              <Menu.Item key="2">Menu Item 2</Menu.Item>
              <Menu.Item key="3">Menu Item 3</Menu.Item>
            </Menu>
          }
        >
          <Button type="secondary">{descriptions[index]}</Button>
        </Dropdown>
      ))}
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
