import React, { Component } from 'react';
import { Popover, Button, Select } from '@self';

class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Popover
        trigger="click"
        defaultPopupVisible
        position="right"
        title="Title"
        content={
          <div style={{ display: 'flex' }}>
            123123112312311231231
            <Select options={['1', '2', '3']} defaultPopupVisible></Select>
            <Popover
              trigger="click"
              defaultPopupVisible
              position="right"
              title="Title"
              content={
                <div style={{ display: 'flex' }}>
                  123123112312311231231
                  <Select options={['1', '2', '3']} defaultPopupVisible></Select>
                </div>
              }
            >
              <Button style={{ marginRight: 20 }}>Hover</Button>
            </Popover>
          </div>
        }
      >
        <Button style={{ marginRight: 20 }}>Hover</Button>
      </Popover>
    );
  }
}

export default Demo;
