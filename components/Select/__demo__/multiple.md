---
order: 2
title:
  zh-CN: 多选模式
  en-US: Multiple Mode
---

## zh-CN

指定 `mode=multiple`，即可使用多选。通过 `maxTagCount` 设置最多显示的标签个数，通过 `renderTag` 属性自定义标签的渲染方式，实现更复杂的定制。

## en-US

Specify `mode=multiple` to use multiple selection. Set the maximum number of tags displayed through `maxTagCount`, and customize the rendering method of tags through the `renderTag` property to achieve more complex customization.

```js
import { Select, Space, Tag } from '@arco-design/web-react';
const Option = Select.Option;
const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Wuhan'];

const App = () => {
  return (
    <Space size="large" direction="vertical">
      <Select
        mode="multiple"
        placeholder="Please select"
        style={{ width: 345 }}
        defaultValue={['Beijing', 'Shenzhen']}
        allowClear
      >
        {options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>

      <Select
        mode="multiple"
        maxTagCount={2}
        placeholder="Please select"
        style={{ width: 345 }}
        defaultValue={['Beijing', 'Shenzhen', 'Wuhan']}
        allowClear
      >
        {options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>


      <Select
        mode="multiple"
        maxTagCount={{count: 2, render: (invisibleNumber) => `+${invisibleNumber} more`}}
        placeholder="Please select"
        style={{ width: 345 }}
        defaultValue={['Beijing', 'Shenzhen', 'Wuhan']}
        allowClear
      >
        {options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>

      <Select
        mode="multiple"
        placeholder="Please select"
        style={{ width: 345 }}
        defaultValue={['Beijing', 'Shenzhen', 'Wuhan']}
        allowClear
        renderTag={({ label, value, closable, onClose }, index, valueList) => {
          const tagCount = valueList.length;

          if (tagCount > 2) {
            return index === 0 ? (
              <span style={{ marginLeft: 8 }}>{`${tagCount} cities selected`}</span>
            ) : null;
          }

          return (
            <Tag
              color="arcoblue"
              closable={closable}
              onClose={onClose}
              style={{ margin: '2px 6px 2px 0' }}
            >
              {label}
            </Tag>
          );
        }}
      >
        {options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </Space>
  );
};

export default App;
```
