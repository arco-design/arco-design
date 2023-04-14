import React, { useState } from 'react';
import { Grid, Switch, Typography } from '@self';

const Test = () => {
  return <div>123</div>;
};
export const Demo = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const OverflowInfo = ({ overflow }) => `suffix | overflow: ${overflow}`;

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '20px' }}>
        <Typography.Text>折叠：</Typography.Text>
        <Switch checked={collapsed} onChange={setCollapsed} />
      </div>
      <Grid collapsed={collapsed} cols={3} colGap={12} rowGap={16} className="grid-demo-grid">
        {[1, 2].map((x) => {
          return (
            <Grid.GridItem className="demo-item" key={x}>
              <div>item {x}</div>
            </Grid.GridItem>
          );
        })}
        <Grid.GridItem>
          <Test />
        </Grid.GridItem>
      </Grid>
    </div>
  );
};

export default {
  title: 'Grid',
};
