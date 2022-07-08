---
order: 2
title:
  zh-CN: 自定义节点
  en-US: Dot
---

## zh-CN

可以通过属性 `dotColor`, `dotType` 设置节点的颜色以及节点类型。同时可通过 `dot` 直接传入 `ReactNode`自定义节点样式。优先级高于 `dotColor` 和 `dotType`

## en-US

The color and type of the node can be set through the attributes `dotColor`, `dotType`. At the same time, you can directly pass in `ReactNode` to customize node styles through `dot`. Priority is higher than `dotColor` and `dotType`

```js
import { Timeline, Space } from '@arco-design/web-react';
import { IconClockCircle, IconCheck, IconExclamationCircleFill } from '@arco-design/web-react/icon';
const TimelineItem = Timeline.Item;

const App = () => {
  return (
    <Space size={40}>
      <Timeline>
        <TimelineItem label="2020-04-12" dotColor="#00B42A">
          The first milestone
        </TimelineItem>
        <TimelineItem label="2020-05-17">The second milestone</TimelineItem>
        <TimelineItem
          label="2020-06-22"
          dot={<IconClockCircle style={{ fontSize: 12, color: '#F53F3F' }} />}
        >
          The third milestone
        </TimelineItem>
        <TimelineItem label="2020-06-22" dotColor="var(--color-fill-4)">
          The third milestone
        </TimelineItem>
      </Timeline>

      <Timeline
      >
        <TimelineItem
          label="2020-04-12"
          dot={
            <IconCheck
              style={{
                fontSize: 12,
                padding: 2,
                boxSizing: 'border-box',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-light-1)',
              }}
            />
          }
        >
          The first milestone
        </TimelineItem>
        <TimelineItem
          label="2020-05-17"
          dot={
            <IconCheck
              style={{
                fontSize: 12,
                padding: 2,
                boxSizing: 'border-box',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-light-1)',
              }}
            />
          }
        >
          The second milestone
        </TimelineItem>
        <TimelineItem label="2020-06-22">The third milestone</TimelineItem>
        <TimelineItem label="2020-06-22" dotColor="var(--color-fill-4)">
          The third milestone
        </TimelineItem>
      </Timeline>

      <Timeline>
        <TimelineItem label="2020-04-12">The first milestone</TimelineItem>
        <TimelineItem label="2020-05-17" dotColor="var(--color-fill-4)">
          The second milestone
        </TimelineItem>
        <TimelineItem label="2020-06-22" dotColor="var(--color-fill-4)">
          The third milestone
        </TimelineItem>
      </Timeline>
    </Space>
  );
};

export default App;
```
