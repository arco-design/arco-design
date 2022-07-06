---
order: 2
title:
  zh-CN: 带图标的单选框
  en-US: Radio with icon
---

## zh-CN

单选框可以与图标进行组合。

## en-US

You can display icons in children.

```js
import { Radio } from '@arco-design/web-react';
import { IconXiguaColor, IconLarkColor, IconTiktokColor } from '@arco-design/web-react/icon';
const RadioGroup = Radio.Group;
const imgStyle = {
  width: 30,
  height: 30,
  verticalAlign: 'middle',
};

const App = () => {
  return (
    <div>
      <RadioGroup>
        <Radio value="BCY">
          <img
            src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c621ef94232e4b91917c7d2e5d9eae00~tplv-uwbnlip3yd-image.image"
            style={imgStyle}
          />
          BCY
        </Radio>
        <Radio value="pipidance">
          <img
            src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cb76fb049c3c44128b26f02902a0373b~tplv-uwbnlip3yd-image.image"
            style={imgStyle}
          />
          Pipidance
        </Radio>
        <Radio disabled value="xigua">
          <img
            src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/74fb860e37aa4840a8eb235e6df6e6e0~tplv-uwbnlip3yd-image.image"
            style={imgStyle}
          />
          Xigua Video
        </Radio>
      </RadioGroup>
    </div>
  );
};

export default App;
```
