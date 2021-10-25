import React, { Component } from 'react';
import { Modal, Button, Alert, Select } from '@self';

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
    const options = 'abcdefghijklmnopqrstuvwxyz'.split('');
    return (
      <>
        <Button onClick={this.open} type="primary">
          打开对话框
        </Button>
        <Modal
          title="基础"
          visible={visible}
          onConfirm={() => {
            this.setState({ visible: false });
          }}
          onCancel={() => {
            this.setState({ visible: false });
          }}
        >
          <Alert type="info" showIcon content="这是一个最简单的Modal应用" />
          <Select>
            {options.map((option, index) => (
              <Select.Option disabled={index === 3} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </Modal>
      </>
    );
  }
}

export default Demo;
