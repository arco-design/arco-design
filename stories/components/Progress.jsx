import React, { Component } from 'react';
import { Progress, InputNumber } from '@self';

class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 800,
    };
  }

  onChange = (value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <div style={{ width: 600 }}>
        <Progress percent={value} />
        <Progress percent={value} status="success" />
        <Progress percent={value} status="error" />
        <br />
        <Progress percent={value} animate />
        <br />
        <Progress textInside percent={value} status="error" animate />
        <br />
        <Progress textInside percent={value} status="success" />
        <br />
        <Progress textInside percent={value} status="warning" />
        <br />
        <Progress textInside percent={value} />
        <br />
        <Progress percent={value} status="error" type="circle" />
        <Progress percent={value} status="warning" type="circle" />
        <Progress percent={value} status="success" type="circle" />
        <Progress percent={value} status="" type="circle" />
        <br />

        <InputNumber min={0} max={100} step={5} value={value} onChange={this.onChange} />
      </div>
    );
  }
}

export default Demo;
