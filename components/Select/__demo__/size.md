---
order: 7
title:
  zh-CN: 不同尺寸
  en-US: Size
---

## zh-CN

通过 `size` 选择 Select 的尺寸（`mini`, `small`, `default`, `large`），高度分别对应`24px`、`28px`、`32px`、`36px`。

## en-US

Use `size` to select the size of Select (`mini`, `small`, `default`, `large`), the height corresponds to `24px`, `28px`, `32px`, `36px`.

```js
import React from 'react';
import { Select, Radio } from '@arco-design/web-react';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Wuhan'];

class App extends React.Component {
  state = {
    value: 'default',
  };

  render() {
    return (
      <div>
        <RadioGroup
          type="button"
          name="size"
          value={this.state.value}
          onChange={(value) => {
            this.setState({
              value,
            });
          }}
          style={{ marginBottom: 20, borderRadius: 4 }}
        >
          <Radio value="mini">mini</Radio>
          <Radio value="small">small</Radio>
          <Radio value="default">default</Radio>
          <Radio value="large">large</Radio>
        </RadioGroup>
        <div>
          <Select
            size={this.state.value}
            placeholder="Please select"
            showSearch
            style={{ width: 345, marginBottom: 20 }}
          >
            {options.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
          <br />
          <Select
            mode={'multiple'}
            size={this.state.value}
            placeholder="Please select"
            showSearch
            style={{ width: 345 }}
          >
            {options.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    );
  }
}

export default App;
```
