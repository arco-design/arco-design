---
order: 12
title:
  zh-CN: 反向
  en-US: Reverse
---

## zh-CN

设置 `reverse={true}` ，可以交换滑动条的起点和终点。

## en-US

Set `reverse={true}` to swap the start and end points of the slider.

```js
import { useState } from 'react';
import { Slider, Switch, Typography } from '@arco-design/web-react';
import { IconSound, IconMute } from '@arco-design/web-react/icon';

function Demo() {
  const [reverse, setReverse] = useState(true);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Switch checked={reverse} onChange={setReverse} />{' '}
        <Typography.Text>Reversed</Typography.Text>
      </div>
      <Slider
        reverse={reverse}
        showTicks
        max={15}
        defaultValue={10}
        marks={{
          0: '0km',
          5: '5km',
          10: '10km',
          15: '15km',
        }}
        style={{ width: 200 }}
      />
    </div>
  );
}

ReactDOM.render(<Demo />, CONTAINER);
```
