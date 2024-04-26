---
order: 22
title:
  zh-CN: 最大标签数
  en-US: Max tag count
---
## zh-CN

通过 `maxTagCount` 属性可以设置 `Select` 的最大标签数。
`maxTagCount=responsive` 时会根据容器尺寸动态显示标签数。因为会监听所有 Tag 及容器的尺寸变化，所以在选项较多时不建议使用，可能存在性能问题。

## en-US

The maximum number of tags for `Select` can be set through the `maxTagCount` property.

When `maxTagCount=responsive` is used, the number of tags will be dynamically displayed based on the container size. Because it will monitor the size changes of all tags and containers, it is not recommended to use it when there are many options, as there may be performance issues.


```js
import { Select, Space, Divider } from '@arco-design/web-react';
const Option = Select.Option;
const options = [...new Array(20)].map((_, index) => `label ${index}`);

const App = () => {
  return (
    <Space size="large" direction="vertical">
      <div>
        <Divider orientation="left"> 最多显示三个 Tag </Divider>
        <Select
          defaultValue={options.slice(0, 4)}
          maxTagCount={3}
          style={{ width: 350 }}
          placeholder="Please select"
          options={options}
          allowClear
          mode="multiple"
          allowCreate
        ></Select>
      </div>
      <div>
        <Divider orientation="left"> 最多显示三个 Tag，并自定义渲染省略节点 </Divider>
        <Select
          defaultValue={options.slice(0, 4)}
          maxTagCount={{ count: 3, render: (invisibleCount) => `+${invisibleCount}` }}
          style={{ width: 350 }}
          placeholder="Please select"
          options={options}
          allowClear
          mode="multiple"
          allowCreate
        ></Select>
      </div>
      <div>
        <Divider orientation="left"> 根据 select 宽度自适应渲染 Tag 个数 </Divider>
        <Select
          defaultValue={options.slice(0, 4)}
          maxTagCount="responsive"
          style={{ width: 350 }}
          placeholder="Please select"
          options={options}
          allowClear
          mode="multiple"
          allowCreate
        ></Select>
      </div>
    </Space>
  );
};

export default App;

```
