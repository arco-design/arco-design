---
order: 6
title:
  zh-CN: 自定义预览控制条
  en-US: Preview control bar
---

## zh-CN

通过设置 `actionsLayout` 可以调整预览控制条中功能按钮的顺序，同时可以过滤功能按钮，只有在 actionsLayout 中的按钮才会出现。其中 `extra` 代表 `actions` 中的按钮，而且 `actions` 中的 `key` 也支持单独拿出来排序。

## en-US

The function buttons on the control preview control bar can be sorted and filtered through `actionLayout`. Among them, `extra` represents the buttons in `actions`, and the `key` in `actions` also supports separate sorting.

```js
import { Image, Tooltip, Space } from '@arco-design/web-react';
import { IconDownload, IconInfoCircle } from '@arco-design/web-react/icon';

function App() {
  return (
    <Image
      width={200}
      src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
      previewProps={{
        actions: [
          {
            key: 'download',
            content: <IconDownload />,
            name: 'Download',
          },
          {
            key: 'info',
            content: <IconInfoCircle />,
            name: 'Info',
            getContainer: (action) => {
              return <Tooltip content="A user’s avatar">{action}</Tooltip>;
            },
          },
        ],
        actionsLayout: ['info', 'rotateRight', 'zoomIn', 'zoomOut', 'extra'],
      }}
      alt="lamp"
    />
  );
}

export default App;
```
