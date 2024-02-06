---
order: 2
title:
  zh-CN: 尺寸
  en-US: Size
---

## zh-CN

颜色选择器定义了四种尺寸（`mini`,`small`, `default`, `large`），分别为 24px，28px，32px，36px。

## en-US

ColorPicker defines four sizes (`mini`, `small`, `default`, `large`), which are 24px, 28px, 32px, and 36px.


```js
import { ColorPicker, Radio } from '@arco-design/web-react';

const RadioGroup = Radio.Group;

const App = () => {
  return (
    <div>
      <ColorPicker defaultValue={'#165DFF'} size={'mini'} />
      <div style={{ marginTop: 10 }}/>
      <ColorPicker defaultValue={'#165DFF'} size={'small'} />
      <div style={{ marginTop: 10 }}/>
      <ColorPicker defaultValue={'#165DFF'} size={'default'} />
      <div style={{ marginTop: 10 }}/>
      <ColorPicker defaultValue={'#165DFF'} size={'large'} />
    </div>
  );
};

export default App;
```
