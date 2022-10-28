/* eslint-disable no-console */
import React from 'react';
import { Button, Space } from '@self';
import { IconInfoCircleFill, IconExclamationCircleFill, IconCloseCircleFill } from '@self/icon';

export const Status = () => (
  <div>
    <Button style={{ margin: 20 }}>默认按钮</Button>
    <Button onClick={(event) => console.log(event)} type="primary" style={{ margin: 20 }}>
      <IconInfoCircleFill />
      主要按钮
    </Button>
    <Button type="primary" status="warning" style={{ margin: 20 }}>
      <IconExclamationCircleFill />
      危险按钮
    </Button>
    <Button type="primary" status="danger" style={{ margin: 20 }}>
      <IconCloseCircleFill />
      高危按钮
    </Button>
    <Button disabled type="primary" style={{ margin: 20 }}>
      失效按钮
    </Button>
    <Button type="dashed" style={{ margin: 20 }}>
      虚线按钮
    </Button>
    <Button type="text" style={{ margin: 20 }}>
      文字按钮
    </Button>
    <Button size="small" loading style={{ margin: 20 }} onClick={() => console.log('!!!!!')}>
      Default
    </Button>
    <Button size="large" loading style={{ margin: 20 }} onClick={() => console.log('~~~~')}>
      Default
    </Button>
    <Button size="large" type="primary" loading style={{ margin: 20 }}>
      Default
    </Button>
    <Button size="large" type="primary" status="warning" loading style={{ margin: 20 }}>
      Default
    </Button>
    <Button size="large" type="primary" status="danger" loading style={{ margin: 20 }}>
      Default
    </Button>
    <Button size="large" type="dashed" loading style={{ margin: 20 }}>
      Default
    </Button>
    <Button size="large" type="text" loading style={{ margin: 20 }}>
      Default
    </Button>
  </div>
);

export const Focus = () => (
  <Space direction="vertical">
    <Space>
      <Button type="primary">Round</Button>
      <Button>Secondary</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="outline">Outline</Button>
      <Button type="text">Text</Button>
    </Space>
    <Space>
      <Button type="primary" shape="round">
        Round
      </Button>
      <Button shape="round">Secondary</Button>
      <Button type="dashed" shape="round">
        Dashed
      </Button>
      <Button type="outline" shape="round">
        Outline
      </Button>
      <Button type="text" shape="round">
        Text
      </Button>
    </Space>
    <Space>
      <Button type="primary" disabled>
        Round
      </Button>
      <Button disabled>Secondary</Button>
      <Button type="dashed" disabled>
        Dashed
      </Button>
      <Button type="outline" disabled>
        Outline
      </Button>
      <Button type="text" disabled>
        Text
      </Button>
    </Space>
    <Space>
      <Button type="primary" loading>
        Round
      </Button>
      <Button loading>Secondary</Button>
      <Button type="dashed" loading>
        Dashed
      </Button>
      <Button type="outline" loading>
        Outline
      </Button>
      <Button type="text" loading>
        Text
      </Button>
    </Space>
    <Space>
      <Button type="primary" status="danger">
        Danger
      </Button>
      <Button type="primary" status="warning">
        Warning
      </Button>
      <Button type="primary" status="success">
        Success
      </Button>
    </Space>
    <Space>
      <Button status="danger">Danger</Button>
      <Button status="warning">Warning</Button>
      <Button status="success">Success</Button>
    </Space>
    <Space>
      <Button type="dashed" status="danger">
        Danger
      </Button>
      <Button type="dashed" status="warning">
        Warning
      </Button>
      <Button type="dashed" status="success">
        Success
      </Button>
    </Space>
    <Space>
      <Button type="outline" status="danger">
        Danger
      </Button>
      <Button type="outline" status="warning">
        Warning
      </Button>
      <Button type="outline" status="success">
        Success
      </Button>
    </Space>
    <Space>
      <Button type="text" status="danger">
        Danger
      </Button>
      <Button type="text" status="warning">
        Warning
      </Button>
      <Button type="text" status="success">
        Success
      </Button>
    </Space>
  </Space>
);

export const ButtonGroup = () => (
  <Space direction="vertical">
    <Button.Group>
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="outline">Outline</Button>
      <Button type="text">Text</Button>
    </Button.Group>
    <Button.Group>
      <Button type="text" status="warning">
        Warning
      </Button>
      <Button type="primary" status="success">
        Success
      </Button>
      <Button status="default">Default</Button>
      <Button type="outline" status="danger">
        Danger
      </Button>
    </Button.Group>

    <Button.Group>
      <Button type="text" status="warning">
        Warning
      </Button>
      <Button type="text" status="success">
        Success
      </Button>
      <Button type="text">Default</Button>
      <Button type="text" status="danger">
        Danger
      </Button>
    </Button.Group>
  </Space>
);
export default {
  title: 'Button',
};
