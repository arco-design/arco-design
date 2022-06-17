---
order: 4
title:
  zh-CN: 滚动容器
  en-US: Container
---

## zh-CN

用 `target` 设置需要监听其滚动事件的元素，默认为 `window`。

`target` 指定为非 window 容器时，可能会出现 `target` 外层元素滚动，固钉元素跑出滚动容器的问题。这个时候可以通过传入 `targetContainer` 设置 `target` 外层的滚动元素。`Affix` 会监听该元素的滚动事件来实时更新滚钉元素的位置。也可以在业务代码中自己监听 `target` 外层滚动元素的 `scroll` 事件，并调用 `this.affixRef.updatePosition()` 去更新固钉的位置。

## en-US

Use `target` to set the element whose scroll event needs to be listened to. The default value is `window`.

If `target` is specified as a non-window container, the fixed element may escape the container when the outer element scrolls. You can pass in `targetContainer` to set the scrollable element outside `target`. `Affix` will listen to the scroll event of the element and update the position of `Affix` correspondingly. You can also listen to the `scroll` event of the outer scrollable element and call `this.affixRef.updatePosition()` to update the position.

```js
import React from 'react';
import { Affix, Button } from '@arco-design/web-react';

class App extends React.Component {
  container = null;

  render() {
    return (
      <div
        id="container"
        style={{ height: 200, overflow: 'auto' }}
        ref={(node) => { this.container = node }}
      >
        <div
          style={{
            height: 400,
            backgroundColor: 'var(--color-fill-2)',
            backgroundImage: `
            linear-gradient(45deg, var(--color-bg-2) 25%, transparent 0, transparent 75%, var(--color-bg-2) 0),
            linear-gradient(45deg, var(--color-bg-2) 25%, transparent 0, transparent 75%, var(--color-bg-2) 0)`,
            backgroundPosition: `0 0, 15px 15px`,
            backgroundSize: `30px 30px`,
            overflow: 'hidden',
          }}
        >
          <Affix
            ref={(ref) => (this.affixRef = ref)}
            target={() => this.container}
            offsetTop={20}
            style={{ margin: 40 }}
            targetContainer={() => window}
          >
            <Button type="primary">Affix in scrolling container</Button>
          </Affix>
        </div>
      </div>
    );
  }
}

export default App;
```
