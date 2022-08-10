---
order: 0
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

当需要突出某个或某组数字或展示带描述的统计类数据时使用。

## en-US

Use `Statistics` when you need to highlight a certain number or group of numbers or display statistical data with descriptions.

```js
import { Statistic } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <Statistic title="Downloads" value={125670} groupSeparator style={{ marginRight: 60 }} />
      <Statistic extra="Comments" value={40509} groupSeparator precision={2} />
    </div>
  );
};

export default App;
```
