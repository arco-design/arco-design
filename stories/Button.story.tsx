/* eslint-disable no-console */
import React from 'react';
import { Button } from '@self';
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

export default {
  title: 'Button',
};
