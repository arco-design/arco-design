import React, { Component } from 'react';
import { Pagination, ConfigProvider } from '@self';
import { IconCaretRight, IconCaretLeft } from '@self/icon';

class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 1,
      pageSize: 10,
    };
  }

  handeChange = (PageNum) => {
    this.setState({
      current: PageNum,
    });
  };

  changePageSize = (size) => {
    this.setState({
      pageSize: size,
    });
  };

  render() {
    return (
      <div
        style={{
          padding: 10,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h2>70</h2>
        <Pagination sizeCanChange total={70} bufferSize={1} defaultCurrent={5} />
        <Pagination sizeCanChange total={70} bufferSize={2} defaultCurrent={5} />
        <h2>80</h2>
        <Pagination sizeCanChange total={80} bufferSize={1} defaultCurrent={5} />
        <Pagination sizeCanChange total={80} bufferSize={2} defaultCurrent={5} />
        <h2>90</h2>
        <Pagination sizeCanChange total={90} bufferSize={1} defaultCurrent={5} />
        <Pagination sizeCanChange total={90} bufferSize={2} defaultCurrent={5} />
        <h2>100</h2>
        <Pagination sizeCanChange total={100} bufferSize={1} defaultCurrent={5} />
        <Pagination sizeCanChange total={100} bufferSize={2} defaultCurrent={5} />
        <br />
      </div>
    );
  }
}

export default Demo;
