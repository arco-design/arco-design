---
order: 4
title:
  zh-CN: 添加标签文本
  en-US: Marks
---

## zh-CN

可以通过传入 `marks` 添加标签文本。当设置 `onlyMarkValue` 的时候，只可以选择节点值。此时`step`会被忽略。

## en-US

You can add mark by passing in `marks`. When setting `onlyMarkValue`, only node value can be selected. At this time, `step` will be ignored.

```js
import React from 'react';
import { Slider } from '@arco-design/web-react';
import { IconClockCircle } from '@arco-design/web-react/icon';

class App extends React.Component {
  render() {
    return (
      <div style={{ width: 240 }}>
        <Slider
          defaultValue={5}
          max={15}
          marks={{
            0: '0km',
            5: '5km',
            10: '10km',
            15: '15km',
          }}
          style={{ marginBottom: 80 }}
        />
        <Slider
          onlyMarkValue
          defaultValue={10}
          max={15}
          marks={{
            0: '0km',
            5: '5km',
            10: '10km',
            15: '15km',
          }}
        />
      </div>
    );
  }
}

export default App;
```
