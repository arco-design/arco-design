---
order: 2
title: 
  zh-CN: 底色透明
  en-US: Background
---

## zh-CN

默认是没有底色的，如果有需要可以通过`style`或类名设置不同底色。

## en-US

The default is no background color, if necessary, you can set a different background color through `style` or class name.

```js
import { PageHeader, Radio, Message } from '@arco-design/web-react';
const ghostBgStyle = {
  backgroundImage: 'radial-gradient(var(--color-fill-3) 1px, rgba(0, 0, 0, 0) 1px)',
  backgroundSize: '16px 16px',
  padding: 20,
};

const App = () => {
  return (
    <div style={ghostBgStyle}>
      <PageHeader
        title="ArcoDesign"
        subTitle="This is a description"
        backIcon
        onBack={() => Message.info('点击了返回按钮')}
        extra={
          <div>
            <Radio.Group mode="fill" type="button" defaultValue="small">
              <Radio value="large">Large</Radio>
              <Radio value="medium">Medium</Radio>
              <Radio value="small">Small</Radio>
            </Radio.Group>
          </div>
        }
      />
    </div>
  );
};

export default App;
```
