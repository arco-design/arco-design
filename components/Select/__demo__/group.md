---
order: 9
title:
  zh-CN: 分组
  en-US: With Group
---

## zh-CN

使用 `Select.Group` 对下拉菜单选项进行编组。

## en-US

Use `Select.Group` to group the drop-down menu options.

```js
import { Select } from '@arco-design/web-react';
const Option = Select.Option;
const groups = [
  ['Black tea latte', 'Green tea latte'],
  ['Vanilla Frappuccino', 'Matcha Frappuccino'],
  ['Chocolate milk', 'Banana milk'],
];

const App = () => {
  return (
    <div>
      <Select showSearch allowClear placeholder="Select drink" style={{ width: 154 }}>
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
    </div>
  );
};

export default App;
```
