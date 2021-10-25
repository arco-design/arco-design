import React, { Component } from 'react';
import { Badge } from '@self';
import { IconMessage } from '@self/icon';

class DemoBadge extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
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
        <Badge count={1} dot type="info" style={{ marginTop: 20, marginRight: 20 }}>
          <IconMessage style={{ color: '#888' }} />
        </Badge>
        <Badge count={1} dot type="success" style={{ marginTop: 20, marginRight: 20 }}>
          <IconMessage style={{ color: '#888' }} />
        </Badge>
        <Badge count={1} dot type="warning" style={{ marginTop: 20, marginRight: 20 }}>
          <IconMessage style={{ color: '#888' }} />
        </Badge>
        <Badge count={1} dot type="danger" style={{ marginTop: 20, marginRight: 20 }}>
          <IconMessage style={{ color: '#888' }} />
        </Badge>
        <Badge count={1} dot type="normal" style={{ marginTop: 20, marginRight: 20 }}>
          <IconMessage style={{ color: '#888' }} />
        </Badge>
      </div>
    );
  }
}

export default DemoBadge;
