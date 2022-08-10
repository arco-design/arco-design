---
order: 12
title:
  zh-CN: 尺寸
  en-US: Size
---

## zh-CN

设置 `size` 可以使用四种尺寸（`mini` `small` `default` `large`）的输入框。高度分别对应 24px、32px、36px、40px。

## en-US

Setting `size` can use four sizes (`mini` `small` `default` `large`). The height corresponds to 24px, 32px, 36px, 40px.

```js
import React from 'react';
import { Radio, DatePicker } from '@arco-design/web-react';

const RadioGroup = Radio.Group;

class App extends React.Component {
  state = {
    size: 'default',
  };
  handleChange = (size) => {
    this.setState({
      size,
    });
  };

  render() {
    const { size } = this.state;
    return (
      <div>
        <RadioGroup
          type="button"
          mode="fill"
          name="size"
          value={this.state.size}
          onChange={this.handleChange}
          style={{ marginBottom: 20 }}
        >
          {['mini', 'small', 'default', 'large'].map((x) => {
            return (
              <Radio key={x} value={x}>
                {x}
              </Radio>
            );
          })}
        </RadioGroup>
        <br />
        <DatePicker
          size={size}
          style={{ width: 254 }}
        />
      </div>
    );
  }
}

export default App;
```
