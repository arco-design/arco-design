---
order: 6
title:
  zh-CN: 多级菜单
  en-US: With SubMenu
---

## zh-CN

带有多级菜单的下拉框。

## en-US

Dropdown with SubMenu.

```js
import { Dropdown, Menu, Button } from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const data = [
  ['Beijing', ['Haidian', 'Chaoyang', 'Daxing']],
  ['Shanghai', ['Pudong', 'Huangpu', 'Xuhui']],
  ['Guangzhou', ['Baiyun', 'Tianhe', 'Fanyu']],
  ['Shenzhen', ['Futian', 'Luohu', 'Nanshan']],
];
const dropList = (
  <Menu>
    {data.map((city, outerIndex) => {
      if (city.length > 1) {
        const districts = city[1];
        return (
          <SubMenu key={outerIndex} title={<span>{city[0]}</span>}>
            {districts.map((district, innerIndex) => {
              return (
                <MenuItem key={`${outerIndex}_${innerIndex}`}>{districts[innerIndex]}</MenuItem>
              );
            })}
          </SubMenu>
        );
      }

      return <MenuItem key={outerIndex}>{city[0]}</MenuItem>;
    })}
  </Menu>
);

function App() {
  return (
    <div className="dropdown-demo">
      <Dropdown trigger="click" droplist={dropList} position="bl">
        <Button type="text">
          Click
          <IconDown />
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
