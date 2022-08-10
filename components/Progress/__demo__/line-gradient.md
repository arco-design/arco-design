---
order: 5
title:
  zh-CN: 渐变色进度条
  en-US: linear gradient
---

## zh-CN

`color`传入对象时， 会作为 linear-gradient 的属性值设置渐变色。

## en-US

linear-gradient progress bar.




```js
import { Progress } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <Progress
        percent={80}
        color={{
          '0%': 'rgb(var(--primary-6))',
          '100%': 'rgb(var(--success-6))',
        }}
        animation
        width={300}
      />
      <br />
      <Progress
        percent={100}
        color={{
          '0%': 'rgb(var(--primary-6))',
          '100%': 'rgb(var(--success-6))',
        }}
        animation
        width={300}
      />
      <br />
      <br />
      <Progress
        style={{
          margin: "0 20px",
        }}
        type="circle"
        color={{
          '0%': 'rgb(var(--primary-6))',
          '100%': 'rgb(var(--success-6))',
        }}
        percent={80}
      />
      <Progress
        type="circle"
        color={{
          '0%': 'rgb(var(--primary-6))',
          '100%': 'rgb(var(--success-6))',
        }}
        percent={100}
      />
    </div>
  );
};

export default App;
```
