import React from 'react';
import { ColorPicker } from '@self';

export default {
  title: 'ColorPicker',
};

export const Demo = () => (
  <div style={{ marginTop: 150 }}>
    <ColorPicker size={'mini'} />
    <br/>
    <ColorPicker size={'small'} />
    <br/>
    <ColorPicker size={'default'} showPreset showHistory />
    <br/>
    <ColorPicker size={'large'} />
  </div>
);
