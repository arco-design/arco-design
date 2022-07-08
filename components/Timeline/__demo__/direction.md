---
order: 6
title:
  zh-CN: 横向时间轴
  en-US: Direction
---

## zh-CN

可以通过 `direction` 设置展示横向时间轴

## en-US

You can set the display horizontal timeline through `direction`

```js
import React from 'react';
import { Timeline, Grid, Radio, Typography } from '@arco-design/web-react';

const TimelineItem = Timeline.Item;
const { Row } = Grid;

const imageStyle = {
  margin: '0 12px 12px 12px'
}

function App() {
  const [mode, setMode] = React.useState('top');
  return (
    <div>
      <Row
        align="center"
        style={{ marginBottom: 24, }}
      >
        <Typography.Text>mode: &nbsp; &nbsp;</Typography.Text>
        <Radio.Group
          value={mode}
          onChange={setMode}
          options={[
            {
              label: 'top',
              value: 'top',
            },
            {
              label: 'bottom',
              value: 'bottom',
            },
            {
              label: 'alternate',
              value: 'alternate',
            },
          ]}
        />
      </Row>
      <Timeline direction="horizontal" mode={mode} pending>
        <TimelineItem>
          <Row align="center">
            <img
              width="40"
              style={imageStyle}
              src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b5d834b83708a269b4562924436eac48.png~tplv-uwbnlip3yd-png.png"
            />
            <div style={{ marginBottom: 12, }} >
              Toutiao
              <div style={{ fontSize: 12, color: '#4E5969', }} >
                Founded in 2012
              </div>
            </div>
          </Row>
        </TimelineItem>
        <TimelineItem>
          <Row align="center">
            <img
              width="40"
              style={imageStyle}
              src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/385ed540c359ec8a9b9ce2b5fe89b098.png~tplv-uwbnlip3yd-png.png"
            />
            <div style={{ marginBottom: 12, }} >
              Xigua Video
              <div style={{ fontSize: 12, color: '#4E5969', }} >
                Founded in 2017
              </div>
            </div>
          </Row>
        </TimelineItem>
        <TimelineItem>
          <Row align="center">
            <img
              width="40"
              style={imageStyle}
              src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/73a34d47f2885cf5182d755aa0c8a7d4.png~tplv-uwbnlip3yd-png.png"
            />
            <div style={{ marginBottom: 12, }} >
              Pipidance
              <div style={{ fontSize: 12, color: '#4E5969', }} >
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
