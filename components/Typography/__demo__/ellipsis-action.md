---
order: 6
title:
  zh-CN: 文本省略 - 操控按钮（推荐）
  en-US: Text Ellipsis - Action Button(Recommended)
---

## zh-CN

通过 `expandRender` 自定义操控按钮。

## en-US

Customize action buttons through `expandRender`.

```js
import { useState } from 'react';
import { Typography } from '@arco-design/web-react';
import { IconDoubleUp, IconDoubleDown } from '@arco-design/web-react/icon';

const text = 'A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design. A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.';

function App() {
  const [expanded, setExpanded] = useState(true);

  const expandRender = (expanded) => {
    if (!expanded) {
      return <IconDoubleDown className="action-btn"/>;
    }
    return <IconDoubleUp className="action-btn"/>
  }

  return (
    <div>
      <Typography.Ellipsis
        rows={4}
        expanded={expanded}
        expandRender={expandRender}
        onExpand={setExpanded}
      >{text}</Typography.Ellipsis>
    </div>
  );
}

export default App;
```

```css
.action-btn {
    margin: 0 8px;
    color: rgb(var(--primary-6));
    cursor: pointer;
}

.action-btn:hover {
    color: rgb(var(--primary-5));
}
```