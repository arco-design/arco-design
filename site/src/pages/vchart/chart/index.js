import React from 'react';
import { Card, Grid, Typography } from '@arco-design/web-react';
import { VChart } from '@visactor/react-vchart';
import demolist from './demo';

const chartHeight = 400;

function Chart(props) {
  return (
    <Card>
      <Typography.Title heading={6}>{props.title}</Typography.Title>
      <VChart
        spec={{
          height: chartHeight,
          ...props.spec,
        }}
        options={{
          ...props.option,
          mode: 'desktop-browser',
        }}
      />
    </Card>
  );
}

export default function ChartList() {
  return (
    <Grid cols={{ xl: 1, xxl: 2 }} rowGap={32} colGap={32}>
      {demolist.map((demo, index) => {
        return (
          <Grid.GridItem key={index}>
            <Chart {...demo} />
          </Grid.GridItem>
        );
      })}
    </Grid>
  );
}
