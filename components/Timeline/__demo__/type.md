---
order: 2
title: 
  zh-CN: 自定义轴线样式
  en-US: Type
---

## zh-CN

自定义轴线的示例。

## en-US

Example of custom axis.

```js
import { Timeline, Typography } from '@arco-design/web-react';
const TimelineItem = Timeline.Item;

const App = () => {
  return (
    <div>
      <Timeline>
        <TimelineItem label="2017-03-10" lineType="dashed">
          The first milestone
          <br />
          <Typography.Text
            type="secondary"
            style={{
              fontSize: 12,
              marginTop: 4,
            }}
          >
            This is a descriptive message
          </Typography.Text>
        </TimelineItem>
        <TimelineItem label="2018-05-12" lineType="dashed">
          The second milestone
          <br />
          <Typography.Text
            type="secondary"
            style={{
              fontSize: 12,
              marginTop: 4,
            }}
          >
            This is a descriptive message
          </Typography.Text>
        </TimelineItem>
        <TimelineItem label="2020-09-30" lineType="dashed">
          The third milestone
          <br />
          <Typography.Text
            type="secondary"
            style={{
              fontSize: 12,
              marginTop: 4,
            }}
          >
            This is a descriptive message
          </Typography.Text>
        </TimelineItem>
      </Timeline>
    </div>
  );
};

export default App;
```
