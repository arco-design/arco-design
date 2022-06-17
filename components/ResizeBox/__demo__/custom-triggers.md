---
order: 1
title: 
  zh-CN: 定制伸缩杆内容
  en-US: Customize Trigger
---

## zh-CN

可通过属性 `resizeTriggers` 定制各个方向的伸缩杆的内容。

## en-US

The content of trigger in all directions can be customized through the property `resizeTriggers`.

```js
import { ResizeBox, Divider, Typography } from '@arco-design/web-react';
const { Paragraph } = Typography;

const TriggerContent = function ({ className }) {
  return (
    <div className={`resizebox-demo-custom-trigger ${className}`}>
      <div className="resizebox-demo-custom-trigger-line" />
    </div>
  );
};

const App = () => {
  return (
    <div>
      <ResizeBox
        directions={['right', 'bottom']}
        style={{
          width: 500,
          minWidth: 100,
          maxWidth: '100%',
          height: 200,
          textAlign: 'center',
        }}
        resizeTriggers={{
          right: <TriggerContent className="resizebox-demo-custom-trigger-vertical" />,
          bottom: <TriggerContent className="resizebox-demo-custom-trigger-horizontal" />,
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
};

export default App;
```

```css
.resizebox-demo-custom-trigger {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-bg-2);
}

.resizebox-demo-custom-trigger::before,
.resizebox-demo-custom-trigger::after {
  content: '';
  width: 6px;
  height: 6px;
  border: 1px solid rgb(var(--arcoblue-6));
}

.resizebox-demo-custom-trigger-line {
  background-color: rgb(var(--arcoblue-6));
  flex: 1;
}

.resizebox-demo-custom-trigger-vertical {
  flex-direction: column;
}

.resizebox-demo-custom-trigger-vertical .resizebox-demo-custom-trigger-line {
  width: 1px;
  height: 100%;
}

.resizebox-demo-custom-trigger-horizontal .resizebox-demo-custom-trigger-line {
  width: 100%;
  height: 1px;
}
```
