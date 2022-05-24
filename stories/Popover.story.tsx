import React from 'react';
import { Popover, Button, Select } from '@self';

export const Demo = () => (
  <Popover
    trigger="click"
    defaultPopupVisible
    position="right"
    title="Title"
    content={
      <div style={{ display: 'flex' }}>
        123123112312311231231
        <Select options={['1', '2', '3']} defaultPopupVisible />
        <Popover
          trigger="click"
          defaultPopupVisible
          position="right"
          title="Title"
          content={
            <div style={{ display: 'flex' }}>
              123123112312311231231
              <Select options={['1', '2', '3']} defaultPopupVisible />
            </div>
          }
        >
          <Button style={{ marginRight: 20 }}>Hover</Button>
        </Popover>
      </div>
    }
  >
    <Button style={{ marginRight: 20 }}>Hover</Button>
  </Popover>
);

export default {
  title: 'Popover',
};
