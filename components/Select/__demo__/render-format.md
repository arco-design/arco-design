---
order: 8
title:
  zh-CN: 定制回显内容
  en-US: Custom Selection Render
---

## zh-CN

使用 `renderFormat` 可以定制回显内容。

**注意：在如远程加载选项数据的场景下，value 中对应的选项可能在某些时刻并不存在，需要判断若 `option` 不存在则返回 `value` 作为显示的内容。**

## en-US

Use `renderFormat` to customize the content what will be rendered in select box.

**Note: In scenarios such as remote loading of option data, the corresponding option in value may not exist at some point. It is necessary to determine if the option does not exist, return the value as the displayed content.**

```js
import { Select, Space } from '@arco-design/web-react';
import { IconStar, IconDelete } from '@arco-design/web-react/icon';
const Option = Select.Option;

function App() {
  const data = ['Beijing', 'Guangzhou', 'Shanghai', 'Shenzhen'];
  return (
    <Space size="large">
      <Select
        placeholder="Select city"
        style={{ width: 345, }}
        renderFormat={(option, value) => {
          return option ? (
            <span>
              <IconStar style={{ color: '#f7ba1e', }} />
              {` ${option.value} `}
            </span>
          ) : (
            value
          );
        }}
      >
        {data.map((item, index) => (
          <Option value={item} key={index}>
            {item}
          </Option>
        ))}
      </Select>

      <Select
        placeholder="Select city"
        style={{ width: 345, }}
        mode="multiple"
        removeIcon={<IconDelete />}
        defaultValue={['Beijing', 'Shenzhen']}
        renderFormat={(option, value) => {
          // When labelInValue is true, the value is an object
          return option ? (
            <span>
              <IconStar
                style={{
                  color: '#f7ba1e',
                }}
              />
              {` ${option.value} City `}
            </span>
          ) : (
            value
          );
        }}
      >
        {data.map((item, index) => (
          <Option value={item} key={index}>
            {item}
          </Option>
        ))}
      </Select>
    </Space>
  );
}

export default App;
```
