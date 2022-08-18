---
order: 0
title: 
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

基本用法

## en-US

Basic usage

```js
import React from 'react';
import { Switch, Timeline, Typography } from '@arco-design/web-react';

const TimelineItem = Timeline.Item;

class App extends React.Component {
  state = {
    reverse: false,
  };

  render() {
    const { reverse } = this.state;
    return (
      <div>
        <div
          style={{ marginBottom: 40, }}
        >
          <Typography.Text style={{ verticalAlign: 'middle', marginRight: 8, }} >
            Reverse
          </Typography.Text>
          <Switch
            style={{ verticalAlign: 'middle', }}
            size="small"
            checked={reverse}
            onChange={() => {
              this.setState({
                reverse: !this.state.reverse,
              });
            }}
          />
        </div>
        <Timeline reverse={this.state.reverse}>
          <TimelineItem label="2017-03-10">The first milestone</TimelineItem>
          <TimelineItem label="2018-05-12">The second milestone</TimelineItem>
          <TimelineItem label="2020-09-30">The third milestone</TimelineItem>
        </Timeline>
      </div>
    );
  }
}

export default App;
```
