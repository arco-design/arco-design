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
import { Cascader, Divider, Space } from '@arco-design/web-react';

const genOptions = (keyword) => {
  return [
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

function Demo() {
  const [options, setOptions] = React.useState([]);

  const handleSearch = (inputValue) => {
    setTimeout(() => {
      setOptions(genOptions(inputValue));
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
      />
    </Space>
  );
}

ReactDOM.render(<Demo />, CONTAINER);
```
