---
order: 14
title:
  zh-CN: 扩展菜单
  en-US: Customize Dropdown
---

## zh-CN

使用 `dropdownRender` 对下拉菜单进行自由扩展。

## en-US

Use `dropdownRender` to freely customize the drop-down menu.

```js
import { useState } from 'react';
import { Select, Divider, Input, Button } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
const Option = Select.Option;

function App() {
  const [options, setOptions] = useState(['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']);
  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    if (inputValue && options.indexOf(inputValue) === -1) {
      setOptions(options.concat([inputValue]));
      setInputValue('');
    }
  };

  return (
    <Select
      style={{ width: 240 }}
      placeholder="Select city"
      dropdownRender={(menu) => (
        <div>
          {menu}
          <Divider style={{ margin: 0 }} />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 12px',
            }}
          >
            <Input
              size="small"
              style={{ marginRight: 18 }}
              value={inputValue}
              onChange={(value) => setInputValue(value)}
            />
            <Button
              style={{ fontSize: 14, padding: '0 6px' }}
              type="text"
              size="mini"
              onClick={addItem}
            >
              <IconPlus />
              Add item
            </Button>
          </div>
        </div>
      )}
      dropdownMenuStyle={{ maxHeight: 100 }}
    >
      {options.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
}

export default App;
```
