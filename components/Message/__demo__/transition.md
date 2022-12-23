---
order: 9
title:
  zh-CN: 自定义动画效果
  en-US: Custom animation effects
---

## zh-CN

可以通过 `transitionClassNames` 和 `transitionTimeout` 实现自定义过渡效果

动画实现基于 [react-transition-group](https://reactcommunity.org/react-transition-group/css-transition)


## en-US

You can implement custom animations through `transitionClassNames` and `transitionTimeout`

The animation implementation is based on [react-transition-group](https://reactcommunity.org/react-transition-group/css-transition)




```js
import React from 'react';
import { Message, Button, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Button
      onClick={() => {
        Message.info({
          content: 'This is an info message!',
          transitionClassNames: 'my-animation',
          transitionTimeout: {
            enter: 1000,
            exit: 500,
          },
        });
      }}
      type="primary"
    >
      Open Message
    </Button>
  );
};

export default App;
```

```css
.my-animation-enter {
  opacity: 0;
}

.my-animation-enter-active {
  opacity: 1;
  transition: opacity 1s linear;
}

.my-animation-exit {
  opacity: 0;
}

.my-animation-exit-active {
  opacity: 0;
  height: 0;
  transition: all 0.5s linear;
}
```
