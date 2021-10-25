---
order: 4
title:
  zh-CN: 自动调整字体大小
  en-US: Auto fix font Size
---

## zh-CN

如果头像是文字的话，会自动调节字体大小，来适应头像框。

## en-US

If the avatar content is text, the font size will be automatically adjusted to fit the content in the avatar.

```js
import { useState } from 'react';
import { Avatar, Button } from '@arco-design/web-react';

function Demo() {
  const [index, setIndex] = useState(0);
  const list = ['B', 'Arco', 'Design', 'Tom', 'AD'];
  return <div>
    <Avatar style={{ marginRight: 24, verticalAlign: 'middle', backgroundColor: '#14a9f8' }}>{list[index]}</Avatar>
    <Button
      type="secondary"
      onClick={() => setIndex(index >= 4 ? 0 : index + 1)}
      style={{ verticalAlign: 'middle' }}
    >
      Change
    </Button>
  </div>;
}

ReactDOM.render(
  <Demo />,
  CONTAINER
);
```
