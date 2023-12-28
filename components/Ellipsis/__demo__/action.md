---
order: 1
title:
  zh-CN: 操控按钮
  en-US: Action Button
---

## zh-CN

通过 `hideAction` 隐藏操控按钮，或者 `renderAction` 自定义操控按钮

## en-US

Set the basic usage of internationalized languages.

```js
import { Ellipsis } from '@arco-design/web-react';
import { IconDoubleUp, IconDoubleDown } from '@arco-design/web-react/icon';

const text = 'A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design. A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.';

function App() {
  const actionRender = (expanded) => {
    if (!expanded) {
      return <IconDoubleDown/>;
    }
    return <IconDoubleUp/>
  }

  return (
    <div>
      <Ellipsis actionRender={actionRender}>{text}</Ellipsis>
    </div>
  );
}

export default App;
```
