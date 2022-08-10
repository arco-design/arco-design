---
order: 7
title:
  zh-CN: 剩余进度条
  en-US: trail color
---

## zh-CN

可以通过 `trailColor` 设置剩余进度条的颜色

## en-US

You can use 'trailColor' to set the color of the remaining progress bar.

```js
import { Progress } from '@arco-design/web-react';

function Demo() {
  return (
    <div>
      <div style={{ width: '40%', marginBottom: 20 }}>
        <Progress percent={30} trailColor="var(--color-primary-light-1)" />
      </div>
      <div style={{ width: '40%', marginBottom: 20 }}>
        <Progress steps={4} percent={30} trailColor="var(--color-primary-light-1)" />
      </div>
      <Progress percent={30} type="circle" trailColor="var(--color-primary-light-1)" />
    </div>
  );
}

const App = () => {
  return <Demo />;
};

export default App;
```
