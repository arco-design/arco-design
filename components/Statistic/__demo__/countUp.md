---
order: 2
title:
  zh-CN: 数值动效
  en-US: Animation
---

## zh-CN

利用 `Statistic`，你可以作出一些好玩儿的效果，比如，数值缓动变大，让数值的展示更加具有视觉效果。
如果你设置了 `countUp`，那么在组件 mount 之后，会执行动效。
如果你想自己控制动效，也可以通过 `ref` 拿到实例，执行 `ins.countUp()` 即可。

## en-US

With `Statistic`, you can make some interesting effects. For example, the value slowly becomes larger, making the display of the value more visual.
If you set `countUp`, the animation will be executed after the component is mounted.
If you want to control the animation by yourself, you can also get the instance through `ref` and execute `ins.countUp()`.

```js
import React from 'react';
import { Statistic, Grid, Button } from '@arco-design/web-react';
import { IconArrowRise, IconArrowFall } from '@arco-design/web-react/icon';

const Row = Grid.Row;
const Col = Grid.Col;

class App extends React.Component {
  render() {
    return (
      <Row>
        <Col span={4}>
          <Statistic
            ref={(ref) => (this.refGrowth = ref)}
            title="User Growth Rate"
            value={50.32}
            precision={2}
            prefix={<IconArrowRise />}
            suffix="%"
            countUp
            styleValue={{ color: '#0fbf60' }}
          />
          <Button
            onClick={() => {
              this.refGrowth.countUp();
            }}
            style={{ display: 'block', marginTop: 10 }}
            type="primary"
          >
            Start
          </Button>
        </Col>
        <Col span={4}>
          <Statistic
            ref={(ref) => (this.refBugs = ref)}
            title="Population Growth Rate"
            value={2.59}
            precision={2}
            prefix={<IconArrowFall />}
            suffix="%"
            countUp
            styleValue={{ color: '#ee4d38' }}
          />
          <Button
            onClick={() => {
              this.refBugs.countUp();
            }}
            style={{ display: 'block', marginTop: 10 }}
            type="primary"
          >
            Start
          </Button>
        </Col>
      </Row>
    );
  }
}

export default App;
```
