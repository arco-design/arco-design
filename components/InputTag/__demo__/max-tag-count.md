---
order: 9
title:
  zh-CN: 最大标签数
  en-US: MaxTagCount
---

## zh-CN

通过 `maxTagCount` 设置最多展示的标签数，`maxTagCount.render` 自定义 `+x` 部分的节点内容。

## en-US

Set the maximum number of displayed tags through `maxTagCount`, and customize the `+x` partially rendered nodes through `maxTagCount.render`.

```js
import { InputTag, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <Space style={{marginBottom: 20}}>
        <InputTag
          style={{ width: 350 }}
          placeholder="Please input"
          defaultValue={['1', '2', '3', '4', '5']}
          maxTagCount={3}
        />
        <InputTag
          style={{ width: 350 }}
          placeholder="Please input"
          defaultValue={['1', '2', '3', '4', '5']}
          maxTagCount={{
            count: 3,
            render: (invisibleTagCount) => <span style={{ marginLeft: 4, fontSize: 12 }}>{invisibleTagCount} More</span>,
          }}
        />
      </Space>
    </div>
  );
};

export default App;
```
