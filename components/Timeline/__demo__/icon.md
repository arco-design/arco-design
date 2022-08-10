---
order: 1
title: 
  zh-CN: 自定义节点内容
  en-US: Icon
---

## zh-CN

自定义节点内容

## en-US

Custom node content

```js
import { Switch, Timeline, Grid } from '@arco-design/web-react';
import { IconExclamationCircleFill } from '@arco-design/web-react/icon';
const TimelineItem = Timeline.Item;

const App = () => {
  return (
    <div>
      <Timeline>
        <TimelineItem label="2017-03-10" dotColor="#00B42A">
          The first milestone
        </TimelineItem>
        <TimelineItem label="2018-05-22">The second milestone</TimelineItem>
        <TimelineItem label="2020-06-22" dotColor="#F53F3F">
          The third milestone
          <IconExclamationCircleFill
            style={{
              color: 'F53F3F',
              fontSize: 12,
              marginLeft: 4,
            }}
          />
        </TimelineItem>
        <TimelineItem label="2020-09-30" dotColor="#C9CDD4">
          The fourth milestone
        </TimelineItem>
      </Timeline>
    </div>
  );
};

export default App;
```
