---
order: 4
title: 
  zh-CN: 自定义标签节点
  en-US: Render tag
---


## zh-CN

指定 `renderTag` 来自定义标签节点。

## en-US

Use `renderTag` to customize tag rendering

```js
import { InputTag, Tag } from '@arco-design/web-react';

const options = ['arcoblue', 'orange', 'lime'];

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

ReactDOM.render(
  <div>
    <div style={{ marginBottom: 20 }}>
      <InputTag
        allowClear
        placeholder="Please input"
        defaultValue={options}
        renderTag={tagRender}
        style={{ maxWidth: 350, marginRight: 20 }}
      />
    </div>
  </div>,
  CONTAINER
);
```
