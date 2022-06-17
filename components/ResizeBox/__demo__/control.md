---
order: 2
title: 
  zh-CN: 受控的高宽
  en-US: Controlled Size
---

## zh-CN

`ResizeBox` 的高宽都支持受控，分别对应属性 `width` 和 `height`，通过 `onChange` 得到拖动中的高宽值。

## en-US

The height and width of the `ResizeBox` can be controlled, corresponding to the attributes `width` and `height`, and the height and width values during dragging can be obtained through `onChange`.

```js
import React from 'react';
import { ResizeBox, Divider, Typography } from '@arco-design/web-react';

const { Paragraph } = Typography;

function App() {
  const [width, setWidth] = React.useState(500);
  const [height, setHeight] = React.useState(200);
  return (
    <div>
      <ResizeBox
        directions={['right', 'bottom']}
        style={{
          minWidth: 100,
          maxWidth: '100%',
          textAlign: 'center',
        }}
        width={width}
        height={height}
        onMoving={(e, { width, height }) => {
          setWidth(width);
          setHeight(height);
        }}
      >
        <Paragraph>We are building the future of content discovery and creation.</Paragraph>
        <Divider />
        <Paragraph>
          ByteDance's content platforms enable people to enjoy content powered by AI technology. We
          inform, entertain, and inspire people across language, culture and geography.
        </Paragraph>
        <Divider>ByteDance</Divider>
        <Paragraph>Yiming Zhang is the founder and CEO of ByteDance.</Paragraph>
      </ResizeBox>
    </div>
  );
}

export default App;
```
