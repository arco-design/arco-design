---
order: 8
title:
  zh-CN: 动态加载
  en-US: Load options lazily
---

## zh-CN
利用`loadMore`可以进行动态加载数据。


**使用动态加载的时候请注意：**


**1.选项必须设置 `isLeaf` 来标示是否需要继续加载**
**2. 如果使用搜索功能，将只对已加载选项执行搜索逻辑。**

## en-US

Load options lazily with `loadMore`.

**Please note when you use `loadMore`:**
**1. Option should have the `isLeaf` property to indicate whether to continue loading options when clicked**
**2. If `showSearch=true`, only the loaded options will be applied search logic.**

如果使用搜索功能，将只从已加载数据的`label`属性进行关键字匹配。

```js
import React from 'react';
import { Cascader, Space } from '@arco-design/web-react';

const options = [
  {
    value: 'beijing',
    label: 'Beijing',
  },
  {
    value: 'shanghai',
    label: 'Shanghai',
    children: [
      {
        value: 'shanghaishi',
        label: 'Shanghai',
      },
    ],
  },
];

class App extends React.Component {
  loadMore = (pathValue, level) =>
    new Promise((resolve) => {
      setTimeout(() => {
        const nodes = pathValue.map((x, i) => ({
          label: `Option ${i + 1}`,
          value: i,
          isLeaf: level >= 2,
        }));
        resolve(nodes);
      }, 500);
    });

  render() {
    return (
      <Space size="large">
        <Cascader
          placeholder="Please select ..."
          style={{ width: 300, marginBottom: 20 }}
          options={options}
          loadMore={this.loadMore}
          showSearch
          allowClear
        />
        <Cascader
          placeholder="Please select ..."
          style={{ width: 300, marginBottom: 20 }}
          options={options}
          loadMore={this.loadMore}
          showSearch
          allowClear
          mode="multiple"
        />
      </Space>
    );
  }
}

export default App;
```
