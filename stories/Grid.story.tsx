import React from 'react';
import { Grid } from '@self';

const Row = Grid.Row;
const Col = Grid.Col;

export const Demo = () => (
  <div className="story-grid-wrapper">
    <Row style={{ marginTop: 10 }}>
      <Col span={12}>
        <div className="light">50%</div>
      </Col>
      <Col span={12}>
        <div className="dark">50%</div>
      </Col>
    </Row>
    <Row gutter={12} style={{ marginTop: 10 }}>
      <Col span={12}>
        <div className="light">50% gutter: 12px</div>
      </Col>
      <Col span={12}>
        <div className="dark">50% gutter: 12px</div>
      </Col>
    </Row>
    <Row gutter={12} style={{ marginTop: 10 }}>
      <Col span={6}>
        <div className="light">25% gutter: 12px</div>
      </Col>
      <Col span={6}>
        <div className="dark">25% gutter: 12px</div>
      </Col>
      <Col span={6}>
        <div className="light">25% gutter: 12px</div>
      </Col>
      <Col span={6}>
        <div className="dark">25% gutter: 12px</div>
      </Col>
    </Row>
    <Row style={{ marginTop: 10 }}>
      <Col span={6} offset={6} className="dark">
        25% offset:25%
      </Col>
      <Col span={6} offset={6} className="dark">
        25% offset:25%
      </Col>
    </Row>
  </div>
);

export default {
  title: 'Grid',
};
