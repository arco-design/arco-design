---
order: 17
title:
  zh-CN: 远程搜索
  en-US: onSearch
---

## zh-CN

使用 `onSearch` 自定义搜索逻辑。可以通过 `showSearch.panelMode` 属性控制是否以搜索面板的形式展示所有可选项。

## en-US

Customize the search logic by `onSearch`. Whether to display all options in the search panel can be controlled via the `showSearch.panelMode` property.

```js
import React from 'react';
import { Cascader, Checkbox, Divider, Spin, Space } from '@arco-design/web-react';

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

function CascaderDemo(props) {
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
      <Cascader
        placeholder="Please enter ..."
        showSearch
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
        {...props}
      />
  );
}

function App () {
  const [showSearchPanel, setShowSearchPanel] = React.useState(false);

  return <div>
    <div style={{marginBottom: 20}}>
      <Checkbox checked={showSearchPanel} onChange={setShowSearchPanel}>是否以搜索面板展示可选项</Checkbox>
    </div>
    <Space size="large">
      <CascaderDemo showSearch={{ panelMode: showSearchPanel ? 'select' : 'cascader' }} />
      <CascaderDemo  showSearch={{ panelMode: showSearchPanel ? 'select' : 'cascader'}} mode="multiple" />
    </Space>
  </div>
}

export default App;
```
