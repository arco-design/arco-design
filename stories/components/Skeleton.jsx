import React, { Component } from 'react';
import { Skeleton, Switch, Avatar } from '@self';

class DemoSkeleton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  onChange = (value) => {
    this.setState({
      loading: !this.state.loading,
    });
  };

  render() {
    return (
      <div>
        <Switch onChange={this.onChange} checked />
        <br />
        <Skeleton
          loading={this.state.loading}
          text={{ width: ['90%', '120%', 800, 100], rows: 4, className: 'text' }}
          image={{ shape: '', className: 'image' }}
          className="ceshi"
        >
          <div style={{ display: 'flex' }}>
            <Avatar size={40} style={{ marginRight: 20 }}>
              Byte
            </Avatar>
            <div>
              <p>这是第一行数据这是第一行数据这是第一行数据</p>
              <p>这是第二行数据这是第二行数据</p>
              <p>这是第三行数据</p>
            </div>
          </div>
        </Skeleton>
      </div>
    );
  }
}

export default DemoSkeleton;
