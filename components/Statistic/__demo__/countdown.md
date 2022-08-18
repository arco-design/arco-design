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
import React from 'react';
import { Statistic, Message, Button, Space } from '@arco-design/web-react';

const Countdown = Statistic.Countdown;
const now = Date.now();

function App() {
  const [start, setStart] = React.useState(false);

  const _now = Date.now();

  return (
    <Space direction="vertical" size={40}>
      <Space size={60}>
        <Countdown title="Countdown" value={now + 1000 * 60 * 60 * 2} now={now} />
        <Countdown
          value={now + 1000 * 60 * 60 * 2}
          now={now}
          renderFormat={(_diff, _value) => {
            const minutes = Math.floor(_diff / (1000 * 60));
            const seconds = Math.floor(_diff / 1000);
            let diffTimes = '';
            if (minutes) {
              diffTimes = `${minutes}min 后`;
            } else {
              diffTimes = `${seconds}s 后`;
            }
            return <Statistic title="Countdown renderFormat" value={_value} suffix={diffTimes} />;
          }}
        />
        <Countdown
          title="Milliseconds"
          value={now + 1000 * 60 * 60 * 2}
          format="HH:mm:ss.SSS"
          now={now}
        />
      </Space>
      <Space align="start" size={40}>
        <Countdown
          title="Days"
          value={now + 1000 * 60 * 60 * 24 * 4}
          format="D 天 H 时 m 分 s 秒"
          now={now}
        />
        <div>
          <Countdown
            title="Trigger on finish"
            value={_now + 1000 * 5}
            format="HH:mm:ss.SSS"
            start={start}
            now={_now}
            onFinish={() => {
              Message.info({
                content: 'Finish!',
              });
              setStart(false);
            }}
          />
          <Button
            onClick={() => {
              setStart(true);
            }}
            style={{ display: 'block', marginTop: 10 }}
            type="primary"
          >
            Start
          </Button>
        </div>
      </Space>
    </Space>
  );
}

export default App;
```
