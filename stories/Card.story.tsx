import React, { useState } from 'react';
import { Card, Grid, Avatar, Switch, Tabs } from '@self';

import { IconDownload, IconShareAlt } from '@self/icon';

const Row = Grid.Row;
const Col = Grid.Col;
const { Meta } = Card;
const TabPane = Tabs.TabPane;

const cardStyle = {
  width: 320,
};

const listStyle = {
  padding: '0 0 12px 0',
};

const smListStyle = {
  padding: '0 0 6px 0',
};

const spanStyle = {
  fontSize: 14,
  marginLeft: 10,
};

const perfectCenterStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const extra = <a href="#">More</a>;

function DemoCard() {
  const [loading, setLoading] = useState<boolean>(true);

  function onChange(checked: boolean) {
    setLoading(!checked);
  }

  return (
    <div>
      <Row style={{ marginTop: 10 }}>
        <Col span={12}>
          <Card title="Default Card" extra={extra} style={cardStyle}>
            <p style={listStyle}>Content</p>
            <p style={listStyle}>Content</p>
            <p>Content</p>
          </Card>
        </Col>
        <Col span={12}>
          <Card style={cardStyle}>
            <p style={listStyle}>Content</p>
            <p style={listStyle}>Content</p>
            <p>Content</p>
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col span={12}>
          <Card style={cardStyle}>
            <Meta title="Girl" description="This is a girl" />
          </Card>
        </Col>
        <Col span={12}>
          <div style={{ padding: '24px', backgroundColor: '#ececec' }}>
            <Card title="Small Unbordered Card" size="small" bordered={false} style={cardStyle}>
              <p style={smListStyle}>Content</p>
              <p style={smListStyle}>Content</p>
              <p>Content</p>
            </Card>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col span={12}>
          <Switch checked={!loading} onChange={onChange} />
          <Card
            hoverable
            loading={loading}
            style={cardStyle}
            actions={[
              <div key="download" style={perfectCenterStyle}>
                <IconDownload />
                <span style={spanStyle}>下载文档</span>
              </div>,
              <div key="share" style={perfectCenterStyle}>
                <IconShareAlt />
                <span style={spanStyle}>分享文档</span>
              </div>,
            ]}
          >
            <Meta
              avatar={
                <Avatar style={{ marginRight: 20, backgroundColor: '#5babf3' }}>Docor</Avatar>
              }
              title="Docor"
              description="This is Docor"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Card Title">
            <Tabs>
              <TabPane destroyOnHide key="1" title="Tab 1">
                <div style={{ padding: 50 }}>Tab 1 Content</div>
              </TabPane>
              <TabPane destroyOnHide key="2" title="Tab 2">
                <div style={{ padding: 50 }}>Tab 2 Content</div>
              </TabPane>
              <TabPane destroyOnHide key="3" title="Tab 3">
                <div style={{ padding: 50 }}>Tab 3 Content</div>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default {
  title: 'Card',
};

export const Demo = () => <DemoCard />;
