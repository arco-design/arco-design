---
order: 1
title:
  zh-CN: 进度条状态
  en-US: status
---

## zh-CN

可以通过设置 `status` 使进度条显示内置的状态样式。`color` 属性用于设置进度条的颜色，优先级高于 `status`。

`showText` 属性设置为 `false` 时，将不会展示文本。

## en-US

You can set the status of the progress. If `showText` is `false`, the percentage text will not be displayed.

```js
import React from 'react';
import { Progress, Slider, Space } from '@arco-design/web-react';

function Demo() {
  const [value, setValue] = React.useState(30);
  return (
    <div>
      <Space size={20}>
        <div style={{ width: '300px' }}>
          <Progress
            percent={value}
            color="#C9CDD4"
            formatText={() => 'Waiting...'}
            style={{ marginBottom: 20 }}
          />
          <br />
          <Progress
            percent={value}
            status="warning"
            formatText={(val) => `${val} / 100`}
            style={{ marginBottom: 20 }}
          />
          <br />
          <Progress percent={value} buffer />
        </div>
        <div style={{ width: '300px' }}>
          <Progress percent={value} status="error" style={{ marginBottom: 20 }} />
          <br />
          <Progress percent={value} status="success" style={{ marginBottom: 20 }} />
          <br />
          <Progress percent={value} showText={false} />
        </div>
      </Space>
      <div style={{ marginTop: 40 }}>
        <Slider value={value} onChange={setValue} style={{ width: 100 }}></Slider>
      </div>
    </div>
  );
}

const App = () => {
  return <Demo />;
};

export default App;
```
