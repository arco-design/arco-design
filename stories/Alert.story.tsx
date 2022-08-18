import React from 'react';
import { Alert } from '@self';
import { IconBug } from '@self/icon';

export default {
  title: 'Alert',
};

export const Demo = () => (
  <>
    <Alert
      showIcon
      type="info"
      title="Info"
      content="ContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContent"
      style={{ marginTop: 10 }}
    />
    <Alert
      showIcon
      type="success"
      title="Success"
      content="ContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContent~"
      style={{ marginTop: 10 }}
    />
    <Alert showIcon type="warning" title="Warning" content="Content~" style={{ marginTop: 10 }} />
    <Alert showIcon type="error" title="Error" content="Content~" style={{ marginTop: 10 }} />
    <Alert
      type="success"
      title="没有图标"
      content="ContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContent~"
      style={{ marginTop: 10 }}
    />
    <Alert
      icon={<IconBug style={{ color: 'green' }} />}
      title="Normal"
      content="Content~"
      style={{ marginTop: 10 }}
    />
  </>
);
