import React from 'react';
import { Typography, Table } from '@self';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
  },

  {
    title: 'typographyEllipsis',
    dataIndex: 'typographyEllipsis',
    width: 150,
    render(x) {
      return (
        <Typography.Paragraph ellipsis={{ showTooltip: true }} style={{ margin: 0 }}>
          {x}
        </Typography.Paragraph>
      );
    },
  },
  {
    title: 'typographyCssEllipsisFalse',
    dataIndex: 'typographyCssEllipsisFalse',
    width: 200,
    render(x) {
      return (
        <Typography.Paragraph
          ellipsis={{ showTooltip: true, cssEllipsis: false }}
          style={{ margin: 0 }}
        >
          {x}
        </Typography.Paragraph>
      );
    },
  },
  {
    title: 'cssEllipsis',
    dataIndex: 'cssEllipsis',
    width: 200,
    render(x) {
      return (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {x}
        </div>
      );
    },
  },
];

const data = [
  {
    key: '1',
    name: 'Jane Doe',
    salary: 23000,
    typographyEllipsis: `ellipsis={{ showTooltip: true, cssEllipsis: true }}`,
    typographyCssEllipsisFalse: `ellipsis={{ showTooltip: true, cssEllipsis: false }}`,
    cssEllipsis: `style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}`,
  },
];

function App() {
  return (
    <>
      <Typography.Paragraph
        style={{ fontSize: 10, width: 90, fontWeight: 500, backgroundColor: 'red' }}
        ellipsis={{ showTooltip: true }}
        editable={true}
      >
        color-border-...
      </Typography.Paragraph>
      <Typography.Paragraph
        style={{ fontSize: 10, width: 90, fontWeight: 500, backgroundColor: 'red' }}
        ellipsis={{ showTooltip: true }}
        copybale={true}
      >
        color-border-...
      </Typography.Paragraph>

      <Typography.Paragraph
        style={{ fontSize: 10, width: 90, fontWeight: 500, backgroundColor: 'red' }}
        ellipsis={{ showTooltip: true }}
      >

      <div style={{ marginTop: '20px' }}>
        <h3>use tableLayoutFixed</h3>
        <Table columns={columns} data={data} style={{ width: 900 }} tableLayoutFixed />

        <h3>not use use tableLayoutFixed</h3>
        <Table columns={columns} data={data} style={{ width: 900 }} />
      </div>
    </>
  );
}

export default App;
