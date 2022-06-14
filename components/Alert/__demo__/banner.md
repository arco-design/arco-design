---
order: 6
title:
  zh-CN: 顶部公告
  en-US: Top Banner
browser: true
---

## zh-CN

设置 `banner = true`，可以当作顶部公告使用。

## en-US

Use `banner = true` to display Alert as a banner on top of the page.

```js
import { Alert } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <Alert
        banner
        type="info"
        showIcon
        content="General text"
        style={{ marginTop: 4, marginBottom: 20 }}
      />
      <Alert
        banner
        type="info"
        showIcon
        closable
        content="General text"
        style={{ marginBottom: 20 }}
      />
      <Alert
        banner
        type="info"
        showIcon
        title="General text"
        content="Here is an example text"
        style={{ marginBottom: 20 }}
      />
      <Alert
        banner
        type="success"
        showIcon
        title="Success text"
        style={{ marginBottom: 20 }}
      />
    </div>
  );
};

export default App;
```
