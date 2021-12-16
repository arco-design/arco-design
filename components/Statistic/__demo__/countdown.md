---
order: 2
title:
  zh-CN: 计时组件
  en-US: Countdown
---

## zh-CN

倒计时组件。可以通过 `now` 来传入 `Date.now()`，用于修复初始值显示的小误差问题。

## en-US

Countdown component. You can use `now` to correct the initialization time.

```js
import { Statistic, Message, Button } from '@arco-design/web-react';

const Countdown = Statistic.Countdown;

const now = Date.now();

function Demo () {
  const [start, setStart] = React.useState(false)

  const _now = Date.now();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Countdown
        title="Countdown"
        style={{ marginRight: 60, marginBottom: 20, minWidth: 80 }}
        value={now + 1000 * 60 * 60 * 2}
        now={now}
      />
      <Countdown
        title="Milliseconds"
        value={now + 1000 * 60 * 60 * 2}
        format="HH:mm:ss.SSS"
        style={{ marginRight: 60, marginBottom: 20, minWidth: 180 }}
        now={now}
      />
      <Countdown
        title="Days"
        value={now + 1000 * 60 * 60 * 24 * 4}
        format="D 天 H 时 m 分 s 秒"
        now={now}
        style={{ marginRight: 60, marginBottom: 20, minWidth: 200}}
      />
      <div style={{ display: 'inline-block', marginBottom: 20 }}>
        <Countdown
          title="Trigger on finish"
          value={_now + 1000 * 5}
          format="HH:mm:ss.SSS"
          start={start}
          now={_now}
          onFinish={() => {
            Message.info({ content: 'Finish!' });
            setStart(false)
          }}
        />
        <Button
          onClick={() => {
            setStart(true)
          }}
          style={{ display: 'block', marginTop: 10 }}
          type="primary"
        >
          Start
        </Button>
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, CONTAINER);
```
