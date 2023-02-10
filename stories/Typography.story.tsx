import React, { useState } from 'react';
import { Typography, Table } from '@self';

const mockText =
  ' A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process.';
const mockShort = ' A design is a plan for an activity or process.';

const DemoCssEllipsis = () => {
  return (
    <div className="App">
      <h1>Typography cssEllipsis</h1>
      <h2>问题：若初始化未触发超出省略则始终不能触发，无法自适应</h2>
      <h2>复现方法：拖动窗口大小</h2>
      <div
        style={{
          margin: '20px',
          padding: '20px',
          textAlign: 'left',
          width: '60%',
          border: '1px solid #000',
        }}
      >
        <h3>初始化触发溢出</h3>
        <Typography.Text ellipsis={{ cssEllipsis: true, showTooltip: true }}>
          {mockText}
        </Typography.Text>
        <h3>初始化未触发溢出</h3>
        <Typography.Text ellipsis={{ cssEllipsis: true }}>{mockShort}</Typography.Text>
      </div>
    </div>
  );
};

const DemoFlexEllipsis = () => {
  const labelStyle: any = {
    whiteSpace: 'nowrap',
  };

  const boxWrapStyle: any = {
    padding: 3,
  };
  const boxStyle: any = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 11,
    height: 11,
    flexShrink: 0,
    background: '#39c',
  };
  const itemStyle: any = {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    margin: '0 8px 0 0',
    padding: '0 6px 0 3px',
    maxWidth: '250px',
    flexShrink: 0,
  };
  const listStyle: any = {
    position: 'relative',
    flex: 1,
    paddingBottom: 0,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    overflow: 'auto',
    boxSizing: 'border-box',
  };

  const list = new Array(5).fill(mockText);

  const legendStyle: any = {
    position: 'relative',
    overflow: 'auto',
  };
  return (
    <div style={legendStyle}>
      <div style={{ display: 'flex', padding: '0 10px' }}>
        <div style={listStyle}>
          {list.map((item, index) => (
            <div style={itemStyle} key={index}>
              <div style={boxWrapStyle}>
                <div style={boxStyle}></div>
              </div>
              <div style={labelStyle}>
                <Typography.Text
                  ellipsis={{ showTooltip: true, rows: 1 }}
                  style={{ marginBottom: 0 }}
                >
                  {item}
                </Typography.Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 300,
    render() {
      return (
        <Typography.Paragraph ellipsis={{ rows: 2, expandable: true }}>
          {mockText}
        </Typography.Paragraph>
      );
    },
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    width: 300,
    render() {
      return (
        <Typography.Paragraph ellipsis={{ rows: 2, cssEllipsis: false, expandable: true }}>
          {mockText}
        </Typography.Paragraph>
      );
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: 300,
    render() {
      return (
        <Typography.Paragraph ellipsis={{ rows: 2, cssEllipsis: true }}>
          {mockText}
        </Typography.Paragraph>
      );
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: 400,
    render() {
      return (
        <Typography.Paragraph ellipsis={{ rows: 2, showTooltip: true }}>
          {mockText}
        </Typography.Paragraph>
      );
    },
  },
];

function DemoTableEllipsis() {
  return (
    <Table
      columns={columns}
      // tableLayoutFixed
      pagination={false}
      data={new Array(10).fill('').map((_, index) => ({
        key: index,
        name: 'Jane Doe',
        salary: 23000,
        address: '32 Park Road, London',
        email: 'jane.doe@example.com',
      }))}
    />
  );
}

export const CssEllipsis = () => <DemoCssEllipsis />;

export const FlexEllipsis = () => <DemoFlexEllipsis />;

export const TableEllipsis = () => <DemoTableEllipsis />;

export default {
  title: 'Typography',
};
