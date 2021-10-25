import React from 'react';
import { Steps, Radio } from '@self';

const Step = Steps.Step;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 2,
      size: 'default',
      type: 'default',
      direction: 'horizontal',
    };
  }

  render() {
    return (
      <div>
        <div style={{ margin: '20px 0' }}>
          <Radio.Group
            type="button"
            value={this.state.direction}
            onChange={(direction) => {
              this.setState({
                direction,
              });
            }}
          >
            <Radio value="vertical">vertical</Radio>
            <Radio value="horizontal">horizontal</Radio>
          </Radio.Group>
        </div>
        <div style={{ margin: '20px 0' }}>
          <Radio.Group
            type="button"
            value={this.state.size}
            onChange={(size) => {
              this.setState({
                size,
              });
            }}
          >
            <Radio value="small">small</Radio>
            <Radio value="default">default</Radio>
          </Radio.Group>
        </div>
        <div style={{ margin: '20px 0' }}>
          <Radio.Group
            type="button"
            value={this.state.type}
            onChange={(type) => {
              this.setState({
                type,
              });
            }}
          >
            <Radio value="default">default</Radio>
            <Radio value="arrow">arrow</Radio>
            <Radio value="dot">dot</Radio>
            <Radio value="navigation">navigation</Radio>
          </Radio.Group>
        </div>
        <Steps
          size={this.state.size}
          type={this.state.type}
          direction={this.state.direction}
          current={this.state.current}
          onChange={(current, id) => {
            this.setState({
              current,
            });
            console.log(`${current} -- ${id}`);
          }}
        >
          <Step
            id="one"
            title="Step1"
            description="This is description,This is description,This is description,This is description."
          />
          <Step id="two" title="Step2" description="This is description~" />
          <Step id="three" title="Step3" description="This is description~" />
        </Steps>
      </div>
    );
  }
}

export default Demo;
