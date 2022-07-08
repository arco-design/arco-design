---
order: 3
title:
  zh-CN: 不同尺寸
  en-US: Size
---

## zh-CN

设置`size`为 `small`、`default`、`large`，可设置小、中、大三种尺寸。

## en-US

There are four sizes available: `min`, `small`, `default`, `large`.

```js
import React from 'react';
import { Progress, Slider, Grid, Radio, Typography } from '@arco-design/web-react';

const Row = Grid.Row;
const Col = Grid.Col;

function Demo() {
  const [value, setValue] = React.useState(90);
  const [size, setSize] = React.useState('default');
  return (
    <div>
      <Row align="center" style={{ marginBottom: 44 }}>
        <Typography.Text>Size: &nbsp; &nbsp;</Typography.Text>
        <Radio.Group options={['small', 'default', 'large']} value={size} onChange={setSize} />
      </Row>
      <Row gutter={44} style={{ marginBottom: 44 }}>
        <Col span={7}>
          <div>
            <Progress
              color="#C9CDD4"
              percent={value}
              size={size}
              formatText={() => 'waiting...'}
              style={{
                marginBottom: 44,
              }}
            />
          </div>
          <div>
            <Progress percent={value} size={size} status="error" />
          </div>
        </Col>
        <Col span={7}>
          <div>
            <Progress
              percent={value}
              size={size}
              style={{
                marginBottom: 44,
              }}
            />
          </div>
          <div>
            <Progress percent={value} size={size} status="success" />
          </div>
        </Col>
      </Row>
      <Row>
        <Progress
          type="circle"
          size={size}
          percent={value}
          style={{
            margin: "0 20px",
          }}
        />
        <Progress
          type="circle"
          size={size}
          percent={value}
          status="error"
          style={{
            margin: "0 20px",
          }}
        />
        <Progress
          type="circle"
          size={size}
          percent={value}
          status="success"
          style={{
            margin: "0 20px",
          }}/>
      </Row>
      <div style={{ width: 100, marginTop: 44 }}>
        <Slider value={value} onChange={setValue}></Slider>
      </div>
    </div>
  );
}

const App = () => {
  return <Demo />;
};

export default App;
```
