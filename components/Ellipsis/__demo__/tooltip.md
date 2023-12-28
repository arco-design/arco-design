---
order: 2
title:
  zh-CN: 省略提示
  en-US: Ellipsis Tooltip
---

## zh-CN

当文字内容超出容器后会自动显示省略号

## en-US

Set the basic usage of internationalized languages.

```js
import { Ellipsis } from '@arco-design/web-react';

const text = 'A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design. A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.';

function App() {
  return (
    <div>
      <Ellipsis tooltip>{text}</Ellipsis>
    </div>
  );
}

export default App;
```
