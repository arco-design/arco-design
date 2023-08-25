---
order: 3
title: 
  zh-CN: 幽灵节点
  en-US: Pending
---

## zh-CN

当任务状态正在发生，还在记录过程中，可用幽灵节点来表示当前的时间节点，通过`pendingDot`定制其轴点。

## en-US

When the task state is happening and the recording is still in progress, ghost nodes can be used to represent the current time node, and its pivot point can be customized through `pendingDot`.

```js
import React from 'react';
import { Timeline, Grid, Checkbox } from '@arco-design/web-react';
import { IconFire } from '@arco-design/web-react/icon';

const TimelineItem = Timeline.Item;
const { Row } = Grid;

function App() {
  const [pendingProps, setPendingProps] = React.useState({});
  return (
    <div>
      <Row
        align="center"
        style={{ marginBottom: 24, }} >
        <Checkbox
          checked={!!pendingProps.direction}
          onChange={(v) => {
            setPendingProps({
              ...pendingProps,
              direction: v ? 'horizontal' : 'vertical',
            });
          }}
        >
          horizontal &nbsp; &nbsp;
        </Checkbox>

        <Checkbox
          checked={!!pendingProps.reverse}
          onChange={(v) => {
            setPendingProps({ ...pendingProps, reverse: v });
          }}
        >
          reverse &nbsp; &nbsp;
        </Checkbox>

        <Checkbox
          checked={!!pendingProps.pending}
          onChange={(v) => {
            setPendingProps({
              ...pendingProps,
              pending: v ? 'This is a pending dot' : false,
            });
          }}
        >
          pending &nbsp; &nbsp;
        </Checkbox>

        <Checkbox
          checked={!!pendingProps.pendingDot}
          onChange={(v) => {
            const newProps = { ...pendingProps };
            delete newProps.pendingDot;

            if (v) {
              newProps.pendingDot = (
                <IconFire
                  style={{
                    color: '#e70a0a',
                  }}
                />
              );
            }

            setPendingProps(newProps);
          }}
        >
          custom pendingDot
        </Checkbox>
      </Row>
      <Timeline pending {...pendingProps}>
        <TimelineItem label="2017-03-10" dotColor="#52C419">
          The first milestone
        </TimelineItem>
        <TimelineItem label="2018-05-12" dotColor="#F5222D">
          The second milestone
        </TimelineItem>
        <TimelineItem label="2020-09-30">The third milestone</TimelineItem>
      </Timeline>
    </div>
  );
}

export default App;
```
