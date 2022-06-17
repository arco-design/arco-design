---
order: 7
title:
  zh-CN: 自定义icon
  en-US: Custom icon
---

## zh-CN

通过`Icon`属性自定义图标

## en-US

Custom icon.

```js
import { Result, Button } from '@arco-design/web-react';
import { IconFaceSmileFill } from '@arco-design/web-react/icon';

const App = () => {
  return (
    <div>
      <Result
        status={null}
        icon={<IconFaceSmileFill style={{ color: 'rgb(var(--arcoblue-6))' }} />}
        title="Your operation has been performed."
        extra={<Button type="primary">Back</Button>}
      ></Result>
    </div>
  );
};

export default App;
```
