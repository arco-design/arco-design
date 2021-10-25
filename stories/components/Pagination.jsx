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
        <ConfigProvider
          componentConfig={{
            Pagination: {
              size: 'mini',
              showTotal: true,
              icons: { prev: <IconCaretLeft />, next: <IconCaretRight /> },
            },
          }}
        >
          <div style={{ marginBottom: '15px' }}>
            <Pagination
              current={this.state.current}
              onChange={this.handeChange}
              total={200}
              small
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <Pagination
              showJumper
              total={600}
              sizeCanChange
              pageSizeChangeResetCurrent={false}
              onChange={(pageNumber, pageSize) => {
                console.log('onChange', pageNumber, pageSize);
              }}
              onPageSizeChange={(size, current) => {
                console.log('onPageSizeChange', size, current);
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <Pagination
              total={0}
              onPageSizeChange={this.changePageSize}
              showTotal
              sizeCanChange
              pageSize={this.state.pageSize}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <Pagination simple total={0} />
          </div>
        </ConfigProvider>
      </div>
    );
  }
}

export default Demo;
