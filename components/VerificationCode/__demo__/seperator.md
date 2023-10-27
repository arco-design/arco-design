---
order: 3
title:
  zh-CN: 自定义分隔符
  en-US: Custom separator
---

## zh-CN

指定 `separator` 可以自定义渲染分隔符

## en-US

Specify `separator` to customize the rendering separator

```js
import { VerificationCode } from '@arco-design/web-react';

const App = () => {
  return (
    <VerificationCode style={{width: 400}} length={9}  separator={({ index, character }) => {
    return ((index + 1) % 3 || index > 7 )? null : '-'
  }}     />
  );
};

export default App;
```
