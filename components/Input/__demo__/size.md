---
order: 2
title:
  zh-CN: 四种尺寸
  en-US: Size
---

## zh-CN

输入框定义了四种默认尺寸（`mini`,`small`, `default`, `large`），分别为 24px，28px，32px，36px。

## en-US

Input defines four sizes (`mini`, `small`, `default`, `large`), which are 24px, 28px, 32px, and 36px.

```js
import React from 'react';
import { Input, Radio, Select, Slider, Typography } from '@arco-design/web-react';
import { IconClockCircle, IconSearch, IconInfoCircle } from '@arco-design/web-react/icon';

const RadioGroup = Radio.Group;
const InputSearch = Input.Search;

class App extends React.Component {
  state = {
    size: 'default',
    height: 0,
  };
  handleHeightChange = (height) => {
    this.setState({
      height,
    });
  };
  handleChange = (size) => {
    this.setState({
      height: undefined,
      size,
    });
  };

  render() {
    const { size, height } = this.state;
    const props = {
      size,
    };

    if (height) {
      props.height = height;
    }

    return (
      <div>
        <RadioGroup
          type="button"
          mode="fill"
          name="size"
          value={this.state.size}
          onChange={this.handleChange}
          style={{ marginBottom: 24 }}
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
        <Typography.Text>Custom height</Typography.Text>
        <Slider
          value={this.state.height}
          onChange={this.handleHeightChange}
          max={60}
          min={24}
          style={{ width: 180, margin: '0 0 20px 20px' }}
        />
        <div>
          <Input
            {...props}
            style={{ width: 350, margin: 12 }}
            prefix={<IconClockCircle />}
            placeholder="Please enter something"
          />
          <Input
            {...props}
             style={{ width: 350, margin: 12 }}
            suffix={<IconInfoCircle />}
            placeholder="Please enter something"
          />
        </div>
        <div>
          <Input
            {...props}
            style={{ width: 350, margin: 12 }}
            addAfter="KG"
            placeholder="Please enter something"
          />
          <Input
            {...props}
            style={{ width: 350, margin: 12 }}
            addBefore="+86"
            placeholder="Please enter something"
          />
        </div>
        <div>
          <Input
            {...props}
            style={{ width: 350, margin: 12 }}
            addBefore="+86"
            addAfter={<IconSearch />}
            prefix={<IconClockCircle />}
            suffix={<IconInfoCircle />}
            allowClear
            placeholder="Please enter something"
          />
          <InputSearch
            {...props}
            placeholder="Please enter something"
            style={{ width: 350, margin: 12 }}
            searchButton={true}
          />
        </div>
        <div>
          <Input
            {...props}
            style={{ width: 350, margin: 12 }}
            addBefore={
              <Select size={size} placeholder="Please select" style={{ width: 100 }}>
                <Select.Option value="http://">http://</Select.Option>
                <Select.Option value="https://">https://</Select.Option>
              </Select>
            }
            allowClear={true}
            placeholder="Please enter something"
          />
          <Input
            {...props}
            style={{ width: 350, margin: 12 }}
            allowClear={true}
            placeholder="Please enter something"
          />
        </div>
      </div>
    );
  }
}

export default App;
```
