import React, { Component } from 'react';
import { Slider, Switch } from '@self';
import { IconCheck } from '@self/icon';

class Demo extends Component {
  state = {
    value: 10,
    range: [],
    onlyMarkValue: false,
  };

  onChange = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    const { value, range, onlyMarkValue } = this.state;
    return (
      <div style={{ maxWidth: 800 }}>
        <Slider value={value} onChange={this.onChange} vertical showInput />
        <Slider value={value} onChange={this.onChange} disabled showInput />
        <Slider value={value} onChange={this.onChange} showInput step={3} />
        <div style={{ display: 'flex', width: '100%' }}>
          <IconCheck />
          <Slider step={3} defaultValue={[10, 80]} showInput />
          <IconCheck />
        </div>
        <br />
        只能选择标签值:
        <Switch
          onChange={(val) => {
            this.setState({ onlyMarkValue: val });
          }}
        />
        <Slider
          value={range}
          formatTooltip={(val) => `tip: 值为${val}`}
          onlyMarkValue={onlyMarkValue}
          marks={{
            0: 0,
            5: '',
            10: 10,
            20: 20,
            30: '',
            40: 40,
            50: '',
            60: 60,
            70: '',
            80: 80,
            90: '',
            100: {
              text: <span style={{ color: '#5babf3' }}>100</span>,
              dot: (
                <IconCheck
                  style={{ border: '1px solid #5babf3', borderRadius: '50%', color: '#5babf3' }}
                />
              ),
            },
          }}
          onChange={(va) => {
            this.setState({ range: va });
          }}
          min={0}
          max={100}
          range
          showInput
        />
      </div>
    );
  }
}

export default Demo;
