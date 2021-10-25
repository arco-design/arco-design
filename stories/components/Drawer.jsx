import React, { Component } from 'react';
import { Drawer, Button } from '@self';

class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  open = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <>
        <Button onClick={this.open} type="primary">
          Open
        </Button>
        <Drawer
          title={<span>Basic Information </span>}
          visible={visible}
          onOk={() => {
            this.setState({ visible: false });
          }}
          onCancel={() => {
            this.setState({ visible: false });
            console.log('cancel');
          }}
        >
          <div>Here is an example text.</div>

          <div>Here is an example text.</div>
        </Drawer>
      </>
    );
  }
}

export default Demo;
