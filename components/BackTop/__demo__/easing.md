---
order: 2
title:
  zh-CN: 滚动类型和滚动时间
  en-US: Easing
browser: true
---

## zh-CN

当然，我们提供了更丰富的功能可供使用，你可以通过指定 `easing` 和 `duration` 来指定滚动到顶部的过度效果和滚动时间。

## en-US

Of course, we provide richer functions for use. You can specify the transition effect and scroll time of scrolling to the top by specifying `easing` and `duration`.

```js
import { useState } from 'react';
import { BackTop, Button, Select, Input, Typography, Space } from '@arco-design/web-react';
import { IconCaretUp } from '@arco-design/web-react/icon';
const { Paragraph, Text } = Typography;
const easingTypes = [
  'linear',
  'quadIn',
  'quadOut',
  'quadInOut',
  'cubicIn',
  'cubicOut',
  'cubicInOut',
  'quartIn',
  'quartOut',
  'quartInOut',
  'quintIn',
  'quintOut',
  'quintInOut',
  'sineIn',
  'sineOut',
  'sineInOut',
  'bounceIn',
  'bounceOut',
  'bounceInOut',
];

function App() {
  const [easing, setEasing] = useState('linear');
  const [duration, setDuration] = useState(200);
  return (
    <div>
      <Space size={10} style={{ margin: 12 }}>
        <Text>
          Easing
        </Text>
        <Select
          onChange={setEasing}
          defaultValue={easing}
          style={{ width: 200 }}
        >
          {easingTypes.map((easing) => (
            <Select.Option key={easing} value={easing}>
              {easing}
            </Select.Option>
          ))}
        </Select>
        <Text>
          Time
        </Text>
        <Input
          onChange={setDuration}
          style={{ width: 200 }}
          value={duration}
          placeholder="Please enter the easing time"
        />
      </Space>
      <div
        style={{ position: 'relative' }}
      >
        <BackTop
          easing={easing}
          duration={duration}
          style={{
            position: 'absolute',
            right: 60,
            bottom: 60,
          }}
          visibleHeight={30}
          target={() => document.getElementById('custom_backtop2')}
        >
          <div className="custom-backtop" tabIndex={0} role="button" aria-label="scroll to top">
            <IconCaretUp />
            <br />
            TOP
          </div>
        </BackTop>
        <div
          id="custom_backtop2"
          style={{
            height: 300,
            overflow: 'auto',
            padding: '8px 12px',
          }}
        >
          <Paragraph>This is the content</Paragraph>
          <Paragraph>This is the content</Paragraph>
          <Paragraph>This is the content</Paragraph>
          <Paragraph>This is the content</Paragraph>
          <Paragraph>This is the content</Paragraph>
          <Paragraph>This is the content</Paragraph>
          <Paragraph>This is the content</Paragraph>
          <Paragraph>This is the content</Paragraph>
          <Paragraph>This is the content</Paragraph>
          <Paragraph>This is the content</Paragraph>
          <Paragraph>This is the content</Paragraph>
          <Paragraph>This is the content</Paragraph>
          <Paragraph>This is the content</Paragraph>
          <Paragraph>This is the content</Paragraph>
          <Paragraph>This is the content</Paragraph>
          <Paragraph>This is the content</Paragraph>
          <Paragraph>This is the content</Paragraph>
          <Paragraph>This is the content</Paragraph>
        </div>
      </div>
    </div>
  );
}

export default App;
```

```css
.custom-backtop {
  position: absolute;
  width: 40px;
  height: 40px;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  text-align: center;
  font-weight: 800;
  font-size: 12px;
  color: #86909c;
  transition: all 0.1s ease;
}

.custom-backtop:hover {
  background: var(--color-fill-3);
}

.custom-backtop:focus-visible {
  box-shadow: 0 0 0 2px var(--color-primary-light-3);
}
```
