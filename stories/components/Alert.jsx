import React, { Component } from 'react';
import { Alert } from '@self';
import { IconBug } from '@self/icon';

class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Alert
          showIcon
          type="info"
          title="Info"
          content="ContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContent"
          style={{ marginTop: 10 }}
        />
        <Alert
          showIcon
          type="success"
          title="Success"
          content="ContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContent~"
          style={{ marginTop: 10 }}
        />
        <Alert
          showIcon
          type="warning"
          title="Warning"
          content="Content~"
          style={{ marginTop: 10 }}
        />
        <Alert showIcon type="error" title="Error" content="Content~" style={{ marginTop: 10 }} />
        <Alert
          icon={<IconBug style={{ color: 'green' }} />}
          type="normal"
          title="Normal"
          content="Content~"
          style={{ marginTop: 10 }}
        />
        <Alert
          type="success"
          title="没有图标"
          content="ContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContent~"
          style={{ marginTop: 10 }}
        />
      </>
    );
  }
}

export default Demo;
