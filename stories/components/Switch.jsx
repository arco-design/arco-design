import React, { Component } from 'react';
import { Switch } from '@self';

class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ checked: false });
    }, 2000);
  }

  render() {
    return (
      <div style={{ margin: 20 }}>
        <div>
          <Switch
            onChange={(checked) => {
              console.log(checked);
            }}
            style={{ margin: '0 10px' }}
          />
          <Switch style={{ margin: '0 10px' }} />
          <Switch defaultChecked disabled style={{ margin: '0 10px' }} />
          <Switch size="small" defaultChecked style={{ margin: '0 10px' }} />
        </div>
        <div style={{ marginTop: 20 }}>
          <Switch checked={this.state.checked}>
            <span key="open">开开开开开开开开开</span>
            <span key="close">关</span>
          </Switch>
          <Switch>
            <span key="open">ON</span>
            <span key="close">OFF</span>
          </Switch>
          <Switch size="small">
            <span key="open">ONONONONON</span>
            <span key="close">OFFOFOFOFOFOFOOFOF</span>
          </Switch>
        </div>
      </div>
    );
  }
}

export default Demo;
