---
order: 16
title:
  zh-CN: 自定义标签样式
  en-US: Custom Tag Render
---

## zh-CN

指定 `renderTag` 来自定义标签节点。

## en-US

Use `renderTag` to customize Tags will be rendered in select box.

```js
import { Select, Tag } from '@arco-design/web-react';
const options = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'magenta',
];

function tagRender(props) {
  const { label, value, closable, onClose } = props;
  return (
    <Tag
      color={options.indexOf(value) > -1 ? value : 'gray'}
      closable={closable}
      onClose={onClose}
      style={{ margin: '2px 6px 2px 0' }}
    >
      {label}
    </Tag>
  );
}

const App = () => {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Select
          style={{ maxWidth: 350, marginRight: 20 }}
          allowClear
          placeholder="Please Select"
          mode={'multiple'}
          defaultValue={options.slice(0, 2)}
          options={options}
          renderTag={tagRender}
        />
      </div>
    </div>
  );
};

export default App;
```
