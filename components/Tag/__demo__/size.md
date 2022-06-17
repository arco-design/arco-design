---
order: 5
title: 
  zh-CN: 不同尺寸
  en-US: Size
---

## zh-CN

标签分为：小、中、大、巨大，可以在不同场景下选择合适按钮尺寸。推荐及默认尺寸为「中」。

## en-US

Labels are divided into: small, medium, large, huge, you can choose the appropriate button size in different scenarios. The recommended and default size is "medium".

```js
import { Tag, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space size="large">
      <Tag size="large" closable>
        Large
      </Tag>
      <Tag size="medium" closable>
        Medium
      </Tag>
      <Tag size="default" closable>
        default
      </Tag>
      <Tag size="small" closable>
        small
      </Tag>
    </Space>
  );
};

export default App;
```
