---
order: 1
title:
  zh-CN: 挂载节点
  en-US: container
---

## zh-CN

通过 `getContainer` 设置挂载节点

## en-US

set target node by `getContainer` property

```js
import { Watermark, Grid } from '@arco-design/web-react';

const App = () => {
  const [current, setCurrent] = React.useState('#demo-watermark-1');

  return (
    <Grid.Row justify="space-between">
      <div
        id="demo-watermark-1"
        style={{ width: 400, height: 300, lineHeight: '300px', textAlign: 'center', background: 'var(--color-primary-light-1)' }}
        onClick={() => {
          setCurrent('#demo-watermark-1');
        }}
      >
        Click to mount the watermark here
      </div>
      <div
        id="demo-watermark-2"
        style={{ width: 400, height: 300, lineHeight: '300px', textAlign: 'center',background: 'var(--color-warning-light-1)' }}
        onClick={() => {
          setCurrent('#demo-watermark-2');
        }}
      >
        Click to mount the watermark here
      </div>

      <Watermark getContainer={() => document.querySelector(current)} content="Arco Design"></Watermark>
    </Grid.Row>
  );
};

export default App;

```
