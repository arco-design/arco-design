import React from 'react';
import { Typography } from '@self';

function App() {
  return (
    <>
      <Typography.Paragraph
        style={{ fontSize: 10, width: 90, fontWeight: 500, backgroundColor: 'red' }}
        ellipsis={{ showTooltip: true }}
      >
        color-border-...
      </Typography.Paragraph>
      {/* <span style={{ width: '90px', fontSize: 10, fontWeight: 500, wordBreak: 'break-all' }}>
        color-border-1111
      </span> */}
      {/* <div style={{ padding: 8, fontWeight: 500 }}>
        <Typography.Text style={{ fontSize: 10 }} ellipsis={{ showTooltip: true }}>
          color-border-1
        </Typography.Text>
      </div> */}
    </>
    // </div>
  );
}

export default App;
