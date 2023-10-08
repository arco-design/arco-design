---
order: 21
title:
  zh-CN: 宽度自适应
  en-US: Auto Width
---
## zh-CN

通过 `autoWidth` 属性可以设置 `Select` 的宽度自适应

## en-US

The width adaptation of `Select` can be set through the `autoWidth` property


```js
import { Select, Typography, Space, Divider } from '@arco-design/web-react';
const Option = Select.Option;
const options = ['AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'BBBBBBBBBBBBBBBBBBBB', 'CCCCCCCCCCCC', 'DDDD', 'EEE', 'FF'];

const App = () => {
  return (
    <div >
      <div style={{marginBottom: 32}}>
        <Divider orientation="center">
          <Typography.Text code>{JSON.stringify({minWidth: 200, maxWidth: 500})}</Typography.Text>
        </Divider>
        <Select
          autoWidth={{minWidth: 200, maxWidth: 500}}
          options={options}
          allowClear
          showSearch
        >
        </Select>
        <br/><br/>
        <Select
          autoWidth={{minWidth: 200, maxWidth: 500}}
          options={options}
          allowClear
          showSearch
          addBefore="Select"
        >
        </Select>
      </div>

      <div style={{marginBottom: 32}}>
        <Divider orientation="center">
          <Typography.Text code>{JSON.stringify({minWidth: 0, maxWidth: 500})}</Typography.Text>
        </Divider>
        <Select
          autoWidth={{ maxWidth: 500}}
          placeholder="Please select"
          options={options}
          allowClear
          showSearch
        >
        </Select>
        <br/><br/>
        <Select
          autoWidth={{ maxWidth: 500}}
          placeholder="Please select"
          options={options}
          allowClear
          showSearch
          addBefore="Select"
        >
        </Select>
      </div>

      <div style={{marginBottom: 32}}>
      <Divider orientation="center">
          <Typography.Text code>{JSON.stringify({minWidth: 300, maxWidth: "100%"})}</Typography.Text>
        </Divider>
        <Select
          autoWidth={{ minWidth: 300 }}
          placeholder="Please select"
          options={options}
          allowClear
          mode="multiple"
          allowCreate
        >
        </Select>
        <br/>
        <br/>
        <Select
          addBefore="Select"
          autoWidth={{ minWidth: 300 }}
          placeholder="Please select"
          options={options}
          allowClear
          mode="multiple"
          allowCreate
        >
        </Select>
      </div>
    </div>
  );
};

export default App;
```
