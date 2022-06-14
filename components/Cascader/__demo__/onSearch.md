---
order: 17
title:
  zh-CN: 远程搜索
  en-US: onSearch
---

## zh-CN

使用 `onSearch` 自定义搜索逻辑

## en-US

Customize the search logic by `onSearch`

```js
import { Cascader, Divider, Spin, Space } from '@arco-design/web-react';
import React from 'react';

const genOptions = (keyword) => {
  return !keyword
    ? []
    : [
        {
          label: keyword,
          value: keyword + '-value',
          children: [
            {
              label: `${keyword}-1`,
              value: `${keyword}-value-1`,
            },
            {
              label: `${keyword}-2`,
              value: `${keyword}-value-2`,
            },
          ],
        },
      ];
};

function App() {
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleSearch = (inputValue) => {
    setLoading(true);
    setTimeout(() => {
      setOptions(genOptions(inputValue));
      setLoading(false);
    }, 200);
  };

  return (
    <Space size="large">
      <Cascader
        placeholder="Please enter ..."
        mode="multiple"
        style={{ width: 300 }}
        options={options}
        onSearch={handleSearch}
        onChange={(_, a) => {
          console.log(a);
        }}
        loading={loading}
        dropdownRender={(menu) => {
          return loading ? (
            <div
              style={{
                height: 100,
                width: 300,
                textAlign: 'center',
                lineHeight: '100px',
              }}
            >
              <Spin />
            </div>
          ) : (
            menu
          );
        }}
      />
    </Space>
  );
}

export default App;
```
