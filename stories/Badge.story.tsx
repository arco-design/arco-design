import React from 'react';
import { Badge } from '@self';
import { IconMessage } from '@self/icon';

export default {
  title: 'Badge',
};

export const Demo = () => (
  <div>
    <Badge count={10000} maxCount={999} style={{ marginRight: 20 }}>
      <div style={{ width: 50, height: 50, background: '#ccc' }} />
    </Badge>
    <Badge count={1} dot>
      <div style={{ width: 50, height: 50, background: '#ccc' }} />
    </Badge>
    <br />
    <Badge count={1} dot style={{ marginTop: 20, marginRight: 20 }}>
      <a href="#">这是一个链接</a>
    </Badge>
    <Badge count={1} dot style={{ marginTop: 20 }}>
      <IconMessage style={{ color: '#888' }} />
    </Badge>
    <br />
    <Badge count={1} dot status="default" style={{ marginTop: 20, marginRight: 20 }}>
      <IconMessage style={{ color: '#888' }} />
    </Badge>
    <Badge count={1} dot status="error" style={{ marginTop: 20, marginRight: 20 }}>
      <IconMessage style={{ color: '#888' }} />
    </Badge>
    <Badge count={1} dot status="processing" style={{ marginTop: 20, marginRight: 20 }}>
      <IconMessage style={{ color: '#888' }} />
    </Badge>
    <Badge count={1} dot status="success" style={{ marginTop: 20, marginRight: 20 }}>
      <IconMessage style={{ color: '#888' }} />
    </Badge>
    <Badge count={1} dot status="warning" style={{ marginTop: 20, marginRight: 20 }}>
      <IconMessage style={{ color: '#888' }} />
    </Badge>
  </div>
);
