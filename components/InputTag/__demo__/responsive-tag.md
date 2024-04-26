---
order: 9
title:
  zh-CN: 响应式显示Tag
  en-US: Responsive Tags
---

## zh-CN

通过 `maxTagCount=responsive` 设置根据容器尺寸动态显示 Tag 数。会监听所有 Tag 及容器的尺寸变化，所以在标签数较多时不建议使用，可能存在性能问题。
此时拖拽和动画效果不可用。


## en-US

Use `maxTagCount=responsive` to dynamically display the number of Tags based on the container size. It will monitor the size changes of all Tags and containers, so it is not recommended to use it when there are a large number of tags, as there may be performance issues.

Drag and animation effects are not available at this time.

```js
import { InputTag, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <Space style={{marginBottom: 20}}>
        <InputTag
          style={{ width: 300 }}
          placeholder="Please input"
          defaultValue={['label 1', 'label 2', 'label 3', 'label 4', 'label 5']}
          maxTagCount="responsive"
        />
        <InputTag
          style={{ width: 300 }}
          placeholder="Please input"
          defaultValue={['label 1', 'label 2', 'label 3', 'label 4', 'label 5']}
          maxTagCount={{
            count: 'responsive',
            render: (invisibleTagCount) => <span style={{ marginLeft: 4, fontSize: 12 }}>+{invisibleTagCount} More</span>,
          }}
        />
      </Space>
    </div>
  );
};

export default App;
```
