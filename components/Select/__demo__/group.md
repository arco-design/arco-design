---
order: 9
title:
  zh-CN: 分组
  en-US: With Group
---

## zh-CN

使用 `dropdownRender` 对下拉菜单进行自由扩展。

## en-US

Use `dropdownRender` to freely customize the drop-down menu.

```js
import { Select } from '@arco-design/web-react';

const Option = Select.Option;
const groups = [
  ['Black tea latte', 'Green tea latte'],
  ['Vanilla Frappuccino', 'Matcha Frappuccino'],
  ['Chocolate milk', 'Banana milk'],
];

ReactDOM.render(
  <div>
    <Select
      showSearch
      allowClear
      placeholder="Select drink"
      style={{ width: 154 }}
    >
      {groups.map((options, index) => {
        return (
          <Select.OptGroup label={`Group-${index}`} key={index}>
            {options.map((option, index) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select.OptGroup>
        );
      })}
    </Select>
  </div>,
  CONTAINER
);
```
