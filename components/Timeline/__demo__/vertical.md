---
order: 5
title:
  zh-CN: 纵向时间轴
  en-US: Vertical
---

## zh-CN

竖直方向的时间轴。

## en-US

The vertical time axis.

```js
import React from 'react';
import { Timeline, Grid, Radio, Typography } from '@arco-design/web-react';

const TimelineItem = Timeline.Item;
const { Row, Col } = Grid;

const imageStyle = {
  margin: '0 12px 12px 12px'
}

function App() {
  const [mode, setMode] = React.useState('left');
  return (
    <div>
      <Row align="center" style={{ marginBottom: 24 }}>
        <Typography.Text>mode: &nbsp; &nbsp;</Typography.Text>
        <Radio.Group
          value={mode}
          onChange={setMode}
          options={[
            {
              label: 'left',
              value: 'left',
            },
            {
              label: 'right',
              value: 'right',
            },
            {
              label: 'alternate',
              value: 'alternate',
            },
          ]}
        />
      </Row>
      <Timeline mode={mode} labelPosition="relative">
        <TimelineItem label="2012-08">
          <Row style={{ display: 'inline-flex', alignItems: 'center' }}>
            <img
              width="40"
              style={imageStyle}
              src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b5d834b83708a269b4562924436eac48.png~tplv-uwbnlip3yd-png.png"
            />
            <div style={{ marginBottom: 12 }}>
              Toutiao
              <div style={{ fontSize: 12, color: '#4E5969' }}>Founded in 2012</div>
            </div>
          </Row>
        </TimelineItem>
        <TimelineItem label="2017-05">
          <Row style={{ display: 'inline-flex', alignItems: 'center' }}>
            <img
              width="40"
              style={imageStyle}
              src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/385ed540c359ec8a9b9ce2b5fe89b098.png~tplv-uwbnlip3yd-png.png"
            />
            <div style={{ marginBottom: 12 }}>
              Xigua Video
              <div style={{ fontSize: 12, color: '#4E5969' }}>Founded in 2017</div>
            </div>
          </Row>
        </TimelineItem>
        <TimelineItem label="2018-07">
          <Row style={{ display: 'inline-flex', alignItems: 'center' }}>
            <img
              width="40"
              style={imageStyle}
              src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/73a34d47f2885cf5182d755aa0c8a7d4.png~tplv-uwbnlip3yd-png.png"
            />
            <div style={{ marginBottom: 12 }}>
              Pipidance
              <div
                style={{
                  fontSize: 12,
                  color: '#4E5969',
                }}
              >
                Founded in 2018
              </div>
            </div>
          </Row>
        </TimelineItem>
      </Timeline>
    </div>
  );
}

export default App;
```
