import React from 'react';
import { Grid } from '@self';

const Row = Grid.Row;
const Col = Grid.Col;

export const Demo = () => (
  <div className="story-grid-wrapper">
    <Row style={{ marginTop: 10 }}>
      <Col xs={12} md={6} lg={0} xl={2}>
        Hello world this is mim
      </Col>
    </Row>
  </div>
);

export default {
  title: 'Grid',
};
