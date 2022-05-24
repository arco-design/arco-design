import React from 'react';
import { Avatar, Tooltip } from '@self';

export default {
  title: 'Avatar',
};

export const Demo = () => (
  <div style={{ marginTop: 150 }}>
    <Avatar.Group size={60} maxCount={5}>
      <span>
        <Tooltip content="hello arco">
          <Avatar style={{ background: '#99f' }}>a</Avatar>
        </Tooltip>
      </span>
      <Avatar>b</Avatar>
      <Avatar>c</Avatar>
      <Avatar>d</Avatar>
      <Avatar>五</Avatar>
      <Avatar>六</Avatar>
      <Tooltip content="hello arco">
        <Avatar style={{ background: '#99f' }}>7</Avatar>
      </Tooltip>
    </Avatar.Group>
  </div>
);
