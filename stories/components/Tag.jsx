import React, { Component } from 'react';
import { Tag } from '@self';

class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Tag> hhh </Tag>
        <Tag closable> 未处理 </Tag>
        <Tag color="#00f"> 报警 </Tag>
        <Tag type="danger"> 报警 </Tag>
        <Tag closable type="danger">
          {' '}
          报警{' '}
        </Tag>
      </div>
    );
  }
}

export default Demo;
